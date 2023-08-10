import React, { useEffect, createContext, useState, useRef, useContext } from "react";
import { Editor } from "../editor";
import robot from "../../assets/robot.png";
import * as monaco from "monaco-editor";
import { initLanguageClient } from "../../api/intellisense";
import { apiGetBaselineCodex, logError } from "../../api/api";
import { AuthContext } from "../../context";

interface SelfExplainProps {
    code: string;
}

export const SelfExplain: React.FC<SelfExplainProps> = ({ code }) => {
    const editorRef = useRef<any>(null);
    const [userCode, setUserCode] = useState("");
    const [userResponse, setUserResponse] = useState('');
    const { context } = useContext(AuthContext);
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);
    console.log(code);

    useEffect(() => {
        const editor = monaco.editor.create(
            monacoEl.current!,
            {
                value: code || '',
                language: "python",
                automaticLayout: true,
                fontSize: 15,
                lineHeight: 25,
                minimap: { enabled: false },
                wordWrap: "on",
                wrappingIndent: "indent",
                lineNumbers: 'on',
            }
        );

        editor.addAction({
            id: 'show-ai-assistance',
            label: 'AI Assistance',
            contextMenuGroupId: 'navigation',
            contextMenuOrder: 1,
            run: function (editor) {
                const currentPosition = editor.getPosition();
                const model = editor.getModel();
            
                if (currentPosition && model) {
                  const codeAboveCursor = model.getValueInRange({
                    startLineNumber: 1,
                    startColumn: 1,
                    endLineNumber: currentPosition.lineNumber - 1,
                    endColumn: model.getLineMaxColumn(currentPosition.lineNumber - 1),
                  });
            
                  console.log('Code above cursor:', codeAboveCursor);
                }
            },
          });

        editor.onDidPaste((e) => {
            console.log(e);
        });

        setEditor(editor);

        return () => editor?.dispose();
    }, []);

    function handleUserInput(): void {
        throw new Error("Function not implemented.");
    }

    function handleKeyDown(): void {
        throw new Error("Function not implemented.");
    }

    function handleClick(): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="self-explain-container">
            <div ref={monacoEl} className="monaco-editor-container" />
            <div className="self-explain-response">
            <div id='user-prompts'>
                <>
                    <h3>
                    <img src={robot} className="gpt-image" />
                    AI Assistance: <i>Describe the behavior of the code to be generated.</i>
                    </h3>
                    <div className="baseline-input-container">
                            <textarea
                            className="baseline-input"
                            id="userInput"
                            value={userResponse}
                            onChange={handleUserInput}
                            onKeyDown={handleKeyDown}
                            placeholder="Describe the intended behavior..."
                            rows={4}
                            />
                    </div>
                    <div>
                    <button className="gpt-button" onClick={handleClick} disabled={!userResponse.trim()}>
                        Generate Code
                    </button>
                    </div>
                </>
                </div>
            </div>
        </div>
    );
};