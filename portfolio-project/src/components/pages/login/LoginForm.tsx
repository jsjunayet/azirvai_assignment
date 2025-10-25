"use client";

import login01 from "@/assets/images/login01.jpg";
import { Button } from "@/components/ui/button";
import { loginUser } from "@/services/AuthService";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const searchParams = useSearchParams();
  const router = useRouter();
  // const { setIsLoading } = useUser();

  const onSubmit = async (data: FormData) => {
    try {
      console.log(data, "login data");
      const res = await loginUser(data);
      console.log("login res", res);

      if (res?.success) {
        // ✅ assuming your backend returns success flag
        toast.success(res?.message || "Login successful!");

        // ✅ Redirect to dashboard
        router.push("/dashboard");
      } else {
        toast.error(res?.message || "Invalid credentials!");
      }
    } catch (err) {
      const typedError = err as Error;
      toast.error("Something went wrong!");
    }
  };

  const handleDefaultLogin = (type: "admin" | "user") => {
    const presets = {
      admin: { email: "azir@gmail.com", password: "admin123" },
      user: { email: "user10@gmail.com", password: "123456" },
    };
    const selected = presets[type];
    setValue("email", selected.email);
    setValue("password", selected.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* === Left Section (Illustration) === */}
        <div className="flex justify-center items-center w-full lg:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-500 text-white relative p-8 md:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent)]" />
          <div className="relative z-10 text-center">
            <Image
              src={login01}
              alt="Login Illustration"
              width={350}
              height={350}
              className="mx-auto mb-6 rounded-xl object-cover shadow-lg"
              priority
            />
            <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Welcome Back!
            </h2>
            <p className="text-white/80 text-sm md:text-base max-w-xs md:max-w-sm mx-auto">
              Sign in to access your dashboard and continue managing your
              projects.
            </p>
          </div>
        </div>

        {/* === Right Section (Form) === */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800">
              Log in to Your Account
            </h2>
            <Link
              href="/"
              className="text-sm sm:text-base font-medium text-indigo-600 hover:text-purple-700 transition"
            >
              Home
            </Link>
          </div>

          {/* Role Buttons */}
          <div className="mb-6 grid grid-cols-2 gap-3">
            <Button
              type="button"
              onClick={() => handleDefaultLogin("user")}
              className="bg-gradient-to-br from-indigo-700 to-indigo-500 hover:opacity-90 text-white py-2 text-sm sm:text-base"
            >
              Demo User
            </Button>
            <Button
              type="button"
              onClick={() => handleDefaultLogin("admin")}
              className="bg-gradient-to-br from-purple-700 to-purple-500 hover:opacity-90 text-white py-2 text-sm sm:text-base"
            >
              Demo Admin
            </Button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                placeholder="youremail@example.com"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs text-indigo-600 hover:text-indigo-700"
                >
                  Forgot Password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm sm:text-base"
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-base transition"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
