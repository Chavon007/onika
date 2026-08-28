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
import TextArea from "@/component/TextArea";

const stepFields: Record<number, (keyof artisanProfileDTO)[]> = {
  1: ["fullname", "phoneNumber", "city", "bio"],
  2: ["skills", "experience"],
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
        router.push("/artisan-review");
      },
    });
  };

  return (
    <div className="min-h-screen p-4">
      <div className="container w-full max-w-2xl mx-auto flex flex-col gap-3">
        {/* logo */}
        <div className="flex items-center gap-2">
          <Image src={logo} alt="onika" width={20} height={20} />
          <h2 className="font-heading text-2xl font-bold text-text">Onika</h2>
        </div>

        <div className=" flex flex-col gap-0.5 ">
          <h3 className="font-heading font-bold  text-black text-3xl tracking-wider">
            Join as an Artisan
          </h3>
          <p className="font-sans font-medium text-sm text-gray-400/80 tracking-wider">
            Complete your profile to start receiving job requests.
          </p>
        </div>

        <Steppers
          steps={[
            { label: "Basic Info" },
            { label: "Skills" },
            { label: "Identity (KYC)" },
            { label: "Portfolio" },
          ]}
          currentNumber={currentStep}
        />

        <Form className="" onSubmit={onSubmit} schema={ArtisanProfileSchema}>
          {(methods) => {
            const {
              control,
              trigger,
              formState: { errors },
            } = methods;
            const goNext = async () => {
              const fieldsToValidate = stepFields[currentStep];

              const isValid = fieldsToValidate
                ? await trigger(fieldsToValidate as any)
                : true;
              if (isValid) {
                setCurrentStep((s) => Math.min(s + 1, totalSteps));
              }
            };

            const goBack = () => {
              setCurrentStep((s) => Math.max(s - 1, 1));
            };

            return (
              <>
                {currentStep === 1 && (
                  <>
                    <h6 className="text-heading font-bold text-base text-muted">
                      Tell us about yourself
                    </h6>
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
                    <TextArea
                      label="Short Bio"
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
                          registration={methods.register("experience")}
                          error={methods.formState.errors.experience}
                        />
                      </>
                    )}
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1">
                        <h6 className="text-heading font-bold text-base text-muted">
                          Identity Verification (KYC)
                        </h6>
                        <p className="text-xs font-sans">
                          This is the most important step. Verifying your
                          identity protects customers and builds trust in the
                          platform.
                        </p>
                      </div>
                      <div className="flex justify-between items-center mb-3">
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
                      <div className="flex flex-col gap-3">
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
                          name="faceVerification"
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
                      </div>
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <Controller
                    name="workImage"
                    control={control}
                    render={({ field }) => (
                      <FileDropZone
                        label="Showcase your work"
                        value={field.value}
                        maxFiles={6}
                        multiple={true}
                        onChange={field.onChange}
                        error={errors.workImage?.message as string}
                      />
                    )}
                  />
                )}

                <div className="w-full flex items-center mt-4">
                  <div>
                    {currentStep > 1 && (
                      <button type="button" onClick={goBack}>
                        Back
                      </button>
                    )}
                  </div>

                  <div className="ml-auto">
                    {currentStep < totalSteps ? (
                      <Button
                        className="w-[140px]"
                        type="button"
                        isLoading={isPending}
                        onClick={goNext}
                      >
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
