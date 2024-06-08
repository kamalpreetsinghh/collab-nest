"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UpdateProfile, UserProjects } from "@/common.types";
import { updateUserProfile } from "@/lib/actions/user.action";
import FormField from "../FormField";
import Button from "../Button";

type ProfileFormProps = {
  user: UserProjects;
};

const ProfileForm = ({
  user: { id, description, githubUrl, linkedInUrl, websiteUrl },
}: ProfileFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [form, setForm] = useState<UpdateProfile>({
    description,
    githubUrl,
    linkedInUrl,
    websiteUrl,
  });

  const handleStateChange = (fieldName: keyof UpdateProfile, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await updateUserProfile(form, id);

      router.push(`/profile/${id}`);
    } catch (error) {
      alert("You have been signed out. Please log in again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex-start form">
      <FormField
        title="Bio"
        state={form.description || ""}
        placeholder="Hi I'm a Software Developer 👋"
        isTextArea
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.websiteUrl || ""}
        placeholder="https://mywebsite.com"
        setState={(value) => handleStateChange("websiteUrl", value)}
      />

      <FormField
        type="url"
        title="Github URL"
        state={form.githubUrl || ""}
        placeholder="https://github.com/myusername"
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <FormField
        type="url"
        title="LinkedIn URL"
        state={form.linkedInUrl || ""}
        placeholder="https://linkedin.com/myusername"
        setState={(value) => handleStateChange("linkedInUrl", value)}
      />

      <div className="flex-start w-full">
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
