type ButtonProps = {
  className: string;
  text: string;
  dataTestId?: string;
  disabled?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button: React.FC<ButtonProps> = ({ className, text, dataTestId, disabled, onClick }: ButtonProps) => {
  return (
    <button
      className={className}
      data-testid={dataTestId}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
