/* eslint-disable @eslint-react/no-array-index-key */
import type { SlotProps } from "input-otp";
import type { ControllerRenderProps } from "react-hook-form";

import { OTPInput } from "input-otp";

import { cn } from "@/lib/utils";

const Slot = (props: SlotProps) => {
  return (
    <div
      className={cn(
        "relative w-10 h-6 border-b border-b-primary-200 text-xl center",
        "transition-all",
        { "border-b-primary-400": props.isActive },
      )}
    >
      {props.char ?? props.placeholderChar}
    </div>
  );
};

const OTP = ({
  maxLength,
  ...props
}: ControllerRenderProps & { maxLength?: number }) => {
  return (
    <OTPInput
      maxLength={maxLength || 6}
      containerClassName="group dir-ltr center has-[:disabled]:opacity-30 rounded-full border border-primary-500 p-4 outline-none"
      render={({ slots }) => (
        <div className="flex gap-0.5">
          {slots.map((slot, idx) => (
            <Slot key={idx} {...slot} />
          ))}
        </div>
      )}
      {...props}
    />
  );
};

export default OTP;
