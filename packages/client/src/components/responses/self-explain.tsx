import React, { useEffect, createContext, useState, useRef, useContext } from "react";
import { Editor } from "../editor";
import robot from "../../assets/robot.png";
import * as monaco from "monaco-editor";
import { initLanguageClient } from "../../api/intellisense";
import { apiGetFeedbackByResponse, apiGetGenerateQuestionByCode, logError } from "../../api/api";
import { AuthContext } from "../../context";
import { highlightCode } from "../../utils/utils";

interface SelfExplainProps {
    code: string;
}

interface FeedbackProps {
    score: number;
    feedback: string;
}

export const SelfExplain: React.FC<SelfExplainProps> = ({ code }) => {
    const editorRef = useRef<any>(null);
    const [userCode, setUserCode] = useState("");
    const [userResponse, setUserResponse] = useState('');
    const { context } = useContext(AuthContext);
    const [generatedQuestion, setGeneratedQuestion] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [waiting, setWaiting] = useState(true);
    const [startLine, setStartLine] = useState(0);
    const [score, setScore] = useState(-1);
    const [feedback, setFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [endLine, setEndLine] = useState(0);
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

    function getContentBetweenLines(startLine:number, endLine:number) {
        const lines = code.split('\n');
        const extractedLines = [];
    
        for (let i = startLine - 1; i < endLine; i++) {
            extractedLines.push(lines[i]);
        }
    
        const extractedContent = extractedLines.join('\n');
        return extractedContent;
    }

    const markResponse = () => {
        try {
            apiGetFeedbackByResponse(
                context?.token,
                code,
                selectedCode,
                generatedQuestion,
                userResponse,
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        setScore(data.score);
                        setFeedback(data.feedback);
                        } 
                })
                .catch((error) => { 
                    logError(error.toString());
                });
            } catch (error: any) {
                logError(error.toString());
            }
    };

    const generateCode = () => {
        try {
            apiGetGenerateQuestionByCode(
                context?.token,
                code,
                userCode ? userCode : ""
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        
                        //highlight the code question
                        const question = data.question;
                        const start = data.start;
                        const end = data.end;

                        setSelectedCode(getContentBetweenLines(start, end));

                        //set the question
                        setStartLine(start);
                        setEndLine(end);
                        setGeneratedQuestion(question);

                        setWaiting(false);
                        } 
                })
                .catch((error) => {
                    setWaiting(false);
                    logError(error.toString());
                });
            } catch (error: any) {
                setWaiting(false);
                logError(error.toString());
            }
    };

    useEffect(() => {
        if(!generatedQuestion){
            generateCode();
        }
    }, []);

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
        console.log(startLine, endLine);
        if (startLine && endLine) {
            editor.deltaDecorations([], [
                {
                    range: new monaco.Range(startLine, 1, endLine, 1),
                    options: { isWholeLine: true, className: 'questionLineDecoration' }
                }
            ]);
        }
    

        editor.onDidPaste((e) => {
            console.log(e);
        });

        setEditor(editor);

        return () => editor?.dispose();
    }, [generatedQuestion,startLine, endLine]);


    function handleUserInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setUserResponse(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const target = event.target as HTMLTextAreaElement;
          target.value += '\n';
          target.style.height = `${target.scrollHeight}px`;
        }
    };

    function handleClick(): void {
        console.log(selectedCode);
        setSubmitted(true);
        markResponse();
    }

    return (
        <div className="self-explain-container">
            <div ref={monacoEl} className="monaco-editor-container" />
            <div className="self-explain-response">
                <div id='user-prompts'>
                <>
                    <div className="question-container">
                    <img src={robot} className="gpt-image" />
                    AI Assistance: <div className="assistant" dangerouslySetInnerHTML={{ __html: generatedQuestion ? highlightCode(generatedQuestion, "code-highlight") : "Loading..."}} />
                    </div>
                    {generatedQuestion && (!submitted ? <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        <textarea
                        className="baseline-input"
                        id="userInput"
                        value={userResponse}
                        onChange={handleUserInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Explain the prompt question..."
                        rows={4}
                        />
                        <div>
                        <button className="gpt-button" onClick={handleClick} disabled={!userResponse.trim()}>
                            Submit Response
                        </button>
                        </div>
                    </div> : <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        {userResponse}
                        </div>)
                    }
                    {
                        submitted && (
                            <div className="question-container">
                            <img src={robot} className="gpt-image" />
                            AI Assistance: {score > 0 && `You scored ${score}`}
                            <div className="assistant" dangerouslySetInnerHTML={{ __html: feedback ? highlightCode(feedback, "code-highlight") : "Loading..."}} />
                            </div>
                        )
                    }
                    {
                        score > 0 && score <=  3 && (
                            <div className="question-container user">
                                <p className="response-name">User Response:</p>
                                <textarea
                                className="baseline-input"
                                id="userInput"
                                value={userResponse}
                                onChange={handleUserInput}
                                onKeyDown={handleKeyDown}
                                placeholder="Explain the prompt question..."
                                rows={4}
                                />
                                <div>
                                <button className="gpt-button" onClick={handleClick} disabled={!userResponse.trim()}>
                                    Submit Response
                                </button>
                                </div>
                            </div>
                        )
                    }
                </>
                </div>
            </div>
        </div>
    );
};