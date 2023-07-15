import React, { MouseEvent } from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  variant = "primary",
}: ButtonProps) => {
  const buttonStyles = `
    py-2 px-4 rounded font-bold text-white
    ${
      variant === "primary"
        ? "bg-green-500 hover:bg-green-700"
        : "bg-red-500 hover:bg-red-700"
    }
    ${isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""}
  `;

  return (
    <button
      className={buttonStyles}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
