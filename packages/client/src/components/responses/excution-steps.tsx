import React, {
    useState,
    useEffect,
    useRef,
    useContext,
    Fragment,
} from "react";
import { FaLongArrowAltRight, FaQuestionCircle } from "react-icons/fa";
import { AuthContext, SocketContext } from "../../context";
import ExcutionTimeline from "../excution-timeline";
import {
    apiCheckMatchedValue,
    apiGetBaselineLineByLineExplanationSimulation,
    apiGetFeedbackForDecomposition,
    apiGetFeedbackFromRevealShortAnswer,
    apiGetFeedbackFromTracePredictShortAnswer,
    apiLogEvents,
    logError,
} from "../../api/api";
import { ChatLoader } from "../loader";
import * as monaco from "monaco-editor";
import IconsDoc from "../docs/icons-doc";
import { taskTrace } from "../../utils/constants";
import { taskQuestions } from "../../utils/stepDecomposition";
import { highlightPsudo } from "../../utils/utils";

interface ExcutionStepsProps {
    code: string;
    backendCodes: string[];
    taskID: string;
    prompt: string;
    generatedExplanation: string;
}

interface ExcutionSteps {
    step: number;
    currLine: number;
    nextLine: number | null;
    printOutput: String[];
    frame: f[];
}

interface f {
    name: String;
    type: String;
    value: any;
}

interface o {
    name: String;
    type: String;
    value: any;
}

interface questionObject {
    step: number;
    "begin-line": number;
    "end-line": number;
    "question-about-purpose-of-code": string | null;
    answer: string | null;
    "top-two-variables": string[];
}

interface LineWithLeadSpaces {
    original: string;
    trimmed: string;
    leadSpaces: number;
    currentTabs: number;
}

interface solution {
    first: string;
    second: string;
}

function deepCopy(arr: any[]): any[] {
    return arr.map((item) => (Array.isArray(item) ? deepCopy(item) : item));
}

