import React from "react";
import { SocialButton } from "./SocialButton.jsx";
import { GoogleIcon } from "./GoogleIcon.jsx";
import { Facebook } from "lucide-react";

export const SocialSignIn = ({ mode = "signin" }) => {
  const isSignUp = mode === "signup";

  return (
    <div className="flex flex-col justify-center items-center w-full">
      <div className="flex items-center w-full my-5">
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700/80" />
        <span className="flex-shrink mx-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
          Or continue with
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-gray-700/80" />
      </div>

      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <SocialButton
          icon={GoogleIcon}
          label="Google"
        />
        <SocialButton
          icon={Facebook}
          label="Facebook"
        />
      </div>
    </div>
  );
};

export default SocialSignIn;
