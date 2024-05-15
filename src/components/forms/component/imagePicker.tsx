// src/components/ImagePicker.tsx
import React, { useState } from "react";

interface ImagePickerProps {
  onSelect: (file: File | null) => void; // Callback to handle selected image
}

const ImagePicker: React.FC<ImagePickerProps> = ({ onSelect }) => {
  const [previewSrc, setPreviewSrc] = useState<string | ArrayBuffer | null>(
    null
  );

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length != null) {
      const file = event.target.files[0];
      onSelect(file);
      setPreviewSrc(URL.createObjectURL(file)); // Displaying the selected image preview
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {previewSrc !== null && (
        <img
          src={previewSrc as string}
          alt="Selected"
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      )}
    </div>
  );
};

export default ImagePicker;
