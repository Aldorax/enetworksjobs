"use client";
import { Input } from "@/registry/new-york/ui/input";
import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SectionCard from "@/components/custom/sectionCard";
import Link from "next/link";

export default function Dashboard() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<Record<string, string | File>>({});
  const [previews, setPreviews] = useState<Record<string, string | null>>({});

  const imageFields = [
    "Guarantor Passport Photo *",
    "Profile Image *",
    "Signature*",
    "Your Passport Photo *"
  ];

  const steps = [
    {
      id: 1,
      title: "Step 1",
      fields: ["Name", "Address", "BVN", "NIN", "Gender", "Phone Number"]
    },
    {
      id: 2,
      title: "Step 2",
      fields: [
        "Guarantor Name",
        "Guarantor Phone Number",
        "Guarantor BVN",
        "Guarantor NIN",
        "Guarantor Address",
        "Guarantor Passport Photo *",
        "Profile Image *",
        "Signature*",
        "Your Passport Photo *"
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

  const handleImageChange = (
    event: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files?.[0];
    if (file != null) {
      setPreviews({ ...previews, [field]: URL.createObjectURL(file) });
      setFormData({ ...formData, [field]: file });
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2 xl:min-h-screen">
      <div className="flex h-full min-h-screen flex-col items-center justify-center bg-white py-12 text-black">
        <div className="mx-auto grid w-full gap-6 md:w-[850px]">
          <div className="mt-20 grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              Nominated Field Officer Login
            </h1>
            <p className="text-muted-foreground text-balance">
              Enter your details below to apply
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-2 grid p-4 pl-4">
            {currentStep === 1 && (
              <>
                {steps[0].fields.map(field => (
                  <div key={field} className="mb-2">
                    <Label>{field}</Label>
                    <Input
                      required
                      type="text"
                      name={field}
                      onChange={handleChange}
                      value={
                        typeof formData[field] === "string"
                          ? formData[field]
                          : ""
                      }
                    />
                  </div>
                ))}
                <Button className="mt-2" type="submit">
                  Next
                </Button>
              </>
            )}

            {currentStep === 2 && (
              <div className="mt-10">
                {steps[1].fields.map(field => (
                  <div key={field} className="mb-2">
                    <Label>{field}</Label>
                    {imageFields.includes(field) ? (
                      <Input
                        required
                        type="file"
                        accept="image/*"
                        name={field}
                        onChange={e => handleImageChange(e, field)}
                      />
                    ) : (
                      <Input
                        required
                        type="text"
                        name={field}
                        onChange={handleChange}
                        value={
                          typeof formData[field] === "string"
                            ? formData[field]
                            : ""
                        }
                      />
                    )}
                    {previews[field] && (
                      <img
                        className="mt-2"
                        src={previews[field]}
                        alt={`Preview of ${field}`}
                      />
                    )}
                  </div>
                ))}
                <section className="grid">
                  <Button className="mt-2" type="submit">
                    Next
                  </Button>
                  <Button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                    className="mt-4"
                  >
                    Previous
                  </Button>
                </section>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <ul className="px-4">
                  {Object.entries(formData).map(([key, value]) => (
                    <li key={key} className="px-2">
                      <strong>{key}: </strong>
                      {value instanceof File ? value.name : value}
                    </li>
                  ))}
                </ul>
                {Object.entries(previews).map(([key, src]) => (
                  <section className="my-1">
                    <img key={key} src={src} alt={`Preview of ${key}`} />
                  </section>
                ))}
                <div className="grid">
                  <Button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                    }}
                    className="mt-4"
                  >
                    Previous
                  </Button>
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
              </div>
            )}
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/apply/openings/field-officer/login"
              className="underline"
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-black lg:block"></div>
    </div>
  );
}
