"use client";
// components/Input requiredForm.tsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import image from "/public/images/medium-shot-people-looking-laptop.jpg";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AiOutlineCheck, AiOutlineLoading } from "react-icons/ai";
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
import { MainNav } from "@/app/(admin)/admin/dashboard/components/main-nav";
import { UserNav } from "@/app/(admin)/admin/dashboard/components/user-nav";
import Image from "next/image";

export default function FieldApplication() {
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

  // Watch the 'gender' field to handle its state
  const gender = watch("gender");

  const onSubmit = async (data: Record<string, any>) => {
    const formData = new FormData();
    const accessToken = localStorage.getItem("access_token");

    setLoading(true);

    Object.entries(data).forEach(([key, value]) => {
      if (
        key === "guarantor_photo" ||
        key === "profile_image" ||
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
        "https://enetworks-tovimikailu.koyeb.app/nominated-field/apply",
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
      setLoading(false);
      window.location.href = "/login/field-officer";
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
              <Label>Email of who nominated you</Label>
              <Input
                required
                placeholder="john.doe@example.com"
                {...register("nominated_me")}
              />
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
              <Label>Enetworkspay Agent Card Number</Label>
              <Input required {...register("agent_card_number")} />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                required
                type="password"
                placeholder="Your password"
                {...register("password")}
              />
            </div>
            <div>
              <Label>Address</Label>
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
              <Label>Date of Birth</Label>
              <Input required type="date" {...register("date_of_birth")} />
            </div>
            <div>
              <Label>Phone Number</Label>
              <Input required {...register("phone_number")} />
            </div>
            <div>
              <Label>BVN</Label>
              <Input required {...register("bvn")} />
            </div>
            <div>
              <Label>NIN</Label>
              <Input required {...register("nin")} />
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
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              {/* <p className="text-red-500">{String(errors.gender?.message)}</p> */}
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
              <Label>Guarantor Name</Label>
              <Input required {...register("guarantor_name")} />
            </div>
            <div>
              <Label>Guarantor Phone Number</Label>
              <Input required {...register("guarantor_phone_number")} />
            </div>
            <div>
              <Label>Guarantor BVN</Label>
              <Input required {...register("guarantor_bvn")} />
            </div>
            <div>
              <Label>Guarantor NIN</Label>
              <Input required {...register("guarantor_nin")} />
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
              <Label>Guarantor Address</Label>
              <Input required {...register("guarantor_address")} />
            </div>
            <div>
              <Label>Guarantor Passport</Label>
              <Input
                required
                type="file"
                accept="image/*"
                {...register("guarantor_photo")}
              />
              {renderImagePreview("guarantor_photo")}
            </div>
            <div>
              <Label>Signature</Label>
              <Input
                required
                type="file"
                accept="image/*"
                {...register("signature")}
              />
              {renderImagePreview("signature")}
            </div>
            <div>
              <Label>Passport Photo</Label>
              <Input
                required
                type="file"
                accept="image/*"
                {...register("passport_photo")}
              />
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
          className="w-auto h-full bg-cover"
        />
      </div>
    </div>
  );
}
