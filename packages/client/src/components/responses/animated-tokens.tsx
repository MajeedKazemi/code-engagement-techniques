import React, { Children, Fragment, useEffect, useState } from "react";
import { HoverableExplainCode } from "./hoverable-animated-token";
import { highlightCode, highlightCodeBlockCode } from "../../utils/utils";
import Slider from "./token-slider";
import { FiChevronsLeft, FiChevronsRight, FiPause, FiPlay } from 'react-icons/fi';


interface Token {
  index: number;
  code: string;
  explanation: string;
  parent: number | null;
}

interface TreeToken {
    index: number;
    children: number[];
}


interface AnimatedTokensProps {
  tokens: Token[];
}

interface Tree {
    treeObject: TreeToken[];
}

export const AnimatedTokens: React.FC<{ tokens: AnimatedTokensProps[], tree:Tree[]  }> = ({ tokens, tree }) => {
    const [activeTokenIndex, setActiveTokenIndex] = useState(0);
    const [prevActiveTokenIndex, setPrevActiveTokenIndex] = useState(0);
    const [currentIteration, setCurrentIteration] = useState(0);
    const [prevCurrentIteration, setPrevCurrentIteration] = useState(0);
    const [fullWidthDivContent, setFullWidthDivContent] = useState("");
    const [prevContent, setPrevContent] = useState("");
    const [isAutoMode, setIsAutoMode] = useState(true);

    let animationInterval: number | null = null;

    const handleActiveTokenIndexChange = () => {
        if(isAutoMode){
            return activeTokenIndex;
        }else{
            return prevActiveTokenIndex;
        }
    };
    
    const handleIndexChange = (index: number) => {
        if (isAutoMode) {
          setActiveTokenIndex(index);
        } else {
          setPrevActiveTokenIndex(index);
          findExplanationByIndex(index);
        }
      };

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
        if (isAutoMode) {
            setIsAutoMode(false);
        }else{
            setActiveTokenIndex(prevActiveTokenIndex);
            setCurrentIteration(prevCurrentIteration);
            setFullWidthDivContent(prevContent);
            setIsAutoMode(true);
        }
    };

    const handleStopAutoMode = () => {
        setIsAutoMode(false); 
    };

  
    return (
      <div className="animated-container">
        {!isAutoMode && (
            tree.map((treeObjects, animationIndex) => (
                <div className="tokens-container" key={animationIndex}>
                    {animationIndex === prevCurrentIteration && (
                    <>
                        {prevContent && prevContent.length > 0 && (
                        <div className="goal-container">
                            <span className="hoverable-code" dangerouslySetInnerHTML={{ __html: highlightCode(highlightCodeBlockCode(prevContent)) }} />
                        </div>
                        )}
                    </>
                    )}
                  {treeObjects.treeObject.map((treeToken, tokenIndex) => (
              <React.Fragment key={tokenIndex}>
                {tokens[animationIndex].tokens[tokenIndex].parent == null && (
                    <HoverableExplainCode
                    id={`animated-token-${treeToken.index}`}
                    key={tokenIndex}
                    content={tokens[animationIndex].tokens[tokenIndex].code || ""}
                    explanation={tokens[animationIndex].tokens[tokenIndex].explanation || ""}
                    isActive={treeToken.index <= prevActiveTokenIndex}
                    isAfterActive={treeToken.index < prevActiveTokenIndex}
                    fullContent={tokens[animationIndex].tokens}
                    children={treeToken.children}
                    treeContent={treeObjects.treeObject}
                    currentActiveIndex={handleActiveTokenIndexChange}
                />
                )
                }
              </React.Fragment>
            
            ))}
                </div>
              )))}
        {isAutoMode && tree.map((treeObjects, animationIndex) => (
          <div className="tokens-container" key={animationIndex}>
            {animationIndex === currentIteration && (
              <>
                {fullWidthDivContent.length > 0 && (
                  <div className="goal-container" >
                    <span className="hoverable-code" dangerouslySetInnerHTML={{ __html: highlightCode(highlightCodeBlockCode(fullWidthDivContent)) }} />
                  </div>
                )}
              </>
            )}
            {treeObjects.treeObject.map((treeToken, tokenIndex) => (
              <React.Fragment key={tokenIndex}>
                {tokens[animationIndex].tokens[tokenIndex].parent == null && (
                <HoverableExplainCode
                    id={`animated-token-${treeToken.index}`}
                    key={tokenIndex}
                    content={tokens[animationIndex].tokens[tokenIndex].code || ""}
                    explanation={tokens[animationIndex].tokens[tokenIndex].explanation || ""}
                    isActive={treeToken.index <= activeTokenIndex}
                    isAfterActive={treeToken.index < activeTokenIndex}
                    fullContent={tokens[animationIndex].tokens}
                    children={treeToken.children}
                    treeContent={treeObjects.treeObject}
                    currentActiveIndex={handleActiveTokenIndexChange}
                />
                )}
              </React.Fragment>
            
            ))}
          </div>
        ))}
        <div className="quick-sliding-buttons-container">
            <button onClick={handleAuto}>
            {isAutoMode ? <FiPause size={24} color="grey" /> : <FiPlay size={24} color="grey" />}
            </button>
            <Slider maxIndex={maxIndex} 
            currentIndex={isAutoMode? activeTokenIndex:prevActiveTokenIndex} 
            onChangeIndex={handleIndexChange} onStopAutoMode={handleStopAutoMode}/>
            <div className="chevrons">
            <button onClick={handlePrev} disabled={prevActiveTokenIndex === 0 || isAutoMode}>
            <FiChevronsLeft size={24} />
            </button>
            <button onClick={handleNext}disabled={prevActiveTokenIndex === maxIndex || isAutoMode}>
            <FiChevronsRight size={24}/>
            </button>
            </div>
        </div>
        

      </div>
    );
  };
  