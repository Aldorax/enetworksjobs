"use client";
// components/Input requiredForm.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";

import image from "/public/images/portrait-professional-elegant-businessman.jpg";
import { MdSend } from "react-icons/md";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { MainNav } from "@/app/(admin)/admin/dashboard/components/main-nav";
import { UserNav } from "@/app/(admin)/admin/dashboard/components/user-nav";

export default function LocalGovtOffice() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const valid_genders = ["male", "female"];
  const valid_positions = [
    "LG Business Manager/Coordinator",
    "LG Asst Business Manager/Coordinator ",
    "LG Admin Sec",
    "LG Operations Manager",
    "LG Media and Public Relations Officer",
    "LG Legal Asst",
    "LG Finance Officer",
    "LG Tech Officer",
    "LG Community Relations Officer",
    "LG Product Dev Officer",
    "LG Business Development Officer",
    "LG Personnel Manager",
  ];
  const valid_locations = [
    "abia",
    "adamawa",
    "akwa ibom",
    "anambra",
    "bauchi",
    "bayelsa",
    "benue",
    "borno",
    "cross river",
    "delta",
    "ebonyi",
    "edo",
    "ekiti",
    "enugu",
    "fct",
    "gombe",
    "imo",
    "jigawa",
    "kaduna",
    "kano",
    "katsina",
    "kebbi",
    "kogi",
    "kwara",
    "lagos",
    "nasarawa",
    "niger",
    "ogun",
    "ondo",
    "osun",
    "oyo",
    "plateau",
    "rivers",
    "sokoto",
    "taraba",
    "yobe",
    "zamfara",
  ];

  // Watch the 'gender' field to handle its state
  const gender = watch("gender");
  const state = watch("state_of_origin");
  const position = watch("preferred_position");
  const workState = watch("preferred_location");

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    const accessToken = localStorage.getItem("access_token");

    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (
        key === "guarantor_passport" ||
        key === "image" ||
        key === "signature" ||
        key === "passport_photo"
      ) {
        if (value && value[0] instanceof File) {
          formData.append(key, value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    try {
      const response = await fetch(
        "https://enetworks-tovimikailu.koyeb.app/staff/apply",
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!accessToken) {
        setLoading(false);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setLoading(false);
        throw new Error(errorData.message);
      }

      setSuccess(true);
      window.location.href = "/success";
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const renderImagePreview = (field: string) => {
    const file = watch(field)?.[0];
    return file ? (
      <img
        src={URL.createObjectURL(file)}
        alt={`${field} preview`}
        className="mt-2 h-20 w-20 object-cover"
      />
    ) : null;
  };

  return (
    <div className="grid h-full grid-cols-1 md:grid-cols-2">
      <div className="fixed z-[995] flex h-16 w-full items-center border-b border-black bg-white px-4 text-black">
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full min-h-screen w-full flex-col justify-center space-y-2 rounded-md bg-white p-6 pt-20 text-black"
      >
        {step === 1 && (
          <>
            <div>
              <Label>Full Name</Label>
              <Input
                required
                placeholder="John Doe"
                {...register("full_name")}
              />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input required {...register("phone_number")} />
            </div>
            <div>
              <Label>Enetworkspay Agent Email Address</Label>
              <Input
                required
                type="email"
                placeholder="john.doe@example.com"
                {...register("agent_email")}
              />
            </div>
            <div>
              <Label>Enetworkspay Agent Cash Card Number</Label>
              <Input
                required
                type="text"
                placeholder="12345"
                {...register("agent_card_number")}
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input required type="password" {...register("password")} />
            </div>
            <div>
              <Label>Active Contact Address</Label>
              <Input
                required
                type="text"
                placeholder="123 Main St"
                {...register("address")}
              />
            </div>
            <div className="grid">
              <Button color="primary" onClick={nextStep}>
                Next
              </Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div>
              <Label>State Of Origin</Label>
              <Select
                onValueChange={(value) => setValue("state", value)}
                value={state || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your state" />
                </SelectTrigger>
                <SelectContent>
                  {valid_locations.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Local Government Area</Label>
              <Input required {...register("lga")} />
            </div>
            <div>
              <Label>Ward</Label>
              <Input required {...register("ward")} />
            </div>
            <div>
              <Label>Gender</Label>
              <Select
                onValueChange={(value) => setValue("gender", value)}
                value={gender || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent>
                  {valid_genders.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <section className="grid gap-2">
                <Button color="primary" onClick={prevStep}>
                  Previous
                </Button>
                <Button color="primary" onClick={nextStep}>
                  Next
                </Button>
              </section>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <div>
              <Label>Next of Kin Name</Label>
              <Input required {...register("next_of_kin_name")} />
            </div>
            <div>
              <Label>Next of Kin Phone Number</Label>
              <Input required {...register("next_of_kin_phone_number")} />
            </div>
            <div>
              <Label>Next of Kin Relationship</Label>
              <Input required {...register("next_of_kin_relationship")} />
            </div>
            <div>
              <Label>Next of Kin Email Address</Label>
              <Input
                required
                type="email"
                {...register("next_of_kin_email_address")}
              />
            </div>
            <div>
              <Label>Guarantor Name</Label>
              <Input required {...register("guarantor_name")} />
            </div>
            <div>
              <Label>Guarantor Phone Number</Label>
              <Input required {...register("guarantor_phone_number")} />
            </div>
            <div>
              <section className="grid gap-2">
                <Button color="primary" onClick={prevStep}>
                  Previous
                </Button>
                <Button color="primary" onClick={nextStep}>
                  Next
                </Button>
              </section>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <div>
              <Label>What language do you speak?</Label>
              <Input required {...register("language")} />
            </div>
            <div>
              <Label>What Position are you applying for?</Label>
              <Select
                onValueChange={(value) => setValue("position", value)}
                value={position || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a position" />
                </SelectTrigger>
                <SelectContent>
                  {valid_positions.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>What state do you want to work in?</Label>
              <Select
                onValueChange={(value) => setValue("position_state", value)}
                value={workState || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a work state" />
                </SelectTrigger>
                <SelectContent>
                  {valid_locations.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Passport Photo</Label>
              <Input
                required
                type="file"
                accept="image/*"
                {...register("passport_photo")}
              />
              {/* {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Passport Preview"
                  className="mt-2"
                />
              )} */}
              {renderImagePreview("passport_photo")}
            </div>
            <div className="flex justify-between">
              <Button color="primary" onClick={prevStep}>
                Previous
              </Button>
              <Button color="primary" type="submit" disabled={loading}>
                {loading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : success ? (
                  <AiOutlineCheck size={20} color="#00cc00" />
                ) : (
                  <>
                    Submit Form <MdSend size={20} />
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </form>
      <div className="bg-black hidden md:block">
        <Image
          src={image}
          alt="working"
          width={1000}
          height={1000}
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
