import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlock } from "../../utils/utils";

interface IProps {
    content: string;
    explanation: string | null;
    isActive: boolean;
    style: React.CSSProperties;
}

export const HoverableExplainCode = (props: IProps) => {
    const [hovering, setHovering] = useState(false);
    // const codeEl = useRef(null);

    // useEffect(() => {
    //     if (codeEl.current) {
    //         monaco.editor.colorizeElement(codeEl.current as HTMLElement, {
    //             theme: "dark",
    //             mimeType: "pseudo-code",
    //             tabSize: 4,
    //         });
    //     }
    // }, [codeEl]);

    return (
        <div
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
            <span className={"hoverable-code"} dangerouslySetInnerHTML={{ __html: highlightCodeBlock(props.content) }} />
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
