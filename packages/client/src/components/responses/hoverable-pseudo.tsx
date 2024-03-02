import { useState } from "react";
import { getIconSVG } from "../../utils/icons";
import IconsDoc from "../docs/icons-doc";
import { HoverableExplainCode } from "./hoverable-explain-code";

interface PseudoCodeProps {
    goals: PseudoCodeSubgoals[]
}


interface PseudoCodeSubgoals {
    title: string;
    code: PesudoInterface[];
}

interface PesudoInterface {
    indent: number;
    code: string;
    pseudo: string;
    explanation: string;
}

export const PseudoCodeHoverable: React.FC<PseudoCodeProps> = ({ goals }) => {
    const [isOpen, setIsOpen] = useState(Array(goals.length).fill(false));

    const handleClick = (index: number) => {
        let temp = [...isOpen];
        temp[index] = !temp[index];
        setIsOpen(temp);
    }

    return (
        <div className="hoverable-code-container">
            <div className="">
                {goals.map((goal, index) => {
                    return (
                        <div key={index.toString()}>
                            <div className="hoverable-code-header">
                                <div className={`expandable-button ${isOpen[index] ? 'minus' : ''}`} onClick={() => handleClick(index)}>
                                    {
                                        isOpen[index] ? 
                                        <IconsDoc iconName="minus"/> 
                                        : 
                                        <IconsDoc iconName="plus"/>
                                    }
                                </div>
                                {goal.title}
                            </div>
                            <div className={`hoverable-code-content-container ${isOpen[index] ? 'expand' : ''}`}>
                                {goal.code.map((line, index) => {
                                    return (
                                        <HoverableExplainCode
                                            indent={line.indent || 0}
                                            content={line.pseudo || ""}
                                            explanation={line.explanation || ""}
                                            code={line.code || ""}
                                            key={JSON.stringify(line) + index.toString()}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
                <div className="hoverable-code-footer">
                </div>
                </div>
        </div>
    );
};
