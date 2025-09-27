"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { healthFormSchema } from "@/lib/validations/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof healthFormSchema>;

const UserDataForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(healthFormSchema),
  });

  //   const onSubmitForm = (data: unknown) => {
  //     console.log(data);
  //   };

  const onSubmitForm = async (data) => {
    localStorage.set("userData", JSON.stringify(data));
    console.log(data);
    const request = {
      age: data.age,
      gender: data.gender,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      bpSystolic: data.bpSystolic,
      bpDiastolic: data.bpDiastolic,
      exercise_hours_week: data.exercise_hours_week,
      smoking: data.smoking,
      symptoms: data.symptoms.split(","),
      notes: data.notes,
    };

    try {
      const response = await fetch("http://localhost:8080/health/form/heart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        alert(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Health data submitted successfully:", responseData);
    } catch (error) {
      console.error("Error sending health data:", error);
    }
  };

  return (
    <div className="bg-sky-200 max-w-[500px] p-10 rounded-lg">
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className="grid gap-4">
          <div className="flex gap-2">
            <Label htmlFor="age" className="font-bold w-[100px]">
              Age
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="age"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("age", { valueAsNumber: true })}
              />
              {errors.age && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.age && (
                <p className="text-xs text-error">{errors.age.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="gender" className="font-bold w-[100px]">
              Gender
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="gender"
                type="text"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("gender")}
              />
              {errors.gender && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.gender && (
                <p className="text-xs text-error">{errors.gender.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="heightCm" className="font-bold w-[100px]">
              Height in cm
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="heightCm"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("heightCm", { valueAsNumber: true })}
              />
              {errors.heightCm && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.heightCm && (
                <p className="text-xs text-error">{errors.heightCm.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="weightKg" className="font-bold w-[100px]">
              Weight in kg
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="weightKg"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("weightKg", { valueAsNumber: true })}
              />
              {errors.weightKg && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.weightKg && (
                <p className="text-xs text-error">{errors.weightKg.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="bpSystolic" className="font-bold w-[100px]">
              BP Systolic
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="bpSystolic"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("bpSystolic", { valueAsNumber: true })}
              />
              {errors.bpSystolic && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.bpSystolic && (
                <p className="text-xs text-error">
                  {errors.bpSystolic.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="bpDiastolic" className="font-bold w-[100px]">
              BP Diastolic
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="bpDiastolic"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("bpDiastolic", { valueAsNumber: true })}
              />
              {errors.bpDiastolic && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.bpDiastolic && (
                <p className="text-xs text-error">
                  {errors.bpDiastolic.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label
              htmlFor="exercise_hours_week"
              className="font-bold w-[100px]"
            >
              Exercise per week (in hrs)
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="exercise_hours_week"
                type="number"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("exercise_hours_week", { valueAsNumber: true })}
              />
              {errors.exercise_hours_week && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.exercise_hours_week && (
                <p className="text-xs text-error">
                  {errors.exercise_hours_week.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="smoking" className="font-bold w-[100px]">
              Smoking
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="smoking"
                type="text"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("smoking")}
              />
              {errors.smoking && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.smoking && (
                <p className="text-xs text-error">{errors.smoking.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="symptoms" className="font-bold w-[100px]">
              Symptoms
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="symptoms"
                type="text"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("symptoms")}
              />
              {errors.symptoms && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.symptoms && (
                <p className="text-xs text-error">{errors.symptoms.message}</p>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            <Label htmlFor="notes" className="font-bold w-[100px]">
              Notes
            </Label>
            <div className="relative w-[300px]">
              <Input
                id="notes"
                type="text"
                autoComplete="off"
                className="w-full pr-10 bg-quaternary text-ternary placeholder:text-gray-500"
                {...register("notes")}
              />
              {errors.notes && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="absolute right-2 top-5 transform -translate-y-1/2 w-6 h-6 text-error"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              )}
              {errors.notes && (
                <p className="text-xs text-error">{errors.notes.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              type="submit"
              className="text-quaternary bg-rose-200 rounded-lg hover:bg-rose-200"
            >
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserDataForm;
