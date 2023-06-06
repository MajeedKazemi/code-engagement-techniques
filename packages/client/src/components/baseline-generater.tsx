import React, { useState, useEffect, useRef, useContext } from 'react';
import * as monaco from 'monaco-editor';
import robot from "../assets/robot.png";
import { apiGetBaselineCodex, logError } from "../api/api";

import { AuthContext } from "../context";
import { LogType, log } from '../utils/logger';
import ParsonsGenerateCode from './parsons-generator';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

interface BaselineGeneratorProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

const Baseline: React.FC<BaselineGeneratorProps> = ({ editor }) => {
  const [isUserPromptsVisible, setIsUserPromptsVisible] = useState(true);
  const baselineRef = useRef<HTMLDivElement | null>(null);
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

  const handleInsertCodeClick = () => {
    if (editor) {
      const position = editor.getPosition();
      if (position) {
        const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
        const op = { identifier: { major: 1, minor: 1 }, range: range, text: generatedCode, forceMoveMarkers: true };
        editor.executeEdits("insertCodeAfterCursor", [op]);
      }
    }
    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'none';
    editorElement.style.zIndex = '1';

    const isUserPromptsVisible = true;
    setIsUserPromptsVisible(isUserPromptsVisible);
    setGeneratedCode("");
    setExplanation("");
  };
  
  const handleGenerateCode = (techniques: string) => {
    switch (techniques) {
      case "baseline":
        BaselineGenerateCode();
        break;
      case "parsons":
        const generatedCodeComponent = 
        <DndProvider backend={HTML5Backend}>
          <ParsonsGenerateCode prompt={userInput} editor={editor} />;
        </DndProvider>
        setGeneratedCodeComponent(generatedCodeComponent);
        break;
      default:
        BaselineGenerateCode();
    }
  }

  const BaselineGenerateCode = () => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput

    const explanation = `This code snippet demonstrates a simple Python program that defines two functions (greet and calculate_sum) and uses them to calculate the sum of two numbers (5 and 7).`;    
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
          const userCode = props.editor?.getValue();
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

                          let text = data.code;

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
                          } 
                      }
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
    setExplanation(explanation);

    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'block';
    editorElement.style.zIndex = '-99';

    const generatedCodeComponent =
      <>
        <div style={{ whiteSpace: 'pre-wrap' }}>
          <b>prompts: </b> {userInput}
        </div>
        <div ref={baselineRef} className="read-only-editor"></div>
        <div>
          <b>explanation: </b> {explanation}
        </div>
        <div style={{ marginTop:'2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
        </div>
      </>

    setGeneratedCodeComponent(generatedCodeComponent);
  };

  

  // Move the baseline div based on the cursor position
  useEffect(() => {
    if (cursorPosition) {
      const { lineNumber } = cursorPosition;
      const baselineDiv = document.getElementById('baselineDiv');
      if (baselineDiv) {
        baselineDiv.style.top = `${lineNumber * 20}px`;
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
          const newHeight = lineHeight * lineCount;
          baselineRef.current!.style.height = `${newHeight}px`;
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

  // define the current technique
  const technique = 'parsons';

  const handleClick = () => {
    const isUserPromptsVisible = false;
    setIsUserPromptsVisible(isUserPromptsVisible);
    handleGenerateCode(technique);
  };

  return (
    <section>
      <div className="task-baseline" id="baselineDiv" style={{ position: 'absolute' }}>
          {/* Conditionally render the generated code component */}
          {generatedCodeComponent && (
              generatedCodeComponent
          )}
          <div id='user-prompts' className={isUserPromptsVisible ? '' : 'hidden'}>
          <>
            <div>
              <img src={robot} className="gpt-image" />
              <b>AI Assistance: </b> describe the behavior of the code to be generated.
            </div>
            <div className="baseline-input-container">
              <textarea
                className="baseline-input"
                id="userInput"
                value={userInput}
                onChange={handleUserInput}
                onKeyDown={handleKeyDown}
                placeholder="Describe the intended behavior..."
                rows={4}
              />
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
