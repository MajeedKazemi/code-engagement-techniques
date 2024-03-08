import React, { useEffect, useRef, useState } from "react";

import { highlightCode, highlightCodeBlockCode } from "../../utils/utils";

interface IProps {
    isAfterActive: boolean;
    content: string;
    explanation: string | null;
    isActive: boolean;
    id: string;
    fullContent: Token[];
    children: number[];
    treeContent: TreeToken[];
    currentActiveIndex: () => number;
}

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

export const HoverableExplainCode = (props: IProps) => {
    const [hovering, setHovering] = useState(false);
    const content = props.content || "";
    const closingParenthesisIndex = content.lastIndexOf(")");
    let firstPart = content;
    let lastPart = "";
    if (
        closingParenthesisIndex !== -1 &&
        closingParenthesisIndex === content.length - 1
    ) {
        firstPart = content.slice(0, closingParenthesisIndex);
        lastPart = content.slice(closingParenthesisIndex);
    }

    function findRealIndex(treeTokens: Token[], index: number): number {
        for (let i = 0; i < treeTokens.length; i++) {
            if (treeTokens[i].index === index) {
                return i;
            }
        }
        return index;
    }

    return (
        <div
            id={props.id}
            className={`hoverable-token ${props.isActive ? "active" : ""}`}
        >
            {/* <span className={"hoverable-code"}>
                {highlightCodeBlock(props.content)}
            </span> */}
            <div className="token-child-container">
                <span
                    onMouseEnter={() => {
                        setHovering(true);
                    }}
                    onMouseLeave={() => {
                        setHovering(false);
                    }}
                    className={`hoverable-code ${
                        props.isAfterActive ? "grayed" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: highlightCodeBlockCode(firstPart),
                    }}
                />
                {props.children?.map((child) => (
                    <HoverableExplainCode
                        id={`animated-token-${child}`}
                        content={
                            props.fullContent[
                                findRealIndex(props.fullContent, child)
                            ].code || ""
                        }
                        explanation={
                            props.fullContent[
                                findRealIndex(props.fullContent, child)
                            ].explanation || ""
                        }
                        isActive={
                            props.fullContent[
                                findRealIndex(props.fullContent, child)
                            ].index <= props.currentActiveIndex()
                        }
                        isAfterActive={
                            props.fullContent[
                                findRealIndex(props.fullContent, child)
                            ].index < props.currentActiveIndex()
                        }
                        fullContent={props.fullContent}
                        children={
                            props.treeContent[
                                findRealIndex(props.fullContent, child)
                            ].children
                        }
                        treeContent={props.treeContent}
                        currentActiveIndex={props.currentActiveIndex}
                    />
                ))}
                <span
                    className={`hoverable-code ${
                        props.isAfterActive ? "grayed" : ""
                    }`}
                    dangerouslySetInnerHTML={{
                        __html: highlightCodeBlockCode(lastPart),
                    }}
                />
            </div>

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
                            props.explanation
                            // ,"exp-inline-code"
                        ),
                    }}
                ></div>
            )}
        </div>
    );
};
