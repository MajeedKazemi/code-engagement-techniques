import React, { useState, useEffect, useRef, KeyboardEvent, useContext } from 'react';
import { BsArrowReturnLeft, BsFillQuestionSquareFill, BsQuestionCircle } from 'react-icons/bs';
import { apiGetExplanationPerLineCodex, logError } from '../../api/api';
import { AuthContext } from '../../context';
import { highlightCode } from '../../utils/utils';
import * as monaco from "monaco-editor";



interface WriteOverProps {
    text: string;
}

interface LineWithLeadSpaces {
    original: string;
    trimmed: string;
    leadSpaces: number;
}

interface Keyword{
    start: number;
    end: number;
    type: string;
}

interface KeywordLine{
    keyword: Keyword[];
    explanation: string;
}

export let allLinesCompleted = false;

const processLines = (text: string): LineWithLeadSpaces[] => {
    return text.split('\n')
        .filter(line => line.trim() !== '')
        .map(line => ({
            original: line,
            trimmed: line.replace(/^\s+/,''),  // Strip leading whitespaces
            leadSpaces: line.search(/\S|$/),  // Counts leading whitespaces
        }));
};

export const WriteOver: React.FC<WriteOverProps> = ({ text }) => {
    const [colorizedText, setColorizedText] = useState<string[]>([]);
    const { context, setContext } = useContext(AuthContext);
    const [lines, setLines] = useState(processLines(text));
    const [userInput, setUserInput] = useState("");
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [shakeError, setShakeError] = useState(false);
    const [errorTracker, setErrorTracker] = useState<Array<number>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [completed, setCompleted] = useState(false);
    const [scores, setScores] = useState<Array<number>>([]);
    const [keywordsList, setKeywordsList] = useState<Array<KeywordLine>>([]);
    const [isReady, setIsReady] = useState(false);
    const [hoveringStates, setHoveringStates] = useState(scores.map(() => false));
    const [errorIndexes, setErrorIndexes] = useState<Array<Array<number>>>([]);  
    
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


    const generateKeywords = (index: number) => {
        const userCode = lines[index].trimmed;
      
        return apiGetExplanationPerLineCodex(
          context?.token,
          lines[index].trimmed,
          userCode ? userCode : ""
        ).then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            console.log(data.code);
            return data.code;
          } else {
            throw new Error("API response not okay.");
          }
        });
      };
      

    useEffect(() => {
        const fetchKeywordsForAllLines = async () => {
            const promises = lines.map((line, index) => generateKeywords(index));
            const results = await Promise.all(promises);
            setKeywordsList(results);
          };
        fetchKeywordsForAllLines();
        setErrorIndexes(Array.from<number, number[]>({ length: lines.length }, () => []));
    }, []);

    function wrapCharsWithSpan(text: string, indexes: number[], className: string): string {
        let result = '';
        for (let i = 0, charCount = 0; i < text.length; i++) {
            // Exclude characters within HTML tags for counting
            if (text[i] == '<') {
                while (text[i] != '>') {
                    result += text[i];
                    i++;
                }
            }
            result += text[i];
            if (text[i] != ' ' && text[i] != '\t' && text[i] != '\n' && text[i] != '\r') charCount++; // Exclude white spaces from counting
            // If the next character position is in error indexes
            if (indexes.includes(charCount)) {
                if (text[i+1] != '<') { // Avoid inserting span within tags
                    result += `<span class="${className}">`;
                    while (text[i+1] != ' ' && text[i+1] != '<') { // Stop at next space or tag
                        result += text[++i];
                    }
                    result += '</span>';
                }
            }        
        }
        return result;
    }
    

    useEffect(() => {
        if(keywordsList.length === 0) return;
        setIsReady(true);
        console.log(isReady);
        console.log(keywordsList);
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

        if (scores[currentLineIndex] < 50+Math.round(scores[currentLineIndex]*(1/lines[currentLineIndex].trimmed.length))) {
            setUserInput('');
            scores[currentLineIndex] = 100;
            setCurrentLineIndex(currentIndex => currentIndex);
            inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
            inputRef.current?.querySelectorAll(".highlight-correct-char").forEach(element => element.classList.remove("highlight-correct-char"));
            inputRef.current = document.getElementById(`line-${currentLineIndex}`) as HTMLDivElement;
        }
    
        if (e.key === 'Enter' && scores[currentLineIndex] > 50) {
            if (lines[currentLineIndex].trimmed === userInput) {
                setUserInput('');
                setCurrentLineIndex(currentIndex => currentIndex + 1);
                // Remove error effect from every character in line
                inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
                inputRef.current = document.getElementById(`line-${currentLineIndex+1}`) as HTMLDivElement;
                colorizedText[currentLineIndex] = wrapCharsWithSpan(colorizedText[currentLineIndex], errorIndexes[currentLineIndex], "highlight-correct-char");
                console.log(errorIndexes);
            } 
            e.preventDefault();
            return;
        }
    
    
        if (lines[currentLineIndex].trimmed[userInput.length] !== value) {
            // Get the next character to user input in line
            inputRef.current = document.getElementById(`line-${currentLineIndex}`) as HTMLDivElement;
            const nextCharInLine = inputRef.current?.querySelector(`.char-${userInput.length+lines[currentLineIndex].leadSpaces}`);
            // Apply shake error effect to the next character
            if (nextCharInLine) nextCharInLine.classList.add("shake-char");
            setShakeError(true);

            let newErrorTracker = errorTracker.slice();
            const index = userInput.length+lines[currentLineIndex].leadSpaces; // Calculate current char index
      
            if (newErrorTracker[index]) {
              newErrorTracker[index] = newErrorTracker[index] + 1; // If error already exists, increment it
            } else {
              newErrorTracker[index] = 1; // If no error, initiate with 1
            }
      
            setErrorTracker(newErrorTracker); // Set the updated error tracker
      
            if(newErrorTracker[index] > 2) {
              // Error occurred more than once on same character
              const highlightedChar = inputRef.current?.querySelector(`.char-${userInput.length+lines[currentLineIndex].leadSpaces}`);
              if(highlightedChar) highlightedChar.classList.add('highlight-correct-char');
              setUserInput(prevInput => prevInput + lines[currentLineIndex].trimmed[userInput.length]);
              scores[currentLineIndex] -= Math.round(scores[currentLineIndex]*(1/lines[currentLineIndex].trimmed.length));
              errorIndexes[currentLineIndex].push(userInput.length);
            }
            return;
        }else{
            setErrorTracker([]); 
        }
        // Remove error effect from every character in line
        inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
    
        const nextInput = userInput + value;
        if (currentLineIndex === lines.length - 1 && lines[currentLineIndex].trimmed === nextInput) {
            setCompleted(true);
        }
        
    
        setUserInput(prevInput => prevInput + value);
    
    };
    
    useEffect(() => {
        if (completed == true) {
            allLinesCompleted = true;
            const elementsWithInsertButtonClass = document.getElementsByClassName("insert-button");

            for (const element of elementsWithInsertButtonClass) {
                if (element instanceof HTMLElement) {
                    // Check if the element contains the "disabled" class
                    if (element.classList.contains("disabled")) {
                        // Remove the "disabled" class from the classList
                        element.classList.remove("disabled");
                        break; // Exit the loop after removing the class from the first element
                    }
                }
            }
        }
    }, [completed]);

    function findIndex(target: number, currIndex: number) {
        const currentLine = keywordsList[currIndex].keyword;
        if (currentLine) {
            //the currentLine contains start and end, find the index where between target is between start and end inclusive
            for (let i = 0; i < currentLine.length; i++) {
                if (currentLine[i].start <= target && currentLine[i].end >= target) {
                    return keywordsList[currIndex].keyword[i].type+"-writeover";
                }
            }
        }
    }

    function findError(target: number, currIndex: number) {
        if(errorIndexes[currIndex].includes(target)) {
            return "highlight-correct-char";
        }
    }

    


    return (
        <div className='write-over-wrapper'>
            <div 
            className="write-over-container" 
            onKeyPress={handleKeyPress} 
            tabIndex={0} 
            ref={containerRef}
        >
            {isReady && lines.map((line, index) => (
                <div id={`line-${index}`} key={index} className='write-over-tracker'>
                    {index === currentLineIndex ? (
                        <>
                        <div style={{position: 'relative'}} className='write-over-code-container'>
                            <pre 
                                className="user-input" 
                                style={{opacity: 1, position: 'absolute', zIndex: 2, backgroundColor: 'transparent'}}
                            >
                                {String(' ').repeat(line.leadSpaces)}
                                {userInput.replace(/\t/g, '    ').split('').map((char, i) => <span className={`${findIndex(i, currentLineIndex)}`}>{char}</span>)}
                                <span className="writeover-cursor" />
                            </pre>
                            <pre 
                                className="remaining-text" 
                                style={{opacity: 0.2}}
                            >
                            {/* map each character to a span */}
                            {line.original.replace(/\t/g, '    ').split('').map((char, i) => <span className={`char-${i}`}>{char}</span>)}
                            {index != lines.length-1 && <BsArrowReturnLeft className='enter-sign'/>}
                            </pre>
                        </div>
                        <div
                            className='write-over-explanation'
                            dangerouslySetInnerHTML={{
                                __html: highlightCode(
                                    keywordsList[index].explanation,
                                    "exp-inline-code"
                                ),
                            }}
                        ></div>
                        </>
                    ) : (
                        <>
                        <pre 
                            className={index > currentLineIndex ? "pending-text" : ""} 
                            style={{opacity: index === currentLineIndex + 1 ? 0.2 : index < currentLineIndex ? 1 : 0 }}
                            dangerouslySetInnerHTML={{ __html: colorizedText[index] }}
                        >
                           
                        </pre>
                        </>
                        
                        
                    )}
                    {(index < lines.length - 1) && (
                        <br />
                    )}
                </div>
            ))}
        </div>
        <div className='writeover-hoverable'>
        {scores.map((score, index) => {
            if (index > currentLineIndex) {
            return null;
            }
            return (
            <div
                className='writeover-hoverable-line'
                onMouseEnter={() => {
                const updatedHoveringStates = [...hoveringStates];
                updatedHoveringStates[index] = true;
                setHoveringStates(updatedHoveringStates);
                }}
                onMouseLeave={() => {
                const updatedHoveringStates = [...hoveringStates];
                updatedHoveringStates[index] = false;
                setHoveringStates(updatedHoveringStates);
                }}
            >
                <BsQuestionCircle
                className="hoverable-writeover-icon"
                />
                {hoveringStates[index] && (
                <div
                    className="hoverable-code-line-explanation"
                    dangerouslySetInnerHTML={{
                    __html: highlightCode(
                        keywordsList[index].explanation,
                        "exp-inline-code"
                    ),
                    }}
                ></div>
                )}
            </div>
            );
        })}
        </div>

        <div className='score'>
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
        </div>
        </div>
        
    );
};

