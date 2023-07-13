import React, { useEffect, useRef, useState } from "react";
import { HoverableExplainCode } from "./hoverable-animated-token";

interface Token {
  code: string;
  explanation: string;
}

interface AnimatedTokensProps {
  tokens: Token[];
}

export const AnimatedTokens: React.FC<{ tokens: AnimatedTokensProps[] }> = ({ tokens }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTokenIndex, setActiveTokenIndex] = useState(0);
  const [currentIteration, setCurrentIteration] = useState(0);

  useEffect(() => {
    const animateTokens = async () => {
      for (let i = 0; i < tokens.length; i++) {
        const animation = tokens[i];

        for (let j = 0; j < animation.tokens.length; j++) {
          setActiveTokenIndex(j);

          await new Promise((resolve) => setTimeout(resolve, 2000));
        }

        setCurrentIteration(i + 1);

        if (i !== tokens.length - 1) {
          await new Promise((resolve) => setTimeout(resolve, 2000));
        }
      }
    };

    animateTokens();
  }, [tokens]);

  const handleNextLineClick = () => {
    setCurrentIteration((prevIteration) => prevIteration + 1);
    setActiveTokenIndex(0);
  };

  return (
    <div className="animated-container" ref={containerRef}>
      {tokens.map((animation, animationIndex) => (
        <div className="tokens-container" key={animationIndex}>
          {animation.tokens.map((token, tokenIndex) => (
            <React.Fragment key={tokenIndex}>
              <HoverableExplainCode
                key={tokenIndex}
                content={token.code || ""}
                explanation={token.explanation || ""}
                isActive={
                  animationIndex < currentIteration ||
                  (animationIndex === currentIteration && tokenIndex <= activeTokenIndex)
                }
              />
            </React.Fragment>
          ))}
          {animationIndex === currentIteration && currentIteration < tokens.length - 1 && (
            <>
              <button onClick={handleNextLineClick}>Next Line</button>
              <br />
            </>
          )}
        </div>
      ))}
    </div>
  );
};
