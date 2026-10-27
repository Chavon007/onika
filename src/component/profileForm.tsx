import { Form } from "./form";
import Button from "./button";
import { InputField } from "./inputField";
import TextArea from "./TextArea";
import useAuthStore from "@/store/authStore";
import { profileFormDTO, profileSchema } from "@/schema/userSchema";
function ProfileForm() {
  const user = useAuthStore((s) => s.user);

  const onSubmit = (data: profileFormDTO) => {};

  return (
    <div>
      <h2>Personal Details</h2>
      <Form<profileFormDTO> onSubmit={onSubmit} schema={profileSchema}>
        {(methods) => (
          <>
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

            <Button type="button" loadingText="Updating...">
              Update profile
            </Button>
          </>
        )}
      </Form>
    </div>
  );
}

export default ProfileForm;
