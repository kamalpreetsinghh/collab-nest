"use client";

import FormField from "@/components/FormField";
import Link from "next/link";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState } from "react";
import { errors, regex } from "@/constants";
import { Toaster, toast } from "sonner";
import Button from "@/components/Button";
import Form from "@/components/Form";
import { sendResetPasswordEmail } from "@/lib/actions/user.action";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (updatedEmail: string) => {
    setEmail(updatedEmail);
    setEmailError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regex.email.test(email)) {
      setEmailError(errors.email);
      return;
    }

    setIsLoading(true);

    const emailSent = await sendResetPasswordEmail(email);

    setIsLoading(false);

    if (emailSent) {
      setEmail("");
      toast.success("Email for resetting your password sent", {
        description: "Please check your inbox for further instructions.",
      });
    } else {
      setEmailError(errors.emailNotExist);
    }
  };

  return (
    <Form
      image="/assets/icons/forgotpassword.svg"
      imageDesc="Forgot Password Image"
    >
      <>
        <div className="w-full my-6 max-w-lg mx-auto flex flex-col items-center">
          <h1 className="text-5xl purple-gradient mt-8 pb-2">
            Forgot Password?
          </h1>
          <p className="desc max-w-md mb-6">
            No worries, we will send you reset instructions.
          </p>
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          <form
            className="flex flex-col w-full max-w-lg gap-7 glassmorphism"
            onSubmit={handleSubmit}
          >
            <FormField
              title="Email"
              state={email}
              placeholder="explore@mountains.com"
              setState={handleEmailChange}
              errorMessage={emailError}
              isRequired
            />

            <Button
              type="submit"
              title="Reset Password"
              isSubmitting={isLoading}
              className="mt-2 mb-6"
            />
          </form>
          <p className="flex justify-center">
            <Link className="text-grey-color" href="/signin">
              <ArrowBackIcon />
              &nbsp; Back to Log in
            </Link>
          </p>
        </div>
        <Toaster richColors />
      </>
    </Form>
  );
};

export default ForgotPasswordPage;
