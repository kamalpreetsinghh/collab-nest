"use client";

import Image from "next/image";
import FormField from "../FormField";
import CustomMenu from "../CustomMenu";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { categoryFilters } from "@/constants";
import { FormState, ProjectInterface } from "@/common.types";
import { createNewProject, updateProject } from "@/lib/actions/project.action";

type ProjectFormProps = {
  type: "Create" | "Update";
  userId: string;
  project?: ProjectInterface;
};

const ProjectForm = ({ type, userId, project }: ProjectFormProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    websiteUrl: project?.websiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image!");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange("image", result);
    };
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (type === "Create") {
        await createNewProject(form, userId);
      } else {
        if (project) {
          await updateProject(form, project.id);
        }
      }
      router.replace("/");
    } catch (error) {
      alert(
        `Failed to ${
          type === "Create" ? "create" : "edit"
        } a project. Try again!`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex-start form">
      <div className="flex-start form-image-container">
        <label htmlFor="poster" className="flex-center form-image-label">
          {!form?.image && "Choose a poster for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === "Create"}
          className="form-image-input"
          onChange={(e) => handleChangeImage(e)}
        />
        {form.image && (
          <Image
            src={form?.image}
            className="sm:p-10 object-contain z-20"
            alt="image"
            fill
          />
        )}
      </div>
      <FormField
        title="Title"
        state={form.title}
        placeholder="Collab Nest"
        isRequired
        autocapitalize="words"
        setState={(value) => handleStateChange("title", value)}
      />

      <FormField
        title="Description"
        state={form.description}
        placeholder="Showcase and discover remarkable developer projects."
        isTextArea
        autocapitalize="sentences"
        setState={(value) => handleStateChange("description", value)}
      />

      <FormField
        type="url"
        title="Website URL"
        state={form.websiteUrl}
        placeholder="https://projectwebsite.com"
        isRequired
        setState={(value) => handleStateChange("websiteUrl", value)}
      />

      <FormField
        type="url"
        title="GitHub URL"
        state={form.githubUrl}
        placeholder="https://github.com/username/projectname"
        isRequired
        setState={(value) => handleStateChange("githubUrl", value)}
      />

      <CustomMenu
        title="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value) => handleStateChange("category", value)}
      />

      <div className="flex w-full gap-4">
        <button type="submit" className="rounded-button bg-primary w-24">
          {isSubmitting ? (
            <div className="w-24 flex items-center justify-center">
              <span className="loader bottom-2.5"></span>
            </div>
          ) : (
            type
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-button bg-red-800 w-24"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
