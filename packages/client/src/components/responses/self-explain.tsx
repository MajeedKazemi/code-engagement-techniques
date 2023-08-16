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
    const userPromptsRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<any>(null);
    const [userCode, setUserCode] = useState("");
    const [userResponse, setUserResponse] = useState('');
    const [userSecondResponse, setUserSecondResponse] = useState('');
    const { context } = useContext(AuthContext);
    const [generatedQuestion, setGeneratedQuestion] = useState('');
    const [selectedCode, setSelectedCode] = useState('');
    const [waiting, setWaiting] = useState(true);
    const [startLine, setStartLine] = useState(0);
    const [score, setScore] = useState(-1);
    const [secondScore, setSecondScore] = useState(-1);
    const [feedback, setFeedback] = useState('');
    const [secondFeedback, setSecondFeedback] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [secondSubmitted, setSecondSubmitted] = useState(false);
    const [endLine, setEndLine] = useState(0);
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef(null);

    useEffect(() => {
        if (userPromptsRef.current) {
          userPromptsRef.current.scrollTop = userPromptsRef.current.scrollHeight;
        }
      }, [userResponse, userSecondResponse, feedback, secondFeedback]);

    function getContentBetweenLines(startLine:number, endLine:number) {
        const lines = code.split('\n');
        const extractedLines = [];
    
        for (let i = startLine - 1; i < endLine; i++) {
            extractedLines.push(lines[i]);
        }
    
        const extractedContent = extractedLines.join('\n');
        return extractedContent;
    }

    const markResponse = (responseString: string, time: number) => {
        try {
            apiGetFeedbackByResponse(
                context?.token,
                code,
                selectedCode,
                generatedQuestion,
                responseString,
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        if(time == 1){
                            setScore(data.score);
                            setFeedback(data.feedback);
                        }else if(time == 2){
                            setSecondScore(data.score);
                            setSecondFeedback(data.feedback);
                        }
                        
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

    function handleUserSecondInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        setUserSecondResponse(event.target.value);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();
          const target = event.target as HTMLTextAreaElement;
          target.value += '\n';
          target.style.height = `${target.scrollHeight}px`;
        }
    };

    function handleClick(time: number): void {
        console.log(selectedCode);
        if(time == 1){
            setSubmitted(true);
            markResponse(userResponse, 1);
        } else if (time == 2){
            setSecondSubmitted(true);
            markResponse(userSecondResponse, 2);
        }
    }

    return (
        <div className="self-explain-container">
            <div ref={monacoEl} className="monaco-editor-container" />
            <div className="self-explain-response">
                <div id='user-prompts' ref={userPromptsRef}>
                <>
                    <div className="question-container">
                    <img src={robot} className="gpt-image" />
                    AI Assistance: <div className="assistant" dangerouslySetInnerHTML={{ __html: generatedQuestion ? highlightCode(generatedQuestion, "code-highlight") :  '...'}} />
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
                        <button className="gpt-button" onClick={() => handleClick(1)} disabled={!userResponse.trim()}>
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
                            AI Assistance: {score > -1 && `You scored ${score}`}
                            <div className="assistant" dangerouslySetInnerHTML={{ __html: feedback ? highlightCode(feedback, "code-highlight") : '...'}} />
                            </div>
                        )
                    }
                    {
                        score > 3 && (
                            <span id="passed" style={{opacity:0}}>You Passed</span>
                        )
                    }
                    {
                        score > -1 && score <=  3 && (!secondSubmitted ?
                            <div className="question-container user">
                                <p className="response-name">User Response:</p>
                                <textarea
                                className="baseline-input"
                                id="userInput"
                                value={userSecondResponse}
                                onChange={handleUserSecondInput}
                                onKeyDown={handleKeyDown}
                                placeholder="Explain the prompt question..."
                                rows={4}
                                />
                                <div>
                                <button className="gpt-button" onClick={() => handleClick(2)} disabled={!userSecondResponse.trim()}>
                                    Submit Response
                                </button>
                                </div>
                            </div> : <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        {userSecondResponse}
                        </div>
                        )
                    }
                    {
                        secondSubmitted && (
                            <div className="question-container">
                            <img src={robot} className="gpt-image" />
                            AI Assistance: {secondScore > -1 && `You scored ${secondScore}`}
                            <div className="assistant" dangerouslySetInnerHTML={{ __html: secondFeedback ? highlightCode(secondFeedback, "code-highlight") : '...'}} />
                            </div>
                        )
                    }
                    {
                        secondScore >= 0 && (
                            <div className="question-container assistant" id="passed">Click on <span className="inline-word">Continue</span> button and check for the correct answer</div>
                        )
                    }
                </>
                </div>
            </div>
        </div>
    );

};