"use client";
import { Input } from "@/registry/new-york/ui/input";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import SectionCard from "../custom/sectionCard";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [preview, setPreview] = useState<string | null>(null);

  const steps = [
    {
      id: 1,
      title: "Step 1",
      fields: [
        "First Name",
        "Last Name",
        "Email",
        "Phone Number",
        "Enetworkspay Agent Account Email *",
        "Enetworkspay Card Number *",
        "Active contact address *"
      ]
    },
    {
      id: 2,
      title: "Step 2",
      fields: [
        "Guarantor Name *",
        "Guarantor Phone Number *",
        "What Language do you speak*",
        "Next of Kin Name *",
        "Next of Kin Phone Number *",
        "Next of Kin Relationship *",
        "Next of Kin Email *"
      ]
    },
    {
      id: 3,
      title: "Step 3",
      fields: [
        "State of Origin *",
        "Local Goverment Area *",
        "Ward *",
        "Gender",
        "What Position are you applying for? *",
        "What state do you want to work in *"
      ]
    },
    {
      id: 4,
      title: "Review & Submit",
      fields: [] // No fields, just review
    }
  ];

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      void handleFinalSubmit(); // Explicitly marking the promise as ignored
    }
  };

  const handleFinalSubmit = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        body: formDataToSend
      });
      const result = await response.json();
      console.log("Form Submitted:", result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, image: file });
    }
  };

  return (
    <div className="max-w-screen grid grid-cols-1 items-center overflow-x-hidden overflow-y-hidden text-black md:grid-cols-2 md:px-10">
      <div className="px-4 py-20 md:p-4">
        <h2 className="text-xl font-semibold underline">
          {steps[currentStep - 1].title}
        </h2>
        <form onSubmit={handleSubmit} className="mt-2 pl-4">
          {currentStep === 1 && (
            <>
              {steps[0].fields.map(field => (
                <div key={field}>
                  <Label>{field}</Label>
                  <Input
                    required
                    type="text"
                    name={field}
                    onChange={handleChange}
                    {...(typeof formData[field] === "string" && {
                      value: formData[field]
                    })}
                  />
                </div>
              ))}
              <Button className="mt-2" type="submit">
                Next
              </Button>
            </>
          )}

          {currentStep === 2 && (
            <>
              {steps[1].fields.map(field => (
                <div key={field} className="mb-4">
                  <Label>{field}</Label>
                  <Input
                    required
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    onChange={handleChange}
                    {...(typeof formData[field] === "string" && {
                      value: formData[field]
                    })}
                  />
                </div>
              ))}
              <SectionCard
                title="Upload Profile Pic"
                description="Select a valid Passport photograph to see the preview"
              >
                <Input
                  type="file"
                  required
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-4"
                />
              </SectionCard>
              {preview != null && (
                <img className="mt-2" src={preview} alt="Selected" />
              )}
              <Button className="mt-2" type="submit">
                Next
              </Button>
            </>
          )}

          {currentStep === 3 && (
            <>
              {steps[2].fields.map(field => (
                <div key={field}>
                  <Label>{field}</Label>
                  <Input
                    required
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    onChange={handleChange}
                    {...(typeof formData[field] === "string" && {
                      value: formData[field]
                    })}
                  />
                </div>
              ))}
              <Button className="mt-2" type="submit">
                Next
              </Button>
            </>
          )}

          {currentStep === 4 && (
            <div>
              <ul>
                {Object.entries(formData).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}: </strong>
                    {value instanceof File ? value.name : value}
                  </li>
                ))}
              </ul>
              {preview != null && <img src={preview} alt="Selected" />}
              <Button
                type="button"
                onClick={() => {
                  handleFinalSubmit().catch(console.error); // Ensure any errors are caught
                }}
                className="mt-2"
              >
                Confirm and Submit
              </Button>
            </div>
          )}
        </form>

        {currentStep > 1 && currentStep <= steps.length && (
          <Button
            onClick={() => {
              setCurrentStep(currentStep - 1);
            }}
            className="mt-4"
          >
            Previous
          </Button>
        )}
      </div>
      <div className="max-h-screen w-[50vw] bg-black md:h-screen"></div>
    </div>
  );
};

export default MultiStepForm;
