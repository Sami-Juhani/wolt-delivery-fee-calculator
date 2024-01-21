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
    calculateDeliveryFee,
    totalFee,
  } = useCalculator();

  return (
    <div className="calculator">
      <div className="calc-input-container">
        <Input
          dataTestId="cartValue"
          label="Cart Value"
          value={cartValue}
          min={1}
          onChange={(e) => {
            setCartValue(Number(e.target.value));
          }}
        />
        <span>€</span>
      </div>
      <div className="calc-input-container">
        <Input
          className="calc-input-field"
          dataTestId="deliveryDistance"
          label="Delivery distance"
          value={deliveryDistance}
          onChange={(e) => {
            setDeliveryDistance(Number(e.target.value));
          }}
        />
        <span>m</span>
      </div>
      <Input
        dataTestId="amountOfItems"
        label="Amount of items"
        value={amountOfItems}
        min={1}
        onChange={(e) => {
          setAmountOfItems(Number(e.target.value));
        }}
      />
      <DateField
        dataTestId="deliveryTime"
        label="Delivery time"
        value={deliveryTime}
        onChange={(e) => {
          setDeliveryTime(e.target.value);
        }}
      />
      <Button
        dataTestId="calculateButton"
        className="calculate-button"
        text="Calculate delivery price"
        onClick={() => calculateDeliveryFee()}
      />
      <h2 data-testid="totalFee" className="total-fee">
        {totalFee}€
      </h2>
    </div>
  );
};

export default Calculator;
