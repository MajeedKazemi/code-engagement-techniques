import * as fs from "fs";
import * as http from "http";
import jwt from "jsonwebtoken";
import { PythonShell } from "python-shell";
import { Server, Socket } from "socket.io";
import { Transform } from "stream";

import { UserModel } from "../models/user";
import env from "../utils/env";

export function initPythonShell(server: http.Server) {
    let io = new Server(server, {
        cors: {
            origin: env.WHITELISTED_DOMAINS.split(",").map((d) => d.trim()),
            credentials: true,
        },
    });

    io.use((socket: Socket, next) => {
        // Upgrade the request to get the bearer token from the header
        const req = socket.request as any;
        const token = req._query.token;
        var pyshell: PythonShell;

        if (!token) {
            return next(new Error("Authorization header not found"));
        }

        jwt.verify(token, env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                return next(err);
            } else {
                UserModel.findById(decoded._id, (err: any, user: any) => {
                    if (err) {
                        return next(err);
                    } else if (user) {
                        req.user = user;

                        return next();
                    } else {
                        return next(new Error("User doesn't exist"));
                    }
                });

                socket.on("python", async (data: any) => {
                

                    if(data.type === 'trace') {
                        // isolate the import statements from data.code
                        let importStatements:string[] = [];
                        let otherCode:string[] = [];

                        data.code.split('\n').forEach((line: string) => {
                        if (line.trim().startsWith('import')) {
                            importStatements.push(line);
                        } else {
                            otherCode.push(line);
                        }
                        });

                        const code = `${importStatements.join('\n')}\ndef main():\n${otherCode.map((line: string) => '    ' + line).join('\n')}\n${TRACING_CODE}`;
                        // console.log(code);
                        try {
                            fs.writeFileSync("main.py", code);
                        } catch (err) {
                            console.error("fs: ", err);
                        }

                        let startTime = Date.now();
                        let msgCount = 0;

                        pyshell = new PythonShell(
                            "main.py",
                            {},
                            new Transform({
                                transform(chunk, encoding, callback) {
                                    callback(null, chunk.toString());
                                },
                            })
                        );

                        pyshell.on("error", (err: any) => {
                            console.error("error: ", err);
                        });

                        pyshell.on("close", () => {
                            io.to(data.from).emit("python", {
                                type: "close",
                            });
                        });

                        pyshell.on("pythonError", (err: any) => {
                            let error = "";

                            if (err.traceback && err.traceback !== "") {
                                error = err.traceback;
                            } else {
                                error = err.message;
                            }

                            const lineNumber = error.match(/line (\d+)/);

                            if (lineNumber) {
                                error = error.replace(
                                    lineNumber[1],
                                    (parseInt(lineNumber[1]) - 1).toString()
                                );
                            }

                            error = error.replace(/File ".*", /, "");

                            io.to(data.from).emit("python", {
                                type: "stderr",
                                err: error,
                            });
                        });

                        pyshell.on("message", async (message) => {
                            msgCount += message.length;

                            io.to(data.from).emit("python", {
                                type: "stdout",
                                out: message,
                            });

                            // limit the number of messages per second
                            if (msgCount > 10000) {
                                if (Date.now() - startTime < 1000) {
                                    pyshell.kill();
                                }

                                msgCount = 0;
                                startTime = Date.now();
                            }
                        });
                    }

                    if(data.type === 'track') {
                        // isolate the import statements from data.code
                        let importStatements:string[] = [];
                        let otherCode:string[] = [];

                        data.code.split('\n').forEach((line: string) => {
                        if (line.trim().startsWith('import')) {
                            importStatements.push(line);
                        } else {
                            otherCode.push(line);
                        }
                        });

                        const code = `${importStatements.join('\n')}\ndef main():\n${otherCode.map((line: string) => '    ' + line).join('\n')}\n${data.input}\n${TRACK_VARIABLE}`;
                        // console.log(code);
                        try {
                            fs.writeFileSync("main.py", code);
                        } catch (err) {
                            console.error("fs: ", err);
                        }

                        let startTime = Date.now();
                        let msgCount = 0;

                        pyshell = new PythonShell(
                            "main.py",
                            {},
                            new Transform({
                                transform(chunk, encoding, callback) {
                                    callback(null, chunk.toString());
                                },
                            })
                        );

                        pyshell.on("error", (err: any) => {
                            console.error("error: ", err);
                        });

                        pyshell.on("close", () => {
                            io.to(data.from).emit("python", {
                                type: "close",
                            });
                        });

                        pyshell.on("pythonError", (err: any) => {
                            let error = "";

                            if (err.traceback && err.traceback !== "") {
                                error = err.traceback;
                            } else {
                                error = err.message;
                            }

                            const lineNumber = error.match(/line (\d+)/);

                            if (lineNumber) {
                                error = error.replace(
                                    lineNumber[1],
                                    (parseInt(lineNumber[1]) - 1).toString()
                                );
                            }

                            error = error.replace(/File ".*", /, "");

                            io.to(data.from).emit("python", {
                                type: "stderr",
                                err: error,
                            });
                        });

                        pyshell.on("message", async (message) => {
                            msgCount += message.length;

                            io.to(data.from).emit("python", {
                                type: "stdout",
                                out: message,
                            });

                            // limit the number of messages per second
                            if (msgCount > 10000) {
                                if (Date.now() - startTime < 1000) {
                                    pyshell.kill();
                                }

                                msgCount = 0;
                                startTime = Date.now();
                            }
                        });
                    }

                    if (data.type === "run") {
                        const code = `${CPU_LIMITER_CODE}\n${data.code}`;
                        try {
                            fs.writeFileSync("main.py", code);
                        } catch (err) {
                            console.error("fs: ", err);
                        }

                        let startTime = Date.now();
                        let msgCount = 0;

                        pyshell = new PythonShell(
                            "main.py",
                            {},
                            new Transform({
                                transform(chunk, encoding, callback) {
                                    callback(null, chunk.toString());
                                },
                            })
                        );

                        pyshell.on("error", (err: any) => {
                            console.error("error: ", err);
                        });

                        pyshell.on("close", () => {
                            io.to(data.from).emit("python", {
                                type: "close",
                            });
                        });

                        pyshell.on("pythonError", (err: any) => {
                            let error = "";

                            if (err.traceback && err.traceback !== "") {
                                error = err.traceback;
                            } else {
                                error = err.message;
                            }

                            const lineNumber = error.match(/line (\d+)/);

                            if (lineNumber) {
                                error = error.replace(
                                    lineNumber[1],
                                    (parseInt(lineNumber[1]) - 10).toString()
                                );
                            }

                            error = error.replace(/File ".*", /, "");

                            io.to(data.from).emit("python", {
                                type: "stderr",
                                err: error,
                            });
                        });

                        pyshell.on("message", async (message) => {
                            msgCount += message.length;

                            io.to(data.from).emit("python", {
                                type: "stdout",
                                out: message,
                            });

                            // limit the number of messages per second
                            if (msgCount > 10000) {
                                if (Date.now() - startTime < 1000) {
                                    pyshell.kill();
                                }

                                msgCount = 0;
                                startTime = Date.now();
                            }
                        });
                    } else if (data.type === "stdin" && pyshell) {
                        pyshell.send(data.value);
                    } else if (data.type === "stop" && pyshell) {
                        pyshell.kill();
                    }
                });
            }
        });
    });

    io.on("connection", (socket: any) => {
        console.log(
            `Socket connected with user ${socket.request.user?.username}`
        );
    });

    io.on("disconnect", (reason: string) => {
        console.log(`Disconnected from Socket.IO server: ${reason}`);
    });

    io.on("error", (err: Error) => {
        console.error(`Socket.IO error: ${err.message}`);
    });
}

