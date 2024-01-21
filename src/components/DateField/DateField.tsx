type TimeProps = {
  dataTestId?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateField: React.FC<TimeProps> = (props: TimeProps) => {
  return (
    <div className="input-container">
      <label className="label">{props.label}</label>
      <input
        data-testid={props.dataTestId}
        type="datetime-local"
        className="calc-input"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default DateField;
