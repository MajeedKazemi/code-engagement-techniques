import React, { useState, useEffect, useRef, KeyboardEvent, useContext } from 'react';
import { BsArrowReturnLeft, BsFillQuestionSquareFill, BsQuestionCircle } from 'react-icons/bs';
import { MdKeyboardTab } from 'react-icons/md';
import { apiGetExplanationPerLineCodex, apiLogEvents, logError } from '../../api/api';
import { AuthContext } from '../../context';
import { highlightCode, highlightPsudo } from '../../utils/utils';
import * as monaco from "monaco-editor";
import IconsDoc from '../docs/icons-doc';



interface WriteOverProps {
    text: string;
    tokens: any[];
    taskID: string;
}

interface LineWithLeadSpaces {
    original: string;
    trimmed: string;
    leadSpaces: number;
    currentTabs: number;
}


export let allLinesCompleted = false;


export const WriteOver: React.FC<WriteOverProps> = ({ text, tokens, taskID }) => {
    const [colorizedText, setColorizedText] = useState<string[]>([]);
    const { context, setContext } = useContext(AuthContext);
    const [lines, setLines] = useState<LineWithLeadSpaces[]>([]);
    const [userInput, setUserInput] = useState("");
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [shakeError, setShakeError] = useState(false);
    const [errorTracker, setErrorTracker] = useState<Array<number>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [completed, setCompleted] = useState(false);
    const [scores, setScores] = useState<Array<number>>([]);
    const [keywordsList, setKeywordsList] = useState<Array<any>>([]);
    const [isReady, setIsReady] = useState(false);
    const [hoveringStates, setHoveringStates] = useState(scores.map(() => false));
    const [errorIndexes, setErrorIndexes] = useState<Array<Array<number>>>([]);     
    const [charToToken, setCharToToken] = useState<number[][]>([]);

    const [enterLogs, setEnterLogs] = useState<Array<any>>([]);
    const [currLineTime, setCurrLineTime] = useState(0);

    
    const lineCharToToken = (index: number, originalString: string) => {
        const currTokens = tokens[index].tokens;
        let charToToken: number[] = [];
        let tokenIndex = 0;
        let tokenCharIndex = 0;

        for (let charIndex = 0; charIndex < originalString.length; charIndex++) {
            charToToken.push(tokenIndex);


            if (tokenCharIndex == currTokens[tokenIndex]?.token.length - 1) {
                tokenIndex++;
                tokenCharIndex = 0;
            } else {
                tokenCharIndex++;
            }
        }
        // console.log(charToToken);
        return charToToken;
    };

    // useEffect(() => {
    //     if(charToToken.length === 0) return;
    //     console.log(charToToken[0][userInput.length-1]);
    //     console.log(keywordsList[0].tokens[charToToken[0][userInput.length-1]]);
    // }, [charToToken]);

    const processLines = (): LineWithLeadSpaces[] => {
        return tokens.map((lineInfo) => lineInfo.code)
          .filter(line => line.trim() !== '')
          .map(line => ({
            original: line,
            trimmed: line.replace(/^\s+/,''),  // Strip leading whitespaces
            leadSpaces: line.search(/\S|$/),  // Counts leading whitespaces
            currentTabs: Math.floor(line.search(/\S|$/) / 4)
          }));
    };
    
    const removeTags = (str: string): string => {
        return str.replace(/<[^>]*>?/gm, '');
    };
    
    const getCharsAtIndexes = (str: string, indexes: number[]): string[] => {
      let chars = []
      for(let index of indexes){
        chars.push(str.charAt(index));
      }
      return chars;
    };


      
    useEffect(() => {
        setLines(processLines());
        setKeywordsList(tokens);
        setErrorIndexes(Array.from<number, number[]>({ length: tokens.length }, () => []));
        setCharToToken(tokens.map((line, index) => lineCharToToken(index, line.code)));
        
        const timer = setInterval(() => {
            setCurrLineTime(prevTime => prevTime + 1);
        }, 1000);

        return () => clearInterval(timer)

    }, []);

    function wrapCharsWithSpan(html: string, indexes: number[], className: string): string {
        let parser = new DOMParser();
        let doc: Document = parser.parseFromString(html, 'text/html');
        let textNodes: Node[] = [];
        
        // A helper function to find all text nodes
        function getTextNodes(node: Node): void {
            if (node.nodeType === 3) {
                textNodes.push(node);
            } else {
                for (let i = 0; i < node.childNodes.length; i++) {
                    getTextNodes(node.childNodes[i]);
                }
            }
        }
        
        getTextNodes(doc.body);
    
        let totalChars = 0;
    
        for (let node of textNodes) {
            let splitText: string[] = [];
            if(node.nodeValue) splitText = node.nodeValue.split('');
            let newHTML: string = '';
            for (let i = 0; i < splitText.length; i++) {
                if (indexes.includes(totalChars)) {
                    newHTML += `<span class="${className}">${splitText[i]}</span>`;
                } else {
                    newHTML += splitText[i];
                }
                totalChars++;
            }
    
            let newNode = parser.parseFromString(newHTML, 'text/html').body;
            while(newNode.firstChild) node.parentNode?.insertBefore(newNode.firstChild, node);
            node.parentNode?.removeChild(node);
        }
        return doc.body.innerHTML;
    }

    useEffect(() => {
        if(keywordsList.length === 0) return;
        setIsReady(true);
        const initialScores = Array(lines.length).fill(100);
        setScores(initialScores);
        containerRef.current?.focus();
        inputRef.current = document.getElementById(`line-0`) as HTMLDivElement;
        async function getColorizedText(index: number) {
            const colorized = await monaco.editor.colorize(
              lines[index].original.replace(/\t/g, '    '), 
              'python', 
              {}  
            );
            return colorized;
          }
          
          async function fetchAllColorizedText() {
            const promises = lines.map((_, index) => getColorizedText(index));
            const colorizedTextArray = await Promise.all(promises);
            return colorizedTextArray;
          }
          
          fetchAllColorizedText().then((colorizedTextArray) => {
            setColorizedText(colorizedTextArray);
          });

          
        
    }, [keywordsList]);


    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
        const value = e.key;

        if (e.key === 'Shift') {
            return;
        }

        if (e.key === ' ') {
            console.log('space');
            e.preventDefault();
        
        }

        if (lines[currentLineIndex].original === userInput && e.key !== 'Enter') {
            return;
        }

        if (lines[currentLineIndex].leadSpaces > 0 &&  lines[currentLineIndex].currentTabs > 0 && e.key != 'Tab') {
            return;
        }

        if (e.key == 'Tab') {
            e.preventDefault();
            const currentChar = lines[currentLineIndex].original[userInput.length];
            const isCharacterFromAtoZ = /^[a-z]$/i.test(currentChar);

            if(lines[currentLineIndex].leadSpaces > 0 && /^\s*$/.test(userInput) && !isCharacterFromAtoZ) { 
                setUserInput(prevInput => prevInput + '    ');
                
                //update lines.
                const temp = lines;
                temp[currentLineIndex].currentTabs -= 1;
                setLines(temp);
                return;
            }
        }

        if (scores[currentLineIndex] < 50+Math.round(scores[currentLineIndex]*(1/lines[currentLineIndex].trimmed.length))) {
            setUserInput('');
            scores[currentLineIndex] = 100;
            setCurrentLineIndex(currentIndex => currentIndex);
            inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
            inputRef.current?.querySelectorAll(".highlight-correct-char").forEach(element => element.classList.remove("highlight-correct-char"));
            inputRef.current = document.getElementById(`line-${currentLineIndex}`) as HTMLDivElement;
        }
    
        if (e.key === 'Enter' && scores[currentLineIndex] > 50) {
            if (lines[currentLineIndex].original === userInput) {

                // log the event for 
                //
                // finished typing a line event:
                // - incorrect_keystrokes: {array of strings}
                // - actual_line_code: {string} // this is simply what the code this line had
                // - speed_seconds {number} // time start minus time finish
                setEnterLogs([...enterLogs, {
                    type: "writeover finished typing a line event",
                    incorrect_keystrokes: errorIndexes[currentLineIndex],
                    actual_line_code: lines[currentLineIndex].original,
                    score: scores[currentLineIndex],
                    speed_seconds: currLineTime
                }]);

                setCurrLineTime(0);
                setUserInput('');
                setCurrentLineIndex(currentIndex => currentIndex + 1);
                // Remove error effect from every character in line
                inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
                inputRef.current = document.getElementById(`line-${currentLineIndex+1}`) as HTMLDivElement;
                colorizedText[currentLineIndex] = wrapCharsWithSpan(colorizedText[currentLineIndex], errorIndexes[currentLineIndex], "highlight-correct-char");

            } 
            e.preventDefault();
            return;
        }

        if (lines[currentLineIndex].original[userInput.length] !== value) {
            // Get the next character to user input in line
            inputRef.current = document.getElementById(`line-${currentLineIndex}`) as HTMLDivElement;
            const nextCharInLine = inputRef.current?.querySelector(`.char-${userInput.length}`);
            // Apply shake error effect to the next character
            if (nextCharInLine) nextCharInLine.classList.add("shake-char");
            setShakeError(true);

            let newErrorTracker = errorTracker.slice();
            const index = userInput.length // Calculate current char index
      
            if (newErrorTracker[index]) {
              newErrorTracker[index] = newErrorTracker[index] + 1; // If error already exists, increment it
            } else {
              newErrorTracker[index] = 1; // If no error, initiate with 1
            }
      
            setErrorTracker(newErrorTracker); // Set the updated error tracker
      
            if(newErrorTracker[index] > 2) {
                // Error occurred more than once on same character
                const highlightedChar = inputRef.current?.querySelector(`.char-${userInput.length}`);
                if(highlightedChar) highlightedChar.classList.add('highlight-correct-char');
                setUserInput(prevInput => prevInput + lines[currentLineIndex].original[userInput.length]);
                scores[currentLineIndex] -= Math.round(scores[currentLineIndex]*(1/lines[currentLineIndex].trimmed.length));
                const errors = [...errorIndexes];
                errors[currentLineIndex].push(userInput.length);
                setErrorIndexes(errors);
            }
            return;
        }else{
            setErrorTracker([]); 
        }
        // Remove error effect from every character in line
        inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
    
        const nextInput = userInput + value;
        if (currentLineIndex === lines.length - 1 && lines[currentLineIndex].original === nextInput) {
            //log to the db
            apiLogEvents(
                context?.token,
                taskID,
                "writeover finished typing a line event",
                enterLogs,
              )
                .then(() => {})
                .catch((error) => {
                    logError("sendLog: " + error.toString());
            });
            setCompleted(true);
        }
        
    
        setUserInput(prevInput => prevInput + value);
    
    };
    
    // useEffect(() => {
    //     if (completed == true) {
    //         allLinesCompleted = true;
    //         const elementsWithInsertButtonClass = document.getElementsByClassName("insert-button");

    //         for (const element of elementsWithInsertButtonClass) {
    //             if (element instanceof HTMLElement) {
    //                 // Check if the element contains the "disabled" class
    //                 if (element.classList.contains("disabled")) {
    //                     // Remove the "disabled" class from the classList
    //                     element.classList.remove("disabled");
    //                     break; // Exit the loop after removing the class from the first element
    //                 }
    //             }
    //         }
    //     }
    // }, [completed]);

    useEffect(() => {
        // get the id = {`id-explanation-${index}`}
        const explainRef = document.getElementById(`id-explanation-${currentLineIndex}`);
        const cursorRef = document.getElementById('cursorRef');
        const lineExplainRef = document.getElementById(`line-explain-ref-${currentLineIndex}`);
        if(explainRef && cursorRef && lineExplainRef) {
            // the position should be userInput.lengt * 20px
            // explainRef.style.left = `${userInput.length * 20}px`;
            if(lineExplainRef.getBoundingClientRect().x > explainRef.getBoundingClientRect().x + explainRef.getBoundingClientRect().width){     
                // console.log(lineExplainRef.getBoundingClientRect().x);
                // console.log(explainRef.getBoundingClientRect().x + explainRef.getBoundingClientRect().width);
                explainRef.style.left = `${cursorRef?.getBoundingClientRect().x!}px`;
            }
            
        }
      }, [userInput]);  // Run every time userInput changes

    return (
        <>
        <div className='write-over-reset-container'>
            {completed && <div className='write-over-reset-text'>You may now hover over each line to see the explanations</div>}
            <button 
                className='write-over-reset-button gpt-button' 
                onClick={() => {
                    setUserInput('');
                    setCurrentLineIndex(0);
                    setCompleted(false);
                    setCurrLineTime(0);
                    setEnterLogs([]);
                    setScores(Array(lines.length).fill(100));
                    setErrorIndexes(Array.from<number, number[]>({ length: tokens.length }, () => []));
                }}
            >
                Reset
            </button>
        </div>
        <div className='write-over-wrapper'>
            <div 
            className="write-over-container" 
            onKeyUp={handleKeyPress} 
            tabIndex={0} 
            ref={containerRef}
        >
            {completed && <span id="game-over" style={{opacity:0}}>Game Over</span>}
            {isReady && lines.map((line, index) => (
                <div id={`line-${index}`} key={index} className='write-over-tracker'
                onMouseEnter={() => {
                    if(index < currentLineIndex) {
                        const updatedHoveringStates = [...hoveringStates];
                        for(let i = 0; i < hoveringStates.length; i++) {
                            if (index == i) {
                                updatedHoveringStates[index] = true;
                            } else {
                                updatedHoveringStates[i] = false;
                            }
                        }
                        setHoveringStates(updatedHoveringStates);
                    }}
                    }
                onMouseLeave={() => {
                    if(index < currentLineIndex) {
                        const updatedHoveringStates = [...hoveringStates];
                        updatedHoveringStates[index] = false;
                        setHoveringStates(updatedHoveringStates);
                    }

                }}>
                    {hoveringStates[index] && (
                    <div className="hoverable-codeline-explanation" style={{zIndex: 99 - index}}>
                        <div className='hints-header'>
                            <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                Explaination
                            </div>
                        <div 
                            className="explanation-write-over"
                            dangerouslySetInnerHTML={{
                            __html: highlightPsudo(
                                keywordsList[index].explanation,
                            ),
                            }}
                        ></div>
                    </div>
                    )}
                    {index == currentLineIndex ? (
                        <div className='current-code-container'>
                        <div style={{position: 'relative'}} className='current-code-line write-over-code-container'>
                            <pre className="user-input">
                                {userInput}
                                <span className="writeover-cursor" id="cursorRef"/>
                            </pre>
                            <pre 
                                className="remaining-text" 
                                style={{opacity: 1}}
                            >
                            {/* map each character to a span */}
                            {/* {lines[index].leadSpaces > 0 && <MdKeyboardTab className='enter-sign'/>}
                            {line.original.replace(/\t/g, '    ').split('').map((char, i) => <span className={`char-${i}`}>{char}</span>)} */}
                            <span style={{ position: 'absolute', zIndex: 3 }}>
                            {lines[index].leadSpaces > 0 && <MdKeyboardTab className='tab-sign' />}
                            </span>
                            <span className="text-span" style={{ position: 'relative', zIndex: 1 }}>
                            {line.original.replace(/\t/g, '    ').split('').map((char, i) => (
                                <span key={i} className={`char-${i}`}>{char}</span>
                            ))}
                            </span>
                            {index <= lines.length-1 && <BsArrowReturnLeft className='enter-sign'/>}
                            </pre>
                            
                        </div>
                        <div
                            className='write-over-explanation'
                            id = {`id-explanation-${index}`}
                            dangerouslySetInnerHTML={{
                                __html: keywordsList[index].tokens[charToToken[index][userInput.length]] && keywordsList[index].tokens[charToToken[index][userInput.length]].explanation
                                  ? highlightPsudo(keywordsList[index].tokens[charToToken[index][userInput.length]].explanation)
                                  : ""
                              }}
                        ></div>
                        </div>
                    ) : (
                        <>
                        <pre 
                            className={index > currentLineIndex ? "pending-text" : ""} 
                            style={{opacity: index < currentLineIndex ? 1 : 0 }}
                            dangerouslySetInnerHTML={{ __html: colorizedText[index] }
                        }
                        >
                           
                        </pre>
                        </>
                        
                        
                    )}
                    {index == currentLineIndex
                    &&  
                    <div className="hoverable-codeline-explanation" style={{zIndex: 95 - index}} id={`line-explain-ref-${index}`}>
                        <div className='hints-header'>
                            <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                Explaination
                            </div>
                        <div 
                            className="explanation-write-over"
                            dangerouslySetInnerHTML={{
                            __html: highlightPsudo(
                                keywordsList[index].explanation,
                            ),
                            }}
                        ></div>
                    </div>
                    }
                </div>
            ))}
        </div>
        <div className='writeover-hoverable'>
        </div>
            
        {/* <div className='score'>
            {scores.map((score, index) => {
                if (index>currentLineIndex)
                    return <div> </div>
                let scoreClass = 'red';
                if (score >= 100) 
                    scoreClass = 'green';
                else if (score >= 85)
                    scoreClass = 'lightGreen';
                else if (score >= 65)
                    scoreClass = 'yellowGreen';
                else if (score >= 50)
                    scoreClass = 'yellow';
                return <div className={scoreClass}>{score}%</div>
            })}
        </div> */}
        </div>
        </>
    );
};

