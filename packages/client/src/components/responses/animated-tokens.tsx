import { useEffect, useRef, useState } from "react";
import { HoverableExplainCode } from "./hoverable-animated-token";
import React from "react";

interface Token {
  code: string;
  explanation: string;
}

interface AnimatedTokensProps {
  tokens: Token[];
}

export const AnimatedTokens: React.FC<{ tokens: AnimatedTokensProps[] }> = ({ tokens }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="animated-container" ref={containerRef}>
        {tokens.map((animation, animationIndex) => (
        <div className="tokens-container" key={animationIndex}>
          {animation.tokens.map((token, tokenIndex) => (
            <HoverableExplainCode
              key={tokenIndex}
              content={token.code || ""}
              explanation={token.explanation || ""}
            />
          ))}
          <br /> 
        </div>
      ))}
    </div>
  );
};
