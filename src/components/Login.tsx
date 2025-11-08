import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import authServiceObject from "../appwrite/auth_service";
import { login as authLogin } from "../features/authSlice";
import Logo from "./Logo";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const loginFn = async (data:any) => {
    console.log(`Login Data : ${data}`)
    setError("");
    try {
      const session = await authServiceObject.loginUser(data);
      if (session) {
        // if user is successfully logged in and we got back the user session then
        const userData = await authServiceObject.getCurrentLoggedInUser();
        // if user data is present then we will save the user details in the state
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error: any) {
      setError(error);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%"/>
                </span>
            </div>
            <h2 className="text-center font-bold text-2xl leading-tight">Sign In to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
                Don&apos;t have an account?
                <Link to={"/signup"} className="font-medium transition-all duration-20 hover:underline">
                    Sign up
                </Link>
            </p>
            {
                error && <p className="text-red-600 mt-8 text-center">{error}</p>
            }
            <form onSubmit={handleSubmit(loginFn)} className="mt-8">
                <div className="space-y-5">
                    <CustomInput 
                    label="Email :"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                        required:true,
                        validate: {
                            matchPattern: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/.test(value) || "Enter valid email address",
                        }
                    })}
                    />
                    <CustomInput 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {
                        ...register("password", {
                            required:true,
                        })
                    }
                    />
                    <CustomButton type="submit" className="w-full">Sign In</CustomButton>
                </div> 
            </form>
        </div>
    </div>
  )
};

export default Login;
