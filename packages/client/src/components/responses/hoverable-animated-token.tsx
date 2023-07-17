import React, { useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlockCode } from "../../utils/utils";

interface IProps {
    isAfterActive: boolean;
    content: string;
    explanation: string | null;
    isActive: boolean;
    id: string;
    tokenType: string;
}

export const HoverableExplainCode = (props: IProps) => {
    const [hovering, setHovering] = useState(false);

    return (
        <div
            id={props.id}
            className={`hoverable-token ${props.isActive ? "active" : ""}`}
            onMouseEnter={() => {
                setHovering(true);
            }}
            onMouseLeave={() => {
                setHovering(false);
            }}
        >   
            {/* <span className={"hoverable-code"}>
                {highlightCodeBlock(props.content)}
            </span> */}
            <span className={`hoverable-code ${props.isAfterActive ? "grayed" : ""}`} dangerouslySetInnerHTML={{ __html: highlightCodeBlockCode(props.content) }} />
            {hovering && props.explanation && (
                <div
                    className="hoverable-code-line-explanation"
                    onMouseEnter={() => {
                        setHovering(true);
                    }}
                    onMouseLeave={() => {
                        setHovering(false);
                    }}
                    dangerouslySetInnerHTML={{
                        __html: highlightCode(
                            props.explanation,
                            "exp-inline-code"
                        ),
                    }}
                ></div>
            )}
        </div>
    );
};
