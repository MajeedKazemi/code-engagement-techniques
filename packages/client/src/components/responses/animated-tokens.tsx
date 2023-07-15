import React, { useEffect, useState } from "react";
import { HoverableExplainCode } from "./hoverable-animated-token";
import { highlightCode, highlightCodeBlock } from "../../utils/utils";
import Slider from "./token-slider";


interface Token {
  index: number;
  code: string;
  explanation: string;
}

interface AnimatedTokensProps {
  tokens: Token[];
}

  
// export const AnimatedTokens: React.FC<{ tokens: AnimatedTokensProps[] }> = ({ tokens }) => {
//   const [activeTokenIndex, setActiveTokenIndex] = useState(0);
//   const [currentIteration, setCurrentIteration] = useState(0);
//   const [fullWidthDivContent, setFullWidthDivContent] = useState("");
  

//   useEffect(() => {
//     const animateTokens = async () => {
//       for (let i = 0; i <= tokens.length; i++) {

//         setCurrentIteration(i);

//         if(i < tokens.length) {
//             const animation = tokens[i];
//             for (let j = 0; j < animation.tokens.length; j++) {
//                 setActiveTokenIndex(animation.tokens[j].index);
//                 setFullWidthDivContent(animation.tokens[j].explanation || "");
//                 await new Promise((resolve) => setTimeout(resolve, 4000));

//             }
//         }

//       }
//     };

//     animateTokens();
//   }, [tokens]);

//   return (
//     <div className="animated-container">
//       {tokens.map((animation, animationIndex) => (
//         <div className="tokens-container" key={animationIndex}>
//             {(animationIndex === currentIteration) && (
//             <>
//             {fullWidthDivContent.length > 0 && (
//               <div className={`goal-container`}>
//                 <span className={"hoverable-code"} dangerouslySetInnerHTML={{ __html: highlightCode(highlightCodeBlock(fullWidthDivContent)) }} />
//              </div>
//           )}
//               {/* <br /> */}
//             </>
//           )}
//           {animation.tokens.map((token, tokenIndex) => (
//             <React.Fragment key={tokenIndex}>
//               <HoverableExplainCode
//                 key={tokenIndex}
//                 content={token.code || ""}
//                 explanation={token.explanation || ""}
//                 isActive={token.index <= activeTokenIndex}
//                 isAfterActive={token.index < activeTokenIndex}
//               />
//             </React.Fragment>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// };

