type TimeProps = {
  className?: string;
  dataTestId?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateField: React.FC<TimeProps> = (props: TimeProps) => {
  return (
    <div className="flex-row input-container">
      <label className="input-label">{props.label}</label>
      <input
        className={props.className}
        data-testid={props.dataTestId}
        type="datetime-local"
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default DateField;
