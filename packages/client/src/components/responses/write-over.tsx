import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

interface WriteOverProps {
    text: string;
}

interface LineWithLeadSpaces {
    original: string;
    trimmed: string;
    leadSpaces: number;
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
    const [lines, setLines] = useState(processLines(text));
    const [userInput, setUserInput] = useState("");
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [shakeError, setShakeError] = useState(false);
    const [errorTracker, setErrorTracker] = useState<Array<number>>([]);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [completed, setCompleted] = useState(false);
    const [scores, setScores] = useState<Array<number>>([]);

    useEffect(() => {
        const initialScores = Array(lines.length).fill(100);
        setScores(initialScores);
        containerRef.current?.focus();
        inputRef.current = document.getElementById(`line-0`) as HTMLDivElement;
    }, []);


    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {

        const value = e.key;

        if (scores[currentLineIndex] < 50) {
            setUserInput('');
            scores[currentLineIndex] = 100;
            setCurrentLineIndex(currentIndex => currentIndex);
            inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
            inputRef.current?.querySelectorAll(".highlight-correct-char").forEach(element => element.classList.remove("highlight-correct-char"));
            inputRef.current = document.getElementById(`line-${currentLineIndex}`) as HTMLDivElement;
        }
    
        if (e.key === 'Enter') {
            if (lines[currentLineIndex].trimmed === userInput) {
                setUserInput('');
                setCurrentLineIndex(currentIndex => currentIndex + 1);
                // Remove error effect from every character in line
                inputRef.current?.querySelectorAll(".shake-char").forEach(element => element.classList.remove("shake-char"));
                inputRef.current = document.getElementById(`line-${currentLineIndex+1}`) as HTMLDivElement;
            } 
            e.preventDefault();
            return;
        }
    
    
        if (lines[currentLineIndex].trimmed[userInput.length] !== value) {
            // Get the next character to user input in line
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
              scores[currentLineIndex] -= Math.round(scores[currentLineIndex]*(1/lines[currentLineIndex].original.length));
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


    return (
        <div className='write-over-wrapper'>
            <div 
            className="write-over-container" 
            onKeyPress={handleKeyPress} 
            tabIndex={0} 
            ref={containerRef}
        >
            {lines.map((line, index) => (
                <div id={`line-${index}`} key={index} className='write-over-tracker'>
                    {index === currentLineIndex ? (
                        <div style={{position: 'relative'}} className='write-over-code-container'>
                            <pre 
                                className="user-input" 
                                style={{opacity: 1, position: 'absolute', zIndex: 2, backgroundColor: 'transparent'}}
                            >
                                {String(' ').repeat(line.leadSpaces) + userInput.replace(/\t/g, '    ')}
                                <span className="writeover-cursor" />
                            </pre>
                            <pre 
                                className="remaining-text" 
                                style={{opacity: 0.2}}
                            >
                            {/* map each character to a span */}
                            {line.original.replace(/\t/g, '    ').split('').map((char, i) => <span key={i} className={`char-${i}`}>{char}</span>)}
                            <BsArrowReturnLeft className='enter-sign'/>
                            </pre>
                        </div>

                    ) : (
                        <pre 
                            className={index > currentLineIndex ? "pending-text" : ""} 
                            style={{opacity: index < currentLineIndex ? 1 : 0.2}}
                            children={line.original.replace(/\t/g, '    ')}
                        />
                    )}
                    {(index < lines.length - 1) && (
                        <br />
                    )}
                </div>
            ))}
        </div>
        <div className='score'>
            {scores.map((score, index) => {
                let scoreClass = 'red';
                if (score >= 80) 
                    scoreClass = 'green';
                else if (score >= 65)
                    scoreClass = 'yellowGreen';
                else if (score >= 50)
                    scoreClass = 'yellow';
                return <p className={scoreClass}>{score}%</p>
            })}
        </div>
        </div>
        
    );
};