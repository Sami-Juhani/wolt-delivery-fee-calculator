type TimeProps = {
  id: string;
  className?: string;
  dataTestId?: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const DateField: React.FC<TimeProps> = ({
  id,
  className,
  dataTestId,
  label,
  value,
  onChange,
}: TimeProps) => {
  return (
    <div className="flex-row input-container">
      <label htmlFor={id} className="input-label">{label}</label>
      <input
        id={id}
        className={className}
        data-testid={dataTestId}
        type="datetime-local"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default DateField;
