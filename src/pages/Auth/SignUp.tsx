import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { auth } from "../../lib/firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { serverTimestamp } from "firebase/firestore/lite";
import { Link } from "react-router-dom";
import { db } from "../../lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore/lite";

type FormValues = {
  email: string;
  fullName: string;
  username: string;
  password: string;
};

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  fullName: z.string().min(4).max(20),
  username: z.string().min(4).max(20),
});

const SignUp = () => {
  const [isConfirmation, setIsConfirmation] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const handleClick: SubmitHandler<FormValues> = async (data) => {
    try {
      const docRef = collection(db, "users");
      await setDoc(doc(docRef, data.username), {
        fullName: data.fullName,
        email: data.email,
        username: data.username,
        timestamp: serverTimestamp(),
      });
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await sendEmailVerification(userCredential.user);
      setIsConfirmation(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {!isConfirmation && (
        <section className="max-w-96 mx-auto mt-5 text-center space-y-3">
          <div className="p-8  border border-gray-500">
            <h1 className=" text-center lobster-regular text-3xl mb-4 ">
              Pistagram
            </h1>
            <h2>Sign up to see photos and videos from your friends.</h2>
            <form
              className="flex flex-col space-y-2"
              onSubmit={handleSubmit(handleClick)}
            >
              <input
                {...register("email")}
                className="border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm   pl-2 "
                type="email"
                name="email"
                placeholder="Email"
              />
              {errors.email && (
                <div className="text-red-500 text-sm text-left">
                  {errors.email.message}
                </div>
              )}
              <input
                {...register("fullName")}
                className="border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm   pl-2 "
                type="text"
                name="fullName"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <div className="text-red-500 text-sm text-left">
                  {errors.fullName.message}
                </div>
              )}
              <input
                {...register("username")}
                className="border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm lowercase   pl-2 "
                type="text"
                name="username"
                placeholder="Username"
              />
              {errors.username && (
                <div className="text-red-500 text-sm text-left">
                  {errors.username.message}
                </div>
              )}
              <input
                {...register("password")}
                className="border border-gray-300 text-sm font-normal bg-gray-100 text-gray-900 py-2 rounded-sm   pl-2 "
                type="password"
                name="password"
                placeholder="Password"
              />
              {errors.password && (
                <div className="text-red-500 text-sm text-left">
                  {errors.password.message}
                </div>
              )}
              <p className="text-sm text-gray-500">
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </p>
              <p className="text-sm text-gray-500">
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </p>
              <button
                disabled={isSubmitting}
                type="submit"
                className="text-white bg-blue-400 rounded-lg font-medium px-4 py-2"
              >
                {isSubmitting ? "Loading..." : "Sign up"}
                {errors.root && (
                  <div className="text-red-500">{errors.root.message}</div>
                )}
              </button>
            </form>
          </div>
          <div className=" border border-gray-500">
            <p className="my-7">
              Have an account?
              <span className="text-blue-500 ml-1 font-medium cursor-pointer">
                <Link to="/accounts/login/">Log in</Link>
              </span>
            </p>
          </div>
        </section>
      )}
      {isConfirmation && (
        <section className="max-w-96 mx-auto mt-4 text-center space-y-3">
          <div className="p-8  border border-gray-500">
            <p>
              We have sent you confirmation link to your email. Please verify
              your account to proceed
            </p>
          </div>
          <div className=" border border-gray-500">
            <p className="my-7">
              Have an account?
              <span className="text-blue-500 ml-1 font-medium cursor-pointer">
                <Link to="/accounts/login/">Log in</Link>
              </span>
            </p>
          </div>
          <div className="p-8">
            <p>This website mimics Instagram's basic features faithfully.</p>
          </div>
        </section>
      )}
    </>
  );
};

export default SignUp;
