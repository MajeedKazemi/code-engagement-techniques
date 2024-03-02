import React, { useState, useEffect, useRef, useContext } from 'react';
import * as monaco from 'monaco-editor';
import IconsDoc from './docs/icons-doc';
import { apiGetBaselineCodex, apiGetGeneratedFeedbackCodex, logError } from "../api/api";

import { AuthContext } from "../context";
import { LogType, log } from '../utils/logger';
import ParsonsGenerateCode, { parsonsCancelClicked } from './techniques/parsons-generator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { highlightCode } from '../utils/utils';
import PseudoGenerateCode, { pseudoCancelClicked } from './techniques/pseudo-generator';
import { apiGetAggregatedDataPerUserBaseline } from '../api/api-analysis';
import HierachicalGenerateCode, { hierarchicalCancelClicked} from './techniques/hierarchical-generator';
import TokenGenerateCode, { tokenCancelClicked } from './techniques/token-generator';
import WriteOverGenerateCode, { writeOverCancelClicked } from './techniques/write-over-generator';
import SelfExplainGenerateCode, { selfExplainCancelClicked } from './techniques/self-explanation';
import ExcutionGenerateCode, { excutionCancelClicked } from './techniques/excution-generator';
import VerifyGenerateCode, { verifyCancelClicked } from './techniques/verify-review-generator';
import RevealGenerateCode, { revealCancelClicked } from './techniques/lead-reveal-generator';
import { ChatLoader } from './loader';
import BaselineGenerateCode, { baselineCancelClicked } from './responses/baseline-chat';

interface BaselineGeneratorProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

interface BaselinePromptsProps {
  user: string;
  assistant: string[];
}

