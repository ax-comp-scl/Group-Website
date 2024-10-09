import React from "react";
import LoginForm from "./LoginForm";
import WelcomeImage from "./WelcomeImage";

function LoginPage() {
  return (
    <main className="flex overflow-hidden flex-col justify-center px-4 bg-[#48645A]">
      <div className="py-5 h-screen flex items-center justify-center">
        <div className="h-full py-7 pr-7 pl-20 bg-white rounded-[50px] max-md:px-5 max-md:max-w-full">
          <div className="h-full flex gap-10 max-md:flex-col">
            <LoginForm />
            <WelcomeImage />
          </div>
        </div>
      </div>
    </main>
  );
}

export default LoginPage;
