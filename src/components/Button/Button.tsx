import React from "react";

type ButtonProps = {
  dataTestId?: string;
  className: string;
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      className={props.className}
      data-testid={props.dataTestId}
      onClick={props.onClick}
    >
      {props.text}
    </button>
  );
};

export default Button;
