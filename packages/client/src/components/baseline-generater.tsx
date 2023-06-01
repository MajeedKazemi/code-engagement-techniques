import React, { useState, useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import robot from "../assets/robot.png";

interface BaselineGeneratorProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

const Baseline: React.FC<BaselineGeneratorProps> = ({ editor }) => {
  const baselineRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [userInput, setUserInput] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [cursorPosition, setCursorPosition] = useState<monaco.Position | null>(null);

  useEffect(() => {
    if (editor) {
      const handleCursorPositionChange = (event: monaco.editor.ICursorPositionChangedEvent) => {
        const newPosition = event.position;
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

    setGeneratedCode("");
    setExplanation("");
  };
  

  const handleGenerateCode = () => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput

    // Dummy code generation and explanation for demonstration
    const generatedCode = 
    `def greet(name):
  print(f"Hello, {name}!")
    
def calculate_sum(a, b):
  return a + b
    
result = calculate_sum(5, 7)
print(f"The sum is: {result}")`;
    const explanation = `This code snippet demonstrates a simple Python program that defines two functions (greet and calculate_sum) and uses them to calculate the sum of two numbers (5 and 7).`;

    setGeneratedCode(generatedCode);
    setExplanation(explanation);

    const overlayElement = document.querySelector('.overlay') as HTMLElement;
    const editorElement = document.querySelector('.editor') as HTMLElement;
    overlayElement!.style.display = 'block';
    editorElement.style.zIndex = '-99';
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



  return (
    <section>
      <div className="task-baseline" id="baselineDiv" style={{ position: 'absolute' }}>
        {generatedCode && explanation && (
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
        )}
        {!generatedCode && !explanation && (
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
              <button className="gpt-button" onClick={handleGenerateCode}>
                Generate Code
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export { Baseline };
