import env from "../utils/env";

export const authRefresh = () =>
    fetch(env.API_URL + "/api/auth/refreshToken", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
    });

export const authLogin = (username: string, password: string) =>
    fetch(env.API_URL + "/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

export const authLogout = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/auth/logout", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const authSignup = (
    username: string,
    password: string,
    firstName: string,
    lastName: string
) =>
    fetch(env.API_URL + "/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            firstName,
            lastName,
            username,
            password,
        }),
    });

export const apiUserNextTask = (token: string | null | undefined) =>
    fetch(env.API_URL + "/api/tasks/next", {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiUserSubmitTask = (
    token: string | null | undefined,
    taskId: string,
    data: any,
    finishedAt?: Date,
    startedAt?: Date
) =>
    fetch(env.API_URL + "/api/tasks/submit/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            data,
            finishedAt: finishedAt,
            startedAt,
        }),
    });

export const apiUserStartTask = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/start", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            // will be used if its the first time the user starts the task
            startedAt: new Date(),
        }),
    });

export const apiSaveUserCode = (
    token: string | null | undefined,
    taskId: string,
    code: string
) =>
    fetch(env.API_URL + "/api/tasks/save-code", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            code,
        }),
    });

export const apiGetSavedUserCode = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/get-saved-code/" + taskId, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

export const apiGetGeneratedFeedbackCodex = (
    token: string | null | undefined,
    prompt: string,
    tasks: string
) =>
    fetch(env.API_URL + "/api/technique-baseline/generateFeedback", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            prompt: prompt,
            task: tasks,
        }),
    });

export const apiGetExplanationPerLineCodex = (
    token: string | null | undefined,
    code: string
) =>
    fetch(env.API_URL + "/api/technique-writeover/generate", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            code: code,
        }),
    });

export const apiGetFeedbackByResponse = (
    token: string | null | undefined,
    code: string,
    line: string,
    question: string,
    answer: string,
    response: string
) =>
    fetch(env.API_URL + "/api/technique-explain/feedback", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            code: code,
            line: line,
            question: question,
            answer: answer,
            response: response,
        }),
    });

export const apiGetIssueHintLevel1 = (
    token: string | null | undefined,
    code: string,
    studentCode: string
) =>
    fetch(env.API_URL + "/api/technique-verify/generateHintLevel1", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            code: code,
            studentCode: studentCode,
        }),
    });

export const apiGetIssueHintLevel2 = (
    token: string | null | undefined,
    code: string,
    studentCode: string
) =>
    fetch(env.API_URL + "/api/technique-verify/generateHintLevel2", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            code: code,
            studentCode: studentCode,
        }),
    });

export const apiGetIssueHintLevel3 = (
    token: string | null | undefined,
    code: string,
    studentCode: string
) =>
    fetch(env.API_URL + "/api/technique-verify/generateHintLevel3", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            code: code,
            studentCode: studentCode,
        }),
    });

export const apiLogEvents = (
    token: string | null | undefined,
    taskId: string,
    type: string,
    log: any
) =>
    fetch(env.API_URL + "/api/tasks/log/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId,
            type,
            log,
            time: new Date(),
        }),
    });

export const logError = (message: string) => {
    console.error(message);
};

// APIs for getting hard-coded JSON response for LLM simulation

export const apiGetBaselineCodexSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithCode/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetBaselineExplainationCodexSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithExplaination/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetPseudoCodexSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithPseudo/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetWriteOverCodexSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithWriteOver/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetSelfExplainQuestionsSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithSelfExplain/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetVerifyingReviewSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithVerifyReview/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetLeadReviewSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithLeadReveal/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetTracingSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithTracePredict/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
    });

export const apiGetTestCaseSimulation = (
    token: string | null | undefined,
    taskId: string
) =>
    fetch(env.API_URL + "/api/tasks/matchTaskWithCodeWithTest/", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            taskId: taskId,
        }),
});

export const apiGetFeedbackForDecomposition = (
    token: string | null | undefined,
    codeBlock: any,
    currentFrames: any,
    variableName: string,
    userAnswer: string,
    solution: string,
) =>
    fetch(env.API_URL + "/api/technique-tracing/generateFeedback", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            codeBlock: codeBlock,
            currentFrames: currentFrames,
            variableName: variableName,
            userAnswer: userAnswer,
            solution: solution,
        }),
    });