export const ExcutionSteps: React.FC<ExcutionStepsProps> = ({
    code,
    backendCodes,
    taskID,
    prompt,
    generatedExplanation,
}) => {
    const { context } = useContext(AuthContext);
    const { socket, setSocket } = useContext(SocketContext);
    const [editor, setEditor] =
        useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const [excutionSteps, setExcutionSteps] = useState<ExcutionSteps[]>([]);
    const [currStep, setCurrStep] = useState<ExcutionSteps | null>(null);
    const [traceOutput, setTraceOutput] = useState<string[][]>([]);
    const [trackOutput, setTrackOutput] = useState<string[]>([]);
    const [storedInput, setStoredInput] = useState<string[]>([]);
    const [backendCode, setBackendCode] = useState<string>("");
    const [traceId, setTraceId] = useState(0);
    const [tracing, setTracing] = useState(false);
    const [finishedTracing, setFinishedTracing] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [currentLine, setCurrentLine] = useState<number>(0);
    const [terminalInput, setTerminalInput] = useState<string>("");
    const [questions, setQuestions] = useState<questionObject[]>([]);
    const [questionStop, setQuestionStop] = useState<number>(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [inputValue, setInputValue] = useState<string[]>(["", ""]);
    const [showSolution, setShowSolution] = useState<boolean[][]>();
    const [currentWrongAnswers, setCurrentWrongAnswers] =
        useState<string[][][]>();
    const [solutions, setSolutions] = useState<solution[]>();
    const inputRef = useRef<HTMLInputElement>(null);
    const readerRef = useRef<HTMLDivElement>(null);
    const [isOnStop, setIsOnStop] = useState<boolean>(true);
    const [output, setOutput] = useState<
        Array<{ type: "error" | "output" | "input"; line: string }>
    >([]);
    const [showCode, setShowCode] = useState<boolean>(false);
    const [lines, setLines] = useState<LineWithLeadSpaces[]>([]);
    const [colorizedText, setColorizedText] = useState<string[]>([]);
    const [currentQuestionNumber, setCurrentQuestionNumber] =
        useState<number>(0);
    const [userResponse, setUserResponse] = useState<string[]>([]);

    // - step_event:
    // 	- type: `“first” | “previous” | “next” | “last”`
    const [firstClickCounter, setFirstClickCounter] = useState<number>(0);
    const [prevClickCounter, setPrevClickCounter] = useState<number>(0);
    const [nextClickCounter, setNextClickCounter] = useState<number>(0);
    const [lastClickCounter, setLastClickCounter] = useState<number>(0);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    // const [taskSolutions, setTaskSolutions] = useState<any[]>([]);

    const [currFeedback, setCurrFeedback] = useState<string[][][]>([
    ]);
    const [feedbackReady, setFeedbackReady] = useState<boolean[][]>([
        [true, true, true],
        [true, true, true],
    ]);
    const [hoveringHovered, setHoveringHovered] = useState<boolean[]>([]);
    const [explaination, setExplanation] = useState<string[]>([]);

    const [explanationFeedbackReady, setExplanationFeedbackReady] = useState<
        boolean[]
    >([]);
    const [explanationFeedback, setExplanationFeedback] = useState<string[]>(
        []
    );
    const [explanationQuestionCorrect, setExplanationQuestionCorrect] =
        useState<boolean[]>([]);
    const [attempted, setAttempted] = useState<boolean[][]>([]);
    const [wrongExplainationAnswers, setWrongExplainationAnswers] = useState<
        string[][]
    >([]);

    const [totalAttempts, setTotalAttempts] = useState(0);
    const [totalCorrect, setTotalCorrect] = useState(0);
    const [totalIncorrect, setTotalIncorrect] = useState(0);
    const [questionFirstDisplayed, setQuestionFirstDisplayed] = useState(
        Date.now()
    );

    const [variableSummaryOpen, setVariableSummaryOpen] =
        useState<boolean>(true);

    const processLines = (): LineWithLeadSpaces[] => {
        return code
            .split("\n")
            .filter((line) => line.trim() !== "")
            .map((line) => ({
                original: line,
                trimmed: line.replace(/^\s+/, ""), // Strip leading whitespaces
                leadSpaces: line.search(/\S|$/), // Counts leading whitespaces
                currentTabs: Math.floor(line.search(/\S|$/) / 4),
            }));
    };

    useEffect(() => {
        if (questionStop >= excutionSteps.length - 1) {
            apiLogEvents(
                context?.token,
                taskID,
                "trace predict total mini question summary",
                {
                    type: "trace predict end summary event",
                    taskID: taskID,
                    total_attempts: totalAttempts,
                    total_correct: totalCorrect,
                    total_incorrect: totalIncorrect,
                }
            )
                .then(() => {})
                .catch((error) => {
                    logError("sendLog: " + error.toString());
                });
        }
    }, [questionStop]);

    useEffect(() => {
        const editor = monaco.editor.create(readerRef.current!, {
            value: code || "",
            language: "python",
            automaticLayout: true,
            fontSize: 15,
            lineHeight: 25,
            minimap: { enabled: false },
            wordWrap: "off",
            wrappingIndent: "indent",
            lineNumbers: "on",
            readOnly: true,
            scrollbar: {
                vertical: "hidden",
                horizontal: "visible",
                useShadows: false,
                verticalHasArrows: false,
                horizontalHasArrows: false,
                verticalScrollbarSize: 0,
                horizontalScrollbarSize: 0,
                verticalSliderSize: 0,
                horizontalSliderSize: 0,
                handleMouseWheel: false,
                arrowSize: 30,
                alwaysConsumeMouseWheel: false,
            },
        });
        // console.log(code);
        // the the current highlighted lines
        if (
            questions[currentQuestionIndex] &&
            questions[currentQuestionIndex].step == currentStep + 2
        ) {
            // let startLine = excutionSteps[currentStep + 1].currLine;
            let startLine = questions[currentQuestionIndex]["begin-line"];
            let endLine = questions[currentQuestionIndex]["end-line"];

            // in use, find the id by line+startLine to line+endLine
            // add a class called "highlighted-trace-predict" to those id
            for (let line = startLine; line <= endLine; line++) {
                let elementId = `line-${line - 1}`;
                let element = document.getElementById(elementId);

                if (element) {
                    element.classList.add("highlighted-trace-predict");
                }
            }

            // not in use, this is for the previous editor
            editor.deltaDecorations(
                [],
                [
                    {
                        range: new monaco.Range(startLine, 1, endLine, 1),
                        options: {
                            isWholeLine: true,
                            className: "questionLineHighlightBlock",
                        },
                    },
                ]
            );
            editor.revealLineInCenterIfOutsideViewport(
                startLine + 1,
                monaco.editor.ScrollType.Smooth
            );
        }

        setEditor(editor);

        async function getColorizedText(index: number) {
            const colorized = await monaco.editor.colorize(
                lines[index].original.replace(/\t/g, "    "),
                "python",
                {}
            );
            return colorized;
        }

        async function fetchAllColorizedText() {
            const promises = lines.map((_, index) => getColorizedText(index));
            const colorizedTextArray = await Promise.all(promises);
            return colorizedTextArray;
        }

        if (lines && lines.length > 0) {
            console.log(lines);
            fetchAllColorizedText().then((colorizedTextArray) => {
                setColorizedText(colorizedTextArray);
            });
            setShowCode(true);
        }

        return () => editor?.dispose();
    }, [lines, currentQuestionIndex, currentStep]);

    const extractLineNum = (line: string): number => {
        const match = line.match(/main.py\((\d+)\)/);
        return match ? Number(match[1]) - 2 : 0;
    };

    useEffect(() => {
        if (tracing) {
            // console.log("traceOutput", traceOutput);
            const traceOutputLength = traceOutput.reduce(
                (acc, curr) => acc + curr.length,
                0
            );
            // console.log("The tracing contains "+traceOutputLength+" steps");
            // find the total number of lines in traceOutput
            if (traceOutputLength >= 1) {
                // console.log("traceOutput", traceOutput);
                let flattenedTraceOutput = traceOutput.flat();
                // console.log("flattenedTraceOutput", flattenedTraceOutput);

                let objectArray: ExcutionSteps[] = flattenedTraceOutput.map(
                    (line, index) => {
                        let currLineNum = extractLineNum(line);
                        let nextLineNum =
                            index < flattenedTraceOutput.length - 1
                                ? extractLineNum(
                                      flattenedTraceOutput[index + 1]
                                  )
                                : null;
                        return {
                            step: index + 1,
                            currLine: currLineNum ? currLineNum : 0,
                            nextLine: nextLineNum,
                            printOutput: [],
                            frame: [],
                        };
                    }
                );
                setExcutionSteps(objectArray);
            }
        }
    }, [traceOutput]);

    const generateQuestion = () => {
        // try {
        //     apiGenerateTracingQuestion(
        //         context?.token,
        //         backendCode,
        //         excutionSteps ? JSON.stringify(excutionSteps) : ""
        //     ).then(async (response) => {

        //         if (response.ok) {
        //             const data = await response.json();
        //             console.log("questions", data.response);
        //             setQuestions(data.response);
        //         }
        //     })
        // } catch (error: any) {
        //     logError(error.toString());
        // }

        // try {
        //     apiGetTracingSimulation(context?.token, taskID).then(
        //         async (response) => {
        //             if (response.ok) {
        //                 const data = await response.json();
        //                 setQuestions(data.tracePredict);
        //             }
        //         }
        //     );
        // } catch (error: any) {
        //     logError(error.toString());
        // }

        let currentTask = 0;
        if (parseInt(taskID) > 0) {
            currentTask = parseInt(taskID);
            setQuestions(taskQuestions[currentTask]);
        } else {
            setQuestions(taskQuestions[0]);
        }
    };

    useEffect(() => {
        if (questions.length > 0 && lines) {
            // start by setting the question stop
            setQuestionStop(questions[0].step - 2);
            console.log("questions", questions);
            // setCurrentQuestionWrongAnswers(new Array(questions.length).fill([]));
            setCurrentQuestionIndex(0);
            setShowSolution([
                new Array(questions.length).fill(false),
                new Array(questions.length).fill(false),
            ]);
            setAttempted(new Array(questions.length).fill([false, false, false]));
            setCurrFeedback(new Array(questions.length).fill([["", "", ""], ["", "", ""]]));
            setUserResponse(new Array(questions.length).fill(""));
            setCurrentWrongAnswers([
                new Array(questions.length).fill(["", "", ""]),
                new Array(questions.length).fill(["", "", ""]),
            ]);
            setExplanationFeedback(new Array(questions.length).fill(""));
            setExplanationQuestionCorrect(
                new Array(questions.length).fill(false)
            );

            // start by generating the solutions
            var solutions = new Array(questions.length).fill("");
            for (let i = 0; i < questions.length; i++) {
                solutions[i] = getCurrQuestionSolution(i)!;
            }

            setExplanationFeedbackReady(
                new Array(questions.length).fill(false)
            );
            console.log("solutions", solutions);
            setSolutions(solutions);

            setHoveringHovered(new Array(questions.length).fill(false));
            setWrongExplainationAnswers(
                new Array(questions.length).fill(["", "", ""])
            );

            // retrive the line by line explanation from the apiGetBaselineLineByLineExplanationSimulation
            apiGetBaselineLineByLineExplanationSimulation(
                context?.token,
                taskID
            )
                .then(async (response) => {
                    if (response.ok && editor) {
                        const data = await response.json();

                        setExplanation(data.explanation);
                    }
                })
                .catch((error) => {
                    editor?.updateOptions({ readOnly: false });
                    logError(error.toString());
                });
        }
    }, [questions, lines]);

    useEffect(() => {
        if (tracing) {
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
                            } else if (
                                line.includes("<frozen codecs>") &&
                                line.includes("main.py(")
                            ) {
                                const index = line.indexOf("main.py");
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
                // if (data.type === "stderr") {
                //     setOutput([
                //         ...output,
                //         {
                //             type: "error",
                //             line: data.err,
                //         },
                //     ]);
                //     console.log("error");
                // }
                if (data.type === "close") {
                    setTraceId(traceId + 1);
                    setTracing(false);
                    setFinishedTracing(true);
                }
            });
        }
    }, [tracing, currentLine, output]);

    useEffect(() => {
        if (tracking) {
            socket?.on("python", (data: any) => {
                if (data.type === "stdout") {
                    // console.log("data.out", data.out);
                    if (data.out.split("\n").length > 0) {
                        //for each line in terminalInput, check if the line starts with {}
                        //the number of lines should be match with traceOutput
                        const currOutput = data.out.split("\n");
                        var tempTrack: string[] = [];
                        currOutput.forEach((line: string) => {
                            if (
                                line.startsWith("{") &&
                                !line.includes("self")
                            ) {
                                tempTrack.push(line);
                            }
                        });
                        // setTrackOutput((prevTrackOutput) => [...prevTrackOutput.slice(0, -1), ...tempTrack]);
                        setTrackOutput((prevTrackOutput) => [
                            ...prevTrackOutput,
                            ...tempTrack,
                        ]);
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
                input: `inputs = [${storedInput.map(
                    (item) => `"${item}\\n"`
                )}]`,
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
            setCurrStep(excutionSteps[currentStep + 1]);
        }
        // const targetDivs = document.getElementsByClassName('step-by-step-questions-container');
        if (questionStop === currentStep && currentStep >= 1) {
            // targetDivs[i].classList.add('active');
            setIsOnStop(true);
        } else {
            // targetDivs[i].classList.remove('active');
            setIsOnStop(false);
        }
    }, [currentStep]);

    useEffect(() => {
        setBackendCode(code);
        setLines(processLines());
    }, []);

    useEffect(() => {
        if (backendCode.length > 0) {
            // console.log("backendCode", backendCode);
            // console.log("backendCode", backendCode);
            // generateTrace();

            // for python tracer simulation
            // setTracing(true);
            // console.log("tracing", tracing);
            let currentTask = 0;
            if (parseInt(taskID) > 0) {
                currentTask = parseInt(taskID);
                setExcutionSteps(taskTrace[currentTask]);
            } else {
                setExcutionSteps(taskTrace[0]);
            }
        }
    }, [backendCode]);

    // using simlation instead of real python shell code

    useEffect(() => {
        if (excutionSteps.length > 0) {
            setCurrStep(excutionSteps[0]);
        }

        console.log("excution Steps", excutionSteps);
        generateQuestion();
    }, [excutionSteps]);

    // useEffect(() => {
    //     if (storedInput.length == 0 && finishedTracing) {
    //         generateTrack();
    //     }
    //     if (storedInput.length > 0 && !tracing) {
    //         console.log("storedInput", storedInput);
    //         generateTrack();
    //     }
    // }, [storedInput, tracing, finishedTracing]);

    useEffect(() => {
        let fElements: f[][] = trackOutput.map((item) => {
            // console.log("item", item);

            let parsedItem: any = JSON.parse(
                item
                    .replace(/'/g, '"')
                    .replace(/\(/g, "[")
                    .replace(/\)/g, "]")
                    .replace(/True/g, "true")
                    .replace(/False/g, "false")
                    .replace(/None/g, "null")
            );

            // console.log("parsedItem", parsedItem, item);
            return Object.keys(parsedItem).map((key) => {
                let value = parsedItem[key];
                let valueType = "str"; // Default to str

                if (typeof value === "number") {
                    // value is a number
                    valueType = "int";
                } else if (typeof value === "boolean") {
                    // value is a boolean
                    valueType = "bool";
                } else if (typeof value === "string") {
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
                    value: value,
                };
            });
        });
        let objectArray = excutionSteps;

        let minLength = Math.min(fElements.length, objectArray.length);

        for (let i = 0; i < minLength; i++) {
            objectArray[i].frame = fElements[i];
        }

        if (objectArray.length > fElements.length) {
            let lastElement = fElements[fElements.length - 1];

            for (let i = fElements.length; i < objectArray.length; i++) {
                objectArray[i].frame = lastElement;
            }
        }

        if (backendCode.length > 0) {
            // check if the current excutionstep requires input
            let lineObjects = backendCode.split("\n");
            if (
                !lineObjects[
                    objectArray[objectArray.length - 1].currLine - 1
                ].includes("input(") &&
                objectArray.some((step) => step.frame.length !== 0)
            ) {
                // we know the tracing is done, generate questions
                generateQuestion();
            }
        }

        setExcutionSteps(objectArray);
    }, [trackOutput]);

    // useEffect(() => {
    //     if (
    //         showSolution &&
    //         showSolution[0].every((value) => value === true) &&
    //         showSolution[1].every((value) => value === true)
    //     ) {
    //         setQuestionStop(excutionSteps.length - 1);
    //         console.log("showSolution", showSolution);
    //     }
    // }, [showSolution]);
    useEffect(() => {
        if (showSolution && showSolution[0] && showSolution[0][showSolution[0].length - 1] === true) {
            setQuestionStop(excutionSteps.length - 1);
            console.log(excutionSteps.length - 1);
        }
    }, [showSolution]);

    const updateQuestion = (questionIndex: number) => {

        setInputValue(["", ""]);

        const currentQuestion = questions[questionIndex];
        if (currentQuestion) {
            setQuestionStop(currentQuestion.step - 2);
            setCurrentQuestionIndex(questionIndex);
            

            //reset timer for mini question
            apiLogEvents(
                context?.token,
                taskID,
                "trace predict mini question time event",
                {
                    type: "trace predict mini question time event",
                    question: currentQuestionIndex,
                    time: Date.now() - questionFirstDisplayed,
                }
            ).then(() => {
                setQuestionFirstDisplayed(Date.now());
            });
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (document.getElementById("send-log")) {
                // - step_event:
                // - type: `“first” | “previous” | “next” | “last”`
                apiLogEvents(
                    context?.token,
                    taskID,
                    "submit code from baseline",
                    {
                        type: "trace predict step_event",
                        first: firstClickCounter,
                        previous: prevClickCounter,
                        next: nextClickCounter,
                        last: lastClickCounter,
                    }
                )
                    .then(() => {})
                    .catch((error) => {
                        logError("sendLog: " + error.toString());
                    });

                clearInterval(interval);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const getCurrQuestionSolution = (index: number) => {
        const currentQuestion = questions[index];
        if (currentQuestion) {
            // let currStep = currentQuestion.step;
            // let currFrame = excutionSteps[currStep + 1]?.frame;
            // let currVariable = currentQuestion.question;
            // let currValue = currFrame?.find(
            //     (item) => item.name === currVariable
            // )?.value;

            var currValue = null;
            //find the current question
            const currStep = currentQuestion.step;
            const currLine = currentQuestion["begin-line"];
            const stopLine = currentQuestion["end-line"];
            const variablesOfInterest = currentQuestion["top-two-variables"];

            // get the frame from [step] to end
            var currentTask = parseInt(taskID);
            const frames = taskTrace[currentTask].slice(currStep - 1);

            // find the first frame that contains the stopLine in the code
            let currentSolutions: any[] = [];
            variablesOfInterest.forEach((voi) => {
                // console.log("voi", voi);
                const result = findFrameWithVariable(
                    frames,
                    currStep,
                    stopLine,
                    currLine,
                    voi,
                );

                //update currValue with the value after the block that can be found using "next-line"
                if (result) {
                    const currValue = result.value;
                    if (result.type != "number") {
                        currentSolutions.push(JSON.stringify(currValue));
                    } else {
                        currentSolutions.push(currValue);
                    }
                } else {
                    currentSolutions.push("null");
                }
            });

            return {
                first: currentSolutions[0],
                second: currentSolutions[1],
            };
        }
    };

    function findFrameWithVariable(
        taskTrace: any[],
        step: number,
        stopLine: number,
        currLine: number,
        variableOfInterest: string
    ): { value: any; type: string } {
        //two possibilities
        //first: check if taskTrace[1].nextLine is taskTrace[0].currLine

        if(taskTrace.length >= 2 && taskTrace[1].nextLine === taskTrace[0].currLine && currLine != stopLine){
            //means it in a loop
            let line1 = taskTrace[0].currLine;
            let line2 = taskTrace[0].nextLine;
            //find the next occurence of currLine that is not line1 or line2
            for(let i=0; i< taskTrace.length; i++) {
                const frame = taskTrace[i];
                if (frame.currLine !== line1 && frame.currLine !== line2) {
                    const variable = frame.frame?.find(
                        (v: { name: string }) => v.name === variableOfInterest
                    );
                    if (variable) {
                        console.log(frame.currLine, variable, frame.step);
                        return { value: variable.value, type: variable.type };
                    }
                }
            }
        }else{
            for (let i = 0; i < taskTrace.length; i++) {
                const frame = taskTrace[i];
                if (frame.currLine === stopLine) {
                    // if frame.frame is not undefined
                    // console.log("frame", frame);
                    // console.log("stopLine", stopLine);
                    if (!frame.frame) {
                        return {value:"please refresh your webpage", type:"str"};
                    }
                    //get frame's index
                    if (i + 1 < taskTrace.length) {
                        const targetFrame = taskTrace[i + 1];
                        // console.log("targetFrame", targetFrame);
                        // console.log("variableOfInterest", variableOfInterest);
                        const variable = targetFrame.frame.find(
                            (v: { name: string }) => v.name === variableOfInterest
                        );
                        // console.log("variable", variable);
                        if (variable) {
                            return { value: variable.value, type: variable.type };
                        } else {
                            //wired thing occured for task 6
                            // if (taskID == "6") {
                            //     const variable = {
                            //         name: "dq",
                            //         type: "str",
                            //         value: [2, 3],
                            //     };
                            //     if (variable) {
                            //         return {
                            //             value: variable.value,
                            //             type: variable.type,
                            //         };
                            //     }
                            // }
                        }
                    } else {
                        const variable = frame.frame.find(
                            (v: { name: string }) => v.name === variableOfInterest
                        );
                        if (variable) {
                            return { value: variable.value, type: variable.type };
                        }
                    }
                }
            }
        }

        return {value:"please refresh your webpage", type:"str"};
    }

    function getLastNonEmptyElement(arr: string[]): string | undefined {
        for (let i = arr.length - 1; i >= 0; i--) {
            if (arr[i] !== "") {
                return arr[i];
            }
        }
        return "You have used all the attempts";
    }

    const getCurrentFeedback = (index: number, variableIndex: number) => {
        //codeBlock is the code block that the question is asking about, the content from begin-line to end-line
        let codeBlock = "";
        //get the codeBlock
        let beginLine = questions[currentQuestionIndex]["begin-line"];
        let endLine = questions[currentQuestionIndex]["end-line"];
        let codeLines = code.split("\n");
        for (let i = beginLine - 1; i < endLine; i++) {
            codeBlock += codeLines[i] + "\n";
        }
        // console.log("codeBlock", codeBlock);

        let currentFrame = excutionSteps[currentStep + 1].frame;
        let variableName =
            questions[currentQuestionIndex]["top-two-variables"][variableIndex];
        let userAnswer = inputValue[variableIndex];
        let solution = solutions![currentQuestionIndex].first;
        if (variableIndex != 0) {
            solution = solutions![currentQuestionIndex].second;
        }

        let numberOfAttempts =
            currentWrongAnswers![variableIndex][currentQuestionIndex].filter(
                (item) => item.length > 0
            ).length + 1;
        //previousResponse is the last response of the currentQuestionIndex
        let previousResponse = currentWrongAnswers![variableIndex][
            currentQuestionIndex
        ]
            .filter((item) => item.length > 0)
            .pop();

        // console.log(numberOfAttempts, previousResponse);

        // console.log("currentFrame", currentFrame);
        // console.log("variableName", variableName);
        // console.log("userAnswer", userAnswer);
        // console.log("solution", solution);
        try {
            apiGetFeedbackForDecomposition(
                context?.token,
                codeBlock,
                currentFrame,
                variableName,
                userAnswer,
                solution,
                numberOfAttempts,
                previousResponse || ""
            ).then(async (response) => {
                if (response.ok) {
                    const data = await response.json();
                    let tempFeedback = deepCopy(currFeedback);
                    tempFeedback[index][variableIndex][numberOfAttempts - 1] =
                        data.feedback;
                    // console.log(tempFeedback);
                    setCurrFeedback(tempFeedback);
                    //feedback ready to be true at numberOfAttempts -1
                    let temp = deepCopy(feedbackReady);
                    temp[variableIndex][numberOfAttempts - 1] = true;
                    setFeedbackReady(temp);
                    // console.log("feedback", data.feedback);
                }
            });
        } catch (error: any) {
            logError(error.toString());
        }
    };

    const handleUserInput = (
        index: number,
        event: React.ChangeEvent<HTMLTextAreaElement>
    ): void => {
        const { value } = event.target;
        const cursorPosition = event.target.selectionStart; // Get the cursor position

        setUserResponse((prevState) => {
            const newUserResponse = [...prevState];
            newUserResponse[index] = value;
            return newUserResponse;
        });
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            const target = event.target as HTMLTextAreaElement;
            target.value += "\n";
            target.style.height = `${target.scrollHeight}px`;
        }
    };

    useEffect (() => {
        let index = currentQuestionIndex;
        let item = questions[index];
        if (currentQuestionIndex >= 1 && ((showSolution![0][index] &&
            showSolution![1][index]) || (showSolution![0][index] && item["top-two-variables"].length== 1))){
                if(item["question-about-purpose-of-code"] == null || item.answer == null){
                    setExplanationQuestionCorrect((prev) => {
                        let temp = deepCopy(prev);
                        temp[index] = true;
                        return temp;
                    });

                    setIsOnStop(false);
                    setCurrentQuestionNumber(
                        currentQuestionNumber + 1
                    );
                    updateQuestion(index + 1);
                    setInputValue((prevInputValue) => {
                        const newInputValue = [...prevInputValue];
                        newInputValue[0] = "";
                        newInputValue[1] = "";
                        return newInputValue;
                    });
                }   
        }
    }, [showSolution]);

    const getShortExplanationFeedback = (
        index: number,
        variableIndex: number
    ) => {
        let attemptNumber = attempted[index].findIndex((attempt) => !attempt);
        setTotalAttempts((prevTotalAttempts) => prevTotalAttempts + 1);

        const question = questions[index];
        apiLogEvents(
            context?.token,
            taskID,
            "trace predict follow-up question event",
            {
                type: "lead reveal answer question event",
                question_order: index,
                question_tyoe: "short answer",
                variable: question["top-two-variables"],
                correct_answer: question.answer,
                user_answer: userResponse[index],
                attemptNumber: attemptNumber,
            }
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });

            setButtonDisabled(true);
            //find the first occurence of false and send to true
            let tempAttempted = deepCopy(attempted);
            tempAttempted[index][attemptNumber] = true;
            setAttempted(tempAttempted);
            setExplanationFeedbackReady((prev) => {
                let temp = deepCopy(prev);
                temp[index] = false;
                return temp;
            });
            try {
                apiGetFeedbackFromTracePredictShortAnswer(
                    context?.token,
                    code,
                    userResponse[index],
                    questions[index].answer || "",
                    questions[index]["question-about-purpose-of-code"] || "",
                )
                    .then(async (response) => {
                        if (response.ok) {
                            setButtonDisabled(false);
                            const data = await response.json();

                            if (
                                parseInt(data.response.correctness) &&
                                parseInt(data.response.correctness) > 2
                            ) {
                                console.log(
                                    parseInt(data.response.correctness)
                                );
                                setTotalCorrect(
                                    (prevTotalCorrect) => prevTotalCorrect + 1
                                );
                                setButtonDisabled(false);
                                setExplanationQuestionCorrect((prev) => {
                                    let temp = deepCopy(prev);
                                    temp[index] = true;
                                    return temp;
                                });

                                setIsOnStop(false);
                                setCurrentQuestionNumber(
                                    currentQuestionNumber + 1
                                );
                                updateQuestion(index + 1);
                                setInputValue((prevInputValue) => {
                                    const newInputValue = [...prevInputValue];
                                    newInputValue[variableIndex] = "";
                                    return newInputValue;
                                });
                            } else {
                                setTotalIncorrect(
                                    (prevTotalIncorrect) =>
                                        prevTotalIncorrect + 1
                                );
                                setButtonDisabled(false);

                                let wrongExplainationCopy = deepCopy(
                                    wrongExplainationAnswers
                                );

                                const attemptNumber = attempted[index].findIndex(
                                    (attempt) => !attempt
                                );
                                wrongExplainationCopy[index][attemptNumber] =
                                    userResponse[index];
                                setWrongExplainationAnswers(
                                    wrongExplainationCopy
                                );

                                console.log(wrongExplainationCopy);

                                setExplanationFeedbackReady((prev) => {
                                    let temp = deepCopy(prev);
                                    temp[index] = true;
                                    return temp;
                                });
                                setExplanationFeedback((prev) => {
                                    let temp = deepCopy(prev);
                                    temp[index] = data.response.feedback;
                                    return temp;
                                });
                                setUserResponse((prev) => {
                                    let temp = deepCopy(prev);
                                    temp[index] = "";
                                    return temp;
                                });

                            }
                        }
                    })
                    .catch((error) => {
                        setButtonDisabled(false);
                        logError(error.toString());
                    });
            } catch (error: any) {
                setButtonDisabled(false);
                logError(error.toString());
            }
            
    };

    useEffect(() => {
        if(currentQuestionIndex >= 0 && attempted[currentQuestionIndex]){
        if (attempted[currentQuestionIndex].every((value) => value === true)) {
            // setExplanationQuestionCorrect((prev) => {
            //     let temp = deepCopy(prev);
            //     temp[currentQuestionIndex] = true;
            //     return temp;
            // });
            console.log("attempted", attempted);
            console.log(explanationQuestionCorrect);

            setIsOnStop(false);
            setCurrentQuestionNumber(currentQuestionNumber + 1);
            updateQuestion(currentQuestionIndex + 1);

            return;
        }}
    },[attempted]);



    function submitTracingQuestion(index: number, variableIndex: number) {
        let solution = solutions![index].first;

        if (variableIndex != 0) {
            solution = solutions![index].second;
        }
        // - answer question event:
        // - highlighted_line_of_code: {string}
        // - question_text: {string}
        // - prev_student_answer: {string} // if this is a retry and they have tried before
        // - prev_provided_feedback: {string} // if this is a retry and they have tried before
        // - new_student_answer: {string}
        // - attempt_number: {number}
        let attemptNumber =
            currentWrongAnswers![variableIndex][index].filter(
                (item) => item.length > 0
            ).length + 1;
        apiLogEvents(
            context?.token,
            taskID,
            "trace predict answer question event",
            {
                type: "trace predict answer question event",
                current_step: currentStep,
                highlighted_line_of_code:
                    backendCode[excutionSteps[currentStep + 1].currLine],
                prev_student_answer: !currentWrongAnswers
                    ? ""
                    : currentWrongAnswers[variableIndex][index],
                expected_solution: solution, //correct or incorrect
                new_student_answer: inputValue[variableIndex],
                attempt_number: attemptNumber,
            }
        )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
            });
            
        apiCheckMatchedValue(
            context?.token,
            inputValue[variableIndex],
            solution,
        ).then(async (response) => {
            if (response.ok){
                const data = await response.json();
                if (data.response.match || data.response.match == 'true'){
                    setShowSolution((prev) => {
                        if (!prev) return prev;
        
                        // Create a shallow copy of the top-level array
                        let temp = prev.map((innerArray) => [...innerArray]);
        
                        // Ensure the nested array exists
                        if (temp[variableIndex]) {
                            // Set the specific value to true
                            temp[variableIndex][index] = true;
                        }
                        return temp;
                    });
                    let temp = deepCopy(feedbackReady);
                    temp[variableIndex][attemptNumber - 1] = true;
                    setFeedbackReady(temp);
                    setTotalCorrect((prevTotalCorrect) => prevTotalCorrect + 1);
                    setTotalAttempts((prevTotalAttempts) => prevTotalAttempts + 1);
                }else if (currentWrongAnswers && index == currentQuestionIndex){
                    //set the current wrong answers
                    //find the first empty string in the array

                    //set feedback
                    let tempNum = deepCopy(feedbackReady);
                    tempNum[variableIndex][attemptNumber - 1] = false;
                    setFeedbackReady(tempNum);
                    getCurrentFeedback(index, variableIndex);

                    setTotalIncorrect((prevTotalIncorrect) => prevTotalIncorrect + 1);

                    let temp = deepCopy(currentWrongAnswers);
                    console.log(temp[variableIndex][currentQuestionIndex]);
                    let emptyIndex = temp[variableIndex][
                        currentQuestionIndex
                    ].findIndex((item: string) => item === "");
                    if (emptyIndex <= 2 && emptyIndex >= 0) {
                        temp[variableIndex][currentQuestionIndex][emptyIndex] =
                            inputValue[variableIndex];
                        setCurrentWrongAnswers(temp);
                        console.log("currentWrongAnswers", temp);
                        setInputValue((prevInputValue) => {
                            const newInputValue = [...prevInputValue];
                            newInputValue[variableIndex] = "";
                            return newInputValue;
                        });
                    }
                    
                }
            }
        }).catch((error) => {
            logError("sendLog: " + error.toString());
        });

            
    }

    useEffect(() => {
        if(currentWrongAnswers && currentWrongAnswers[0] && currentWrongAnswers[0][currentQuestionIndex]){
        console.log("currentWrongAnswers", currentWrongAnswers);
        let attemptNumber0 =
            currentWrongAnswers![0][currentQuestionIndex].filter(
                (item) => item.length > 0
            ).length + 1;

        if (currentWrongAnswers![0][currentQuestionIndex][2] == "") {
            //means there is at least one more try
        } else {
            // there is no more try, update question and reveal the answer
            setShowSolution((prev) => {
                if (!prev) return prev;

                // Create a shallow copy of the top-level array
                let temp = prev.map((innerArray) => [...innerArray]);

                // Ensure the nested array exists
                if (temp[0]) {
                    // Set the specific value to true
                    temp[0][currentQuestionIndex] = true;
                }
                console.log(temp);
                return temp;
            });
            let temp = deepCopy(feedbackReady);
            temp[0][attemptNumber0 - 1] = true;
            setFeedbackReady(temp);
            setTotalIncorrect(
                (prevTotalIncorrect) => prevTotalIncorrect + 1
            );
            setTotalAttempts((prevTotalAttempts) => prevTotalAttempts + 1);
        }
        let attemptNumber1 =
            currentWrongAnswers![1][currentQuestionIndex].filter(
                (item) => item.length > 0
            ).length + 1;

        if (currentWrongAnswers![1][currentQuestionIndex][2] == "") {
            //means there is at least one more try
        } else {
            // there is no more try, update question and reveal the answer
            setShowSolution((prev) => {
                if (!prev) return prev;

                // Create a shallow copy of the top-level array
                let temp = prev.map((innerArray) => [...innerArray]);

                // Ensure the nested array exists
                if (temp[1]) {
                    // Set the specific value to true
                    temp[1][currentQuestionIndex] = true;
                }
                return temp;
            });
            let temp = deepCopy(feedbackReady);
            temp[1][attemptNumber1 - 1] = true;
            setFeedbackReady(temp);
            setTotalIncorrect(
                (prevTotalIncorrect) => prevTotalIncorrect + 1
            );
            setTotalAttempts((prevTotalAttempts) => prevTotalAttempts + 1);
        }
        }
    }, [currentWrongAnswers]);

    return (
        <div className="excution-generator">
            <div className="step-by-step-read-container">
                <div className="prompt-text trace-predict-side">
                    <span className="button-span">Prompt:</span> {prompt}
                </div>
                <div className="overall-explanation-container">
                    {generatedExplanation && (
                        <div className="overall-explanation">
                            <b>Explanation:</b>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: highlightPsudo(
                                        generatedExplanation,
                                        "code-highlight"
                                    ),
                                }}
                            ></div>
                        </div>
                    )}
                </div>
                <div className="step-by-step-code-container">
                    <div className="code-container">
                        <div className="current-arrows-container">
                            {code.split("\n").map((line, index) => (
                                <div className="line">
                                    <span className="arrow">
                                        {currStep?.currLine === index + 1 && (
                                            <FaLongArrowAltRight className="green-arrow" />
                                        )}
                                        {currStep?.nextLine === index + 1 && (
                                            <FaLongArrowAltRight className="red-arrow" />
                                        )}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="current-arrows-container">
                            {code.split("\n").map((line, index) => (
                                <div className="line">
                                    <span className="trace-line-number">
                                        {index + 1}
                                    </span>
                                </div>
                            ))}
                            <div className="line">
                                <span className="trace-line-number">
                                    {code.split("\n").length + 1}
                                </span>
                            </div>
                            <div className="line">
                                <span className="trace-line-number">
                                    {code.split("\n").length + 2}
                                </span>
                            </div>
                            <div className="line">
                                <span className="trace-line-number">
                                    {code.split("\n").length + 3}
                                </span>
                            </div>
                        </div>
                        <div
                            className="code-editor"
                            style={{ display: "none" }}
                            id="code-editor"
                            ref={readerRef}
                        ></div>
                        <div className="trace-code-container">
                            {code.split("\n").map((line, index) => (
                                <div
                                    id={`line-${index}`}
                                    key={index}
                                    className="trace-predict-tracker"
                                    onMouseEnter={() => {
                                        //deepCopy of hoveringHovered
                                        let temp =
                                            deepCopy(hoveringHovered);
                                        //change all to false
                                        temp.fill(false);
                                        //change the current index to true
                                        temp[index] = true;
                                        setHoveringHovered(temp);
                                    }}
                                    onMouseLeave={() => {
                                        //deepCopy of hoveringHovered
                                        let temp =
                                            deepCopy(hoveringHovered);
                                        //change all to false
                                        temp.fill(false);
                                        setHoveringHovered(temp);
                                    }}
                                >
                                    <>
                                        <pre
                                            dangerouslySetInnerHTML={{
                                                __html: colorizedText[index],
                                            }}
                                        ></pre>
                                        {hoveringHovered[index] &&
                                            explaination && (
                                                <div className="hoverable-code-container-with-hint">
                                                    <div
                                                        className="hoverable-code-line-explanation"
                                                        dangerouslySetInnerHTML={{
                                                            __html: highlightPsudo(
                                                                explaination[
                                                                    index
                                                                ]
                                                            ),
                                                        }}
                                                    ></div>
                                                </div>
                                            )}
                                    </>
                                </div>
                            ))}
                            <div
                                id={`line-${code.split("\n").length + 1}`}
                                className="trace-predict-tracker"
                            ></div>
                            <div
                                id={`line-${code.split("\n").length + 2}`}
                                className="trace-predict-tracker"
                            ></div>
                            <div
                                id={`line-${code.split("\n").length + 3}`}
                                className="trace-predict-tracker"
                            ></div>
                        </div>
                    </div>
                </div>

                <div className={`step-by-step-timeline-container`}>
                    <div className="legend">
                        {(questionStop >= excutionSteps.length - 1) && (currentStep == excutionSteps.length-1) && (
                            <span id="game-over" style={{ opacity: 0 }}>
                                Game Over
                            </span>
                        )}
                        {questionStop >= excutionSteps.length - 1 && (
                            <span id="send-log" style={{ opacity: 0 }}>
                                send-log
                            </span>
                        )}
                        <div className="legend-item">
                            <FaLongArrowAltRight className="green-arrow" />
                            <div className="legend-text">
                                Line that just executed
                            </div>
                        </div>
                        <div className="legend-item">
                            <FaLongArrowAltRight className="red-arrow" />
                            <div className="legend-text">
                                Next line to execute
                            </div>
                        </div>
                    </div>

                    <ExcutionTimeline
                        totalSteps={excutionSteps.length}
                        setCurrentStep={setCurrentStep}
                        currentStep={currentStep}
                        stop={questionStop}
                        setFirstClickCounter={setFirstClickCounter}
                        setPrevClickCounter={setPrevClickCounter}
                        setNextClickCounter={setNextClickCounter}
                        setLastClickCounter={setLastClickCounter}
                        clickedButton={() => {
                            // setVariableSummaryOpen(false);
                            for (let line = 0; line <= lines.length; line++) {
                                let elementId = `line-${line}`;
                                let element =
                                    document.getElementById(elementId);

                                if (element) {
                                    element.classList.remove(
                                        "highlighted-trace-predict"
                                    );
                                }
                            }
                        }}
                    />
                </div>

                <div className="content-wrapper">
                    <div className="step-by-step-frame-header">
                        <div className="barIcon">
                            <IconsDoc iconName="bar" />
                        </div>
                        <span>Values of Variables</span>
                    </div>
                    {variableSummaryOpen && (
                        <div className="frame">
                            {/* Your frame content goes here */}
                            {currStep?.frame &&
                                currStep?.frame.map((item, index) => (
                                    <>
                                        <div
                                            className={`frame-container ${item.type}`}
                                        >
                                            <p>
                                                {item.name}:&nbsp;&nbsp;&nbsp;
                                            </p>
                                            <p>{JSON.stringify(item.value)}</p>
                                        </div>
                                    </>
                                ))}
                        </div>
                    )}
                </div>

                <div className="print-container" style={{ display: "none" }}>
                    <div className="quick-editing-buttons-container">
                        <Fragment>
                            {" "}
                            <div className="code-container-icon">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="white"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z"
                                    />
                                </svg>
                            </div>
                        </Fragment>
                        Console Input and Output
                    </div>
                    <div className="print-output">
                        {output.map((i, index) => (
                            <p
                                className={
                                    i.type === "error"
                                        ? `console-output-error`
                                        : ""
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
                                        setStoredInput([
                                            ...storedInput,
                                            terminalInput,
                                        ]);

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
            </div>

            <div className="excution-container">
                <div
                    className={`step-by-step-questions-container ${
                        isOnStop ? "active" : ""
                    }`}
                >
                    <div className="step-by-step-questions-header">
                        <FaQuestionCircle /> &nbsp;&nbsp;Questions
                    </div>
                    <div className="step-question-content">
                        {questions.length > 0 &&
                            questions.map(
                                (item, index) =>
                                    item.step - 2 <= currentStep && (
                                        <div
                                            className={`steps-question-div`}
                                            id={`question-number-${index}`}
                                        >
                                            {item["begin-line"] ==
                                            item["end-line"] ? (
                                                <p className="question">
                                                    Given the current state of
                                                    the variables, what will be
                                                    the value of{" "}
                                                    <span className="variable">
                                                        {
                                                            item[
                                                                "top-two-variables"
                                                            ][0]
                                                        }
                                                    </span>
                                                    {item["top-two-variables"].length!= 1 && (
                                                    <>
                                                    {" and "}
                                                    <span className="variable">
                                                        {
                                                            item[
                                                                "top-two-variables"
                                                            ][1]
                                                        }
                                                    </span>
                                                    </>)
                                                    }
                                                    on the highlighted line
                                                    <span>
                                                        {
                                                            questions[index][
                                                                "begin-line"
                                                            ]
                                                        }
                                                    </span>{" "}
                                                    is executed?{" "}
                                                </p>
                                            ) : (
                                                <p className="question">
                                                    Given the current state of
                                                    the variables, what will be
                                                    the value of{" "}
                                                    <span className="variable">
                                                        {
                                                            item[
                                                                "top-two-variables"
                                                            ][0]
                                                        }
                                                    </span>
                                                    {item["top-two-variables"].length!= 1 && (
                                                    <>
                                                    {" and "}
                                                    <span className="variable">
                                                        {
                                                            item[
                                                                "top-two-variables"
                                                            ][1]
                                                        }
                                                    </span>
                                                    </>)
                                                    }
                                                    after the highlighted code
                                                    <span>
                                                        {
                                                            questions[index][
                                                                "begin-line"
                                                            ]
                                                        }
                                                    </span>{" "}
                                                    to line
                                                    <span>
                                                        {
                                                            questions[index][
                                                                "end-line"
                                                            ]
                                                        }
                                                    </span>{" "}
                                                    are executed?{" "}
                                                </p>
                                            )}
                                            {currentWrongAnswers &&
                                                currentWrongAnswers[0][index] &&
                                                currentWrongAnswers[0][index]
                                                    .length > 0 &&
                                                currentWrongAnswers[0][
                                                    index
                                                ].map(
                                                    (item, attamptNumber) =>
                                                        item.length > 0 && (
                                                            <>
                                                                {feedbackReady[0][
                                                                    attamptNumber
                                                                ] ? (
                                                                    <div className="step-answered-container">
                                                                        <div className="step-answered-container-feedback">
                                                                            You
                                                                            Answered:
                                                                            <span className="wrong">
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>
                                                                            <p
                                                                                style={{
                                                                                    color: "red",
                                                                                }}
                                                                            >
                                                                                Incorrect!
                                                                            </p>
                                                                        </div>
                                                                        <div className="feedback-from-step">
                                                                            <p>
                                                                                {
                                                                                    currFeedback[index][0][
                                                                                        attamptNumber
                                                                                    ]
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="step-answered-container">
                                                                        Checking
                                                                        Solution
                                                                        <ChatLoader />
                                                                    </div>
                                                                )}
                                                            </>
                                                        )
                                                )}
                                            {!showSolution![0][index] &&
                                                index ==
                                                    currentQuestionIndex && (
                                                    <div
                                                        className={`step-question-container`}
                                                    >
                                                        <span className="variable">
                                                            {
                                                                item[
                                                                    "top-two-variables"
                                                                ][0]
                                                            }
                                                        </span>
                                                        <input
                                                            className="question-input"
                                                            value={
                                                                inputValue[0]
                                                            }
                                                            onChange={(e) =>
                                                                setInputValue(
                                                                    (
                                                                        prevInputValue
                                                                    ) => {
                                                                        const newInputValue =
                                                                            [
                                                                                ...prevInputValue,
                                                                            ];
                                                                        newInputValue[0] =
                                                                            e.target.value;
                                                                        return newInputValue;
                                                                    }
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="question-submission-button"
                                                            disabled={
                                                                inputValue[0].trim()
                                                                    .length ===
                                                                0
                                                            }
                                                            onClick={() =>
                                                                submitTracingQuestion(
                                                                    index,
                                                                    0
                                                                )
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                )}
                                            
                                            {showSolution![0][index] && (
                                                <div className="step-answered-container step-answered-container-correct">
                                                    <p>
                                                        Value of{" "}
                                                        <span className="variable">
                                                            {
                                                                item[
                                                                    "top-two-variables"
                                                                ][0]
                                                            }
                                                        </span>
                                                        :
                                                    </p>
                                                    <span className="correct">
                                                        {
                                                            solutions![index]
                                                                .first
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {item["top-two-variables"].length!= 1 && currentWrongAnswers &&
                                                currentWrongAnswers[1][index] &&
                                                currentWrongAnswers[1][index]
                                                    .length > 0 &&
                                                currentWrongAnswers[1][
                                                    index
                                                ].map(
                                                    (item, attamptNumber) =>
                                                        item.length > 0 && (
                                                            <>
                                                                {feedbackReady[1][
                                                                    attamptNumber
                                                                ] ? (
                                                                    <div className="step-answered-container">
                                                                        <div className="step-answered-container-feedback">
                                                                            You
                                                                            Answered:
                                                                            <span className="wrong">
                                                                                {
                                                                                    item
                                                                                }
                                                                            </span>
                                                                            <p
                                                                                style={{
                                                                                    color: "red",
                                                                                }}
                                                                            >
                                                                                Incorrect!
                                                                            </p>
                                                                        </div>
                                                                        <div className="feedback-from-step">
                                                                            <p>
                                                                                {
                                                                                    currFeedback[index][1][
                                                                                        attamptNumber
                                                                                    ]
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                ) : (
                                                                    <div className="step-answered-container">
                                                                        Checking
                                                                        Solution
                                                                        <ChatLoader />
                                                                    </div>
                                                                )}
                                                            </>
                                                        )
                                                )}
                                            {item["top-two-variables"].length!= 1 && !showSolution![1][index] &&
                                                index ==
                                                    currentQuestionIndex && (
                                                    <div
                                                        className={`step-question-container`}
                                                    >
                                                        <span className="variable">
                                                            {
                                                                item[
                                                                    "top-two-variables"
                                                                ][1]
                                                            }
                                                        </span>
                                                        <input
                                                            className="question-input"
                                                            value={
                                                                inputValue[1]
                                                            }
                                                            onChange={(e) =>
                                                                setInputValue(
                                                                    (
                                                                        prevInputValue
                                                                    ) => {
                                                                        const newInputValue =
                                                                            [
                                                                                ...prevInputValue,
                                                                            ];
                                                                        newInputValue[1] =
                                                                            e.target.value;
                                                                        return newInputValue;
                                                                    }
                                                                )
                                                            }
                                                        />
                                                        <button
                                                            className="question-submission-button"
                                                            disabled={
                                                                inputValue[1].trim()
                                                                    .length ===
                                                                0
                                                            }
                                                            onClick={() =>
                                                                submitTracingQuestion(
                                                                    index,
                                                                    1
                                                                )
                                                            }
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                )}
                                            {item["top-two-variables"].length!= 1 && showSolution![1][index] && (
                                                <div className="step-answered-container step-answered-container-correct">
                                                    <p>
                                                        Value of{" "}
                                                        <span className="variable">
                                                            {
                                                                item[
                                                                    "top-two-variables"
                                                                ][1]
                                                            }
                                                        </span>
                                                        :
                                                    </p>
                                                    <span className="correct">
                                                        {
                                                            solutions![index]
                                                                .second
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                            {((showSolution![0][index] &&
                                                showSolution![1][index]) || (showSolution![0][index] && item["top-two-variables"].length== 1))&& (item["question-about-purpose-of-code"] != null && item.answer != null) && (
                                                    <div className="follow-up-question">
                                                        <div className="follow-up-header">
                                                            <p>Follow Up</p>
                                                        </div>
                                                        <div className="follow-up-question-text">
                                                            {
                                                                item[
                                                                    "question-about-purpose-of-code"
                                                                ]
                                                            }
                                                        </div>
                                                        {!explanationQuestionCorrect[
                                                                index
                                                            ] &&
                                                            attempted[index].every(
                                                                (attempt) =>
                                                                    attempt
                                                            ) && (
                                                                <>
                                                                    <div className="follow-up-question-feedback">
                                                                        <strong>
                                                                            You
                                                                            answered:
                                                                        </strong>{" "}
                                                                        {getLastNonEmptyElement(
                                                                            wrongExplainationAnswers[
                                                                                index
                                                                            ]
                                                                        )}
                                                                    </div>
                                                                    <div className="follow-up-question-feedback correct">
                                                                    <strong>
                                                                        Explanation:
                                                                    </strong>{" "}
                                                                    {
                                                                        item.answer
                                                                    }
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        {explanationFeedback[
                                                            index
                                                        ] != "" &&
                                                            explanationFeedbackReady[
                                                                index
                                                            ] &&
                                                            !explanationQuestionCorrect[
                                                                index
                                                            ] &&
                                                            !attempted[index].every(
                                                                (attempt) =>
                                                                    attempt
                                                            ) && (
                                                                <>
                                                                    <div className="follow-up-question-feedback">
                                                                        <strong>
                                                                            You
                                                                            answered:
                                                                        </strong>{" "}
                                                                        {getLastNonEmptyElement(
                                                                            wrongExplainationAnswers[
                                                                                index
                                                                            ]
                                                                        )}
                                                                    </div>
                                                                    <div className="follow-up-question-feedback">
                                                                        <strong>
                                                                            Hint:
                                                                        </strong>{" "}
                                                                        {
                                                                            explanationFeedback[
                                                                                index
                                                                            ]
                                                                        }
                                                                    </div>
                                                                </>
                                                            )}
                                                        {!explanationQuestionCorrect[
                                                            index
                                                        ] &&
                                                            !buttonDisabled && !attempted[index].every(
                                                                (attempt) =>
                                                                    attempt
                                                            ) &&(
                                                                <div className="follow-up-question-input">
                                                                    <textarea
                                                                        className="self-explain-textbox baseline-input"
                                                                        id="userInput"
                                                                        // ref={textareaRefs}
                                                                        value={
                                                                            userResponse[
                                                                                index
                                                                            ]
                                                                        }
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            handleUserInput(
                                                                                index,
                                                                                e
                                                                            )
                                                                        }
                                                                        onKeyDown={
                                                                            handleKeyDown
                                                                        }
                                                                        rows={2}
                                                                        data-gramm="false"
                                                                        data-gramm_editor="false"
                                                                        autoComplete="off"
                                                                        spellCheck="false"
                                                                    />
                                                                    <button
                                                                        className="gpt-button"
                                                                        onClick={() => {
                                                                            getShortExplanationFeedback(
                                                                                index,
                                                                                0
                                                                            );
                                                                        }}
                                                                        disabled={
                                                                            !userResponse[
                                                                                index
                                                                            ].trim() ||
                                                                            buttonDisabled
                                                                        }
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            )}
                                                        {!explanationFeedbackReady[
                                                            index
                                                        ] && (!(explanationQuestionCorrect[
                                                            index
                                                        ])) &&
                                                            !attempted[index].every(
                                                                (attempt) =>
                                                                    attempt
                                                            ) &&
                                                            !attempted[index].every(
                                                                (value) =>
                                                                    value ===
                                                                    false
                                                            ) && (
                                                                <div className="step-answered-container">
                                                                    Checking
                                                                    Solution
                                                                    <ChatLoader />
                                                                </div>
                                                            )}
                                                        {(explanationQuestionCorrect[
                                                            index
                                                        ]) && (
                                                            <>
                                                                <div className="follow-up-question-feedback correct">
                                                                    <strong>
                                                                        You Answered
                                                                    </strong>{" "}
                                                                    {
                                                                        userResponse[
                                                                            index
                                                                        ]
                                                                    }
                                                                </div>
                                                                <div className="follow-up-question-feedback correct">
                                                                    <strong>
                                                                        Explanation:
                                                                    </strong>{" "}
                                                                    {
                                                                        item.answer
                                                                    }
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>
                                                )}
                                        </div>
                                    )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};
