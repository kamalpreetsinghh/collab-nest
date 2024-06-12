"use client";

import Image from "next/image";
import FormField from "../FormField";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import { sendrequest } from "@/lib/actions/user.action";

type SendRequestProps = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  closeDialog: () => void;
  image: string;
  email: string;
  loggedInUserEmail: string;
};

const SendRequest = ({
  dialogRef,
  closeDialog,
  image,
  email,
  loggedInUserEmail,
}: SendRequestProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    try {
      const response = await sendrequest({
        fromEmail: loggedInUserEmail,
        toEmail: email,
        subject: title,
        description,
        urgency: selectedOption,
      });

      setTitle("");
      setDescription("");
      toast.success("Your request is sent");
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog
      className="rounded-2xl w-[90vw] max-w-lg px-6 md:px-12 py-4 md:py-8
  fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
      ref={dialogRef}
    >
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <Image
            className="rounded-full"
            src={image}
            width={60}
            height={60}
            alt="user"
          />
          <p className="text-xl font-semibold">
            Let&apos;s get your request ready to send
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <span className="font-bold">What are you looking to design...</span>
            <span>0/80</span>
          </div>
          <FormField
            title=""
            state={title}
            placeholder="eg. landing page, iOS app."
            autocapitalize="sentences"
            setState={(value) => setTitle(value)}
            isRequired
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold">How urgent is your request?</p>

          <div className="flex w-full gap-2 justify-center">
            <button
              className={`chip ${selectedOption === "ASAP" ? "selected" : ""}`}
              onClick={() => setSelectedOption("ASAP")}
            >
              ASAP
            </button>
            <button
              className={`chip ${
                selectedOption === "Within the next month" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("Within the next month")}
            >
              Within the next month
            </button>
            <button
              className={`chip ${
                selectedOption === "Not urgent" ? "selected" : ""
              }`}
              onClick={() => setSelectedOption("Not urgent")}
            >
              Not urgent
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <p className="font-bold">Tell us more about the project</p>
          <FormField
            title=""
            state={description}
            placeholder="Looking to add another landing page to my current Webflow site..."
            isTextArea
            autocapitalize="sentences"
            setState={(value) => setDescription(value)}
            isRequired
          />
        </div>

        <div className="flex justify-between">
          <button
            className="font-bold text-gray-600 dark:text-gray-300 underline"
            onClick={closeDialog}
          >
            Nevermind
          </button>
          <button type="submit" className="rounded-button bg-primary h-10">
            {isSubmitting ? (
              <div className="w-24 h-10 flex items-center justify-center">
                <span className="loader bottom-2.5"></span>
              </div>
            ) : (
              "Send Request"
            )}
          </button>
        </div>
      </form>
      <Toaster richColors position="bottom-left" />
    </dialog>
  );
};

export default SendRequest;
