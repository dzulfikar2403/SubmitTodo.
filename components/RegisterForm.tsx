'use client'
import { handleRegister } from "@/lib/auth/actionAuth";
import Link from "next/link";
import { useActionState } from "react";

const RegisterForm = () => {
  const [state,action,isPending] = useActionState(handleRegister,null)

  return (
    <form className="space-y-4 md:space-y-6" action={action}>
      <div>
        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">
          Username
        </label>
        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5" placeholder="buzqier" />
        {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.username}</p> }
      </div>
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
      <div>
        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 ">
          Confirm Password
        </label>
        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 " />
        {typeof state?.errors === "object" && <p className="text-red-400 text-sm">{state.errors.confirmPassword}</p> }
      </div>
      <button disabled={isPending} type="submit" className="w-full text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all ">
        {isPending ? "Loading..." : "Sign up"}
      </button>
      {typeof state?.errors === "string" && <p className="text-red-400 text-sm font-semibold">{state.errors}</p>}
      {typeof state?.message === "string" && <p className="text-green-400 text-sm font-semibold">{state.message}</p>}
      <p className="text-sm font-light text-gray-500">
        have an account yet?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:underline">
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default RegisterForm;
