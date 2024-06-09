"use client";

import { ChangeEvent, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import Image from "next/image";
import NameIcon from "./NameIcon";
import { fetchToken } from "@/lib/actions";
import { uploadProfileImage } from "@/lib/actions/user.action";

type UploadImageProps = {
  userImage: string | null;
  canEdit: boolean;
  name: string;
  userId?: string;
};

const UploadImage = ({
  userImage,
  canEdit,
  name,
  userId,
}: UploadImageProps) => {
  const [uploadedImage, setUploadedImage] = useState(userImage || "");
  const [image, setImage] = useState("");
  const [showImageActions, setShowImageActions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
      setImage(result);
      setShowImageActions(true);
    };
  };

  const handleClose = () => {
    setImage("");
    setShowImageActions(false);
  };

  const handleDone = async () => {
    setShowImageActions(false);
    setIsLoading(true);
    if (userId) {
      const { token } = await fetchToken();
      const result = await uploadProfileImage(userId, image, token);
    }
    setIsLoading(false);
    setUploadedImage(image);
    setImage("");
  };

  return (
    <div className="flex">
      <div
        className={`group relative ${canEdit ? "hover:opacity-50" : ""} ${
          isLoading ? "opacity-50" : ""
        }`}
      >
        {uploadedImage || image ? (
          <div className="w-28 h-28 relative">
            <Image
              src={image ? image : uploadedImage}
              style={{ objectFit: "cover" }}
              className="rounded-full "
              alt="user image"
              fill
            />
          </div>
        ) : (
          <span>
            <NameIcon name={name} className="w-28 h-28 text-7xl" />
          </span>
        )}
        {canEdit && !isLoading && (
          <>
            <input
              id="image"
              type="file"
              accept="image/*"
              className="form-image-input left-0 right-0 bottom-0 top-0"
              onChange={(e) => handleChangeImage(e)}
            />
            <span
              className="invisible group-hover:visible absolute left-0 right-0 bottom-0 top-0 
                          flex justify-center items-center"
            >
              <EditIcon />
            </span>
          </>
        )}
        {isLoading && (
          <div className="absolute left-0 right-0 bottom-0 top-0 flex items-center justify-center">
            <span className="loader bottom-3 mx-4"></span>
          </div>
        )}
      </div>

      {showImageActions && (
        <div className="flex gap-2">
          <div
            className="primary-color button-hover cursor-pointer"
            onClick={handleDone}
          >
            <DoneIcon />
          </div>
          <div
            className="primary-color button-hover cursor-pointer"
            onClick={handleClose}
          >
            <CloseIcon />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
