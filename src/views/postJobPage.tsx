
"use client";

import { useState } from "react";
import usePostJobMutation from "@/api/job";
import { postJobDTO, postJobSchema } from "@/schema/postJobSchema";
import TextArea from "../component/TextArea";
import Steppers from "@/component/stepper";
import ReviewRow from "../component/reviewRow";
import FileDropZone from "../component/fileDropzone";
import { Form } from "../component/form";
import { InputField } from "../component/inputField";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from "../component/button";
import { serviceCard } from "@/constants/serviceCategories";
import { ServiceSelect } from "@/component/serviceSelect";
import { useStepStorage } from "@/provider/useStepStorage";

const stepFields: Record<number, (keyof postJobDTO)[]> = {
  1: ["category"],
  2: ["description", "priority", "images"],
  3: ["city", "state", "landmark", "address", "lga", "price"],
  4: [],
};

const totalSteps = 4;

const when = [
  {
    title: "ASAP",
    desc: "As soon as possible",
    color: "#f50000",
  },
  {
    title: "Today",
    desc: "Within 24 hours",
    color: "#ffff02",
  },
  {
    title: "This week",
    desc: "2 - 7 days",
    color: "#00c1233d",
  },
  {
    title: "Flexible",
    desc: "I'm not in a rush",
    color: "#dfdfdf",
  },
];

const reviewFieldLabels: {
  key: Exclude<keyof postJobDTO, "images">;
  label: string;
}[] = [
  { key: "category", label: "Service" },
  { key: "description", label: "Description" },
  { key: "priority", label: "Urgency" },
  { key: "city", label: "City" },
  { key: "address", label: "Address" },
  { key: "landmark", label: "Landmark" },
  { key: "state", label: "State" },
  { key: "lga", label: "LGA" },
  { key: "price", label: "Budget" },
];

