import React, { useEffect, createContext, useState, useRef, useContext, createRef } from "react";
import { Editor } from "../editor";
import robot from "../../assets/robot.png";
import * as monaco from "monaco-editor";
import { initLanguageClient } from "../../api/intellisense";
import { apiGetFeedbackByResponse, apiGetGenerateQuestionByCode, logError } from "../../api/api";
import { AuthContext } from "../../context";
import { highlightCode } from "../../utils/utils";
import { RxDoubleArrowLeft, RxDoubleArrowRight } from "react-icons/rx";
import { ChatLoader } from "../loader";

interface SelfExplainProps {
    code: string;
}

interface FeedbackProps {
    score: number;
    feedback: string;
}

interface QuestionInterface {
    line: number;
    question: string;
}

export const SelfExplain: React.FC<SelfExplainProps> = ({ code }) => {
    const userPromptsRef = useRef<(HTMLDivElement | null)[]>([]);
    const editorRef = useRef<any>(null);
    const [userCode, setUserCode] = useState("");
    const [questionsObject, setQuestionsObject] = useState<QuestionInterface[]>([]);
    const [userResponse, setUserResponse] = useState<string[]>([]);
    const [userSecondResponse, setUserSecondResponse] = useState<string[]>([]);
    const { context } = useContext(AuthContext);
    const [generatedQuestion, setGeneratedQuestion] = useState<string[]>([]);
    const [selectedCode, setSelectedCode] = useState<string[]>([]);
    const [waiting, setWaiting] = useState(true);
    const [startLine, setStartLine] = useState<number[]>([]);
    const [score, setScore] = useState<number[]>([]);
    const [secondScore, setSecondScore] = useState<number[]>([]);
    const [feedback, setFeedback] = useState<string[]>([]);
    const [secondFeedback, setSecondFeedback] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState<boolean[]>([]);
    const [secondSubmitted, setSecondSubmitted] = useState<boolean[]>([]);
    const [endLine, setEndLine] = useState<number[]>([]);
    const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const monacoEl = useRef(null);

    useEffect(() => {
        if (userPromptsRef.current[currentQuestion]) {
          userPromptsRef.current[currentQuestion]!.scrollTop = userPromptsRef.current[currentQuestion]!.scrollHeight;
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
                selectedCode[currentQuestion],
                generatedQuestion[currentQuestion],
                responseString,
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        if(time == 1){
                            const scoreCopy = [...score];
                            scoreCopy[currentQuestion] = data.score;
                            setScore(scoreCopy);
                            const feedbackCopy = [...feedback];
                            feedbackCopy[currentQuestion] = data.feedback;
                            setFeedback(feedbackCopy);
                        }else if(time == 2){
                            const scoreCopy = [...secondScore];
                            scoreCopy[currentQuestion] = data.score;
                            setSecondScore(scoreCopy);
                            const feedbackCopy = [...secondFeedback];
                            feedbackCopy[currentQuestion] = data.feedback;
                            setSecondFeedback(feedbackCopy);
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
        console.log(code);
        try {
            apiGetGenerateQuestionByCode(
                context?.token,
                code,
                userCode ? userCode : ""
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();
                        
                        setQuestionsObject(data.result);

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
        // Map through the questionsObject to create new arrays
        const updatedSelectedCode = questionsObject.map(questionProp => getContentBetweenLines(questionProp.line, questionProp.line));
        const updatedStartLine = questionsObject.map(questionProp => questionProp.line);
        const updatedEndLine = updatedStartLine; //its the same for now since we generate one selected line only
        const updatedGeneratedQuestion = questionsObject.map(questionProp => questionProp.question);
    
        // Set each state with the respective array
        setSelectedCode(updatedSelectedCode);
        setStartLine(updatedStartLine);
        setEndLine(updatedEndLine);
        setGeneratedQuestion(updatedGeneratedQuestion);
        const initialUserResponse = Array(updatedGeneratedQuestion.length).fill("");
        setUserResponse(initialUserResponse);
        setUserSecondResponse(initialUserResponse);
        const initialScore = Array(updatedGeneratedQuestion.length).fill(-1);
        setScore(initialScore);
        setSecondScore(initialScore);

        userPromptsRef.current = generatedQuestion.map((_, i) => userPromptsRef.current[i] || null);
        // console.log(updatedSelectedCode, updatedStartLine, updatedEndLine, updatedGeneratedQuestion);
    }, [questionsObject]);

    useEffect(() => {
        if(generatedQuestion.length <= 0){
            generateCode();
        }
    }, []);

    useEffect(() => {
        
    }, [currentQuestion]);

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
        console.log(code);
        console.log(startLine, endLine);
        if (startLine[currentQuestion] && endLine[currentQuestion]) {
            editor.deltaDecorations([], [
                {
                    range: new monaco.Range(startLine[currentQuestion], 1, endLine[currentQuestion], 1),
                    options: { isWholeLine: true, className: 'questionLineDecoration' }
                }
            ]);
            editor.revealLineInCenterIfOutsideViewport(startLine[currentQuestion], monaco.editor.ScrollType.Smooth);
        }

    

        editor.onDidPaste((e) => {
            console.log(e);
        });

        setEditor(editor);

        return () => editor?.dispose();
    }, [generatedQuestion,startLine, endLine, currentQuestion]);


    function handleUserInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newUserResponse = [...userResponse];
        newUserResponse[currentQuestion] = event.target.value;
        setUserResponse(newUserResponse);
    }

    function handleUserSecondInput(event: React.ChangeEvent<HTMLTextAreaElement>): void {
        const newUserSecondResponse = [...userSecondResponse];
        newUserSecondResponse[currentQuestion] = event.target.value;
        setUserSecondResponse(newUserSecondResponse);
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
        if(time == 1){
            const newSubmitted = [...submitted];
            newSubmitted[currentQuestion] = true;
            setSubmitted(newSubmitted);
            markResponse(userResponse[currentQuestion], 1);
        } else if (time == 2){
            const newSecondSubmitted = [...secondSubmitted];
            newSecondSubmitted[currentQuestion] = true;
            setSecondSubmitted(newSecondSubmitted);
            markResponse(userSecondResponse[currentQuestion], 2);
        }
    }

    function nextQuestion(): void {
        setCurrentQuestion(currentQuestion + 1);
    }

    const next = () => {
        if (currentQuestion >= generatedQuestion.length - 1) return;
        setCurrentQuestion(currentQuestion + 1);
    }
    
    const previous = () => {
        if (currentQuestion <= 0) return;
        setCurrentQuestion(currentQuestion - 1);
    }

    return (
        <div className="self-explain-container">
            <div ref={monacoEl} className="monaco-editor-container" />
            <div className="self-explain-response">
            <div className="buttons-control">
                <button disabled={currentQuestion==0}  onClick={previous}><RxDoubleArrowLeft/></button>
                {generatedQuestion.map((_, index) => (
                <button 
                    className={`${index === currentQuestion ? 'active' : ''}`}
                    key={index} 
                    disabled={index === currentQuestion} 
                    onClick={() => setCurrentQuestion(index)}
                >
                    {index + 1}
                </button>
                ))}
                <button disabled={currentQuestion==generatedQuestion.length-1} onClick={next}><RxDoubleArrowRight/></button>
            </div>
            {
                generatedQuestion && !generatedQuestion[0] && (
                    <div className="user-prompts">
                        <div className="question-container">
                        <img src={robot} className="gpt-image" />
                        AI Assistance: 
                        <div className="assistant chatLoader"><ChatLoader/></div>
                        </div>
                    </div>
                )
            }
            {
            generatedQuestion.map((question, i) => (
                <>
                <div style={{ display: i === currentQuestion ? 'block' : 'none' }}
                className='user-prompts' ref={ref => userPromptsRef.current[i]=ref}>
                <>
                    <div className="question-container">
                    <img src={robot} className="gpt-image" />
                    AI Assistance: 
                    {generatedQuestion[i] ? <div className="assistant" dangerouslySetInnerHTML={{ __html: highlightCode(generatedQuestion[i], "code-highlight")}} /> 
                    : <div className="assistant chatLoader"><ChatLoader/></div>
                    }
                    </div>
                    {generatedQuestion[i] && (!submitted[i] ? <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        <textarea
                        className="baseline-input"
                        id="userInput"
                        value={userResponse[i]}
                        onChange={handleUserInput}
                        onKeyDown={handleKeyDown}
                        placeholder="Explain the prompt question..."
                        rows={4}
                        />
                        <div>
                        <button className="gpt-button" onClick={() => handleClick(1)} disabled={!userResponse[i].trim()}>
                            Submit Response
                        </button>
                        </div>
                    </div> : <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        {userResponse[i]}
                        </div>)
                    }
                    {
                        submitted[i] && (
                            <div className="question-container">
                            <img src={robot} className="gpt-image" />
                            AI Assistance: {score[i] > -1 && `You scored ${score[i]}`}
                            {feedback[i] ?  <div className="assistant no-copy" dangerouslySetInnerHTML={{ __html: highlightCode(feedback[i], "code-highlight")}} />
                            : <div className="assistant no-copy chatLoader"><ChatLoader/></div>}
                            </div>
                        )
                    }
                    {
                        i >= generatedQuestion.length-1 && score[i] > 3 && (
                            <span id="passed" style={{opacity:0}}>You Passed</span>
                        )
                    }
                    {
                        score[i] > -1 && score[i] <=  3 && (!secondSubmitted[i] ?
                            <div className="question-container user">
                                <p className="response-name">User Response:</p>
                                <textarea
                                className="baseline-input"
                                id="userInput"
                                value={userSecondResponse[i]}
                                onChange={handleUserSecondInput}
                                onKeyDown={handleKeyDown}
                                placeholder="Explain the prompt question..."
                                rows={4}
                                />
                                <div>
                                <button className="gpt-button" onClick={() => handleClick(2)} disabled={!userSecondResponse[i].trim()}>
                                    Submit Response
                                </button>
                                </div>
                            </div> : <div className="question-container user">
                        <p className="response-name">User Response:</p>
                        {userSecondResponse[i]}
                        </div>
                        )
                    }
                    {
                        secondSubmitted[i] && (
                            <div className="question-container">
                            <img src={robot} className="gpt-image" />
                            AI Assistance: {secondScore[i] > -1 && `You scored ${secondScore[i]}`}
                            {secondFeedback[i] ? <div className="assistant no-copy" dangerouslySetInnerHTML={{ __html: highlightCode(secondFeedback[i], "code-highlight")}} /> 
                            : <div className="assistant no-copy chatLoader"><ChatLoader/></div>}
                            
                            </div>
                        )
                    }
                    {
                        secondScore[i] >= 0 && (
                            i < generatedQuestion.length-1 ? (<div className="question-container assistant">Click on <span className="inline-word">Continue</span> button and proceed to the next question</div>
                            ):
                            (<div className="question-container assistant" id="passed">Click on <span className="inline-word">Done</span> button and see the full explaination of the code</div>)
                        )
                    }
                    {
                        (secondScore[i] >= 0 || score[i] > 3) && i < generatedQuestion.length-1 && (<button className="gpt-button next-button" onClick={nextQuestion}>
                        Continue
                      </button>)
                    }
                </>
                </div>
                </>
            ))
            }
            </div>
        </div>
    );

};