import { useContext, useState } from "react";
import { getIconSVG } from "../../utils/icons";
import IconsDoc from "../docs/icons-doc";
import { HoverableExplainCode } from "./hoverable-explain-code";
import { AuthContext } from "../../context";
import { apiLogEvents, logError } from "../../api/api";

interface PseudoCodeProps {
    goals: PseudoCodeSubgoals[];
    wholeCode: string;
    taskID: string;
}


interface PseudoCodeSubgoals {
    title: string;
    code: PesudoInterface[];
}

interface PesudoInterface {
    indent: number;
    code: string;
    pseudo: string;
    syntax_hint: string;
    explanation: string;
}

export const PseudoCodeHoverable: React.FC<PseudoCodeProps> = ({ goals, wholeCode, taskID }) => {
    const [isOpen, setIsOpen] = useState(Array(goals.length).fill(false));
    const { context, setContext } = useContext(AuthContext);

    // clicks to open/close subgoal event
    // - subgoal name: {string}
    // - action: {`“open” | “close”`}

    const handleClick = (index: number) => {
        let temp = [...isOpen];
        temp[index] = !temp[index];


        apiLogEvents(
            context?.token,
            taskID,
            "pseudocode clicks to open close subgoal event",
            {
              type: "pseudocode clicks to open close subgoal event",
                "subgoal-name": goals[index].title,
                "action": temp[index] ? "open" : "close"
            },
          )
            .then(() => {})
            .catch((error) => {
                logError("sendLog: " + error.toString());
        });

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
                                            taskID={taskID}
                                            wholeCode={wholeCode}
                                            syntaxHint={line.syntax_hint || ""}
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
