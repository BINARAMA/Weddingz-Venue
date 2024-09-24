import { styles } from "../styles/style";

import { FC, useState } from "react";
import { toast } from "react-hot-toast";




const NewPassword: FC = () => {
 
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  

  const passwordChangeHandler = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      
    }
  };

  

  return (
    <div>
      <h1 className={`${styles.title}`}>Set New Password</h1>
      <div className="w-full">
        <form className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label htmlFor="newPassword" className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              id="newPassword"
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label htmlFor="confirmPassword" className="block pb-2 text-black dark:text-[#fff]">
              Confirm your new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0 text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="w-full flex justify-center">
            <button className={`${styles.button}`} onClick={passwordChangeHandler}>
              Set New Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
