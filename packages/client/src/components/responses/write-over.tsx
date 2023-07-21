import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';

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
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLDivElement | null>(null);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        containerRef.current?.focus();
        inputRef.current = document.getElementById(`line-0`) as HTMLDivElement;
    }, []);

    useEffect(() => {
        inputRef.current?.classList.remove('shake');
        if (shakeError) {
            void inputRef.current?.offsetWidth;
            inputRef.current?.classList.add('shake');
        }
    }, [shakeError]);

    useEffect(() => {
        if (shakeError) {
            inputRef.current?.classList.add('shake');
            const timer = setTimeout(() => inputRef.current?.classList.remove('shake'), 820);
            return () => clearTimeout(timer);
        }
    }, [shakeError]);

    const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {

        const value = e.key;

        if (e.key === 'Enter') {
            if (lines[currentLineIndex].trimmed === userInput) {
                setUserInput('');
                setCurrentLineIndex(currentIndex => currentIndex + 1);
                inputRef.current = document.getElementById(`line-${currentLineIndex+1}`) as HTMLDivElement;
            } 
            e.preventDefault();
            return;
        }

        if (value === 'Backspace') {
            setUserInput(input => input.slice(0, input.length - 1));
            return;
        }

        if (lines[currentLineIndex].trimmed[userInput.length] !== value) {
            setShakeError(true);
            setTimeout(() => setShakeError(false), 820);
            return;
        }

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
        <div 
            className="write-over-container" 
            onKeyPress={handleKeyPress} 
            tabIndex={0} 
            ref={containerRef}
        >
            {lines.map((line, index) => (
                <div id={`line-${index}`} key={index}>
                    {index === currentLineIndex ? (
                        <div style={{position: 'relative'}}>
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
                                children={line.original.replace(/\t/g, '    ')}
                            />
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
    );
};