const Baseline: React.FC<BaselineGeneratorProps> = ({ editor }) => {
  const [isUserPromptsVisible, setIsUserPromptsVisible] = useState(true);
  const [generatedCodeComponentVisible, setGeneratedCodeComponentVisible] = useState(false);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [userInput, setUserInput] = useState('');
  const [taskID, setTaskID] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [codeAboveCursor, setcodeAboveCursor] = useState('');
  const [cursorPosition, setCursorPosition] = useState<monaco.Position | null>(null);
  const { context, setContext } = useContext(AuthContext);
  const [generatedCodeComponent, setGeneratedCodeComponent] = useState<React.ReactNode>(null);
  const [satisfiedPrompt, setSatisfiedPrompt] = useState<boolean>(false);
  const [unSatisfiedTime, setUnSatisfiedTime] = useState<number>(0);
  const [prompts, setPrompts] = useState<BaselinePromptsProps[]>([]);
  const [generatingFeedback, setGeneratingFeedback] = useState<boolean>(false);
  const [rows, setRows] = useState(4);
  const [matched, setMatched] = useState<boolean>(true);

  useEffect(() => {
    if (editor) {
      const handleCursorPositionChange = (event: monaco.editor.ICursorPositionChangedEvent) => {
        const newPosition = event.position;
        const currentPosition = editor.getPosition();
        const model = editor.getModel();
        if (model) {
          if (
            newPosition.lineNumber <= model.getLineCount() ||
            newPosition.column <= model.getLineMaxColumn(newPosition.lineNumber)
          ) {
            const adjustedLineNumber = Math.max(newPosition.lineNumber, 3);
            const adjustedPosition = new monaco.Position(adjustedLineNumber, newPosition.column);
      
            setCursorPosition(adjustedPosition);
          }

          if (currentPosition) {
            const currCode = model.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: currentPosition.lineNumber - 1,
              endColumn: model.getLineMaxColumn(currentPosition.lineNumber - 1),
            });

            setcodeAboveCursor(currCode);
          }
        }
      };

      const disposable = editor.onDidChangeCursorPosition(handleCursorPositionChange);

      return () => {
        disposable.dispose();
      };
    }
  }, [editor]);

  const handleUserInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(event.target.value);
  };  

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      setRows(oldRows => oldRows + 1);
    }
  };

  function addOverlay(){
    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'block';
    editorElement.style.zIndex = '-99';
  }

  
  const handleGenerateCode = (techniques: string) => {
    let generatedCodeComponent = null;
    const generatedCodeComponentVisible = true;
    setGeneratedCodeComponentVisible(generatedCodeComponentVisible);
    switch (techniques) {
      case "baseline":
        generatedCodeComponent =  <BaselineGenerateCode prompt={userInput} editor={editor} code={""} exp={""} taskID={taskID}/>;
        break;
      case "pseudo":
        addOverlay();
        generatedCodeComponent = 
          <PseudoGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor} taskID={taskID}/>
        break;
      case "parsons":
        addOverlay();
        generatedCodeComponent = 
          <DndProvider backend={HTML5Backend}>
            <ParsonsGenerateCode prompt={userInput} editor={editor}  taskID={taskID}/>
          </DndProvider>
        break;
      // case "hierarchical":
      //   addOverlay();
      //   generatedCodeComponent = 
      //     <HierachicalGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor}/>
      //   break;
      // case "token":
      //   addOverlay();
      //   generatedCodeComponent =
      //     <TokenGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor} taskID={taskID}/>
      //   break;
      case "writeover":
        addOverlay();
        generatedCodeComponent = 
          <WriteOverGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor} taskID={taskID}/>
        break;
      case "selfexplain":
        addOverlay();
        generatedCodeComponent =
          <SelfExplainGenerateCode prompt={userInput} editor={editor}  taskID={taskID}/>
        break;
      case "stepByStep":
        addOverlay();
        generatedCodeComponent =
          <ExcutionGenerateCode prompt={userInput} editor={editor}  taskID={taskID}/>
        break;
      case "verify":
        addOverlay();
        generatedCodeComponent =
          <VerifyGenerateCode prompt={userInput} editor={editor}  taskID={taskID}/>
        break;
      case "leadReveal":
        addOverlay();
        generatedCodeComponent =
          <RevealGenerateCode prompt={userInput} editor={editor}  taskID={taskID}/>
        break;
      default:
        generatedCodeComponent =  <BaselineGenerateCode prompt={userInput} editor={editor} code={""} exp={""} taskID={taskID}/>;
        break;
    }
    setGeneratedCodeComponent(generatedCodeComponent);
  };

  function generateFeedback(currPrompt: string) {
    setGeneratingFeedback(true);
    const taskContext = 
    [
      {
        id: "1", 
        description: "Write a function that takes a list of intervals (e.g., ranges of numbers) and merges any overlapping intervals."
      },
      {
        id: "2", 
        description:"Write a Python function to calculate the sum of even numbers in a given list."
      },
      {
        id:  "3", 
        description:"Write a function that takes a list of strings and returns the longest common prefix."
      }
    ];

    try {
      apiGetGeneratedFeedbackCodex(
          context?.token,
          userInput,
          taskContext,
      )
          .then(async (response) => {

              if (response.ok) {
                  const data = await response.json();

                  if (data.response.matched != 'yes') {
                    console.log("did not match");
                    setMatched(false);
                    const currPrompts = [...prompts];
                    const currPromptObj = {
                      user: currPrompt,
                      assistant: [],
                    }
                    currPrompts.push(currPromptObj);
                    setPrompts(currPrompts);
                    setUserInput("");
                  } else {
                    setMatched(true);
                    setTaskID(data.response["matched-taskId"]);
                    const currPrompts = [...prompts];
                    const currPromptObj = {
                      user: currPrompt,
                      assistant: data.response["missing-specifications"],
                    }
                    currPrompts.push(currPromptObj);
                    console.log(currPrompts);
                    setPrompts(currPrompts);


                    if(data.response["accuracy-score"] == 5){
                      setSatisfiedPrompt(true);
                    }else{
                      setUserInput("");
                    }
                  }
              }
              setGeneratingFeedback(false);
          })
          .catch((error) => {
            setGeneratingFeedback(false);
            logError(error.toString());
          });
      } catch (error: any) {
          setGeneratingFeedback(false);
          logError(error.toString());
      }
  }

  useEffect(() => {
    const checkCancelClicked = () => {
      if (isUserPromptsVisible == false) {
        const generatedCodeComponentVisible = false;
        setGeneratedCodeComponentVisible(generatedCodeComponentVisible);
        const isUserPromptsVisible = true;
        setIsUserPromptsVisible(isUserPromptsVisible);
        setGeneratedCodeComponent(null);
        setGeneratedCode("");
        setExplanation("");
        setUserInput("");
        var outputDiv = document.querySelector('.output');
        outputDiv!.innerHTML = '';
      } 
    };
    checkCancelClicked();
  }, [baselineCancelClicked, pseudoCancelClicked, hierarchicalCancelClicked, tokenCancelClicked, parsonsCancelClicked, writeOverCancelClicked, selfExplainCancelClicked, verifyCancelClicked, excutionCancelClicked, revealCancelClicked]);

  // define the current technique


  // const technique = 'baseline';
  const technique = 'pseudo';
  // const technique = 'parsons';
  // const technique = 'writeover';
  // const technique = 'selfexplain';
  // const technique = 'stepByStep';
  // const technique = 'verify';
  // const technique = 'leadReveal';

  const handleClick = () => {

    //pass the prompt to gpt to check if the prompt is satisfied
    const currPrompt = userInput;
    generateFeedback(currPrompt);
    setSatisfiedPrompt(false);
  };

  useEffect(() => {
    if(satisfiedPrompt || unSatisfiedTime > 4){
      const isUserPromptsVisible = false;
      setIsUserPromptsVisible(isUserPromptsVisible);
      handleGenerateCode(technique);
    }else{
      setUnSatisfiedTime(unSatisfiedTime + 1);
    }
  }, [satisfiedPrompt]);

  return (
    <section className='response-container'>
      <div className="task-baseline card-question">
            <div className="baseline-title">
              <h3>
                <div className='gpt-image'><IconsDoc iconName="spark" /></div>
                AI Assistance:
              </h3>
            </div>
          {/* Conditionally render the generated code component */}
          <div className={`generated-code-component ${generatedCodeComponentVisible ? '' : 'hidden'}`}>
            {generatedCodeComponent && (
                generatedCodeComponent
            )}
          </div>
          <div id='user-prompts' className={`chat-user-prompt ${isUserPromptsVisible? '' : 'hidden'}`}>
          {(!matched || (!satisfiedPrompt && unSatisfiedTime <= 4)) && (
            <div className="baseline-feedback-chat">
              {prompts.map((prompt, index) => {
                return (
                  <div key={index} className="baseline-feedback">
                    <div className='user-chat-container'>
                      <div className='user-icon'><IconsDoc iconName="person" /></div>
                      <div className="baseline-feedback-user chat-bubble">
                        <div className="baseline-feedback-user-text">
                          <p>{prompt.user}</p>
                        </div>
                      </div>
                    </div>
                    <div className='assistant-chat-container'>
                      <div className='assistant-icon'><IconsDoc iconName="spark" /></div>
                      <div className="baseline-feedback-assistant chat-bubble">
                        {matched && <div className="baseline-feedback-assistant-text">
                          <p>You are missing the following details, please add them to your prompt before I can help you with code generation:</p>
                          <ul>
                            {prompt.assistant.map((specification, index) => (
                              <li key={index}>{specification}</li>
                            ))}
                          </ul>
                        </div>
                        }
                        {!matched && <div className="baseline-feedback-assistant-text">
                          <p>Your request does not align with any of the available task descriptions. Kindly review the task list and try again.</p>
                        </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {generatingFeedback && (
            <div className="baseline-feedback">
             <div className='user-chat-container'>
               <div className='user-icon'><IconsDoc iconName="person" /></div>
               <div className="baseline-feedback-user chat-bubble">
                 <div className="baseline-feedback-user-text">
                   <p>{userInput}</p>
                 </div>
               </div>
             </div>
             <div className='assistant-chat-container'>
               <div className='assistant-icon'><IconsDoc iconName="spark" /></div>
               <div className="baseline-feedback-assistant chat-bubble">
                 <div className="baseline-feedback-assistant-text">
                    <div className='chat-loader'>Generating <ChatLoader/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>
                 </div>
               </div>
             </div>
           </div>
          )}
          {!generatingFeedback && <>
            <div className="baseline-input-container">
                      <textarea
                      className="baseline-input"
                      id="userInput"
                      value={userInput}
                      onChange={handleUserInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe the intended behavior..."
                      rows={rows}
                    />
            </div>
            <div className='baseline-generator-container'>
              <button className="gpt-button" onClick={handleClick} disabled={!userInput.trim()}>
                Generate Code
              </button>
            </div>
          </>
          }
          </div>
      </div>
    </section>
  );
};


export { Baseline };
