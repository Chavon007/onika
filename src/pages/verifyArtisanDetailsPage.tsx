"use client";
import { useState } from "react";
import { Controller } from "react-hook-form";
import Button from "@/component/button";
import { InputField } from "@/component/inputField";
import { Form } from "@/component/form";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileDropZone from "@/component/fileDropzone";
import SkillInputField from "@/component/skillInputList";
import Steppers from "@/component/stepper";
import logo from "../../public/logo1.png";
import useVerifyArtisanMutation from "@/api/artsianProfile";
import {
  ArtisanProfileSchema,
  artisanProfileDTO,
} from "@/schema/ArtisanProfileSchema";

const stepFields: Record<number, (keyof artisanProfileDTO)[]> = {
  1: ["fullname", "phoneNumber", "city", "bio"],
  2: ["skills", "experince"],
  3: ["nin", "bvn", "governmentId", "faceVerification"],
  4: ["workImage"],
};
const totalSteps = 4;

function VerifyArtisanDetails() {
  const router = useRouter();
  const { mutate, isPending } = useVerifyArtisanMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const onSubmit = (data: artisanProfileDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/verify");
      },
    });
  };

  return (
    <div>
      <div className="conatiner">
        {/* logo */}
        <div className="flex w-[80%] mx-auto items-center gap-2">
          <Image src={logo} alt="onika" width={40} height={40} />
          <h2 className="font-heading text-3xl font-bold text-background">
            Onika
          </h2>
        </div>

        <div>
          <h3>Join as an Artisan</h3>
          <p>Complete your profile to start receiving job requests.</p>
        </div>

        <Steppers
          steps={[
            { label: "Basic Info" },
            { label: "Skills" },
            { label: "Identity (KYC)" },
            { label: "Portfolio" },
            { label: "Pending Review" },
          ]}
          currentNumber={currentStep}
        />

        <Form className="" onSubmit={onSubmit} schema={ArtisanProfileSchema}>
          {(methods) => {
            const {
              trigger,
              formState: { errors },
            } = methods;
            const goNext = async () => {
              const fieldsToValidate = stepFields[currentStep];
              // trigger() runs zod validation only for these fields
              const isValid = fieldsToValidate
                ? await trigger(fieldsToValidate as any)
                : true;
              if (isValid) {
                setCurrentStep((s) => Math.min(s + 1, totalSteps));
              }
              // if invalid, errors get populated and InputField/FileDropzone
              // will show them - user stays on this step
            };

            const goBack = () => {
              setCurrentStep((s) => Math.max(s - 1, 1));
            };

            return (
              <>
                {currentStep === 1 && (
                  <>
                    <InputField
                      label="Full Name (as on ID)"
                      type="text"
                      placeholder="Enter your full name"
                      registration={methods.register("fullname")}
                      error={methods.formState.errors.fullname}
                    />
                    <InputField
                      label="Phone number"
                      type="number"
                      registration={methods.register("phoneNumber")}
                      error={methods.formState.errors.phoneNumber}
                    />
                    <InputField
                      label="City of Operation"
                      type="text"
                      registration={methods.register("city")}
                      error={methods.formState.errors.city}
                    />
                    <InputField
                      label="Short Bio"
                      type="text"
                      registration={methods.register("bio")}
                      error={methods.formState.errors.bio}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    {currentStep === 2 && (
                      <>
                        <Controller
                          name="skills"
                          control={methods.control}
                          render={({ field }) => (
                            <SkillInputField
                              label="Add your skills"
                              small="You can add multiple skill categories."
                              value={field.value ?? []}
                              onChange={field.onChange}
                              error={
                                methods.formState.errors.skills
                                  ?.message as string
                              }
                            />
                          )}
                        />

                        <InputField
                          label="Years of Experience"
                          placeholder="Your years of experience"
                          registration={methods.register("experince")}
                          error={methods.formState.errors.experince}
                        />
                      </>
                    )}
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div>
                      <InputField
                        label="NIN (11-digit number)"
                        placeholder="12345678987"
                        registration={methods.register("nin")}
                        error={methods.formState.errors.nin}
                      />
                      <InputField
                        label="BVN (optional but recommended)"
                        placeholder="98765432123"
                        registration={methods.register("bvn")}
                        error={methods.formState.errors.bvn}
                      />
                    </div>
                    <Controller
                      name="governmentId"
                      control={control}
                      render={({ field }) => (
                        <FileDropZone
                          label="Upload Government ID (NIN Slip / Voter's Card / Int'l Passport)"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.governmentId?.message as string}
                        />
                      )}
                    />
                    <Controller
                      name="faceVer"
                      control={control}
                      render={({ field }) => (
                        <FileDropZone
                          label="Face Verification (selfie)"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors.faceVerification?.message as string}
                        />
                      )}
                    />
                  </>
                )}

                {currentStep === 4 && (
                  <Controller
                    name="Work"
                    control={control}
                    render={({ field }) => (
                      <FileDropZone
                        label="Showcase your work"
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.workImage?.message as string}
                      />
                    )}
                  />
                )}
                <div>
                  {currentStep > 1 && (
                    <button type="button" onClick={goBack}>
                      Back
                    </button>
                  )}

                  {currentStep < totalSteps ? (
                    <Button type="button" isLoading={isPending}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      isLoading={isPending}
                      loadingText="Submitting...."
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </>
            );
          }}
        </Form>
      </div>
    </div>
  );
}

export default VerifyArtisanDetails;
