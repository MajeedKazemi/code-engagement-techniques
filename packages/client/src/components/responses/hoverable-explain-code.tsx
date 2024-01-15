import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlock, highlightPsudo } from "../../utils/utils";

interface IProps {
    content: string;
    explanation: string | null;
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
            className="hoverable-code-line-container"
        >   
            {/* <span className={"hoverable-code"}>
                {highlightCodeBlock(props.content)}
            </span> */}
            <span onMouseEnter={() => {
                setHovering(true);
            }}
            onMouseLeave={() => {
                setHovering(false);
            }}
            
            className={"hoverable-code"} 
            
            dangerouslySetInnerHTML={{ __html: highlightPsudo(highlightCodeBlock(props.content)) }} />
            {hovering && props.explanation && (
                <div
                    className="hoverable-code-line-explanation"
                    onMouseEnter={() => {
                        setHovering(true);
                    }}
                    onMouseLeave={() => {
                        setHovering(false);
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightPsudo(props.explanation) }}
                ></div>
            )}
            <div className="lightbulb">light</div>
        </div>
    );
};
