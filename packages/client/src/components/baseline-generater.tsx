import React, { useState, useEffect } from 'react';
import * as monaco from 'monaco-editor';
import robot from "../assets/robot.png";

interface BaselineGeneratorProps {
  editor: monaco.editor.IStandaloneCodeEditor | null;
}

const Baseline: React.FC<BaselineGeneratorProps> = ({ editor }) => {
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
  

  const handleGenerateCode = () => {
    // Call the GPT API or any code generation logic here
    // to generate code based on the userInput

    // Dummy code generation and explanation for demonstration
    const generatedCode = `// Generated code based on input: ${userInput}`;
    const explanation = `Code is generated to ${userInput}`;

    setGeneratedCode(generatedCode);
    setExplanation(explanation);
  };

  // Move the baseline div based on the cursor position
  useEffect(() => {
    if (cursorPosition) {
      const { lineNumber } = cursorPosition;
      const baselineDiv = document.getElementById('baselineDiv');
      if (baselineDiv) {
        baselineDiv.style.top = `${lineNumber * 20}px`; // Adjust the positioning as needed
      }
    }
  }, [cursorPosition]);

  return (
    <section>
      <div className="task-baseline" id="baselineDiv" style={{ position: 'absolute' }}>
        <div>
          <img src={robot} className="gpt-image"/>
          <b>AI Assistance: </b> describe the behavior of the code to be generated.
        </div>
        <div className="baseline-input">
          <textarea
            id="userInput"
            value={userInput}
            onChange={handleUserInput}
            onKeyDown={handleKeyDown}
            placeholder="Describe the intended behavior..."
            rows={4}
            style={{
              height: '25%',
              width: '100%',
              fontSize: '16px',
            }}
          />
        </div>
        <div>
          <button
            onClick={handleGenerateCode}
            style={{
              backgroundColor: 'rgb(0, 122, 204)',
              color: '#fff',
              fontWeight: 'bold',
              width: '200px',
              border: 'none',
              padding: '10px',
            }}
          >
            Generate Code
          </button>
        </div>
        {generatedCode && (
          <div>
            <h3>Generated Code:</h3>
            <pre>{generatedCode}</pre>
          </div>
        )}
        {explanation && (
          <div>
            <h3>Explanation:</h3>
            <p>{explanation}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export { Baseline };
