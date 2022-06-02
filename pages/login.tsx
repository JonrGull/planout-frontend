import React from "react";
import useAuth from "../src/hook/auth";
import { withPublic } from "../src/hook/route";
import { FaGoogle, FaLock, FaUser } from "react-icons/fa";
function Login({ auth }: any) {
  auth = useAuth();
  if (auth !== null) {
    const { loginWithGoogle } = auth;

    return (
      <div className="bg-amber-50 block h-screen items-center justify-center p-4 md:flex ">
        <div className="bg-cover bg-image flex flex-col items-center max-w-screen-lg overflow-hidden rouded-lg shadow-lg text-gray-600 w-full md:flex-row">
          <div className="backdrop-blur-sm backdrop-filter flex flex-col items-center justify-center p-4 text-white w-full md:w-1/2">
            <h1 className="font-medium text-3xl font-logo">PlanOut</h1>
            <p className="font-header text-2xl">
              Plan your next event with us!
            </p>
          </div>

          <div className="bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2">
            <div className="flex flex-col items center">
              <h1 className="text-2xl font-body text-amber-600 ">
                {" "}
                Welcome, pal!
              </h1>
              <p className="font-body text-lg">Login to your account</p>
            </div>
            <form className="flex flex-col items-center space-y-4">
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray=400">
                  <FaUser />
                </span>
                <input
                  className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 round-md transition focus:ring-2 focus:ring-green-300"
                  placeholder="Username"
                  type="text"
                />
              </div>
              <div className="relative">
                <span className="absolute flex inset-y-0 items-center pl-4 text-gray=400">
                  <FaLock />
                </span>
                <input
                  className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 round-md transition focus:ring-2 focus:ring-green-300"
                  placeholder="Username"
                  type="password"
                />
              </div>
            </form>
            <div className="flex-flex-row">
              <button
                className="bg-orange-200 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-amber-600"
                type="submit"
              >
                <FaUser className="mr-2" />
                Login
              </button>

              <button
                onClick={loginWithGoogle}
                className="bg-orange-200 font-medium ml-4 inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-amber-600"
              >
                <FaGoogle className="mr-2" />
                Login with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withPublic(Login);
