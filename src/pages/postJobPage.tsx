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

const services = [
  { title: "Cleaning", icon: "🧹", bg: "bg-yellow-100" },
  { title: "Plumbing", icon: "🔧", bg: "bg-blue-100" },
  { title: "Car Wash", icon: "🚗", bg: "bg-green-100" },
  { title: "Electrician", icon: "⚡", bg: "bg-purple-100" },
  { title: "Painting", icon: "🎨", bg: "bg-pink-100" },
  { title: "Chefs", icon: "👨‍🍳", bg: "bg-emerald-100" },
  { title: "AC Techs", icon: "❄️", bg: "bg-sky-100" },
  { title: "Moving/Packing", icon: "📦", bg: "bg-amber-100" },
  { title: "Hairdressing", icon: "💇‍♀️", bg: "bg-rose-100" },
  { title: "Makeup Artist", icon: "💄", bg: "bg-fuchsia-100" },
  { title: "Carpentry", icon: "🔨", bg: "bg-lime-100" },
  { title: "Gardening", icon: "🌿", bg: "bg-teal-100" },
  { title: "Laundry", icon: "🧺", bg: "bg-cyan-100" },
  { title: "Photography", icon: "📷", bg: "bg-indigo-100" },
  { title: "Tutoring", icon: "📚", bg: "bg-violet-100" },
  { title: "Tailoring", icon: "🧵", bg: "bg-red-100" },
  { title: "Other", icon: "✨", bg: "bg-orange-100" },
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
];

