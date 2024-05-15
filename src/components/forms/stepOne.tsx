"use client";
import { Input } from "@/registry/new-york/ui/input";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

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
        "Local Government Area *",
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

  const selectOptions = {
    "State of Origin *": ["Lagos", "Oyo", "Rivers", "Abuja", "Kano"],
    "Local Government Area *": [
      "Ikeja",
      "Ibadan North",
      "Port Harcourt",
      "Gwagwalada",
      "Nassarawa"
    ],
    "Ward *": ["Ward 1", "Ward 2", "Ward 3", "Ward 4", "Ward 5"],
    Gender: ["Male", "Female", "Other"],
    "What Position are you applying for? *": [
      "Manager",
      "Developer",
      "Designer",
      "Marketer"
    ],
    "What state do you want to work in *": [
      "Lagos",
      "Oyo",
      "Rivers",
      "Abuja",
      "Kano"
    ]
  };

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

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, [event.target.name]: file });
    }
  };

  return (
    <div className="max-w-screen grid grid-cols-1 items-center overflow-x-hidden overflow-y-hidden text-black md:grid-cols-2 md:px-10">
      <div className="px-4 py-20 md:p-4">
        {/* <h2 className="mt-0 text-2xl font-semibold md:mt-20">
          {steps[currentStep - 1].title}
        </h2> */}
        <form onSubmit={handleSubmit} className="mt-2 pl-4 text-lg">
          {steps[currentStep - 1].fields.map(field => (
            <div key={field} className="mb-2">
              <Label className="text-lg font-medium">{field}</Label>
              {selectOptions[field] ? (
                <select
                  required
                  name={field}
                  onChange={handleChange}
                  value={
                    typeof formData[field] === "string" ? formData[field] : ""
                  }
                  className="rounded border border-gray-300 p-2"
                >
                  <option value="">Select an option</option>
                  {selectOptions[field].map(option => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <Input
                  required
                  type="text"
                  name={field}
                  onChange={handleChange}
                  {...(typeof formData[field] === "string" && {
                    value: formData[field]
                  })}
                />
              )}
            </div>
          ))}
          {currentStep === 2 && (
            <>
              <Label>Upload Profile Pic</Label>
              <Input
                type="file"
                required
                accept="image/*"
                name="profileImage"
                onChange={handleImageChange}
                className="mt-4"
              />
              {preview != null && (
                <img className="mt-2" src={preview} alt="Selected" />
              )}
            </>
          )}
        </form>
        {currentStep === 4 && (
          <div className="mt-20">
            <h2 className="text-2xl font-semibold">Review Your Information</h2>
            <ul className="p-2 px-5">
              {Object.entries(formData).map(([key, value]) => (
                <li key={key}>
                  <strong>{key}: </strong>
                  {value instanceof File ? value.name : value}
                </li>
              ))}
            </ul>
            {preview != null && <img src={preview} alt="Selected" />}
          </div>
        )}
        <div className="grid">
          <Button
            type="button"
            onClick={() => {
              handleFinalSubmit().catch(console.error); // Ensure any errors are caught
            }}
            className="mt-2"
          >
            Confirm and Submit
          </Button>
          {currentStep > 1 && (
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
      </div>
      <div className="bg-black md:h-full md:min-h-screen md:w-[50vw]"></div>
    </div>
  );
};

export default MultiStepForm;
