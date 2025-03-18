import React from "react";
import Image from "next/image";
import RegisterForm from "@/components/RegisterForm";

const LoginPage = () => {
  return (
    <div className="w-full flex justify-center items-center min-h-screen">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center gap-3 mb-6 text-2xl font-semibold text-gray-900 ">
            <div className="relative w-8 h-8">
              <Image src={'/images/logo-ico.png'} alt="logo-icon" fill />
            </div>
            SubmitTodo.
          </a>
          <div className="w-full bg-white rounded-lg drop-shadow-lg md:mt-0 sm:max-w-md md:w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">Sign up</h1>
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
