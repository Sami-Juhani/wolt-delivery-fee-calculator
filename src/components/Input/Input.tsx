type InputProps = {
  id: string;
  type: 'text' | 'number' | 'password' | 'email';
  label: string;
  value: number;
  dataTestId?: string;
  className?: string;
  min?: number;
  width?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = ({
  id,
  type,
  label,
  value,
  dataTestId,
  className,
  min,
  width,
  disabled,
  onChange,
}) => {
  return (
    <div className="flex-row input-container">
      <label htmlFor={id} className="input-label">{label}</label>
      <input
        id={id}
        type={type}
        className={className}
        style={{ width: width }}
        data-testid={dataTestId}
        value={value}
        onChange={onChange}
        min={min}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
