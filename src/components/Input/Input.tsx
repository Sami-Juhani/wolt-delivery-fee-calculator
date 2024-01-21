type InputProps = {
  dataTestId?: string;
  className?: string;
  label: string;
  value: number;
  min?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label">{props.label}</label>
      <input
        data-testid={props.dataTestId}
        type="number"
        className={props.className}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
      />
    </div>
  );
};

export default Input;