function PostJobForm() {
  const router = useRouter();
  const { mutateAsync, isPending } = usePostJobMutation();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentStep, setCurrentStep] = useStepStorage(
    "post-job-draft",
    totalSteps,
  );

  const onSubmit = async (data: postJobDTO) => {
    await mutateAsync(data);
    sessionStorage.removeItem("post-job-draft-step");
    setShowSuccessModal(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background px-4 pb-4 pt-24 transition-colors duration-300">
      <div className="container mx-auto flex w-full max-w-3xl flex-col gap-3">
        {/* Back navigation */}
        <Link href="/dashboard" className="flex items-center gap-1">
          <span className="text-2xl text-text/80">
            <IoIosArrowRoundBack />
          </span>

          <span className="font-heading text-sm font-medium text-text/80">
            Back to Dashboard
          </span>
        </Link>

        {/* Page heading */}
        <section className="flex flex-col gap-1.5">
          <h3 className="font-heading text-3xl font-bold tracking-wider text-muted">
            Post a Job
          </h3>

          <p className="font-sans text-sm font-medium tracking-wider text-muted">
            Tell us what you need — we'll match you with verified artisans in
            minutes.
          </p>
        </section>

        <Steppers
          steps={[
            { label: "Service Type" },
            { label: "Details" },
            { label: "Location & Budget" },
            { label: "Review" },
          ]}
          currentNumber={currentStep}
        />

        <Form
          className=""
          onSubmit={onSubmit}
          schema={postJobSchema}
          storageKey="post-job-draft"
        >
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

            const values = methods.getValues();

            return (
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentStep < totalSteps) {
                    e.preventDefault();
                  }
                }}
              >
                {/* Step 1: Service Type */}
                {currentStep === 1 && (
                  <div className="flex flex-col gap-3">
                    <h6 className="font-heading text-base font-bold text-text">
                      What service do you need?
                    </h6>

                    <Controller
                      name="category"
                      control={methods.control}
                      render={({ field }) => (
                        <ServiceSelect
                          label="Select the service you need"
                          small="Choose one category that best matches your job."
                          options={serviceCard}
                          multiple={false}
                          value={field.value ?? ""}
                          onChange={field.onChange}
                          error={
                            methods.formState.errors.category?.message as string
                          }
                        />
                      )}
                    />
                  </div>
                )}

                {/* Step 2: Job Details */}
                {currentStep === 2 && (
                  <div className="flex flex-col gap-3">
                    <TextArea
                      label="Describe the job"
                      labelClassName="text-base font-bold text-text font-sans"
                      small="The more detail you give, the better your artisan match will be."
                      smallClassName="text-xs font-light text-muted font-heading"
                      placeholder="E.g. Need a licensed plumber to fix a leaking kitchen pipe and replace the kitchen tap. The pipe has been dripping for 3 days. Apartment is on the 2nd floor."
                      registration={methods.register("description")}
                      error={methods.formState.errors.description}
                    />

                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <section className="flex flex-col gap-2">
                          <h4 className="font-sans text-sm font-bold text-text">
                            When do you need it?
                          </h4>

                          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                            {when.map((w) => {
                              const selected = field.value === w.title;

                              return (
                                <button
                                  type="button"
                                  onClick={() => field.onChange(w.title)}
                                  key={w.title}
                                  className={`flex cursor-pointer flex-col items-start rounded-xl border p-4 text-left transition-colors ${
                                    selected
                                      ? "border-primary bg-primary/10 text-primary"
                                      : "border-border bg-background text-text hover:border-primary/50"
                                  }`}
                                >
                                  <span
                                    className="inline-block h-5 w-5 rounded-full"
                                    style={{ backgroundColor: w.color }}
                                  />

                                  <h4 className="mt-2 font-heading text-xs font-bold text-text">
                                    {w.title}
                                  </h4>

                                  <p className="font-sans text-xs font-light text-muted">
                                    {w.desc}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                        </section>
                      )}
                    />

                    {errors.priority && (
                      <p className="text-xs text-red-500">
                        {errors.priority.message as string}
                      </p>
                    )}

                    <Controller
                      name="images"
                      control={control}
                      render={({ field }) => (
                        <FileDropZone
                          label="Upload photos of the job"
                          value={field.value}
                          maxFiles={6}
                          multiple={true}
                          onChange={field.onChange}
                          error={errors.images?.message as string}
                        />
                      )}
                    />
                  </div>
                )}

                {/* Step 3: Location and Budget */}
                {currentStep === 3 && (
                  <div className="flex flex-col">
                    <h4 className="font-heading text-base font-bold text-text">
                      Location
                    </h4>

                    <div className="grid grid-cols-1 items-center gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 lg:gap-2">
                      <InputField
                        label="City"
                        labelClassName="text-xs font-medium text-muted font-sans"
                        placeholder="Ikeja"
                        registration={methods.register("city")}
                        error={methods.formState.errors.city}
                      />

                      <InputField
                        label="Street address"
                        labelClassName="text-xs font-medium text-muted font-sans"
                        placeholder="4 Vincent street"
                        registration={methods.register("address")}
                        error={methods.formState.errors.address}
                      />

                      <InputField
                        label="Nearest landmark to job location"
                        labelClassName="text-xs font-medium text-muted font-sans"
                        placeholder="Big daddy mall"
                        registration={methods.register("landmark")}
                        error={methods.formState.errors.landmark}
                      />
                    </div>

                    <div className="grid grid-cols-1 items-center md:grid-cols-2 md:gap-[110px]">
                      <InputField
                        label="State"
                        labelClassName="text-xs font-medium text-muted font-sans"
                        placeholder="Enter your state"
                        registration={methods.register("state")}
                        error={methods.formState.errors.state}
                      />

                      <InputField
                        label="Local government"
                        labelClassName="text-xs font-medium text-muted font-sans"
                        placeholder="Enter the local government"
                        registration={methods.register("lga")}
                        error={methods.formState.errors.lga}
                      />
                    </div>

                    <div className="mt-5 flex flex-col">
                      <h4 className="font-heading text-base font-bold text-text">
                        Budget Range
                      </h4>

                      <p className="font-sans text-sm font-medium tracking-wider text-muted">
                        This helps artisans know if the job fits their rates.
                      </p>

                      <InputField
                        placeholder="10,000"
                        type="number"
                        registration={methods.register("price", {
                          valueAsNumber: true,
                        })}
                        error={methods.formState.errors.price}
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review */}
                {currentStep === 4 && (
                  <>
                    <h4 className="font-heading text-base font-bold text-text">
                      Review your job post
                    </h4>

                    <div className="mt-2 flex flex-col overflow-hidden rounded-2xl border border-border bg-background">
                      <div className="flex flex-col gap-3 border-b border-border">
                        {reviewFieldLabels.map((r, i) => (
                          <ReviewRow
                            key={r.label}
                            label={r.label}
                            value={
                              r.key === "price"
                                ? `₦${Number(values.price).toLocaleString()}`
                                : values[r.key]
                            }
                            isLast={i === reviewFieldLabels.length - 1}
                          />
                        ))}
                      </div>

                      {/* Images shown separately as thumbnails */}
                      <div className="flex flex-col gap-3 p-3">
                        <span className="font-sans text-base font-bold text-muted">
                          Images of job
                        </span>

                        <div className="flex flex-wrap gap-3">
                          {methods.getValues("images")?.map((file, i) => (
                            <img
                              key={i}
                              src={URL.createObjectURL(file)}
                              alt={`upload-${i}`}
                              className="h-20 w-20 rounded-lg border border-border object-cover"
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Escrow notice */}
                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
                      <div className="flex gap-3">
                        <span className="text-lg">🔒</span>

                        <div>
                          <p className="font-bold text-amber-900 dark:text-amber-300">
                            Escrow-protected payment
                          </p>

                          <p className="text-sm text-amber-800 dark:text-amber-200/80">
                            Once you post this job, payment is deducted from
                            your wallet and held securely in escrow. The artisan
                            receives payment only after you confirm the job is
                            completed to your satisfaction.
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Step navigation */}
                <div className="mt-4 flex w-full items-center">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="w-[100px] cursor-pointer rounded-xl border border-border bg-background p-2 font-sans text-sm font-medium text-text transition-colors hover:bg-secondary"
                        onClick={goBack}
                      >
                        Back
                      </button>
                    )}
                  </div>

                  <div className="ml-auto">
                    {currentStep < totalSteps ? (
                      <Button
                        className="w-[140px]"
                        key="next-btn"
                        type="button"
                        isLoading={isPending}
                        onClick={goNext}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        key="submit-btn"
                        isLoading={isPending}
                        loadingText="Submitting...."
                      >
                        Post Job
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          }}
        </Form>

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background transition-colors duration-300">
            <div className="flex flex-col items-center justify-center gap-4 px-4 text-center">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 dark:bg-green-500/15">
                <FiCheck className="text-5xl text-green-600 dark:text-green-400" />
              </span>

              <h4 className="font-heading text-4xl font-bold text-text">
                Job Posted!
              </h4>

              <p className="max-w-md font-sans text-base text-muted">
                We're matching you with verified artisans nearby. You'll
                receive proposals within minutes.
              </p>

              <small className="font-sans text-sm text-muted/60">
                Redirecting to the dashboard...
              </small>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostJobForm;
