import React, { useState, useEffect, useRef, useContext } from 'react';
import * as monaco from 'monaco-editor';
import robot from "../assets/robot.png";
import { apiGetBaselineCodex, logError } from "../api/api";

import { AuthContext } from "../context";
import { LogType, log } from '../utils/logger';
import ParsonsGenerateCode from './techniques/parsons-generator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { highlightCode } from '../utils/utils';
import PseudoGenerateCode, { cancelClicked } from './techniques/pseudo-generator';
import { apiGetAggregatedDataPerUserBaseline } from '../api/api-analysis';
import HierachicalGenerateCode from './techniques/hierarchical-generator';

let insertedCode = "";

interface BaselineGeneratorProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

const Baseline: React.FC<BaselineGeneratorProps> = ({ editor }) => {
  const [isUserPromptsVisible, setIsUserPromptsVisible] = useState(true);
  const [generatedCodeComponentVisible, setGeneratedCodeComponentVisible] = useState(false);
  const baselineRef = useRef<HTMLDivElement | null>(null);
  const explainRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [userInput, setUserInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [codeAboveCursor, setcodeAboveCursor] = useState('');
  const [cursorPosition, setCursorPosition] = useState<monaco.Position | null>(null);
  const { context, setContext } = useContext(AuthContext);
  const [waiting, setWaiting] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [checked, setChecked] = useState(true);
  const [generatedCodeComponent, setGeneratedCodeComponent] = useState<React.ReactNode>(null);

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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const target = event.target as HTMLTextAreaElement;
      target.value += '\n';
      target.style.height = `${target.scrollHeight}px`;
    }
  };

  const cancelClick = () => {
    // clean up explination and generated code, remove the generatedCodeComponent to null

    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'none';
    editorElement.style.zIndex = '1';

    const generatedCodeComponentVisible = false;
    setGeneratedCodeComponentVisible(generatedCodeComponentVisible);
    const isUserPromptsVisible = true;
    setIsUserPromptsVisible(isUserPromptsVisible);
    setExplanation("");
    setGeneratedCode("");
  };

  const handleInsertCodeClick = () => {
    if (editor) {
      const position = editor.getPosition();
      if (position) {
        const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
        const op = { identifier: { major: 1, minor: 1 }, range: range, text: insertedCode, forceMoveMarkers: true };
        console.log(insertedCode);
        editor.executeEdits("insertCodeAfterCursor", [op]);
      }
    }
    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'none';
    editorElement.style.zIndex = '1';

    const generatedCodeComponentVisible = false;
    setGeneratedCodeComponentVisible(generatedCodeComponentVisible);
    const isUserPromptsVisible = true;
    setIsUserPromptsVisible(isUserPromptsVisible);
    setGeneratedCode("");
    setExplanation("");
    setUserInput("");
  };
  
  const handleGenerateCode = (techniques: string) => {
    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'block';
    editorElement.style.zIndex = '-99';
    
    let generatedCodeComponent = null;
    const generatedCodeComponentVisible = true;
    setGeneratedCodeComponentVisible(generatedCodeComponentVisible);
    switch (techniques) {
      case "baseline":
        generatedCodeComponent =  BaselineGenerateCode();
        break;
      case "pseudo":
        generatedCodeComponent = 
          <PseudoGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor}/>
        break;
      case "parsons":
        generatedCodeComponent = 
          <DndProvider backend={HTML5Backend}>
            <ParsonsGenerateCode prompt={userInput} editor={editor} />;
          </DndProvider>
        break;
      case "hierarchical":
        generatedCodeComponent = 
          <HierachicalGenerateCode prompt={userInput} editor={editor} code={codeAboveCursor}/>
        break;
      default:
        generatedCodeComponent =  BaselineGenerateCode();
        break;
    }
    setGeneratedCodeComponent(generatedCodeComponent);
  }

  const BaselineGenerateCode = () => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput
 
    const props = {
      taskId: "",
      editor: editor
    }

    const generateCode = () => {
      if (userInput.length === 0) {
          setFeedback(
              "You should write an instruction of the code that you want to be generated."
          );
      } else {
          setWaiting(true);

          const focusedPosition = props.editor?.getPosition();
          const userCode = codeAboveCursor;
          console.log("code to be use", userCode);
          let codeContext = "";

          if (focusedPosition && userCode && checked) {
              codeContext = userCode
                  .split("\n")
                  .slice(0, focusedPosition.lineNumber + 1)
                  .join("\n");
          }

          try {
              apiGetBaselineCodex(
                  context?.token,
                  userInput,
                  userCode ? userCode : ""
              )
                  .then(async (response) => {

                      if (response.ok && props.editor) {
                          const data = await response.json();

                          let text = data.bundle.code;

                          setExplanation(data.bundle.explain);

                          if (text.length > 0) {
                              setFeedback("");
                              log(
                                  props.taskId,
                                  context?.user?.id,
                                  LogType.PromptEvent,
                                  {
                                      code: text,
                                      userInput: userInput,
                                  }
                              );

                              let insertLine = 0;
                              let insertColumn = 1;

                              let curLineNumber = 0;
                              let curColumn = 0;

                              let highlightStartLine = 0;
                              let highlightStartColumn = 0;
                              let highlightEndLine = 0;
                              let highlightEndColumn = 0;

                              const curPos = props.editor.getPosition();
                              const curCodeLines = props.editor
                                  .getValue()
                                  .split("\n");

                              if (curPos) {
                                  curLineNumber = curPos.lineNumber;
                                  curColumn = curPos.column;
                              }

                              let curLineText =
                                  curCodeLines[curLineNumber - 1];
                              let nextLineText =
                                  curLineNumber < curCodeLines.length
                                      ? curCodeLines[curLineNumber]
                                      : null;

                              if (curColumn === 1) {
                                  // at the beginning of a line
                                  if (curLineText !== "") {
                                      text += "\n";
                                      insertLine = curLineNumber;
                                      insertColumn = 1;

                                      highlightStartLine = curLineNumber;
                                      highlightStartColumn = curColumn;

                                      const textLines = text.split("\n");

                                      highlightEndLine =
                                          curLineNumber +
                                          textLines.length -
                                          1;
                                      highlightEndColumn = 1;
                                  } else {
                                      insertLine = curLineNumber;
                                      insertColumn = 1;

                                      highlightStartLine = curLineNumber;
                                      highlightStartColumn = curColumn;

                                      highlightEndLine =
                                          curLineNumber +
                                          text.split("\n").length;
                                      highlightEndColumn = 1;
                                  }
                              } else if (curColumn !== 1) {
                                  // in the middle of a line
                                  if (nextLineText !== "") {
                                      text = "\n" + text;
                                      insertLine = curLineNumber;
                                      insertColumn = curLineText.length + 1;

                                      const textLines = text.split("\n");

                                      highlightStartLine = curLineNumber + 1;
                                      highlightStartColumn = 1;

                                      highlightEndLine =
                                          curLineNumber +
                                          text.split("\n").length -
                                          1;
                                      highlightEndColumn =
                                          textLines[textLines.length - 1]
                                              .length + 1;
                                  } else {
                                      insertLine = curLineNumber + 1;
                                      insertColumn = 1;

                                      highlightStartLine = curLineNumber;
                                      highlightStartColumn = curColumn;

                                      highlightEndLine =
                                          curLineNumber +
                                          text.split("\n").length;
                                      highlightEndColumn = 1;
                                  }
                              }
                              setGeneratedCode(text);
                              insertedCode = text;
                          } 
                      }else{
                          setExplanation("No explanation available.");
                          setGeneratedCode("No code generated.");
                      }
                      setWaiting(false);
                  })
                  .catch((error) => {
                      props.editor?.updateOptions({ readOnly: false });
                      setWaiting(false);
                      logError(error.toString());
                  });
          } catch (error: any) {
              props.editor?.updateOptions({ readOnly: false });
              setWaiting(false);
              logError(error.toString());
          }
      }
    };
    
    generateCode();

    const generatedCodeComponent =
    <>
      <div style={{ whiteSpace: 'pre-wrap' }}>
        <b>prompts: </b> {userInput}
      </div>
      {/* <h2 className={`wait-message ${waiting ? '' : 'hidden'}`}>Generating Code<span className="ellipsis"></span></h2> */}
      <div className="wait-message preloader-2 ${waiting ? '' : 'hidden'}`}">
          <span className="line line-1"></span>
          <span className="line line-2"></span>
          <span className="line line-3"></span>
          <span className="line line-4"></span>
          <span className="line line-5"></span>
          <span className="line line-6"></span>
          <span className="line line-7"></span>
          <span className="line line-8"></span>
          <span className="line line-9"></span>
          <span className="line line-10"></span>
          <span className="line line-11"></span>
          <span className="line line-12"></span>
          <span className="line line-13"></span>
          <span className="line line-14"></span>
          <span className="line line-15"></span>
          <span className="line line-16"></span>
          <span className="line line-17"></span>
          <span className="line line-18"></span>
          <div>Generating</div>
      </div>
      <div ref={baselineRef} className="read-only-editor"></div>
      <div ref={explainRef}> </div>
      <div className="generated-button-container" style={{ marginTop:'2rem', display: 'flex', justifyContent: 'space-between'  }}>
        <button className="gpt-button disabled" onClick={cancelClick}>Cancel</button>
        <button className="gpt-button disabled" onClick={handleInsertCodeClick}>Insert Code</button>
      </div>
    </>

    return generatedCodeComponent;
  };

  useEffect(() => {
    const waitMessageElement = document.querySelector('.wait-message');
    const buttonElements = document.querySelectorAll('.generated-button-container .gpt-button');
  
    if (waiting) {
      if (waitMessageElement){
        waitMessageElement.classList.remove('hidden');
      }
      if (buttonElements) {
        buttonElements.forEach((button) => {
          button.classList.add('disabled');
        });
      }
    } else {
      if (waitMessageElement){
        waitMessageElement.classList.add('hidden');
      }
      if (buttonElements) {
        buttonElements.forEach((button) => {
          button.classList.remove('disabled');
        });
      }
    }
  }, [waiting]);

  // Move the baseline div based on the cursor position
  useEffect(() => {
    if (cursorPosition) {
      const { lineNumber } = cursorPosition;
      const baselineDiv = document.getElementById('baselineDiv');
      if (baselineDiv && !generatedCodeComponentVisible) {
        baselineDiv.style.top = `${lineNumber * 20}px`;
      }else if(baselineDiv){
        baselineDiv.style.top = `60px`;
      }
    }
  }, [cursorPosition]);


  useEffect(() => {
    if (baselineRef.current && generatedCode && !editorRef.current) {
      editorRef.current = monaco.editor.create(baselineRef.current, {
        value: generatedCode,
        language: 'python',
        readOnly: true,
        automaticLayout: true,
      });
      editorRef.current.onDidChangeModelContent(() => {
        const model = editorRef.current?.getModel();
        if (model) {
          const lineHeight = editorRef.current?.getOption(monaco.editor.EditorOption.lineHeight) || 18;
          const lineCount = Math.max(model.getLineCount(), 1);
          const newHeight = lineHeight * (lineCount+2);
          const maxHeight = window.innerHeight * 0.4;
          const height = Math.min(newHeight, maxHeight);
          baselineRef.current!.style.height = `${height}px`;
          editorRef.current!.layout();
        }
      });
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, [generatedCode]);

  useEffect(() => {
    if (explainRef.current) {
      const div = document.createElement('div');
      // div.innerHTML = `<b>Explanation:</b> ${explanation}`;
      const highlightedExplanation = highlightCode(explanation, "code-highlight");
      div.innerHTML = `<b>Explanation:</b> ${highlightedExplanation}`;
      explainRef.current.appendChild(div);
      const explainContainer = explainRef.current;
      const maxHeight = window.innerHeight * 0.4;

      if (explainContainer.scrollHeight > maxHeight) {
        explainContainer.style.height = `${maxHeight}px`;
        explainContainer.style.overflowY = 'scroll';
      } else {
        explainContainer.style.height = 'auto';
        explainContainer.style.overflowY = 'unset';
      }
      return () => {
        explainRef.current!.removeChild(div);
      };
    }
    
  }, [explanation]);

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
      } 
    };
    checkCancelClicked();
  }, [cancelClicked]);

  // define the current technique
  // const technique = 'baseline';
  // const technique = 'pseudo';
  const technique = 'hierarchical';

  const handleClick = () => {
    const isUserPromptsVisible = false;
    setIsUserPromptsVisible(isUserPromptsVisible);
    const baselineDiv = document.getElementById('baselineDiv');
    if (baselineDiv) {
      baselineDiv.style.top = `60px`;
    }
    handleGenerateCode(technique);
  };

  return (
    <section className='response-container'>
      <div className="task-baseline card-question" id="baselineDiv" style={{ position: 'absolute' }}>
          {/* Conditionally render the generated code component */}
          <div className={`generated-code-component ${generatedCodeComponentVisible ? '' : 'hidden'}`}>
            {generatedCodeComponent && (
                generatedCodeComponent
            )}
          </div>
          <div id='user-prompts' className={isUserPromptsVisible? '' : 'hidden'}>
          <>
            <h3>
              <img src={robot} className="gpt-image" />
              AI Assistance: <i>Describe the behavior of the code to be generated.</i>
            </h3>
            <div className="baseline-input-container">
                  {/* <label className="input-question"> */}
                      <textarea
                      className="baseline-input"
                      id="userInput"
                      value={userInput}
                      onChange={handleUserInput}
                      onKeyDown={handleKeyDown}
                      placeholder="Describe the intended behavior..."
                      rows={4}
                    />
                    {/* <textarea className="input__field" placeholder=" " />
                    <span className="input__label">Some Fancy Label</span> */}
                  {/* </label> */}
            </div>
            <div>
              <button className="gpt-button" onClick={handleClick} disabled={!userInput.trim()}>
                Generate Code
              </button>
            </div>
          </>
          </div>
      </div>
    </section>
  );
};


export { Baseline };
