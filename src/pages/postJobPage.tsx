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
import Button from "../component/button";

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

function PostJobForm() {
  const router = useRouter();
  const { mutate, isPending } = usePostJobMutation();
  const [currentStep, setCurrentStep] = useState(1);

  const onSubmit = (data: postJobDTO) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };
  return (
    <div className="min-h-screen p-4">
      <div className="container w-full max-w-2xl mx-auto flex flex-col gap-3">
        <Link href="/dashboard">
          <span></span>
          <span>Back to Dashboard</span>
        </Link>
        <section className="flex flex-col gap-0.5">
          <h3 className="font-heading font-bold  text-black text-3xl tracking-wider">
            Post a Job
          </h3>
          <p className="font-sans font-medium text-sm text-gray-400/80 tracking-wider">
            Tell us what you need — we'll match you with verified artisans in
            minutes.
          </p>
        </section>

        <Steppers
          steps={[
            {
              label: "Service Type",
            },
            {
              label: "Details",
            },
            {
              label: "Location & Budget",
            },
            {
              label: "Review",
            },
          ]}
          currentNumber={currentStep}
        />

        <Form className="" onSubmit={onSubmit} schema={postJobSchema}>
          {(methods) => {
            const {
              control,
              trigger,
              formState: { errors },
            } = methods;

            const goNext = async () => {
              const fieldsToValiadte = stepFields[currentStep];

              const isValid = fieldsToValiadte
                ? await trigger(fieldsToValiadte as any)
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
                    <h6>What service do you need?</h6>
                    <InputField
                      label=""
                      type="text"
                      placeholder="Enter the service you need"
                      registration={methods.register("category")}
                      error={methods.formState.errors.category}
                    />
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <TextArea
                      label="Describe the job"
                      small="The more detail you give, the better your artisan match will be."
                      registration={methods.register("description")}
                      error={methods.formState.errors.description}
                    />

                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <section>
                          <h4>When do you need it?</h4>
                          {when.map((w) => (
                            <div
                              onClick={() => field.onChange(w.title)}
                              key={w.title}
                              className={`cursor-pointer rounded-xl border p-4 transition-colors ${
                                field.value === w.title
                                  ? "border-[#1c1917] bg-[#eef2ff]"
                                  : "border-border bg-white"
                              }`}
                            >
                              <span
                                className="w-3 h-3 rounded-full inline-block"
                                style={{ backgroundColor: w.color }}
                              />
                              <h4>{w.title}</h4>
                              <p>{w.desc}</p>
                            </div>
                          ))}
                        </section>
                      )}
                    />
                    {errors.priority && (
                      <p>{errors.priority.message as string}</p>
                    )}

                    <Controller
                      name="images"
                      control={control}
                      render={({ field }) => (
                        <FileDropZone
                          label="Upload photos of the job"
                          value={field.value}
                          maxFiles={3}
                          multiple={true}
                          onChange={field.onChange}
                          error={errors.images?.message as string}
                        />
                      )}
                    />
                  </>
                )}

                {currentStep === 3 && (
                  <>
                    <div>
                      <h4>Location</h4>
                      <div>
                        <InputField
                          label="City"
                          placeholder="Ikeja"
                          registration={methods.register("city")}
                          error={methods.formState.errors.city}
                        />
                        <InputField
                          label="Street address"
                          placeholder="4 Vincent street"
                          registration={methods.register("address")}
                          error={methods.formState.errors.address}
                        />
                        <InputField
                          label="Nearest landmark to job location"
                          placeholder="Big daddy mall"
                          registration={methods.register("landmark")}
                          error={methods.formState.errors.landmark}
                        />
                      </div>

                      <div>
                        <InputField
                          label="State"
                          placeholder="Enter your state"
                          registration={methods.register("state")}
                          error={methods.formState.errors.state}
                        />

                        <InputField
                          label="Local goverment"
                          placeholder="Enter the local governmenet"
                          registration={methods.register("lga")}
                          error={methods.formState.errors.lga}
                        />
                      </div>
                    </div>

                    <div>
                      <h4>Budget Range</h4>
                      <p>
                        This helps artisans know if the job fits their rates.
                      </p>

                      <InputField
                        placeholder="10,000"
                        registration={methods.register("price")}
                        error={methods.formState.errors.price}
                      />
                    </div>
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <h4>Review your job post</h4>
                    <div>
                      <ReviewRow
                        label="Service"
                        value={methods.getValues("category")}
                      />
                      <ReviewRow
                        label="Description"
                        value={methods.getValues("description")}
                      />
                      <ReviewRow
                        label="Urgency"
                        value={methods.getValues("priority")}
                      />
                      <ReviewRow
                        label="City"
                        value={methods.getValues("city")}
                      />
                      <ReviewRow
                        label="Address"
                        value={methods.getValues("address")}
                      />
                      <ReviewRow
                        label="Landmark"
                        value={methods.getValues("landmark")}
                      />
                      <ReviewRow
                        label="State"
                        value={methods.getValues("state")}
                      />
                      <ReviewRow label="LGA" value={methods.getValues("lga")} />
                      <ReviewRow
                        label="Budget"
                        value={`₦${Number(methods.getValues("price")).toLocaleString()}`}
                        isLast
                      />
                    </div>

                    {/* images shown separately as thumbnails */}
                    <div className="flex flex-col gap-2">
                      <span className="text-sm text-muted">Images of job</span>
                      <div className="flex gap-3">
                        {methods.getValues("images")?.map((file, i) => (
                          <img
                            key={i}
                            src={URL.createObjectURL(file)}
                            alt={`upload-${i}`}
                            className="w-20 h-20 rounded-lg object-cover border border-border"
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <span className="text-lg">🔒</span>
                      <div>
                        <p className="font-bold text-amber-900">
                          Escrow-protected payment
                        </p>
                        <p className="text-sm text-amber-800">
                          When you select an artisan, you'll pay into escrow.
                          The artisan only receives payment after you confirm
                          the job is done.
                        </p>
                      </div>
                    </div>
                  </>
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
                        Post Job
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

export default PostJobForm;
