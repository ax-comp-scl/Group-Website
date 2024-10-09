import React from 'react';
import LoginForm from './LoginForm';
import WelcomeImage from './WelcomeImage';

function LoginPage() {
  return (
    <main className="flex overflow-hidden flex-col justify-center p-4 bg-gray-600">
      <div className="h-screen flex items-center justify-center">
      <div className="py-7 pr-1 pl-20 bg-white rounded-[50px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <LoginForm />
          <WelcomeImage />
        </div>
      </div>
      </div>
    </main>
  );
}

export default LoginPage;