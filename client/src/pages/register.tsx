import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { MeDocument, useRegisterMutation } from "../generated/graphql";

interface Props {}

const register = (props: Props) => {
  const [registerUser] = useRegisterMutation();
  const router = useRouter();
  const { register, handleSubmit, setError, errors } = useForm();
  const onSubmit = async (data) => {
    const response = await registerUser({
      variables: {
        input: {
          email: data.email,
          password: data.password,
          username: data.username,
        },
      },
      refetchQueries: [
        {
          query: MeDocument,
        },
      ],
    });
    if (response.data?.register.errors) {
      response.data?.register.errors.map((err) => {
        setError(err.field, {
          type: "manual",
          message: err.message,
        });
      });
    } else if (response.data?.register.user) {
      if (typeof router.query.next === "string") {
        router.push(router.query.next);
      } else {
        router.push("/");
      }
    }
  };
  return (
    <div className="flex">
      <div className="w-40 h-screen bg-yellow-300 bg-center bg-cover"></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-72">
          <h1 className="mb-2 text-lg font-medium">Sign up</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                type="text"
                name="username"
                defaultValue=""
                ref={register}
                placeholder="Username"
                className="w-full px-3 py-2 bg-gray-100 border border-gray-400 rounded"
              />
              {errors.username && (
                <p className="p-1 my-1 text-sm bg-red-300">
                  {errors.username.message}
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
              type="submit"
              className="w-full py-2 mb-4 text-xs font-bold text-white uppercase bg-blue-500 rounded hover:bg-blue-400"
            >
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
