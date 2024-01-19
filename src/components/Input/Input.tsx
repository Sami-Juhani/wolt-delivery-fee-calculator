type Props = {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className="input-container">
      <label className="input-label">{props.label}</label>
      <input
        type="number"
        className="input"
        value={props.value}
        onChange={props.onChange}
        min={0}
      />
    </div>
  );
};

export default Input;
