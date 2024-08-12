import React, { useContext } from "react";

import { apiUserNextTask, logError } from "../api/api";
import { CodingTask } from "../components/coding-task";
import { Layout } from "../components/layout";
import { Loader } from "../components/loader";
import { MultipleChoiceTask } from "../components/multiple-choice-task";
import { WatchTutorialTask } from "../components/watch-video-task";
import { AuthContext } from "../context";
import { EditorType, TaskType } from "../utils/constants";

const mapCharToEditorType = (char: string): EditorType => {
    switch (char) {
        case 'A':
            return EditorType.baseline;
        case 'B':
            return EditorType.stepByStep;
        case 'C':
            return EditorType.leadReveal;
        default:
            return EditorType.baseline;
    }
};

export const TasksPage = () => {
    const { context } = useContext(AuthContext);
    const [loading, setLoading] = React.useState(false);
    const [task, setTask] = React.useState<any>(null);

    const setNextTask = () => {
        setLoading(true);

        apiUserNextTask(context?.token)
            .then(async (response) => {
                const data = await response.json();
                setTask(data.task);

                setLoading(false);
            })
            .catch((error: any) => {
                logError(error.toString());
            });
    };

    const getCurrentEditorType = (id: number|string, types: any): EditorType => {
        //id might be string int
        let numericId: number = 0;

        if (typeof id === "number") {
            numericId = id;
        } else if (typeof id === "string") {
            numericId = parseInt(id, 10);
            if (isNaN(numericId)) {
                return EditorType.baseline; // Default value when id cannot be converted to a number
            }
        }

        if (numericId < 1 || numericId > 6) {
            return EditorType.baseline; // Default value for invalid ids
        }
        const position = Math.floor((numericId - 1) / 2);
        const typeChar = types.type.charAt(position);
        // console.log("position", position);
        // console.log("typeChar", typeChar);

        return mapCharToEditorType(typeChar);
    };
    

    const getTaskComponent = () => {
        switch (task.type) {
            case TaskType.Authoring:
                return (
                    <CodingTask
                        key={task.id}
                        taskId={task.id}
                        output={task.output}
                        solution={task.solution}
                        description={task.description}
                        timeLimit={task.timeLimit}
                        starterCode={
                            task.type === TaskType.Authoring
                                ? ""
                                : task.starterCode
                        }
                        onCompletion={setNextTask}
                        technique={
                            getCurrentEditorType(task.id, context?.user?.editorType ? context.user.editorType : "ABC")
                        }
                        taskType={task.type}
                    ></CodingTask>
                );
            case TaskType.Modifying:
            case TaskType.MultipleChoice:
                return <MultipleChoiceTask
                    key={task.id}
                    id={task.id}
                    description={task.description}
                    choices={task.choices}
                    onCompletion={setNextTask}
                    taskType={task.type}
                ></MultipleChoiceTask>;
            case TaskType.Coding:
                return (
                    <CodingTask
                        key={task.id}
                        taskId={task.id}
                        output={task.output}
                        solution={task.solution}
                        description={task.description}
                        timeLimit={task.timeLimit}
                        starterCode={
                            task.type === TaskType.Authoring
                                ? ""
                                : task.starterCode
                        }
                        onCompletion={setNextTask}
                        technique={
                            getCurrentEditorType(task.id, context?.user?.editorType ? context.user.editorType : "ABC")
                        }
                        taskType={task.type}
                    ></CodingTask>
                );

            // case TaskType.MultipleChoice:
            //     return (
            //         <MultipleChoiceTask
            //             key={task.id}
            //             id={task.id}
            //             description={task.description}
            //             choices={task.choices}
            //             onCompletion={setNextTask}
            //             taskType={task.type}
            //         ></MultipleChoiceTask>
            //     );

            // case TaskType.ShortAnswer:
            //     return (
            //         <ShortAnswerTask
            //             key={task.id}
            //             id={task.id}
            //             description={task.description}
            //             onCompletion={setNextTask}
            //             taskType={task.type}
            //         ></ShortAnswerTask>
            //     );

            // case TaskType.WatchVideo:
            //     return (
            //         <WatchTutorialTask
            //             key={task.id}
            //             id={task.id}
            //             description={task.description}
            //             onCompletion={setNextTask}
            //             taskType={task.type}
            //         ></WatchTutorialTask>
            //     );
        }
    };

    React.useEffect(() => {
        setNextTask();
    }, []);

    if (!loading && !task)
        return (
            <Layout>
                <div className="container">
                    <div className="card p-md">
                        <p>
                            Congratulations, you have finished all the tasks!
                            Please wait for further instructions.
                        </p>
                    </div>
                </div>
            </Layout>
        );

    return <Layout>{task ? getTaskComponent() : <Loader />}</Layout>;
};
