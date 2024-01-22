import { useState } from "react";
import DateField from "../../components/DateField";
import Input from "../../components/Input";
import useCalculator from "../../hooks/useCalculator";
import Button from "../../components/Button";
import "./Calculator.css";

const Calculator: React.FC = () => {
  const [isFree, setIsFree] = useState<boolean>(false);

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
      <div className="flex-column calc-all-inputs">
        <div className="flex-row calc-input-field">
          <Input
            className="calc-input"
            type="number"
            dataTestId="cartValue"
            label="Cart Value"
            value={cartValue}
            min={1}
            width="60px"
            onChange={(e) => {
              setCartValue(Number(e.target.value));
              if (Number(e.target.value) >= 200) setIsFree(true);
              else setIsFree(false);
            }}
          />
          <span>€</span>
        </div>
        <div className="flex-row calc-input-field">
          <Input
            className="calc-input"
            type="number"
            dataTestId="deliveryDistance"
            label="Delivery distance"
            width="80px"
            value={deliveryDistance}
            onChange={(e) => {
              setDeliveryDistance(Number(e.target.value));
            }}
          />
          <span>m</span>
        </div>
        <Input
          className="calc-input"
          type="number"
          dataTestId="amountOfItems"
          label="Amount of items"
          value={amountOfItems}
          min={1}
          width="60px"
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
        disabled={isFree}
        onClick={() => calculateDeliveryFee()}
      />
      <div className="flex-row calc-total-container">
        <div className="total-fee-text">
          {isFree ? (
            "Delivery is free!"
          ) : (
            <p>
              Delivery price: <strong data-testid="totalFee">{totalFee}</strong>
              <span style={{ marginLeft: "2px" }}>€</span>
            </p>
          )}
        </div>
        <img
          src="/images/wolt-logo.png"
          alt="Wolt logo"
          className="wolt-logo"
        />
      </div>
    </div>
  );
};

export default Calculator;
