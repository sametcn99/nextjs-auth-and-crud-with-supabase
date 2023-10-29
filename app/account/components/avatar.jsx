"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClientComponentClient();
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(path) {
      try {
        // Download image from Storage
        const { data, error } = await supabase.storage
          .from("avatars")
          .download(path);
        if (error) {
          throw error;
        }

        // Create url for the image
        const url = URL.createObjectURL(data);
        // Set the url for the avatarUrl state variable
        setAvatarUrl(url);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    // If there is a url for the image, download it
    if (url) downloadImage(url);
  }, [url, supabase]);

  /**
   * Uploads an avatar image to Supabase storage bucket.
   * @param {Event} event - The event triggered by the user selecting an image to upload.
   * @throws {Error} If no image is selected to upload.
   * @throws {Error} If there is an error uploading the image to the storage bucket.
   */
  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      //The selected code is a conditional statement that checks if the user has selected any files to upload.
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;

      // Upload the file to the storage bucket.
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center text-center">
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="flex justify-center items-center text-center bg-gray-600 rounded-full avatar no-image"
          style={{ height: size, width: size }}
        >
          Avatar Not Found
        </div>
      )}
      <div style={{ width: size }} className="font-bold">
        <label htmlFor="single">
          {uploading ? "Uploading ..." : "Change Avatar"}
        </label>
        <input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
