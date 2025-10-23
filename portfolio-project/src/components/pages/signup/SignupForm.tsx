"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import register01 from "@/assets/images/register01.jpg";

type FormData = {
  name?: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const password = watch("password");

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setSelectedFile(file);
  };

  const onSubmit = async (data: FormData) => {
    setUploading(true);
    setLoading(true);
    toast.success("Account created successfully!");
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-50 px-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* === Left Section (Image / Illustration) === */}
        <div className="relative w-full lg:w-1/2 h-60 sm:h-72 md:h-96 lg:h-auto bg-gradient-to-br from-indigo-600 to-purple-400 flex flex-col justify-center items-center text-white p-8">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mb-4">
            <Image
              src={register01}
              alt="Signup Illustration"
              fill
              className="object-contain drop-shadow-xl"
              priority
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Welcome to BrightSpace
          </h2>
          <p className="text-white/80 text-center max-w-sm text-sm md:text-base">
            Join our community and start exploring modern digital experiences.
          </p>
        </div>

        {/* === Right Section (Form) === */}
        <div className="flex-1 p-6 sm:p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 text-center mb-6">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name (optional)
              </label>
              <input
                {...register("name")}
                placeholder="John Doe"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Enter a valid email",
                  },
                })}
                placeholder="you@example.com"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                placeholder="••••••"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                placeholder="••••••"
                className="w-full mt-1 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Profile Picture (optional)
              </label>
              <div className="mt-2 flex items-center gap-3">
                <label
                  htmlFor="image"
                  className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  {selectedFile ? "Change Image" : "Upload Image"}
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                {uploading && (
                  <p className="text-sm text-blue-500">Uploading...</p>
                )}
              </div>
              {selectedFile && (
                <div className="mt-3">
                  <Image
                    src={URL.createObjectURL(selectedFile)}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover rounded-lg border"
                  />
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                {...register("terms", { required: "You must accept terms" })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 font-medium">
                  Terms & Conditions
                </a>
              </label>
            </div>
            {errors.terms && (
              <p className="text-sm text-red-500 mt-1">
                {errors.terms.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
