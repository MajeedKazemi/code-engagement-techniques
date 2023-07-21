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
                        // setCurrent(next);
                    }}
                    current={current}
                >
                <Accordion
                    title={item.content.description}
                    sectionId={"description"+index.toString()}
                    click={(next: string) => {
                        // setCurrent(next);
                    }}
                    current={current}
                >   
                    {item.content.details.map((pseudo, pindex) => (
                        <Accordion
                            title={pseudo.pseudo}
                            sectionId={"description"+index.toString()+"pseudo"+pindex.toString()}
                            click={(next: string) => {
                                // setCurrent(next);
                            }}
                            current={current}
                        >
                        <Example
                            title="Python Code"
                            code={pseudo.code}
                        ></Example>
                        </Accordion>
                    ))}
                    
                </Accordion>

            </Accordion>
            ))}
        </Fragment>
    );
};

