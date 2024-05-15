"use client";
import ImageUpload from "@/components/custom/imageUpload";
import SectionCard from "@/components/custom/sectionCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useState } from "react";
import { Toaster } from "sonner";

const DialogTrigger = dynamic(
  async () =>
    await import("@/components/ui/dialog").then(mod => mod.DialogTrigger),
  {
    ssr: false,
    loading: () => <div className="h-[40px] text-center">Loading...</div>
  }
);

export default function Home() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);

  const simulateUpload = async (
    file: File,
    onProgress: (progress: number) => void,
    onComplete: (imageUrl: string) => void
  ): Promise<string> => {
    return await new Promise(resolve => {
      const fakeUploadTime = 3000; // 3 seconds
      let progress = 0; // Initialize progress

      const interval = setInterval(() => {
        progress += 10; // Increment progress
        onProgress(progress); // Call onProgress with the new progress value

        if (progress >= 100) {
          clearInterval(interval);
          onProgress(100); // Ensure progress is set to 100%
          const imageUrl = URL.createObjectURL(file);
          setFileName(file.name);
          onComplete(imageUrl); // Call onComplete with the image URL
          resolve(imageUrl); // Resolve the promise with the image URL
        }
      }, fakeUploadTime / 10);
    });
  };

  const handleSendImageToAPI = async () => {
    if (
      uploadedImageUrl !== null &&
      uploadedImageUrl !== undefined &&
      uploadedImageUrl !== ""
    ) {
      try {
        const response = await fetch("http://localhost:5000/send_pic", {
          method: "POST",
          body: JSON.stringify({ imageUrl: uploadedImageUrl }),
          headers: {
            "Content-Type": "application/json"
            // Add any additional headers as needed
          }
        });
        if (response.ok) {
          // Image sent successfully
          console.log("Image sent successfully!");
        } else {
          // Handle error response from the API
          console.error("Failed to send image to API:", response.statusText);
        }
      } catch (error) {
        // Handle network errors
        console.error("Error sending image to API:", error);
      }
    } else {
      console.error("No image uploaded to send to API.");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-12 bg-white p-24">
      <SectionCard
        title="Usage - In Dialog"
        description="This dialog component serves as an interactive modal for users to upload images."
      >
        <Dialog>
          <DialogTrigger className="flex h-full w-full items-center justify-center">
            <Button>Upload Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Image Dialog</DialogTitle>
              <DialogDescription>
                This is a dialog component that can be used to display a modal
                and you can upload an image.
              </DialogDescription>

              <ImageUpload
                id="dialog-upload"
                fileName={fileName}
                className="pt-4"
                onFileUpload={async (file, setProgress, onComplete) => {
                  return await simulateUpload(file, setProgress, imageUrl => {
                    setUploadedImageUrl(imageUrl);
                    onComplete(imageUrl);
                  });
                }}
                maxImageWidth={1000}
                maxImageHeight={1000}
              />
            </DialogHeader>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => {
                  handleSendImageToAPI().catch(error => {
                    console.error("Error sending image to API:", error);
                  });
                }}
              >
                Send Image to API
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SectionCard>

      <SectionCard
        title="Usage - Basic Mode"
        description="This is a basic usage of the ImageUpload component."
      >
        <ImageUpload
          id="basic-upload"
          fileName={fileName}
          maxImageWidth={1920}
          maxImageHeight={1080}
          onFileUpload={async (file, setProgress, onComplete) => {
            return await simulateUpload(file, setProgress, imageUrl => {
              setUploadedImageUrl(imageUrl);
              onComplete(imageUrl);
            });
          }}
        />
        <div className="mt-4 flex justify-center">
          <Button
            onClick={() => {
              handleSendImageToAPI().catch(error => {
                console.error("Error sending image to API:", error);
              });
            }}
          >
            Send Image to API
          </Button>
        </div>
      </SectionCard>

      <Toaster />
    </main>
  );
}
