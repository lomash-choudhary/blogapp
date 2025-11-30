import type React from "react";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const CustomButton = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: CustomButtonProps) => {
  return (
    <button
    type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
