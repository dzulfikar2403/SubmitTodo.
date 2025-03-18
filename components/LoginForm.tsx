'use client'
import { handleLogin } from "@/lib/auth/actionAuth";
import Link from "next/link";
import React, { useActionState } from "react";


const LoginForm = () => {
  const [state, action, isPending] = useActionState(handleLogin,null);
  
  return (
    <form className="space-y-4 md:space-y-6" action={action}>
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
          Email
        </label>
        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="yourname@gmail.com" />
        {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.email}</p> }
      </div>
      <div>
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">
          Password
        </label>
        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
        {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.password}</p> }
      </div>
      <button type="submit" disabled={isPending} className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ">
      {isPending ? 'Loading...' : 'Sign in'}
      </button>
      <p className="space-x-1 text-sm font-light text-gray-500">
        <span>Don’t have an account yet?</span>
        <Link href="/register" className="font-medium text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
