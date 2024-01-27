import { useState } from "react";
import DateField from "../../components/DateField";
import Input from "../../components/Input";
import useCalculator from "../../hooks/useCalculator";
import Button from "../../components/Button";
import "./Calculator.css";

const FREE_DELIVERY_LIMIT = 200;

const Calculator: React.FC = () => {
  const [isFree, setIsFree] = useState<boolean>(false);

  const handleCartValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCartValue(Number(e.target.value));
    if (Number(e.target.value) >= FREE_DELIVERY_LIMIT) setIsFree(true);
    else setIsFree(false);
  };

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
            id="calc-cartvalue-input"
            className="calc-input"
            type="number"
            dataTestId="cartValue"
            label="Cart Value"
            value={cartValue}
            min={1}
            width="60px"
            onChange={handleCartValueChange}
          />
          <span>€</span>
        </div>

        <div className="flex-row calc-input-field">
          <Input
            id="calc-deliverydist-input"
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
          id="calc-amountofitems-input"
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
          id="calc-deliverytime-input"
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
        <div
          className={
            totalFee !== 0 || isFree
              ? "total-fee-text"
              : "total-fee-text hidden"
          }
        >
          {isFree ? (
            "Delivery is free!"
          ) : (
            <p>
              Your delivery price is{" "}
              <strong data-testid="totalFee">{totalFee}</strong>
              <span className="margin-left-small">€</span>
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