export const AnimatedTokens: React.FC<{ tokens: AnimatedTokensProps[] }> = ({ tokens }) => {
    const [activeTokenIndex, setActiveTokenIndex] = useState(0);
    const [prevActiveTokenIndex, setPrevActiveTokenIndex] = useState(0);
    const [currentIteration, setCurrentIteration] = useState(0);
    const [prevCurrentIteration, setPrevCurrentIteration] = useState(0);
    const [fullWidthDivContent, setFullWidthDivContent] = useState("");
    const [prevContent, setPrevContent] = useState("");
    const [isAutoMode, setIsAutoMode] = useState(true);

    let animationInterval: number | null = null;
    
    const handleIndexChange = (index: number) => {
        if (isAutoMode) {
          setActiveTokenIndex(index);
        } else {
          setPrevActiveTokenIndex(index);
          findExplanationByIndex(index);
        }
      };
      

    const tokensCopy: AnimatedTokensProps[] = JSON.parse(JSON.stringify(tokens));

    function findExplanationByIndex(index: number){
        let i = 0;
        for (const animation of tokens) {
          for (const token of animation.tokens) {
            if (token.index === index) {
              setPrevContent(token.explanation);
              setPrevCurrentIteration(i);
            }
          }
          i += 1;
        }
    }

    let maxIndex = -Infinity;

    tokens.forEach((animatedTokensProps) => {
    animatedTokensProps.tokens.forEach((token) => {
        if (token.index > maxIndex) {
        maxIndex = token.index;
        }
    });
    });
      
  
    useEffect(() => {
      const animateTokens = async () => {
        for (let i = 0; i <= tokens.length; i++) {
          setCurrentIteration(i);
  
          if (i < tokens.length) {
            const animation = tokens[i];
            for (let j = 0; j < animation.tokens.length; j++) {
              setActiveTokenIndex(animation.tokens[j].index);
              setFullWidthDivContent(animation.tokens[j].explanation || "");
  
              if (isAutoMode) {
                await new Promise((resolve) => {
                  animationInterval = window.setTimeout(resolve, 4000);
                });
              } else {
                setPrevActiveTokenIndex(activeTokenIndex);
                setPrevCurrentIteration(currentIteration);
                findExplanationByIndex(activeTokenIndex);
                await new Promise((resolve) => {
                  animationInterval = window.setTimeout(resolve, 0);
                });
              }
            }
          }
        }
      };
  
      animateTokens();
  
      return () => {
        if (animationInterval) {
          window.clearTimeout(animationInterval);
        }
      };
    }, [tokens, isAutoMode]);
  
    const handleNext = () => {
        let prevActiveToken = document.getElementById(`animated-token-${prevActiveTokenIndex}`);
        if (prevActiveToken && "active" !in prevActiveToken.classList) {
            const prevActiveTokenHoverableCode = prevActiveToken.getElementsByClassName("hoverable-code")[0];
            if (prevActiveTokenHoverableCode && "grayed" !in prevActiveToken.classList) {
                prevActiveTokenHoverableCode.classList.add("grayed");
            }
        }
        setPrevActiveTokenIndex(prevActiveTokenIndex + 1);
        prevActiveToken = document.getElementById(`animated-token-${prevActiveTokenIndex}`);
        if (prevActiveToken && "active" !in prevActiveToken.classList){
            prevActiveToken.classList.add("active");
            const prevActiveTokenHoverableCode = prevActiveToken.getElementsByClassName("hoverable-code")[0];
            if (prevActiveTokenHoverableCode && "grayed" !in prevActiveToken.classList) {
                prevActiveTokenHoverableCode.classList.add("grayed");
            }
        }
        findExplanationByIndex(prevActiveTokenIndex+1);
    };
  
    const handlePrev = () => {
    
        let prevActiveToken = document.getElementById(`animated-token-${prevActiveTokenIndex}`);
        if (prevActiveToken && "active" in prevActiveToken.classList) {
            prevActiveToken.classList.remove("active");
            const prevActiveTokenHoverableCode = prevActiveToken.getElementsByClassName("hoverable-code")[0];
            if (prevActiveTokenHoverableCode && "grayed" in prevActiveToken.classList) {
                prevActiveTokenHoverableCode.classList.remove("grayed");
            }
        }
        setPrevActiveTokenIndex(prevActiveTokenIndex - 1);
        prevActiveToken = document.getElementById(`animated-token-${prevActiveTokenIndex}`);
        if (prevActiveToken && "active" in prevActiveToken.classList) {
            const prevActiveTokenHoverableCode = prevActiveToken.getElementsByClassName("hoverable-code")[0];
            if (prevActiveTokenHoverableCode && "active" in prevActiveToken.classList) {
                prevActiveTokenHoverableCode.classList.remove("grayed");
            }
        }
        findExplanationByIndex(prevActiveTokenIndex-1);
    };
  
    const handleAuto = () => {
      setIsAutoMode((prevAutoMode) => !prevAutoMode);
    };

    const handleStopAutoMode = () => {
        setIsAutoMode(false); 
    };

  
    return (
      <div className="animated-container">
        <Slider maxIndex={maxIndex} 
        currentIndex={isAutoMode? activeTokenIndex:prevActiveTokenIndex} 
        onChangeIndex={handleIndexChange} onStopAutoMode={handleStopAutoMode}/>
        <button onClick={handlePrev} disabled={prevActiveTokenIndex === 0 || isAutoMode}>
          Prev
        </button>
        <button onClick={handleNext} disabled={prevActiveTokenIndex === maxIndex || isAutoMode}>
          Next
        </button>
        <button onClick={handleAuto}>
          {isAutoMode ? "Stop" : "Auto"}
        </button>
        {!isAutoMode && (
            tokensCopy.map((animation, animationIndex) => (
                <div className="tokens-container" key={animationIndex}>
                    {animationIndex === prevCurrentIteration && (
                    <>
                        {prevContent && prevContent.length > 0 && (
                        <div className="goal-container">
                            <span className="hoverable-code" dangerouslySetInnerHTML={{ __html: highlightCode(highlightCodeBlock(prevContent)) }} />
                        </div>
                        )}
                    </>
                    )}
                  {animation.tokens.map((token, tokenIndex) => (
                    <React.Fragment key={tokenIndex}>
                      <HoverableExplainCode
                        id={`animated-token-${token.index}`}
                        key={tokenIndex}
                        content={token.code || ""}
                        explanation={token.explanation || ""}
                        isActive={token.index <= prevActiveTokenIndex}
                        isAfterActive={token.index < prevActiveTokenIndex}
                      />
                    </React.Fragment>
                  ))}
                </div>
              )))}
        {isAutoMode && tokens.map((animation, animationIndex) => (
          <div className="tokens-container" key={animationIndex}>
            {animationIndex === currentIteration && (
              <>
                {fullWidthDivContent.length > 0 && (
                  <div className="goal-container">
                    <span className="hoverable-code" dangerouslySetInnerHTML={{ __html: highlightCode(highlightCodeBlock(fullWidthDivContent)) }} />
                  </div>
                )}
              </>
            )}
            {animation.tokens.map((token, tokenIndex) => (
              <React.Fragment key={tokenIndex}>
                <HoverableExplainCode
                  id={`animated-token-${token.index}`}
                  key={tokenIndex}
                  content={token.code || ""}
                  explanation={token.explanation || ""}
                  isActive={token.index <= activeTokenIndex}
                  isAfterActive={token.index < activeTokenIndex}
                />
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  };
  