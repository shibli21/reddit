import React from "react";
import Link from "next/link";

interface Props {}

const login = (props: Props) => {
  return (
    <div className="flex">
      <div className="w-40 h-screen bg-green-500 bg-center bg-cover"></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form>
            <div className="mb-2">
              <input
                type="email"
                placeholder="Email"
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
            New to Reddit?
            <Link href="/register">
              <a className="ml-1 text-blue-500 uppercase">Sign up</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default login;
