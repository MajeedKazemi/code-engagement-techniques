import express from "express";

import { IUser } from "../models/user";
import { UserTaskModel } from "../models/user-task";
import {
    AuthoringTask,
    ManualCodingTask,
    getNextTask,
    getTaskFromTaskId,
    getTaskSequenceFromTaskId,
    ModifyingTask,
    MultipleChoiceTask,
    ShortAnswerTask,
    WatchVideoTask,
} from "../tasks/tasks";
import { verifyUser } from "../utils/strategy";

export const tasksRouter = express.Router();

// get next task -> could be any type of task
tasksRouter.get("/next", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;

    if (userId !== undefined) {
        // searches through all of the tasks that the user has completed and find the next one (using their sequence number)
        UserTaskModel.find({
            userId,
            completed: true,
        })
            .sort({ sequence: 1 })
            .then((userTasks) => {
                res.send({ task: getNextTask(userTasks) });
            });
    }
});

// tasksRouter.get("/updateTaskId/", verifyUser, (req, res, next) => {

// });

// starts the timer for a task -> creates a user-task for the user and sets the startedAt
tasksRouter.post("/start", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, startedAt } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task !== undefined) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.save((err, userTask) => {
                        // have started before:

                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                canContinue: true,
                                startedAt: userTask.startedAt,
                                beingGraded: userTask.beingGraded,
                                checkingTime: calcCheckingTime(
                                    userTask.submissions
                                ),
                                feedback: getLastSubmissionFeedback(
                                    userTask.submissions
                                ),
                            });
                        }
                    });
                } else {
                    const userTask = new UserTaskModel({
                        sequence: getTaskSequenceFromTaskId(taskId),
                        userId,
                        taskId,
                        userTaskId: `${userId}_${taskId}`,
                        startedAt: startedAt,
                    });

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({ success: true, continue: false });
                        }
                    });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ success: false, error: "Invalid taskId" });
        }
    } else {
        res.statusCode = 500;
        res.send({ success: false, message: "missing userId or taskId" });
    }
});

// submits the task -> for author/modify tasks: pauses the timer and saves the data
// can be called with /finish to also mark the task as completed and go to the next task
tasksRouter.post("/eval-code", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, submittedAt, data } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            if (data !== undefined && data.code === undefined) {
                res.statusCode = 500;
                res.send({ message: `Missing code: ${data.code}` });
            }

            const checkResult = task.checkCode(data.code);

            if (checkResult.passed) {
                UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                    if (userTask) {
                        userTask.beingGraded = true;
                        userTask.savedCode = data.code;
                        userTask.lastSaveAt = submittedAt;

                        userTask.submissions.push({
                            code: data.code,
                            submittedAt: submittedAt,
                        });

                        userTask.save((err, userTask) => {
                            if (err) {
                                res.statusCode = 500;
                                res.send(err);
                            } else {
                                res.send({
                                    success: true,
                                });
                            }
                        });
                    } else {
                        res.statusCode = 500;
                        res.send({ message: "UserTask not found" });
                    }
                });
            }
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// checks the status of the task submission
tasksRouter.get("/grading-status/:taskId", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const taskId = req.params.taskId;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    res.send({
                        success: true,
                        passed: userTask.passed,
                        completed: userTask.completed,
                        beingGraded: userTask.beingGraded,
                        checkingTime: calcCheckingTime(userTask.submissions),
                        feedback: getLastSubmissionFeedback(
                            userTask.submissions
                        ),
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// finish task by the user
// either for a multiple-choice question, or if the user wants to simply go to the next task (in the latter case, it should be accompanied with a /grade request)
tasksRouter.post("/submit", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, finishedAt, data } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.finishedAt = finishedAt;
                    userTask.completed = true;
                    userTask.beingGraded = true;

                    userTask.submissions.push({
                        code: data.code,
                        submittedAt: finishedAt,
                    });

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                completed: true,
                            });
                        }
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else if (
            task instanceof MultipleChoiceTask ||
            task instanceof ShortAnswerTask ||
            task instanceof WatchVideoTask
        ) {
            const { startedAt } = req.body;

            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.finishedAt = finishedAt;
                    userTask.completed = true;
                    userTask.data = data;

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                completed: true,
                            });
                        }
                    });
                } else {
                    const userTask = new UserTaskModel({
                        sequence: getTaskSequenceFromTaskId(taskId),
                        userTaskId: `${userId}_${taskId}`,
                        userId,
                        taskId,
                        startedAt: startedAt,
                        finishedAt: finishedAt,
                        completed: true,
                        data: data,
                    });

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                                completed: true,
                            });
                        }
                    });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

