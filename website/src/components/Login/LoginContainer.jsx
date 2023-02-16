import { sumNumbers } from "../../firebase";

export const LoginContainer = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col items-center bg-blue-500 pt-16 pb-4">
      <h1 className="text-8xl font-bold italic text-white">
        Investment Trainer
      </h1>
      <h2 className="mb-8 text-lg italic text-white">
        A simple investment tool to help beginners understand investing
      </h2>
      {children}
    </div>
  );
};
