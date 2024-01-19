import DateField from "../../components/DateField";
import Input from "../../components/Input";
import useCalculator from "../../hooks/useCalculator";
import Button from "../../components/Button";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const {
    cartValue,
    setCartValue,
    deliveryDistance,
    setDeliveryDistance,
    amountOfItems,
    setAmountOfItems,
    deliveryTime,
    setDeliveryTime,
  } = useCalculator();

  return (
    <div className="calculator">
      <div className="calc-input-field">
        <Input
          data-testid="cartValue"
          label="Cart Value"
          value={cartValue}
          onChange={(e) => {
            setCartValue(Number(e.target.value));
          }}
        />
        <span>€</span>
      </div>
      <div className="calc-input-field">
        <Input
          data-testid="deliveryDistance"
          label="Delivery distance"
          value={deliveryDistance}
          onChange={(e) => {
            setDeliveryDistance(Number(e.target.value));
          }}
        />
        <span>m</span>
      </div>
      <Input
        data-testid="amountOfItems"
        label="Amount of items"
        value={amountOfItems}
        onChange={(e) => {
          setAmountOfItems(Number(e.target.value));
        }}
      />
      <DateField
        label="Delivery time"
        value={deliveryTime}
        onChange={(e) => {
          setDeliveryTime(e.target.value);
        }}
      />
      <Button
        data-testid="calculateButton"
        className="calculate-button"
        text="Calculate delivery price"
        onClick={() => {}}
      />
    </div>
  );
};

export default Calculator;
