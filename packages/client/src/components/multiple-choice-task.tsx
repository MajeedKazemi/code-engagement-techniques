import * as monaco from "monaco-editor";
import { Fragment, useContext, useEffect, useRef, useState } from "react";

import { apiUserSubmitTask, logError } from "../api/api";
import { AuthContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";
import { Button } from "./button";

interface IMultipleChoiceTaskProps {
    id: string;
    description: string;
    choices?: string[];

    taskType: TaskType;
    correspondingQuestion: number;
    topic: string;
    onCompletion: () => void;
}

export const MultipleChoiceTask = (props: IMultipleChoiceTaskProps) => {
    const { context } = useContext(AuthContext);
    const [completed, setCompleted] = useState(false);
    const [userChoice, setUserChoice] = useState<number | null>(null);
    const [userChoiceText, setUserChoiceText] = useState<string | null>(null);
    const [canSubmit, setCanSubmit] = useState(false);
    const [startedAt, setStartedAt] = useState(new Date());
    const taskContainerEl = useRef<HTMLDivElement>(null);
    const [editorType, setEditorType] = useState<string>("A");
    const [questionDescription, setQuestionDescription] = useState<string>("");
    const [questionChoices, setQuestionChoices] = useState<string[]>([]);

    const handleSubmitCode = () => {
        apiUserSubmitTask(
            context?.token,
            props.id,
            { choiceIndex: userChoice, choiceText: userChoiceText },
            new Date(),
            startedAt
        )
            .then(async (response) => {
                const data = await response.json();

                setCompleted(true);
                props.onCompletion();
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    };

    useEffect(() => {
        if (userChoice !== null && userChoice >= 0) {
            setCanSubmit(true);
        } else {
            setCanSubmit(false);
        }
    }, [userChoice]);

    useEffect(() => {
        if (context?.user?.editorType) {
            setEditorType(
                context?.user?.editorType[props.correspondingQuestion]
            );
        }
    }, []);

    useEffect(() => {
        if (editorType === "A") {
            setQuestionDescription(props.description);
            setQuestionChoices(props.choices!);
        } else if (editorType === "B") {
            if (props.topic === "Frustrating") {
                setQuestionDescription(
                    "How frustrating was it to go through the additional steps in this AI system? (Additional Steps: the part where the AI system had you trace the code step by step and answer questions about different parts of the generated code."
                );
                setQuestionChoices([
                    "1: Not at all Frustrating",
                    "2: Slightly Frustrating",
                    "3: Moderately Frustrating",
                    "4: Very Frustrating",
                    "5: Extremely Frustrating",
                ]);
            } else if (props.topic === "Willing") {
                setQuestionDescription(
                    "How willing are you to go through these additional steps in the future to understand AI-generated code? (Additional Steps: the part where the AI system had you trace the code step by step and answer questions about different parts of the generated code."
                );
                setQuestionChoices([
                    "1: Not at all Willing",
                    "2: Slightly Willing",
                    "3: Moderately Willing",
                    "4: Very Willing",
                    "5: Extremely Willing",
                ]);
            } else if(props.topic === "video") {
                setQuestionDescription(
                    `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
  width="900"
  height="550"
  src="https://www.youtube.com/embed/V0VzHVzMszk"
  title="Study Instructions"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>`);
                setQuestionChoices(props.choices!);
            } else {
                setQuestionDescription(props.description);
                setQuestionChoices(props.choices!);
            }
        } else if (editorType === "C") {
            if (props.topic === "Frustrating") {
                setQuestionDescription(
                    "How frustrating was it to go through the additional steps in this AI system? (Additional Steps: the part of the AI system that had you answer questions about how to solve each part of the task before revealing its corresponding code."
                );
                setQuestionChoices([
                    "1: Not at all Frustrating",
                    "2: Slightly Frustrating",
                    "3: Moderately Frustrating",
                    "4: Very Frustrating",
                    "5: Extremely Frustrating",
                ]);
            } else if (props.topic === "Willing") {
                setQuestionDescription(
                    "How willing are you to go through these additional steps in the future to understand AI-generated code? (Additional Steps: the part of the AI system that had you answer questions about how to solve each part of the task before revealing its corresponding code."
                );
                setQuestionChoices([
                    "1: Not at all Willing",
                    "2: Slightly Willing",
                    "3: Moderately Willing",
                    "4: Very Willing",
                    "5: Extremely Willing",
                ]);
            } else if (props.topic === "video") {
                setQuestionDescription(
                    `<h1>Watch the Following Video</h1>
<br/>
<br/>
<p>Here is a short video that explains what you will be doing in the study</p>
<iframe
  width="900"
  height="550"
  src="https://www.youtube.com/embed/gMCmsjNzmgY"
  title="Study Instructions"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
<br/>
<br/>
<h3>Did you watch the video and learn about the study instructions?</h3>`);
                setQuestionChoices(props.choices!);
            } else {
                setQuestionDescription(props.description);
                setQuestionChoices(props.choices!);
            }
        }
    }, [editorType]);

    useEffect(() => {
        if (taskContainerEl.current) {
            Array.from(
                taskContainerEl.current.getElementsByClassName("code-block")
            )?.forEach((block) => {
                monaco.editor.colorizeElement(block as HTMLElement, {
                    theme: "vs",
                    mimeType: "python",
                    tabSize: 4,
                });
            });
        }
    }, [taskContainerEl.current]);

    return (
        <div className="simple-task-container">
            <section className="simple-task-info">
                <div ref={taskContainerEl}>
                    <span className="task-subtitle">
                        <p
                            dangerouslySetInnerHTML={{
                                __html: questionDescription,
                            }}
                        ></p>
                    </span>
                    <hr />
                    <form>
                        <p>Select from one of the following options:</p>
                        {questionChoices &&
                            questionChoices.map((choice, index) => {
                                return (
                                    <div
                                        className="task-response-item"
                                        key={index}
                                    >
                                        <input
                                            className="task-response-radio"
                                            type="radio"
                                            name="choice"
                                            value={index}
                                            checked={userChoice === index}
                                            onChange={() => {
                                                setUserChoice(index);
                                                setUserChoiceText(choice);
                                            }}
                                        />
                                        <label
                                            dangerouslySetInnerHTML={{
                                                __html: choice,
                                            }}
                                            onClick={() => {
                                                setUserChoice(index);
                                                setUserChoiceText(choice);
                                            }}
                                        ></label>
                                        <br />
                                    </div>
                                );
                            })}
                    </form>
                </div>

                <div className="">
                    <br />
                    <Button onClick={handleSubmitCode} disabled={!canSubmit}>
                        submit answer
                    </Button>
                </div>
            </section>
        </div>
    );
};
