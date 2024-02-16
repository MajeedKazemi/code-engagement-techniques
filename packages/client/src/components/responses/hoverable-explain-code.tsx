import * as monaco from "monaco-editor";
import React, { useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlock, highlightPsudo } from "../../utils/utils";
import IconsDoc from "../docs/icons-doc";
import { HighlightedPartWithoutTab } from "../docs/highlight-code";

interface IProps {
    indent: number;
    content: string;
    explanation: string | null;
    code: string;
}

export const HoverableExplainCode = (props: IProps) => {
    const [hovering, setHovering] = useState(false);
    const [hoveringHovered, setHoveringHovered] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const [hint1, setHint1] = useState("");
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

    const revealCode = () => {
        //get the code 
        setHintLevel(2);
    }

    const getHintLevel1 = () => {
        //get the hint from the server
        setHint1("here is some hints");
        setHintLevel(1);
    }

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
            
            className={"hoverable-code indent" + props.indent.toString() + ""} 
            
            dangerouslySetInnerHTML={{ __html: highlightPsudo(highlightCodeBlock(props.content))}} />
            {(hovering || hoveringHovered) && props.explanation && (
                <div onMouseEnter={() => {
                    setHoveringHovered(true);
                }}
                onMouseLeave={() => {
                    setHoveringHovered(false);
                }}
                className="hoverable-code-container-with-hint">
                    <div
                        className="hoverable-code-line-explanation"
                        dangerouslySetInnerHTML={{ __html: highlightPsudo(props.explanation) }}
                    ></div>
                    {hintLevel == 0 && 
                        <div className="hoverable-code-hint-level-1-button" onClick={getHintLevel1}>
                            <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                            see implementation hints &gt;
                        </div>
                    }
                    {hintLevel == 1 &&
                        <>
                        <div className="hoverable-code-hint-level-1">
                            
                        </div>
                        <div className="hoverable-code-hint-level-1-button" onClick={revealCode}>
                            <div className="hint-icon"><IconsDoc iconName='explaination'/></div>
                                see code &gt;
                        </div>
                        </>
                    }
                    {hintLevel == 2 &&
                        <>
                        <div className="hoverable-code-hint-level-1">
                            {hint1}
                        </div>
                        <div className="hoverable-code-hint-level-2">
                            <HighlightedPartWithoutTab part={props.code} />
                        </div>
                        </>
                    }
                </div>
            )}
            {/* <div className="lightbulb">light</div> */}
        </div>
    );
};
