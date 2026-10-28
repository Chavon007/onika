
"use client";

import { Form } from "./form";
import Button from "./button";
import { InputField } from "./inputField";
import useAuthStore from "@/store/authStore";
import { profileFormDTO, profileSchema } from "@/schema/userSchema";

function ProfileForm() {
  const user = useAuthStore((s) => s.user);

  const onSubmit = (data: profileFormDTO) => {};

  return (
    <section className="w-full space-y-6">
      <div>
        <h2 className="font-heading text-2xl text-main">
          Personal Details
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          Manage your personal information and profile details.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-7">
        <Form<profileFormDTO>
          onSubmit={onSubmit}
          schema={profileSchema}
        >
          {(methods) => (
            <div className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <InputField
                  label="Full Name"
                  type="text"
                  defaultValue={user?.fullName}
                  registration={methods.register("fullName")}
                  error={methods.formState.errors.fullName}
                />

                <InputField
                  label="Email Address"
                  type="email"
                  defaultValue={user?.email}
                  registration={methods.register("email")}
                  error={methods.formState.errors.email}
                />

                <InputField
                  label="Phone Number"
                  type="tel"
                  defaultValue={user?.phoneNumber}
                  registration={methods.register("phoneNumber")}
                  error={methods.formState.errors.phoneNumber}
                />

                <InputField
                  label="Preferred State"
                  type="text"
                  defaultValue={user?.state}
                  registration={methods.register("state")}
                  error={methods.formState.errors.state}
                />

                <InputField
                  label="Preferred LGA"
                  type="text"
                  defaultValue={user?.lga}
                  registration={methods.register("lga")}
                  error={methods.formState.errors.lga}
                />
              </div>

              <div className="flex justify-end border-t border-border pt-5">
                <Button
                  type="submit"
                  loadingText="Updating..."
                  className="bg-muted"
                >
                  Update profile
                </Button>
              </div>
            </div>
          )}
        </Form>
      </div>
    </section>
  );
}

export default ProfileForm;
