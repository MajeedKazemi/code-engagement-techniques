import { getIconSVG } from "../../utils/icons";
import { HoverableExplainCode } from "./hoverable-explain-code";

interface IProps {
    title?: string;
    code?: {
        content?: string;
        explanation?: string;
    }[];
}

export const PseudoCodeHoverable = (props: IProps) => {
    return (
        <div className="hoverable-code-container">
            <div className="hoverable-code-header">
                {getIconSVG("cursor-arrow-rays", "response-header-icon")}
                Hover over each line to see detailed explanation:
            </div>

            {props.title && props.title.length > 0 && (
                <div className="hoverable-code-subtitle">
                    <b>{"> " + props.title + ":"}</b>
                </div>
            )}

            <div className="hoverable-code-content">
                {props.code &&
                    props.code.map((line, index) => {
                        console.log("line", line);
                        return (
                            <HoverableExplainCode
                                content={line.content || ""}
                                explanation={line.explanation || ""}
                                key={JSON.stringify(line) + index.toString()}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
