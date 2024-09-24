import { styles } from "../styles/style";

import  { FC, useRef, useState } from "react";
import { toast } from "react-hot-toast";

import { VscWorkspaceTrusted } from "react-icons/vsc";

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC = () => {
 
  const [timer, setTimer] = useState<number>(60);
  const [resendDisabled, setResendDisabled] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [verificationError] = useState<boolean>(false);


  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");
    if (verificationNumber.length !== 4) {
      toast.error("Please enter a 4-digit verification code.");
      return;
    }
   
  };

  const handleInputChange = (index: number, value: string) => {
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true);
    setTimer(60);
    
    // Call the verificationHandler function to handle resending the code
    {verificationHandler}
    try {
      console.log("checking")
      
      toast.success("Verification code resent successfully.");
    } catch (error) {
      
      toast.error("Failed to resend verification code. Please try again.");
      
    }
  };
  

  return (
    <div>
      
      <h1 className={`${styles.title}`}>Verify Your Account</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} />
        </div>
      </div>
      <br />
      <br />
      <div className="m-auto flex items-center justify-around">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
              verificationError ? "shake border-red-500" : "dark:border-white border-[#0000004a]"
            }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex justify-center">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <div className="w-full flex justify-center">
        {timer > 0 && (
          <p className="text-sm text-gray-500">
            Resend code available in {timer} seconds
          </p>
        )}
        {timer === 0 && (
          <button
            className={`${styles.button} text-sm`}
            onClick={handleResendCode}
            disabled={resendDisabled}
          >
            Resend Code
          </button>
        )}
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{" "}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
         
        >
          Sign in
        </span>
      </h5>
    </div>
  );
};

export default Verification;