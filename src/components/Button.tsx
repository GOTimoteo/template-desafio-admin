import React, { MouseEvent } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  color: "green" | "red" | "gray";
}

const Button = ({
  children,
  onClick,
  isLoading,
  isDisabled,
  color,
}: ButtonProps) => {
  const buttonStyles = {
    green: `text-white font-semibold py-1 px-2 rounded bg-green-500 hover:bg-green-600 ${
      isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`,
    red: `text-white font-semibold py-1 px-2 rounded bg-red-500 hover:bg-red-600 ${
      isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`,
    gray: `text-white font-semibold py-1 px-2 rounded bg-gray-500 hover:bg-gray-600 ${
      isDisabled || isLoading ? "opacity-50 cursor-not-allowed" : ""
    }`,
  };

  return (
    <button
      className={buttonStyles[color]}
      onClick={onClick}
      disabled={isDisabled || isLoading}
    >
      {isLoading ? (
        <div className="animate-spin">
          <AiOutlineLoading3Quarters />
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
