import React, { useState, useEffect, useRef, useContext } from 'react';
import * as monaco from 'monaco-editor';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { AuthContext, SocketContext } from '../../context';
import { log } from '../../utils/logger';
import ExcutionTimeline from '../excution-timeline';



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
    const [tracking, setTracking] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);

    const extractLineNum = (line: string): number | null => {
        const match = line.match(/main.py\((\d+)\)/);
        return match ? Number(match[1])-11 : null;
    };

    useEffect(() => {
        if(tracing){
            // console.log("traceOutput", traceOutput);
            const traceOutputLength = traceOutput.reduce((acc, curr) => acc + curr.length, 0);
            // console.log("The tracing contains "+traceOutputLength+" steps");
            // find the total number of lines in traceOutput
            if(traceOutputLength >= 1){
                let flattenedTraceOutput = traceOutput.flat();

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
                console.log("objectArray", objectArray);
                setExcutionSteps(objectArray);
            }
            
        } 
    }, [traceOutput]);

    useEffect(() => {
        if (excutionSteps.length > 0) {
            setCurrStep(excutionSteps[0]);
        } 
            //hard code one
            // setExcutionSteps([
            //     {
            //         step: 1,
            //         currLine: 1,
            //         nextLine: 2,
            //         printOutput: [],
            //         frame: [
            //           { name: 'n', type: 'int', value: 5 }
            //         ],
            //     },
            //     {
            //         step: 2,
            //         currLine: 2,
            //         nextLine: 3,
            //         printOutput: [],
            //         frame: [
            //           { name: 'n', type: 'int', value: 5 },
            //           { name: 'fibonacci_sequence', type: 'list', value: [0, 1] }
            //         ],
            //     },
            //     {
            //         step: 3,
            //         currLine: 3,
            //         nextLine: 4,
            //         printOutput: [],
            //         frame: [
            //           { name: 'n', type: 'int', value: 5 },
            //           { name: 'fibonacci_sequence', type: 'list', value: [0, 1] }
            //         ],
            //     },
            //     {
            //         step: 4,
            //         currLine: 4,
            //         nextLine: 5,
            //         printOutput: [],
            //         frame: [
            //           { name: 'n', type: 'int', value: 5 },
            //           { name: 'fibonacci_sequence', type: 'list', value: [0, 1, 1] }
            //         ],
            //     },
            //     {
            //         step: 5,
            //         currLine: 5,
            //         nextLine: 3,
            //         printOutput: [],
            //         frame: [
            //           { name: 'n', type: 'int', value: 5 },
            //           { name: 'fibonacci_sequence', type: 'list', value: [0, 1, 1] }
            //         ],
            //     }
            // ])
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
                            if (line.startsWith("main.py(")) {
                                tempTrace.push(line);
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
                }
            });
        }
        
    }, [tracing, currentLine, output]);

    useEffect(() => {
        if(tracking){
            socket?.on("python", (data: any) => {
                if (data.type === "stdout") {
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
                        setTrackOutput((prevTrackOutput) => [...prevTrackOutput.slice(0, -1), ...tempTrack]);
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
        let cleanedCode = tempCodes.split('\n').filter(line => line.trim() !== '').join('\n');

        setBackendCode(cleanedCode);
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
        if (storedInput.length > 0 && !tracing){
            // console.log("storedInput", storedInput);
            generateTrack();
        }
    }, [storedInput, tracing]);


    useEffect(() => {
        let fElements: f[][] = trackOutput.map(item => {
            let parsedItem = JSON.parse(item.replace(/'/g, '"'));
            return Object.keys(parsedItem).map(key => ({
                name: key,
                type: typeof parsedItem[key],
                value: parsedItem[key]
            }));
        });
        console.log("trackOutput", fElements);
    }, [trackOutput]);

    // [1][1][2][n=5][None][None]
    // [2][2][3][n=5, fibonacci_sequence=[0, 1]][None][None]
    // [3][3][4][n=5, fibonacci_sequence=[0, 1]][None][None]
    // [4][4][3][n=5, fibonacci_sequence=[0, 1, 1]][None][None]
    // [5][3][4][n=5, fibonacci_sequence=[0, 1, 1]][None][None]
    // [6][4][3][n=5, fibonacci_sequence=[0, 1, 1, 2]][None][None]
    // [7][3][4][n=5, fibonacci_sequence=[0, 1, 1, 2]][None][None]
    // [8][4][3][n=5, fibonacci_sequence=[0, 1, 1, 2, 3]][None][None]
    // [9][3][7][n=5, fibonacci_sequence=[0, 1, 1, 2, 3]][None][None]
    // [10][7][8][n=5, fibonacci_sequence=[0, 1, 1, 2, 3]][None][print-log=Fibonacci Sequence of length 5 :]
    // [11][8][None][n=5, fibonacci_sequence=[0, 1, 1, 2, 3]][None][print-log=Fibonacci Sequence of length 5 :, [0, 1, 1, 2, 3]]

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
            <ExcutionTimeline totalSteps={excutionSteps.length} setCurrentStep={setCurrentStep} currentStep={currentStep} />
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
                    </div>

                </div>
            </div>
          </div>
      );
};