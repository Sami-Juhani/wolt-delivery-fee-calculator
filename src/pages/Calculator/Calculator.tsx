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
      <h1 className="calculator-title">Wolt delivery fee calculator</h1>
      <div className="calc-all-inputs">
        <div className="calc-input-field">
          <Input
            className="calc-input"
            dataTestId="cartValue"
            label="Cart Value"
            value={cartValue}
            min={1}
            width="50px"
            onChange={(e) => {
              setCartValue(Number(e.target.value));
            }}
          />
          <span>€</span>
        </div>
        <div className="calc-input-field">
          <Input
            className="calc-input"
            dataTestId="deliveryDistance"
            label="Delivery distance"
            width="60px"
            value={deliveryDistance}
            onChange={(e) => {
              setDeliveryDistance(Number(e.target.value));
            }}
          />
          <span>m</span>
        </div>
        <Input
          className="calc-input"
          dataTestId="amountOfItems"
          label="Amount of items"
          value={amountOfItems}
          min={1}
          width="50px"
          onChange={(e) => {
            setAmountOfItems(Number(e.target.value));
          }}
        />
        <DateField
          className="calc-input"
          dataTestId="deliveryTime"
          label="Delivery time"
          value={deliveryTime}
          onChange={(e) => {
            setDeliveryTime(e.target.value);
          }}
        />
      </div>
      <Button
        dataTestId="calculateButton"
        className="calculate-btn"
        text="Calculate delivery price"
        onClick={() => calculateDeliveryFee()}
      />
      <p className="total-fee-text" data-testid="totalFee">
        Delivery price: <strong>{totalFee}€</strong>
      </p>
    </div>
  );
};

export default Calculator;
