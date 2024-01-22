import React from "react";

type ButtonProps = {
  className: string;
  text: string;
  dataTestId?: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      data-testid={props.dataTestId}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text}
    </button>
  );
};

export default Button;
