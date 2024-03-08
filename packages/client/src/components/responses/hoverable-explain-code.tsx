import * as monaco from "monaco-editor";
import React, { useContext, useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlock, highlightPsudo } from "../../utils/utils";
import IconsDoc from "../docs/icons-doc";
import { HighlightedPartWithoutTab } from "../docs/highlight-code";
import { apiLogEvents, logError, pseudoGetHintLevel1 } from "../../api/api";
import { AuthContext } from "../../context";

interface IProps {
    indent: number;
    content: string;
    explanation: string | null;
    code: string;
    taskID: string;
    wholeCode: string;
}

export const HoverableExplainCode = (props: IProps) => {
    const [hovering, setHovering] = useState(false);
    const [hoveringHovered, setHoveringHovered] = useState(false);
    const [hintLevel, setHintLevel] = useState(0);
    const { context, setContext } = useContext(AuthContext);
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
        apiLogEvents(
            context?.token,
            props.taskID,
            "clicking see code hints event pseudocode",
            {
              type: "clicking see code hints event pseudocode",
              "current-state-of-code-in-editor": props.wholeCode,
              "displayed-code-hint": props.code
            },
          )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
        });
        setHintLevel(2);
    }

    const getHintLevel1 = () => {
        // do something with explanation pass to the LLM
        //get the hint from the server
        try {
            pseudoGetHintLevel1(
                context?.token,
                props.code,
                props.wholeCode,
                props.explanation ? props.explanation : "",
            )
                .then(async (response) => {

                    if (response.ok) {
                        const data = await response.json();

                        apiLogEvents(
                            context?.token,
                            props.taskID,
                            "clicking see implementation hints event pseudocode",
                            {
                              type: "clicking see implementation hints event pseudocode",
                              "current-state-of-code-in-editor": props.wholeCode,
                              "diplayed-explanation": props.explanation,
                              "displayed-implementation-hint": data.level1Hint
                            },
                          )
                            .then(() => {})
                            .catch((error) => {
                                logError("sendLog: " + error.toString());
                        });
                
                        setHint1(data.level1Hint);
                        setHintLevel(1);
                                  
                    }
                })
                .catch((error) => {
                    logError(error.toString());
                });
        } catch (error: any) {
            logError(error.toString());
        }
    };


    // - clicking see implementation hints event
	// 	- current state of code in editor {string}
	// 	- displayed implementation hint {string}
	// - click see code hint event
	// 	- current state of code in editor {string}
	// 	- displayed code hint {string}


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
                            {hint1}
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
