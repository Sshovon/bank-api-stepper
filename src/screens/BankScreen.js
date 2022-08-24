import "../App.css";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";

import { StepperContext } from "../contexts/StepperContext";

import PaymentDetails from "../components/steps/PaymentDetails";
import OTP from "../components/steps/OTP";
import Final from "../components/steps/Final";
import { useState, useEffect } from "react";
import axios from "axios";

function BankScreen({ accountNumber, amount }) {
  const steps = ["Payment Details", "One Time Password", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ amount, accountNumber });
  const [finalData, setFinalData] = useState([]);

  const handleClick = (direction = null) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PaymentDetails />;
      case 2:
        return <OTP />;
      case 3:
        return <Final />;
      default:
    }
  };

  return (
    <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
      {/* Stepper */}
      <div className="horizontal container mt-5 ">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="my-10 p-10 ">
          <StepperContext.Provider
            value={{ userData, setUserData, finalData, setFinalData }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>
      </div>
      {/* navigation button */}
      {currentStep !== steps.length && (
        <StepperControl
          handleClick={handleClick}
          currentStep={currentStep}
          steps={steps}
        />
      )}
    </div>
  );
}

export default BankScreen;
