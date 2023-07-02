interface IProps {
    title: string;
    content: {
      description: string;
      details: {
        pseudo: string;
        code: string;
      }[];
    };
}

import { Fragment, useState } from "react";

import { Accordion } from "./hierachical-accordion";
import { Example } from "../doc-example";
import { Code } from "../doc-inline-code";

export const HierarchicalComponent: React.FC<{ prop: IProps[] }> = ({ prop }) => {
    const [current, setCurrent] = useState("");

    return (
        <Fragment>
            {prop.map((item, index) => (
                <Accordion
                title={item.title}
                sectionId={"representation"+index.toString()}
                click={(next: string) => {
                    setCurrent(next);
                }}
                current={current}
            >
                <ul>
                    <li>
                        Comments start with a <Code>#</Code> and any text after
                        it on that line will be a comment
                    </li>
                    <li>
                        Comments can be used to explain Python code, make the
                        code more readable.
                    </li>
                    <li>
                        Comments can also be used to prevent the execution of a
                        line of code when testing code. See the examples below:
                    </li>
                </ul>
                <Example
                    code={[
                        `# the line below will display: this is my message`,
                        `print("this is my message")`,
                        ``,
                        `print("hello world") # this line will display: hello world`,
                    ].join("\n")}
                    text={"Comments in Python:"}
                ></Example>

                <Example
                    code={[
                        `# print("will not run") -> the print is commented and will not run`,
                    ].join("\n")}
                    text={"Commenting a line of code:"}
                ></Example>
            </Accordion>
            ))}
        </Fragment>
    );
};

