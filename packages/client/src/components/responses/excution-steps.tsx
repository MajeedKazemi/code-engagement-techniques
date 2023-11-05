import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AuthContext, SocketContext } from '../../context';
import ExcutionTimeline from '../excution-timeline';
import { apiGenerateTracingQuestion, logError } from '../../api/api';



interface ExcutionStepsProps {
    code: string;
    contextCode: any;
    format: string[];
    backendCodes: string[];
}

interface ExcutionSteps {
    step: number;
    currLine: number;
    nextLine: number | null;
    printOutput: String[];
    frame: f[];
}

interface f{
    name: String;
    type: String;
    value: any;
}

interface o{
    name: String;
    type: String;
    value: any;
}

interface  questionObject{
    step: number,
    variable: string,
}

export const ExcutionSteps: React.FC<ExcutionStepsProps> = ({ code, contextCode, format, backendCodes }) => {
    const { context } = useContext(AuthContext);
    const { socket } = useContext(SocketContext);
    const [excutionSteps, setExcutionSteps] = useState<ExcutionSteps[]>([]);
    const [currStep, setCurrStep] = useState<ExcutionSteps | null>(null);
    const [traceOutput, setTraceOutput] = useState<string[][]>([]); 
    const [trackOutput, setTrackOutput] = useState<string[]>([]);
    const [storedInput, setStoredInput] = useState<string[]>([]);
    const [pesudoCode, setPesudoCode] = useState<string[][]>([]);
    const [backendCode, setBackendCode] = useState<string>("");
    const [traceId, setTraceId] = useState(0);
    const [tracing, setTracing] = useState(false);
    const [finishedTracing, setFinishedTracing] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [currentQuestion, setCurrentQuestion] = useState<questionObject | null>();
    const [questions, setQuestions] = useState<questionObject[]>([]);
    const [questionStop, setQuestionStop] = useState<number>(0);
    const [currCount, setCurrCount] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string>("");
    const [needHint, setNeedHint] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);

    const extractLineNum = (line: string): number => {
        const match = line.match(/main.py\((\d+)\)/);
        return match ? Number(match[1])-2 : 0;
    };

    useEffect(() => {
        if(tracing){
            // console.log("traceOutput", traceOutput);
            const traceOutputLength = traceOutput.reduce((acc, curr) => acc + curr.length, 0);
            // console.log("The tracing contains "+traceOutputLength+" steps");
            // find the total number of lines in traceOutput
            if(traceOutputLength >= 1){
                // console.log("traceOutput", traceOutput);
                let flattenedTraceOutput = traceOutput.flat();
                // console.log("flattenedTraceOutput", flattenedTraceOutput);

                let objectArray: ExcutionSteps[] = flattenedTraceOutput.map((line, index) => {
                    let currLineNum = extractLineNum(line);
                    let nextLineNum = index < flattenedTraceOutput.length - 1 ? extractLineNum(flattenedTraceOutput[index + 1]) : null;
                    return {
                        step: index + 1,
                        currLine: currLineNum ? currLineNum : 0,
                        nextLine: nextLineNum,
                        printOutput: [], 
                        frame: [] 
                    };
                });
                setExcutionSteps(objectArray);
            }
            
        } 
    }, [traceOutput]);


    const generateQuestion = () => {
        try {
            apiGenerateTracingQuestion(
                context?.token,
                backendCode,
                excutionSteps ? JSON.stringify(excutionSteps) : ""
            ).then(async (response) => {
                                      
                if (response.ok) {
                    const data = await response.json();
                    setQuestions(data.response);
                }
            })
        } catch (error: any) {
            logError(error.toString());
        }

    };

    useEffect(() => {
        if(questions.length > 0){
            setCurrentQuestion(questions[0]);
            setQuestionStop(questions[0].step-1);
            console.log("questions", questions);
        }
    }, [questions]);


    useEffect(() => {
        if (excutionSteps.length > 0) {
            setCurrStep(excutionSteps[0]);

        } 
        
        console.log("excution Steps", excutionSteps);   
    }, [excutionSteps]);

    useEffect(() => {
        if(tracing){
            socket?.on("python", (data: any) => {
                if (data.type === "stdout") {
                    if (data.out.split("\n").length > 0) {
                        //for each line in terminalInput, check if the line starts with 'main.py('
                        //if it does, dont set output
                        //console log the line
                        const currOutput = data.out.split("\n");
                        var tempTrace: string[] = [];
                        currOutput.forEach((line: string) => {
                            // console.log("line", line);
                            if (line.startsWith("main.py(")) {
                                tempTrace.push(line);
                            }
                            else if(line.includes('<frozen codecs>') && line.includes("main.py(")){
                                const index = line.indexOf('main.py');
                                tempTrace.push(line.substring(index));
                            } else {
                                setOutput([
                                    ...output,
                                    {
                                        type: "output",
                                        line: line,
                                    },
                                ]);
                            }
                        });
                        var temp: string[][] = [...traceOutput]; 
                        temp[currentLine] = tempTrace; 
                        setCurrentLine(currentLine + 1);
                        setTraceOutput(temp); 
                        
                    }
                }
                if (data.type === "stderr") {
                    setOutput([
                        ...output,
                        {
                            type: "error",
                            line: data.err,
                        },
                    ]);
                }
                if (data.type === "close") {
                    setTraceId(traceId + 1);
                    setTracing(false);
                    setFinishedTracing(true);
                }
            });
        }
        
    }, [tracing, currentLine, output]);

    useEffect(() => {
        if(tracking){
            socket?.on("python", (data: any) => {
                if (data.type === "stdout") {
                    // console.log("data.out", data.out);
                    if (data.out.split("\n").length > 0) {
                        //for each line in terminalInput, check if the line starts with {}
                        //the number of lines should be match with traceOutput
                        const currOutput = data.out.split("\n");
                        var tempTrack: string[] = [];
                        currOutput.forEach((line: string) => {
                            if (line.startsWith("{") && !line.includes('self')) {
                                tempTrack.push(line);
                            }
                        });
                        // setTrackOutput((prevTrackOutput) => [...prevTrackOutput.slice(0, -1), ...tempTrack]);
                        setTrackOutput((prevTrackOutput) => [...prevTrackOutput, ...tempTrack]);
                    } 
                }
                
                if (data.type === "close") {
                    setTracking(false);
                }
            });
        }
    }, [tracking]);

    const generateTrace = () => {
        if (!tracing) {
            socket?.emit("python", {
                type: "trace",
                code: backendCode,
                from: socket.id,
                userId: context?.user?.id,
            });

            setTracing(true);

        } else {
            socket?.emit("python", {
                type: "stop",
                from: socket.id,
                userId: context?.user?.id,
            });

            setTracing(false);
        }
    };

    const generateTrack = () => {
        if (!tracking) {
            socket?.emit("python", {
                type: "track",
                input: `inputs = [${storedInput.map(item => `"${item}\\n"`)}]`,
                code: backendCode,
                from: socket.id,
                userId: context?.user?.id,
            });

            setTracking(true);

        } else {
            socket?.emit("python", {
                type: "stop",
                from: socket.id,
                userId: context?.user?.id,
            });

            setTracking(false);
        }
    };


    useEffect(() => {
        if (excutionSteps.length > 0 && currentStep < excutionSteps.length) {
          setCurrStep(excutionSteps[currentStep]);
        }
    }, [currentStep]);

    useEffect(() => {
        // change the pesudo Context code object to a list of lines
        for(var i = 0; i < contextCode.length; i++){
            var temp: string[] = [];
            temp = contextCode[i].map((obj: { pseudo: string; }) => obj.pseudo);
            setPesudoCode([...pesudoCode, temp]);
        }
            
        //set backend code
        let input:ExcutionStepsProps = {
            code: code, 
            contextCode: contextCode,
            format: format,
            backendCodes: backendCodes
        };
        let tempCodes = combineCodes(input).join("\n");
        // let cleanedCode = tempCodes.split('\n').filter(line => line.trim() !== '').join('\n');

        setBackendCode(tempCodes);
    }, []);

    function combineCodes({ code, contextCode, format, backendCodes }: ExcutionStepsProps): string[] {
        return format.map((fmt, i) => {
            if (fmt === 'new') {
                return code;
            } else {
                return backendCodes[i < format.indexOf('new') ? i : i - 1];
            }
        });
    }

    useEffect(() => {
        if(backendCode.length > 0){
            // console.log("backendCode", backendCode);
            generateTrace();
        }
    }, [backendCode]);

    useEffect(() => {
        if (storedInput.length == 0 && finishedTracing){
            generateTrack();
        }
        if (storedInput.length > 0 && !tracing){
            // console.log("storedInput", storedInput);
            generateTrack();
        }
    }, [storedInput, tracing, finishedTracing]);



    useEffect(() => {
        let fElements: f[][] = trackOutput.map(item => {
            // console.log("item", item);
            let parsedItem = JSON.parse(item.replace(/'/g, '"').replace(/\(/g, '[').replace(/\)/g, ']'));
            return Object.keys(parsedItem).map(key => {
                let value = parsedItem[key];
                let valueType = "str";  // Default to str
            
                if (typeof value === 'number') {
                    // value is a number
                    valueType = "int";
                } else if (typeof value === 'boolean') {
                    // value is a boolean
                    valueType = "bool";
                } else if (typeof value === 'string') {
                    // Check first character to identify string type
                    if (value.startsWith("{")) {
                        valueType = "dict";
                    } else if (value.startsWith("[")) {
                        valueType = "list";
                    } else if (value.startsWith("(")) {
                        valueType = "tuple";
                    }
                }
            
                return {
                    name: key,
                    type: valueType,
                    value: value
                };
            });
        });

        let objectArray = excutionSteps;

        let minLength = Math.min(fElements.length, objectArray.length);

        for(let i = 0; i < minLength; i++) {
            objectArray[i].frame = fElements[i];
        }

        if(objectArray.length > fElements.length) {
            let lastElement = fElements[fElements.length - 1];
        
            for(let i = fElements.length; i < objectArray.length; i++) {
                objectArray[i].frame = lastElement;
            }
        }

        if(backendCode.length > 0){
            // check if the current excutionstep requires input
            let lineObjects = backendCode.split('\n');
            if(!lineObjects[objectArray[objectArray.length-1].currLine-1].includes('input(') && 
            objectArray.some(step => step.frame.length !== 0)){
                // we know the tracing is done, generate questions
                generateQuestion();
            }
        }

        //also assign print outputs
        //find the print statement lines
        //iterate through the objectArray
        // objectArray.forEach((step) => {
        //     // Check if the current line is a print statement
        //     let currCode = backendCode.split('\n')[step.currLine - 1];
        //     if (currCode.includes('print(')) {
        //         console.log(step.currLine, currCode);
        //     }
        // });
        setExcutionSteps(objectArray);
    }, [trackOutput]);

    

    const getCurrQuestionSolution = () => {
        if(currentQuestion && currentStep){
            let currStep = currentQuestion.step;
            let currFrame = excutionSteps[currStep].frame;
            let currVariable = currentQuestion.variable;
            let currValue = currFrame.find(item => item.name === currVariable)?.value;
            if(typeof currValue != 'number'){
                return JSON.stringify(currValue);
            }else{
                return currValue;
            }
        }
    }

    const updateQuestion = (currentQuestion:questionObject) => {
        const newQuestions = questions.filter((item, index) => index !== questions.indexOf(currentQuestion));
        setQuestions(newQuestions);
    
        if (newQuestions.length > 0) {
            setCurrentQuestion(newQuestions[0]);
            setQuestionStop(newQuestions[0].step-1);
            setCurrCount(0);
            setNeedHint(false);
        }
        else {
            setCurrentQuestion(null);
            setQuestionStop(excutionSteps.length);
            setCurrCount(0);
            setNeedHint(false);
        }
    }

    useEffect(() => {
        if(needHint){
            //get hint from codex
        }
    }, [needHint]);

    useEffect(() => {
    }, [currStep]);

    return (
          <div className='excution-generator'>
          <div className='code-container'>
            <div className='code-editor' id='code-editor'>     
            { format.length > 0 && pesudoCode.length == format.length-1 && (() =>{
                let lineNumber = 1;  // Initialize line number
                return format.map((snippet, index) => {
                    var newIndex = format.indexOf('new');
                    if(snippet === 'new'){
                        return code.split('\n').map((line) => {
                            let result = (
                                <div className='line'>
                                <span className='arrow' style={{padding:
                                    (currStep?.currLine !== lineNumber && currStep?.nextLine !== lineNumber)
                                    ? '1rem' : '0'
                                }}>
                                    {currStep?.currLine === lineNumber && <FaLongArrowAltRight className='green-arrow' />}
                                    {currStep?.nextLine === lineNumber && <FaLongArrowAltRight className='red-arrow'/>}
                                </span>
                                <span className='line-number'>{lineNumber++}</span>
                                <span className='line-content'>{line}</span>
                                </div>
                            );
                            return result;
                        });
                    } else {
                        return pesudoCode[index <= newIndex ? index : index-1].map((line) => {
                            let result = (
                                <div className='line'>
                                <span className='arrow' style={{padding:
                                    (currStep?.currLine !== lineNumber && currStep?.nextLine !== lineNumber)
                                    ? '1rem' : '0'
                                }}>
                                    {currStep?.currLine === lineNumber && <FaLongArrowAltRight className='green-arrow' />}
                                    {currStep?.nextLine === lineNumber && <FaLongArrowAltRight className='red-arrow'/>}
                                </span>
                                <span className='line-number'>{lineNumber++}</span>
                                <span className='line-content'>{line.replace(/{indentation}/g, '    ')}</span>
                                </div>
                            );
                            return result;
                        });
                    }
                })
            })()}
                     
            </div>
            <ExcutionTimeline totalSteps={excutionSteps.length} setCurrentStep={setCurrentStep} currentStep={currentStep} stop={questionStop}/>
          </div>
            <div className='legend'>
                <div className='legend-item'>
                    <FaLongArrowAltRight className='green-arrow' />
                    <div className='legend-text'>Line that just executed</div>
                </div>
                <div className='legend-item'>
                    <FaLongArrowAltRight className='red-arrow'/>
                    <div className='legend-text'>Next line to execute</div>
                </div>
            </div>
            <div className = "excution-container">
                <div className='print-container'>
                    <h4>Print Output</h4>
                    <div className="print-output">
                    {output.map((i, index) => (
                        <p
                            className={
                                i.type === "error" ? `console-output-error` : ""
                            }
                            key={"trackLine-" + index}
                        >
                            {i.line}
                        </p>
                    ))}
                    {tracing && (
                        <input
                            autoFocus
                            key={"trackInput-" + output.length.toString()}
                            className="terminal-input"
                            ref={inputRef}
                            onKeyUp={(e) => {
                                if (e.key === "Enter") {
                                    socket?.emit("python", {
                                        type: "stdin",
                                        value: terminalInput,
                                        from: socket.id,
                                        userId: context?.user?.id,
                                    });

                                    //store the input in a local variable so I can reuse for tracking
                                    setStoredInput([...storedInput, terminalInput]);
                                   
                                    setOutput([
                                        ...output,
                                        {
                                            type: "input",
                                            line: terminalInput,
                                        },
                                    ]);
                                    
                                    setTerminalInput("");
                                }
                            }}
                            onChange={(event) => {
                                setTerminalInput(event.target.value);
                            }}
                        />
                    )}
                    </div>
                </div>

                <div className="content-wrapper">
                    <h4>Frame</h4>
                    <div className="frame">
                    {/* Your frame content goes here */}
                    {currStep?.frame.map((item, index) => (
                        <>  
                            {/* {currentQuestion && <p>{currentQuestion.step}, {currStep.step}, {currCount}, {currentQuestion.variable}, {item.name}</p>} */}
                            {currCount < 2 && currentQuestion && currStep && currentQuestion.step === currStep.step ? 
                                currentQuestion.variable == item.name ?
                                
                                <>
                                    <p className="question">What is the value of <b>{currentQuestion.variable}</b> after <b>Step {currentQuestion.step+1} </b>is excuted?</p>
                                    {needHint && <p className="hint">Hint: {getCurrQuestionSolution()}</p>}
                                    <div className={`frame-container ${item.type}`}>
                                        <p>{item.name}:&nbsp;&nbsp;&nbsp;</p>
                                        <input 
                                            className="question-input" 
                                            value={inputValue}
                                            onChange={e => setInputValue(e.target.value)} 
                                        />
                                    </div>
                                    <button 
                                        onClick={() => {
                                            let solution = getCurrQuestionSolution();
                                            if ((solution && typeof(solution) == 'string' && inputValue.replace(/\s+/g, '') === solution.replace(/\s+/g, '')) || Number(inputValue) === getCurrQuestionSolution()) {
                                                updateQuestion(currentQuestion);
                                            } else{
                                                //if currcount = 0, then show hint
                                                if(currCount === 0){
                                                    setNeedHint(true);
                                                    setCurrCount(1);
                                                }
                                                else if(currCount === 1){
                                                    updateQuestion(currentQuestion);
                                                    setCurrCount(0);
                                                }

                                            }
                                        }}
                                    >
                                        Check answer
                                    </button>
                                </>

                                :

                                <div className={`frame-container ${item.type}`}>
                                    <p>{item.name}:&nbsp;&nbsp;&nbsp;</p>
                                    <p>{JSON.stringify(item.value)}</p>
                                </div>
                                
                            : 
                                <div className={`frame-container ${item.type}`}>
                                    <p>{item.name}:&nbsp;&nbsp;&nbsp;</p>
                                    <p>{JSON.stringify(item.value)}</p>
                                </div>
                            }
                        </>
                    ))}
                    </div>

                </div>
            </div>
          </div>
      );
}; 