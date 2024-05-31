import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { AiOutlineLoading } from "react-icons/ai";

import React from "react";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormFields = z.infer<typeof schema>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });


  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      localStorage.setItem("user", JSON.stringify(userCredentials.user));

      const idTokenResult = await userCredentials.user.getIdTokenResult();
      if (!idTokenResult.claims.email_verified) {
        throw new Error("Please verify your account.");
      }

      navigate("/", { replace: false });
    } 
    // catch (error) {
    //   if (error.message === "Firebase: Error (auth/invalid-credential).") {
    //     setError("root", {
    //       message:
    //         "We don't have account associated with this email and password.",
    //     });
    //   } else {
    //     console.error(error.message);
    //     setError("root", {
    //       message: error.message,
    //     });
    //   }
    // }
    catch(error){
      console.error(error.message)
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <section className="max-w-96 mx-auto mt-4 text-center space-y-3">
        <div className="p-8  border border-gray-500">
          <h1 className=" text-center lobster-regular text-5xl mb-8 mt-2">
            Pistagram
          </h1>
          <form
            className="flex flex-col space-y-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className={`border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm   pl-2 `}
              {...register("email")}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <div className="text-red-500 text-sm text-left">
                {errors.email.message}
              </div>
            )}
            <input
              className={`border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm   pl-2 `}
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            {errors.password && (
              <div className="text-red-500 text-sm text-left">
                {errors.password.message}
              </div>
            )}
            <button
              disabled={isSubmitting}
              className={`text-white ${
                isSubmitting ? "bg-blue-300 cursor-not-allowed py-3" : "bg-blue-400"
              } rounded-lg font-medium px-4 py-2`}
              type="submit"
            >
              {isSubmitting ? (
                <AiOutlineLoading className="animate-spin block mx-auto" />
              ) : (
                "Log in"
              )}
              {errors.root && (
                <div className="text-red-500">{errors.root.message}</div>
              )}
            </button>
          </form>
        </div>

        <div className=" border border-gray-500">
          <p className="my-7">
            Don't have an account?
            <span className="text-blue-500 ml-1 font-medium cursor-pointer">
              <Link to="/accounts/emailsignup/">Sign Up</Link>
            </span>
          </p>
        </div>
        <div className="p-8">
          <p>This website mimics Instagram's basic features faithfully.</p>
        </div>
      </section>
    </>
  );
};

export default Login;
