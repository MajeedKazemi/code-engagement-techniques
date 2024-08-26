import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/button";
import { Layout } from "../components/layout";
import { Login } from "../components/login";
import { Register } from "../components/register";
import { AuthContext } from "../context";

export const HomePage = () => {
    const { context } = useContext(AuthContext);
    const [showRegister, setShowRegister] = useState(false);

    return (
        <Layout>
            <div className="container">
                <main className="card">
                    {context?.token ? (
                        <div className="m-md">
                            <h1>
                                Hi {context?.user?.firstName}, welcome to our
                                study!
                            </h1>
                            <ul>
                                <li>
                                    the study will take about 2.5 hours to
                                    complete in two phases.
                                </li>
                                <li>
                                    there will be a 10 minute break between the
                                    two phases.
                                </li>
                                <li>
                                    you will be compensated with $50 CAD for
                                    your time.
                                </li>
                            </ul>

                            <Link to="/tasks" className="text-no-decoration">
                                <Button type="block" class="text-sm">
                                    Start Coding
                                </Button>
                            </Link>
                            <br />
                        </div>
                    ) : (
                        // can show their name
                        // a component showing how many tasks they have completed

                        <div className="card-row">
                            <div className="left">
                                {showRegister ? (
                                    <div className="vertical-space-between">
                                        <Register />
                                        <div>
                                            Already have an account?{" "}
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setShowRegister(false);
                                                }}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="vertical-space-between">
                                        <Login />
                                        <div>
                                            Need an account?
                                            <Button
                                                type="link"
                                                onClick={() => {
                                                    setShowRegister(true);
                                                }}
                                            >
                                                Register
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <section className="right">
                                <h2 className="card-title">
                                    Code Representation Techniques
                                </h2>

                                <p className="text-sm">
                                    This tool is part of a research study
                                    conducted by the University of Toronto. If
                                    you have any questions or concerns, please{" "}
                                    <a href="mailto:majeed@dgp.toronto.edu">
                                        email
                                    </a>{" "}
                                    us.
                                </p>
                                <p className="text-sm">
                                    Powered by{" "}
                                    <a href="https://openai.com/blog/openai-codex/">
                                        OpenAI Codex
                                    </a>
                                    .
                                </p>
                            </section>
                        </div>
                    )}
                </main>
            </div>
        </Layout>
    );
};
