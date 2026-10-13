"use client";
import { Controller } from "react-hook-form";
import { Form } from "@/component/form";
import { InputField } from "@/component/inputField";
import FileDropZone from "@/component/fileDropzone";
import TextArea from "@/component/TextArea";
import Button from "@/component/button";
import {
  PrivetJobBookingDTO,
  privateJobBookingSchema,
} from "@/schema/postJobSchema";

// The form doesn't collect artisanId; the page adds it on submit
export const bookingFormSchema = privateJobBookingSchema.omit({
  artisanId: true,
});
export type BookingFormData = Omit<PrivetJobBookingDTO, "artisanId">;

interface BookingModalProps {
  onClose: () => void;
  onSubmit: (data: BookingFormData) => void;
  isPending: boolean;
}

function BookingModal({ onClose, onSubmit, isPending }: BookingModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-heading text-xl font-semibold text-main">
          Book Artisan
        </h2>
        <p className="mb-4 text-sm text-muted">
          Fill in the details below and we&apos;ll confirm your booking shortly
        </p>

        <Form onSubmit={onSubmit} schema={bookingFormSchema}>
          {(methods) => {
            const {
              control,
              formState: { errors },
            } = methods;

            return (
              <div className="flex flex-col gap-4">
                <InputField
                  label="Service Date"
                  type="date"
                  registration={methods.register("date")}
                  error={errors.date}
                />
                <InputField
                  label="Address"
                  placeholder="No 10 Folajoro, Shomolu, Lagos"
                  registration={methods.register("address")}
                  error={errors.address}
                />
                <TextArea
                  label="Describe the job"
                  labelClassName="text-base font-bold text-text font-sans"
                  small="The more detail you give, the better your artisan match will be."
                  smallClassName="text-xs font-light text-muted/70 font-heading"
                  placeholder="E.g. Need a plumber to fix a leaking kitchen pipe and replace the kitchen tap."
                  registration={methods.register("description")}
                  error={errors.description}
                />
                <InputField
                  label="Price"
                  placeholder="10,000"
                  type="number"
                  registration={methods.register("price", {
                    valueAsNumber: true,
                  })}
                  error={errors.price}
                />
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

                <div className="flex justify-end gap-3">
                  <Button
                    className="border border-border bg-white text-muted hover:bg-secondary"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending}
                    isLoading={isPending}
                    loadingText="Submitting..."
                  >
                    Submit Booking
                  </Button>
                </div>
              </div>
            );
          }}
        </Form>
      </div>
    </div>
  );
}

export default BookingModal;
