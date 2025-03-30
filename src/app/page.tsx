"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (username === "chachu" && password === "dadarananana") {
      setLoginSuccess(true);
      setLoginError(false);
      // We'll redirect after setting loginSuccess to true
    } else {
      setLoginError(true);
      setLoginSuccess(false);
    }
  };

  // Use useEffect to handle the redirect after state has been updated
  useEffect(() => {
    if (loginSuccess) {
      // // Short timeout to show success message briefly before redirect
      // const redirectTimer = setTimeout(() => {
      //   router.push("/home");
      // }, 1000);
      // return () => clearTimeout(redirectTimer);

      router.push("/home");
    }
  }, [loginSuccess, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Head>
        <title>Login Page</title>
        <meta name="description" content="Login page example" />
      </Head>

      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        {/* {loginSuccess ? (
          <div className="text-center text-green-600 font-medium">
            <h2 className="text-xl mb-2">Login Successful!</h2>
            <p>Welcome, {username}!</p>
            <p className="text-sm mt-2">Redirecting to home page...</p>
          </div>
        ) : ( */}
        <>
          <h1 className="text-2xl font-bold text-center mb-6">LOGIN</h1>

          {loginError && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-center rounded">
              Invalid credentials. Please try again.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="username">
                User name <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                placeholder="User name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-1" htmlFor="password">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 uppercase text-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </>
        {/* )} */}
      </div>
    </div>
  );
}
