"use client";
import { useState } from "react";
import usePostJobMutation from "@/api/job";
import { postJobDTO, postJobSchema } from "@/schema/postJobSchema";
import TextArea from "./TextArea";
import Steppers from "@/component/stepper";
import Image from "next/image";
import { Form } from "./form";
import { InputField } from "./inputField";
import { Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
                  </>
                )}
              </>
            );
          }}
        </Form>
      </div>
    </div>
  );
}

export default PostJobForm;
