import {
    Fragment,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";

import { AuthContext, SocketContext } from "../context";

export const Baseline = () => {
    return (
        <Fragment>
          <section className="task-explainer">
            <h2>AI Assistance: Describe the behaviour of the code to be generated</h2>
            <input
              type="text"
              placeholder="Describe the intended behaviour"
            />
            <button style={{ backgroundColor: 'blue', color: 'white' }}>
              Generate
            </button>
          </section>
        </Fragment>
    );
};