"use client";
// src/components/StepTwo.tsx
import React, { useState } from "react";
import { useFormStore } from "./store/store";
import ImagePicker from "./component/imagePicker"; // Corrected import path
// import formSchema from "./schema/zodSchema";
import SubmitButton from "./submitButton";

export const StepTwo = () => {
  const { addFormData } = useFormStore(); // Removed unused variables
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const onSubmit = async (data: any) => {
    // Specified type for 'data'
    if (selectedImage == null) {
      alert("Please select an image.");
      return;
    }

    addFormData("image", selectedImage);
    // Convert FormData to JSON if needed for API submission
    const jsonFormData = Object.fromEntries(new FormData().entries());
    try {
      await fetch("/your-api-endpoint", {
        method: "POST",
        body: JSON.stringify(jsonFormData),
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        void onSubmit({});
      }}
    >
      {" "}
      {/* Prevent default form submission */}
      <div>
        <label htmlFor="image">Select Image:</label>
        <ImagePicker onSelect={handleImageChange} />
      </div>
      <div className="flex justify-end">
        {/* Assuming SubmitButton is a custom component you've defined elsewhere */}
        <SubmitButton
          text="Upload Image"
          loadingText="Uploading Image..."
          onClick={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </div>
    </form>
  );
};
