import React, { useId, type JSX } from "react";

const CustomInput = React.forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    ...props
  }: React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    type?: string;
    className?: string;
  },
  ref: React.Ref<HTMLInputElement>
): JSX.Element {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        // we will give unique id using the useId method in the htmlFor
        <label className="inline-block mb-1 pl-1" htmlFor={id}>
          {label}
        </label>
      )}
      {
        <input
          type={type}
          className={`px-3 py-2 text-black rounded-lg bg-white outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
          ref={ref}
          {...props}
          id={id}
        />
        // same id is attached to the label and the input box so that if some one clicks on that label then the related input box gets high-lighted and the cursor also reaches there.
      }
    </div>
  );
});

export default CustomInput;
