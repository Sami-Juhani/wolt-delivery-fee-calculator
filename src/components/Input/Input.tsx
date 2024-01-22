type InputProps = {
  type: string;
  label: string;
  value: number;
  dataTestId?: string;
  className?: string;
  min?: number;
  width?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className="flex-row input-container">
      <label className="input-label">{props.label}</label>
      <input
        type={props.type}
        className={props.className}
        style={{ width: props.width }}
        data-testid={props.dataTestId}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
        disabled={props.disabled}
      />
    </div>
  );
};

export default Input;
