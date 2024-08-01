import React, { useState } from "react";
import IconsDoc from "./docs/icons-doc";

interface TimelineProps {
    totalSteps: number;
    setCurrentStep: (currentStep: number) => void;
    currentStep: number;
    stop: number;
    setFirstClickCounter: (firstClickCounter: number) => void;
    setPrevClickCounter: (prevClickCounter: number) => void;
    setNextClickCounter: (nextClickCounter: number) => void;
    setLastClickCounter: (lastClickCounter: number) => void;
    clickedButton: () => void;
}

const ExcutionTimeline: React.FC<TimelineProps> = ({
    totalSteps,
    setCurrentStep,
    currentStep,
    stop,
    setFirstClickCounter,
    setPrevClickCounter,
    setNextClickCounter,
    setLastClickCounter,
    clickedButton,
}) => {
    const [firstClickCount, setFirstClickCount] = useState(0);
    const [prevClickCount, setPrevClickCount] = useState(0);
    const [nextClickCount, setNextClickCount] = useState(0);
    const [lastClickCount, setLastClickCount] = useState(0);

    const handleStepChange = (newStep: number) => {
        setCurrentStep(newStep);
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newStep = parseInt(event.target.value, 10);
        setCurrentStep(newStep);
    };

    const handleFirstClick = () => {
        handleStepChange(0);
        setFirstClickCounter(firstClickCount + 1);
        setFirstClickCount(firstClickCount + 1);

        clickedButton();
    };

    const handlePrevClick = () => {
        setPrevClickCounter(prevClickCount + 1);
        setPrevClickCount(prevClickCount + 1);
        if (currentStep > 0) {
            handleStepChange(currentStep - 1);
        }

        clickedButton();
    };

    const handleNextClick = () => {
        setNextClickCounter(nextClickCount + 1);
        setNextClickCount(nextClickCount + 1);
        if (currentStep <= totalSteps - 1) {
            handleStepChange(currentStep + 1);
        }

        clickedButton();
    };

    const handleLastClick = () => {
        setLastClickCounter(lastClickCount + 1);
        setLastClickCount(lastClickCount + 1);
        if (currentStep < stop) {
            handleStepChange(stop);
        } else {
            handleStepChange(totalSteps - 1);
        }

        clickedButton();
    };

    const isLastStep = currentStep >= totalSteps - 1;
    const isNextStepAfterStop = currentStep >= stop;

    return (
        <div className="timeline-container">
            <div className="visualization">
                <div className="timeline-slider">
                    <input
                        type="range"
                        min={0}
                        max={totalSteps - 1}
                        value={currentStep}
                        onChange={handleSliderChange}
                        className="slider"
                    />
                </div>
            </div>
            <div className="controls">
                <button onClick={handleFirstClick} className="flexButton">
                    <div className="timeline-icon">
                        <IconsDoc iconName="backward" />
                    </div>{" "}
                    First
                </button>
                <button onClick={handlePrevClick} className="flexButton">
                    &lt; Prev
                </button>
                <button
                    disabled={isLastStep || isNextStepAfterStop}
                    className="flexButton"
                    onClick={handleNextClick}
                >
                    Next &gt;
                </button>
                <button
                    disabled={isLastStep || isNextStepAfterStop}
                    className="flexButton"
                    onClick={handleLastClick}
                >
                    Last{" "}
                    <div className="timeline-icon">
                        <IconsDoc iconName="forward" />
                    </div>
                </button>
            </div>
            <p style={{ fontSize: "14px", marginTop: "1rem" }}>
                Step {currentStep + 1} of {totalSteps}
            </p>
        </div>
    );
};

export default ExcutionTimeline;
