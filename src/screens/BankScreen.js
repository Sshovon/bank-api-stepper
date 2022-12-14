import "../App.css";
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import { StepperContext } from "../contexts/StepperContext";
import PaymentDetails from "../components/steps/PaymentDetails";
import OTP from "../components/steps/OTP";
import Final from "../components/steps/Final";
import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function BankScreen({ accountNumber, amount, email, ecomAccountNumber }) {
  const steps = ["Payment Details", "One Time Password", "Confirmation"];
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({ amount, accountNumber });
  const [finalData, setFinalData] = useState([]);

  const accountVerifier = async () => {
    return axios.post("/api3/bank/validatesecret", {
      secret: userData.secret,
    });
  };
  const validTransaction = async () => {
    return axios.post("/api1/valid/", { amount, accountNumber });
  };

  const sendMail = async () => {
    return axios.post("/api3/otp/send", {
      email,
    });
  };

  const verifyOTP = async () => {
    return axios.get(`/api3/otp/verify/${userData.otp}`);
  };

  const makePayment = async () => {
    axios
      .post("/api1/adjust", {
        inID: ecomAccountNumber,
        outID: accountNumber,
        amount,
      })
      .then((result) => {
        console.log(result);
        return axios.post("/api1/add", {
          inID: ecomAccountNumber,
          outID: accountNumber,
          amount,
        });
      });
  };

  const handleClick = async (direction = null) => {
    let newStep = currentStep;
    if (newStep === 1) {
      console.log(userData);
      await Promise.all([validTransaction(), accountVerifier()])
        .then(async function (results) {
          const [validTransactionResult, accountVerifyResult] = results;

          if (accountVerifyResult.data.status === false) {
            toast.error("Incorrect PIN");
          } else if (validTransactionResult.data.status === "invalid") {
            toast.error("Insufficient Balance");
          } else {
            await toast.promise(sendMail(), {
              loading: "Sending Mail...",
              success: "Mail Sent",
              error: "Error Occured!!",
            });
            direction === "next" ? newStep++ : newStep--;
            newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
          }
        })
        .catch(() => {
          toast.error("Error Occured!!");
        });
    } else if (newStep === 2) {
      const result = await verifyOTP();
      console.log(result.data);
      if (result.data.status == !true) {
        toast.error("OTP Verification failed!!");
      } else {
        await toast.promise(sendMail(), {
          loading: "Verifing OTP",
          success: "OTP Verified",
          error: "OTP Verification Failed",
        });
        await toast.promise(makePayment(), {
            loading: "Wait a bit...",
            success: "Transaction Successful",
            error: "Transaction Failed",
          });

        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
      }
      
    }
    // check if steps are within bounds
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
