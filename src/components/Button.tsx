import { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "action";
  size: "sm" | "md" | "lg";
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  startIcon?: ReactElement;
}

const variantStyles = {
  primary: "bg-blue-500 text-white rounded-lg hover:bg-blue-600",
  secondary: "bg-gray-300 text-blue-800 rounded-lg hover:bg-gray-400",
  action: "bg-blue-700 text-white rounded-3xl",
};

const sizeStyles = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const defaultStyles = "py-1.5 px-2.5 m-1.5 cursor-pointer";

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${defaultStyles} ${variantStyles[props.variant]}
      ${sizeStyles[props.size]}`}
      onClick={props.onClick}
    >
      <div className="flex gap-1.5 items-center justify-center">
        {props.startIcon}
        {props.text}
      </div>
    </button>
  );
};
