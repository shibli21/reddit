import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { MeDocument, useLoginMutation } from "../generated/graphql";

interface Props {}

const login = (props: Props) => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await login({
      variables: {
        email: data.email,
        password: data.password,
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });

    if (response.data?.login.errors) {
      response.data?.login.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.login.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <div className="flex">
      <div className="w-40 h-screen bg-green-500 bg-center bg-cover"></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg font-medium">Login</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-2">
              <input
                type="email"
                name="email"
                defaultValue=""
                ref={register}
                placeholder="Email"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
              {errors.email && (
                <p className="p-1 my-1 text-sm bg-red-300">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-2">
              <input
                type="password"
                name="password"
                defaultValue=""
                ref={register}
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
              {errors.password && (
                <p className="p-1 my-1 text-sm bg-red-300">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button
              className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-400"
              type="submit"
            >
              Login
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