const CPU_LIMITER_CODE = [
    `import resource`,
    `import signal`,
    `def time_expired(n, stack):`,
    `   raise SystemExit("Program stopped: You probably have an infinite loop in your code that doesn't stop!")`,
    `def set_cpu_runtime():`,
    `    soft, hard = resource.getrlimit(resource.RLIMIT_CPU)`,
    `    resource.setrlimit(resource.RLIMIT_CPU, (3, hard))`,
    `    soft, hard = resource.getrlimit(resource.RLIMIT_CPU)`,
    `    signal.signal(signal.SIGXCPU, time_expired)`,
    `set_cpu_runtime()`,
].join("\n");

// put it at the end

const TRACING_CODE = [
    `import sys`,
    `import trace`,
    `from queue import Queue`,
    `tracer = trace.Trace(
        ignoredirs=[sys.prefix, sys.exec_prefix],
        trace=1)`,
    `tracer.run('main()')`
].join("\n")

//inputs is the array of storedInputs, +\n for each element

const TRACK_VARIABLE = [
    `import sys`,
    `import io`,
    `from queue import Queue`,
    `def localtrace(frame, why, arg):`,
    `   if why == 'call':`,
    `       return localtrace`,
    `   elif why == 'line':`,
    `       locals_filtered = {k: v for k, v in frame.f_locals.items() if not callable(v)}`,
    `       print(locals_filtered)`,
    `   return localtrace`,
    `sys.stdin = io.StringIO(''.join(inputs))`,
    `sys.settrace(localtrace)`,
    `main()`,
    `sys.settrace(None)`
].join("\n")