tasksRouter.get("/get-task/:taskId", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const taskId = req.params.taskId;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task !== undefined) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    res.send({
                        task,
                        userTask,
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({ message: `No task was found with taskId: ${taskId}` });
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

tasksRouter.post("/log", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, type, log } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    if (userTask.log === undefined || userTask.log === null) {
                        userTask.log = [log];
                        console.log(log, userTask.log);
                    }
                    else
                    {
                        userTask.log = [...userTask.log, log];
                    }

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                            });
                        }
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({
                message: `No task was found with taskId: ${taskId}`,
            });
        }
    }
});

tasksRouter.post("/save-code", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId, code } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    userTask.savedCode = code;
                    userTask.lastSaveAt = new Date();

                    userTask.save((err, userTask) => {
                        if (err) {
                            res.statusCode = 500;
                            res.send(err);
                        } else {
                            res.send({
                                success: true,
                            });
                        }
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({
                message: `No task was found with taskId: ${taskId}`,
            });
        }
    }
});

// tasksRouter.get("/all-task-ids", verifyUser, (req, res, next) => {
//     const allTaskIds = [];

//     for (const task of CodingTasks) {
//         if (task instanceof AuthoringTask || task instanceof ModifyingTask) {
//             allTaskIds.push(task.id);
//         }
//     }

//     res.send({ allTaskIds });
// });

tasksRouter.get("/get-saved-code/:taskId", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const taskId = req.params.taskId;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task instanceof AuthoringTask || task instanceof ModifyingTask || task instanceof ManualCodingTask) {
            UserTaskModel.findOne({ userId, taskId }).then((userTask) => {
                if (userTask) {
                    res.send({
                        success: true,
                        savedCode: userTask.savedCode,
                    });
                } else {
                    res.statusCode = 500;
                    res.send({ message: "UserTask not found" });
                }
            });
        } else {
            res.statusCode = 500;
            res.send({
                message: `No task was found with taskId: ${taskId}`,
            });
        }
    }
});

const calcCheckingTime = (
    submissions: Array<{
        code: string;
        submittedAt: Date;
        checkedAt?: Date;
    }>
) =>
    submissions.reduce((acc, submission) => {
        return submission.checkedAt
            ? acc +
                  (new Date(submission.checkedAt).getTime() -
                      new Date(submission.submittedAt).getTime())
            : acc;
    }, 0);

const getLastSubmissionFeedback = (
    submissions: Array<{
        code: string;
        submittedAt: Date;
        checkedAt?: Date;
        feedback?: string;
    }>
) => {
    if (submissions.length > 0) {
        const lastSubmission = submissions[submissions.length - 1];

        return lastSubmission.checkedAt ? lastSubmission.feedback : "";
    }

    return "";
};


const getOverall = (explanation: string): string => {
    // Split the input string into lines
    const lines = explanation.split('\n');
    
    // Find the line with [OVERALL-EXPLANATION] indicator
    const overallExplanationLine = lines.findIndex(line => line.includes('[OVERALL-EXPLANATION]'));

    // If the indicator is found, return everything after it
    if (overallExplanationLine !== -1) {
        return lines.slice(overallExplanationLine + 1).join('\n');
    }

    // If the indicator is not found, return an empty string
    return '';
}

