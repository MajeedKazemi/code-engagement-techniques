import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import robot from "../../assets/robot.png";
import { apiGetBaselineCodex, logError } from '../../api/api';
import * as monaco from 'monaco-editor';

interface PseudoGenerateCodeProps {
    prompt: string;
    editor: monaco.editor.IStandaloneCodeEditor | null;
}

const PseudoGenerateCode: React.FC<PseudoGenerateCodeProps> = ({ prompt, editor })  => {
    const pseudoRef = useRef<HTMLDivElement | null>(null);
    const editorRef = useRef<HTMLDivElement | null>(null);
    const [generatedPseudo, setGeneratedPseudo] = useState('');
    const [userInputCode, setUserInputCode] = useState('');

    const cancelClick = () => {
        
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
    
    };
    
    const handleInsertCodeClick = () => {
        if (editor) {
            const position = editor.getPosition();
            if (position) {
              const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
              const op = { identifier: { major: 1, minor: 1 }, range: range, text: userInputCode, forceMoveMarkers: true };
              console.log(userInputCode);
              editor.executeEdits("insertCodeAfterCursor", [op]);
            }
          }
        const overlayElement = document.querySelector('.overlay') as HTMLElement;
        const editorElement = document.querySelector('.editor') as HTMLElement;
        overlayElement!.style.display = 'none';
        editorElement.style.zIndex = '1';
      
    };

    useEffect(() => {
        if (pseudoRef.current && generatedPseudo) {
          
        }
    
        return () => {
          
        };
    }, [generatedPseudo]);

  useEffect(() => {
    const editorContainer = editorRef.current;
    const windowHeight = window.innerHeight;
    const editorHeight = Math.floor(windowHeight * 0.35);

    if (editorContainer) {
      const editor = monaco.editor.create(editorContainer, 
        {
            value: "",
            language: "python",
            automaticLayout: true,
            fontSize: 12,
            lineHeight: 25,
            minimap: { enabled: false },
            wordWrap: "on",
            wrappingIndent: "indent",
            lineNumbers: 'on',
        }
      );

      editorContainer.style.height = `${editorHeight}px`;

      editor.onDidChangeModelContent(() => {
        const updatedCode = editor.getValue();
        setUserInputCode(updatedCode);
      });

      editor.layout();
      editor.focus();

      return () => {
        editor.dispose();
      };
    }
  }, []);


    return (
        <>
            <div style={{ whiteSpace: 'pre-wrap' }}>
                <b>prompts: </b> {prompt}
            </div>
            <div ref={pseudoRef} className="pesudo-code-reader"><b>Pseudocode: </b></div>
            <div ref={editorRef} className="monaco-code-writer"><b>Editor: </b>Write your own code based on the above pseudocode below </div>
            <div style={{ marginTop:'5rem', display: 'flex', justifyContent: 'space-between'  }}>
                <button className="gpt-button" onClick={cancelClick}>Cancel</button>
                <button className="gpt-button" onClick={handleInsertCodeClick}>Insert Code</button>
            </div>
        </>
    );
};

export default PseudoGenerateCode;
