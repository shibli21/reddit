import React from "react";
import Link from "next/link";

interface Props {}

const register = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-40 h-screen bg-yellow-300 bg-center bg-cover"></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form>
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
              />
              <label htmlFor="agreement" className="text-xs cursor-pointer">
                I agree to get emails about cool stuff on reddit
              </label>
            </div>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-2">
              <input
                type="text"
                placeholder="Username"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
            </div>
            <button className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-400">
              Sign up
            </button>
          </form>
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500">LOG IN</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default register;
