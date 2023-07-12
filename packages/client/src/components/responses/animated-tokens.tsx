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
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const animateTokens = async () => {
      for (let i = 0; i < tokens.length; i++) {
        const animation = tokens[i];

        for (let j = 0; j < animation.tokens.length; j++) {
          await new Promise((resolve) => setTimeout(resolve, 200));

          setActiveTokenIndex(j);
        }
      }
    };

    animateTokens();
  }, [tokens]);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + 200;

    const animationFrame = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / 200, 1);

      setOpacity(progress);

      if (now < endTime) {
        requestAnimationFrame(animationFrame);
      } else {
        setActiveTokenIndex((prevIndex) => prevIndex + 1);
        setOpacity(0);
      }
    };

    const timeout = setTimeout(animationFrame, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [activeTokenIndex]);

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
                isActive={animationIndex < currentIteration || (animationIndex === currentIteration && tokenIndex <= activeTokenIndex)}
                style={{ opacity: animationIndex === currentIteration && tokenIndex === activeTokenIndex ? opacity : 1 }}
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
