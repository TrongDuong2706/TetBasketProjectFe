import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Login data:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/background.jpeg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/30 p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-white mb-6 tracking-wide">Đăng Nhập</h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-white text-lg" />
            <input
              {...register("username", { required: "Vui lòng nhập tài khoản" })}
              type="text"
              placeholder="Tài Khoản"
              className="w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white"
            />
            {errors.username && <p className="text-red-300 text-sm mt-1">{errors.username.message as string}</p>}
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-white text-lg" />
            <input
              {...register("password", { required: "Vui lòng nhập mật khẩu" })}
              type="password"
              placeholder="Mật khẩu"
              className="w-full pl-12 pr-4 py-3 bg-white/40 text-white border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white"
            />
            {errors.password && <p className="text-red-300 text-sm mt-1">{errors.password.message as string}</p>}
          </div>

          <button className="w-full bg-gradient-to-r from-yellow-400 to-red-500 text-white font-semibold py-3 rounded-full hover:scale-105 transition-transform shadow-md">
            Đăng Nhập
          </button>
        </form>

        <p className="mt-4 text-sm text-white">
          Chưa có tài khoản?{" "}
          <span className="text-yellow-300 cursor-pointer font-semibold hover:underline" onClick={() => navigate("/register")}>
            Đăng ký ngay
          </span>
        </p>
      </div>
    </div>
  );
}