function PostJobForm() {
  const router = useRouter();
  const { mutate, isPending } = usePostJobMutation();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = (data: postJobDTO) => {
    mutate(data, {
      onSuccess: () => {
        setShowSuccessModal(true);
        setTimeout(() => {
          router.push("/dashboard");
        }, 3000);
      },
    });
  };
  return (
    <div className="min-h-screen p-4 bg-background">
      <div className="container w-full max-w-3xl mx-auto flex flex-col gap-3">
        <Link href="/dashboard" className=" flex gap-1 items-center">
          <span className="text-text/80 text-2xl">
            <IoIosArrowRoundBack />
          </span>
          <span className="text-text/80 text-sm font-medium font-heading">
            Back to Dashboard
          </span>
        </Link>
        <section className="flex flex-col gap-1.5">
          <h3 className="font-heading font-bold  text-muted text-3xl tracking-wider">
            Post a Job
          </h3>
          <p className="font-sans font-medium text-sm text-muted tracking-wider">
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
            const values = methods.getValues();
            return (
              <div
                onKeyDown={(e) => {
                  if (e.key === "Enter" && currentStep < totalSteps) {
                    e.preventDefault();
                  }
                }}
              >
                {currentStep === 1 && (
                  <div className="flex flex-col gap-3">
                    <h6 className="text-text text-base font-bold font-heading">
                      What service do you need?
                    </h6>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                      {services.map((s) => (
                        <div
                          key={s.title}
                          onClick={() =>
                            methods.setValue("category", s.title, {
                              shouldValidate: true,
                            })
                          }
                          className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center gap-1 transition-colors ${s.bg} ${
                            methods.watch("category") === s.title
                              ? "border-[#1c1917]"
                              : "border-transparent"
                          }`}
                        >
                          <span>{s.icon}</span>
                          <span>{s.title}</span>
                        </div>
                      ))}
                    </div>
                    <InputField
                      label=""
                      type="text"
                      placeholder="Or type the service you need"
                      registration={methods.register("category")}
                      error={methods.formState.errors.category}
                    />
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="flex flex-col gap-3">
                    <TextArea
                      label="Describe the job"
                      labelClassName="text-base font-bold text-text font-sans"
                      small="The more detail you give, the better your artisan match will be."
                      smallClassName="text-xs font-light text-muted/70 font-heading"
                      placeholder="E.g. Need a licensed plumber to fix a leaking kitchen pipe and replace the kitchen tap. The pipe has been dripping for 3 days. Apartment is on the 2nd floor."
                      registration={methods.register("description")}
                      error={methods.formState.errors.description}
                    />

                    <Controller
                      name="priority"
                      control={control}
                      render={({ field }) => (
                        <section className="flex flex-col gap-2">
                          <h4 className="text-sm text-text font-sans font-bold">
                            When do you need it?
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
                                  className="w-5 h-5 rounded-full inline-block"
                                  style={{ backgroundColor: w.color }}
                                />
                                <h4 className="text-text text-xs font-bold font-heading">
                                  {w.title}
                                </h4>
                                <p className="text-muted/70 font-sans text-xs font-light">
                                  {w.desc}
                                </p>
                              </div>
                            ))}
                          </div>
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
                          maxFiles={6}
                          multiple={true}
                          onChange={field.onChange}
                          error={errors.images?.message as string}
                        />
                      )}
                    />
                  </div>
                )}

                {currentStep === 3 && (
                  <>
                    <div className=" flex flex-col">
                      <h4 className="text-text text-base font-bold font-heading">
                        Location
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-2 md:gap-3 lg:gap-2">
                        <InputField
                          label="City"
                          labelClassName="text-muted text-xs font-medium font-sans"
                          placeholder="Ikeja"
                          registration={methods.register("city")}
                          error={methods.formState.errors.city}
                        />
                        <InputField
                          label="Street address"
                          labelClassName="text-muted text-xs font-medium font-sans"
                          placeholder="4 Vincent street"
                          registration={methods.register("address")}
                          error={methods.formState.errors.address}
                        />
                        <InputField
                          label="Nearest landmark to job location"
                          labelClassName="text-muted text-xs font-medium font-sans"
                          placeholder="Big daddy mall"
                          registration={methods.register("landmark")}
                          error={methods.formState.errors.landmark}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 items-center md:gap-[110px]">
                        <InputField
                          label="State"
                          labelClassName="text-muted text-xs font-medium font-sans"
                          placeholder="Enter your state"
                          registration={methods.register("state")}
                          error={methods.formState.errors.state}
                        />

                        <InputField
                          label="Local government"
                          labelClassName="text-muted text-xs font-medium font-sans"
                          placeholder="Enter the local governmenet"
                          registration={methods.register("lga")}
                          error={methods.formState.errors.lga}
                        />
                      </div>

                      <div className="flex flex-col mt-5">
                        <h4 className="text-text text-base font-bold font-heading">
                          Budget Range
                        </h4>
                        <p className="font-sans font-medium text-sm text-muted tracking-wider">
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
                  </>
                )}

                {currentStep === 4 && (
                  <>
                    <h4 className="text-text text-base font-bold font-heading">
                      Review your job post
                    </h4>
                    <div className=" flex flex-col mt-2 bg-[#fff] border border-border rounded rounded-2xl">
                      <div className="flex flex-col border-b border-border gap-3 ">
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
                      {/* images shown separately as thumbnails */}
                      <div className="flex flex-col gap-3 p-3">
                        <span className="text-base text-muted font-sans font-bold">
                          Images of job
                        </span>
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
                    </div>

                    <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <div className="flex gap-3">
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
                    </div>
                  </>
                )}

                <div className="w-full flex items-center mt-4">
                  <div>
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="cursor-pointer hover:bg-secondary text-sm hover:text-muted border text-text font-sans font-medium p-2 w-[100px] rounded-xl"
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

        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
            <div className="flex flex-col items-center justify-center gap-4 text-center px-4">
              <span className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                <FiCheck className="text-5xl text-green-600" />
              </span>
              <h4 className="font-heading text-4xl font-bold text-text">
                Job Posted!
              </h4>
              <p className="font-sans text-base text-muted max-w-md">
                We're matching you with verified artisans nearby. You'll receive
                proposals within minutes
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
