"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import FormField from "./FormField";
import Button from "./Button";
import { fetchToken, updateUserProfile } from "@/lib/actions";
import { UserProfile } from "@/common.types";

type ProfileFormProps = {
  user: UserProfile;
};

type FormState = {
  description: string;
  githubUrl: string;
  linkedInUrl: string;
};

const ProfileForm = ({ user }: ProfileFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    description: user?.description || "",
    githubUrl: user?.githubUrl || "",
    linkedInUrl: user?.linkedinUrl || "",
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    const { token } = await fetchToken();

    try {
      const updatedUserProfile = {
        ...user,
        description: form.description,
        githubUrl: form.githubUrl,
        linkedInUrl: form.linkedInUrl,
      } as UserProfile;

      console.log(updatedUserProfile);

      await updateUserProfile(updatedUserProfile, token);

      router.push(`/profile/${user?.id}`);
    } catch (error) {
      alert("Failed to update user profile. Try again!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flexStart form">
      <FormField
        title="Bio"
        state={form.description}
        placeholder="Hi I'm a Software Developer 👋"
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Github Url"
        state={form.githubUrl}
        placeholder="https://github.com/myusername"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <FormField
        type="url"
        title="LinkedIn URL"
        state={form.linkedInUrl}
        placeholder="https://linkedin.com/myusername"
        setState={(value) => handleStateChange("linkedInUrl", value)}
      />

      <div className="flexStart w-full">
        <Button
          title={isSubmitting ? "Editing" : "Edit"}
          type="submit"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default ProfileForm;
