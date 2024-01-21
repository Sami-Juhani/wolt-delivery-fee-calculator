type InputProps = {
  dataTestId?: string;
  className?: string;
  label: string;
  value: number;
  min?: number;
  width?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  return (
    <div className="input-container">
      <label className="input-label">{props.label}</label>
      <input
        type="number"
        className={props.className}
        style={{ width: props.width }}
        data-testid={props.dataTestId}
        value={props.value}
        onChange={props.onChange}
        min={props.min}
      />
    </div>
  );
};

export default Input;
