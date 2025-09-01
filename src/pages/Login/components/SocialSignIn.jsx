import { SocialButton } from "./SocialButton.jsx";
import { GoogleIcon } from "./GoogleIcon.jsx";
import { Facebook } from "lucide-react";

// Reusable Social Sign-in component, now with only Google and Facebook
export const SocialSignIn = () => (
  <div className="flex flex-col justify-center items-center">
    <div className="flex items-center w-full my-6">
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      <span className="flex-shrink mx-4 text-gray-500 dark:text-gray-400">
        OR
      </span>
      <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
    </div>
    <div className="w-full space-y-4">
      <SocialButton
        icon={GoogleIcon}
        label="Sign in with Google"
        bgColor="bg-gray-100 dark:bg-gray-800"
        textColor="text-gray-700 dark:text-gray-300"
        hoverColor="hover:bg-gray-200 dark:hover:bg-gray-700"
      />
      <SocialButton
        icon={Facebook}
        label="Sign in with Facebook"
        bgColor="bg-gray-100 dark:bg-gray-800"
        textColor="text-gray-700 dark:text-gray-300"
        hoverColor="hover:bg-gray-200 dark:hover:bg-gray-700"
      />
    </div>
  </div>
);
