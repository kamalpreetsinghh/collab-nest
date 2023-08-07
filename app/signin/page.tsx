"use client";

import AuthProviders from "@/components/AuthProviders";
import FormAndImage from "@/components/FormAndImage";

const SignInPage = () => {
  return (
    <FormAndImage image="/assets/images/signin.png" imageDesc="Sign In Image">
      <div className="w-full my-2 max-w-lg mx-auto flex flex-col items-center">
        <h1 className="head_text purple_gradient mt-8 mb-2">Hi there!</h1>
        <p className="desc max-w-md mb-6">Welcome to Flexibbble</p>
        <AuthProviders />
      </div>
    </FormAndImage>
  );
};

export default SignInPage;
