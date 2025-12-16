"use client";
import { SignInCredentials } from "@/lib/action";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction] = useActionState(SignInCredentials, null);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-xl p-8">

          <form action={formAction} className="mt-6 space-y-6">

            {state?.message && (
              <div className="rounded-md bg-red-50 p-3 text-sm text-red-700 text-center">{state.message}</div>
            )}

            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="userName"
                name="userName"
                type="text"
               
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Username"
              />
              <span className="mt-1 text-sm text-red-600">{state?.errors?.userName?.[0]}</span>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition"
                placeholder="Password"
              />
              <span className="mt-1 text-sm text-red-600">{state?.errors?.password?.[0]}</span>
            </div>

            <div>
              <button
                type="submit"
                className="w-full inline-flex justify-center items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
              >
                Sign in
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
