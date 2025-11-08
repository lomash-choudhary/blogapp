import type React from "react";

const CustomButton = ({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}: {
  children: React.ReactNode;
  type?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg ${bgColor}, ${textColor}, ${className}, ${type}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default CustomButton;