const getLineByLine = (input: string): string[] => {
    // Split the input string into lines
    const lines = input.split('\n');

    // Find the line with [END] indicator
    const endLine = lines.findIndex(line => line.includes('[END]'));

    // Initialize an array to store the comments
    const comments: string[] = [];

    // Iterate over the lines until the [END] indicator
    for (let i = 0; i < endLine; i++) {
        const line = lines[i].trim();
        
        // Ignore empty lines
        if (!line) {
            continue;
        }

        const commentIndex = line.indexOf('###');
        
        // If a line contains '###', extract the comment
        if (commentIndex !== -1) {
            const comment = line.substring(commentIndex + 3).trim();
            comments.push(comment);
        }
    }

    return comments;
}




tasksRouter.post("/matchTaskWithCode/", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId } = req.body;

    console.log(taskId);

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task && task instanceof AuthoringTask) {
            
            res.send({ 
                code: task.baselineCode,
                taskId: task.id
            });
            
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId}` });
    }
});

tasksRouter.post("/matchTaskWithExplaination/", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task && task instanceof AuthoringTask) {
            
            res.send({ 
                explanation: getOverall(task.explaination)
            });
            
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

tasksRouter.post("/matchTaskWithLineByLine/", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task && task instanceof AuthoringTask) {
            
            res.send({ 
                explanation: getLineByLine(task.explaination)
            });
            
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

// tasksRouter.post("/matchTaskWithPseudo/", verifyUser, (req, res, next) => {
//     const userId = (req.user as IUser)._id;
//     const { taskId } = req.body;

//     if (userId !== undefined && taskId !== undefined) {
//         const task = getTaskFromTaskId(taskId);

//         if (task && task instanceof AuthoringTask) {
            
//             res.send({ 
//                 pseudo: task.pseudoCodeJson
//             });
            
//         }
//     } else {
//         res.statusCode = 500;
//         res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
//     }
// });

// tasksRouter.post("/matchTaskWithWriteOver/", verifyUser, (req, res, next) => {
//     const userId = (req.user as IUser)._id;
//     const { taskId } = req.body;

//     if (userId !== undefined && taskId !== undefined) {
//         const task = getTaskFromTaskId(taskId);

//         if (task && task instanceof AuthoringTask) {
            
//             res.send({ 
//                 writeOverTokens: task.writeOverJson
//             });
            
//         }
//     } else {
//         res.statusCode = 500;
//         res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
//     }
// });

// tasksRouter.post("/matchTaskWithSelfExplain/", verifyUser, (req, res, next) => {
//     const userId = (req.user as IUser)._id;
//     const { taskId } = req.body;

//     if (userId !== undefined && taskId !== undefined) {
//         const task = getTaskFromTaskId(taskId);

//         if (task && task instanceof AuthoringTask) {
            
//             res.send({ 
//                 selfExplainQuestions: task.SelfExplainJson
//             });
            
//         }
//     } else {
//         res.statusCode = 500;
//         res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
//     }
// });

// tasksRouter.post("/matchTaskWithVerifyReview/", verifyUser, (req, res, next) => {
//     const userId = (req.user as IUser)._id;
//     const { taskId } = req.body;

//     if (userId !== undefined && taskId !== undefined) {
//         const task = getTaskFromTaskId(taskId);

//         if (task && task instanceof AuthoringTask) {
            
//             res.send({ 
//                 verifyReview: task.VerifyReviewJson
//             });
            
//         }
//     } else {
//         res.statusCode = 500;
//         res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
//     }
// });

tasksRouter.post("/matchTaskWithLeadReveal/", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task && task instanceof AuthoringTask) {
            
            res.send({ 
                leadReveal: task.LeadRevealJson
            });
            
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});


tasksRouter.post("/matchTaskWithCodeWithTest/", verifyUser, (req, res, next) => {
    const userId = (req.user as IUser)._id;
    const { taskId } = req.body;

    if (userId !== undefined && taskId !== undefined) {
        const task = getTaskFromTaskId(taskId);

        if (task && task instanceof AuthoringTask) {
            
            res.send({ 
                code: task.baselineCode,
            });
            
        }
    } else {
        res.statusCode = 500;
        res.send({ message: `missing userId: ${userId} or taskId: ${taskId}` });
    }
});

