import { useState } from "react";
import formatDate from "../utils/formatDate";
import isRushHour from "../utils/isRushHour";

const MIN_ORDER_VALUE: number = 10.0; // If the cart value is less than 10€, there is a surcharge
const BASE_DELIVERY_FEE: number = 2.0; // Base delivery fee
const MAX_DELIVERY_FEE: number = 15.0; // Delivery fee can't be more than 15€
const FREE_LIMIT: number = 200.0; // Deliver is free if the cart value is over 200€
const DELIVERY_FEE: number = 1.0; // 1€ per 500 meters
const ITEM_FEE: number = 0.5; // 0.5€ per item if the quantity is over 4 items
const BULK_FEE: number = 1.2; // 1,2€ surcharge if more than 12 items
const RUSH_HOUR_FEE: number = 1.2; // Total fee is multiplied by this if the delivery time is between Fri 3pm - 7pm
const RUSH_HOUR_DAY: string = "Friday"; // Rush hour day
const RUSH_HOUR_TIME: string = "15-19"; // Rush hour time
const NOW = formatDate(new Date()); // Get the current date and time

/**
 * Calculates the total delivery fee based on the cart value, delivery distance, delivery time, and amount of items.
 * 
 * @returns void - This function does not return anything as it directly updates the state of the total fee.
 */

const useCalculator = () => {
  const [cartValue, setCartValue] = useState<number>(10);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(1000);
  const [deliveryTime, setDeliveryTime] = useState<string>(NOW);
  const [amountOfItems, setAmountOfItems] = useState<number>(4);
  const [totalFee, setTotalFee] = useState<number>(0);

  const calculateDeliveryFee = () : void => {
    let deliveryFee: number = BASE_DELIVERY_FEE; // Total delivery fee, set to the base fee

    /* Store the separate surcharges if they are needed in billing */
    let smallOrderSurcharge: number = 0.0;
    let itemFee: number = 0.0;
    let bulkFee: number = 0.0;
    let distanceFee: number = 0.0;

    if (cartValue >= FREE_LIMIT) {
      setTotalFee(0);
      return;
    }

    if (cartValue < MIN_ORDER_VALUE) {
      smallOrderSurcharge = MIN_ORDER_VALUE - cartValue;
    }

    if (amountOfItems > 4) {
      itemFee = (amountOfItems - 4) * ITEM_FEE;
    }

    if (amountOfItems > 12) {
      bulkFee = BULK_FEE;
    }

    if (deliveryDistance > 1000.0) {
      /* Distance traveled in 500-meter increments round up times delivery cost */
      distanceFee +=
        Math.ceil((deliveryDistance - 1000.0) / 500.0) * DELIVERY_FEE;
    }

    /* Add the surcharges to the delivery fee */
    deliveryFee += smallOrderSurcharge + itemFee + bulkFee + distanceFee;
    /* Check if the delivery time is during rush hour */
    if (isRushHour(new Date(deliveryTime), RUSH_HOUR_DAY, RUSH_HOUR_TIME))
      deliveryFee *= RUSH_HOUR_FEE;
    /* Check if the delivery fee is over the maximum */
    if (deliveryFee > MAX_DELIVERY_FEE) deliveryFee = MAX_DELIVERY_FEE;

    /* Round the delivery fee to two decimal places */
    const parsedDeliveryFee = parseFloat(deliveryFee.toFixed(2));
    
    setTotalFee(parsedDeliveryFee);
  };

  return {
    cartValue,
    setCartValue,
    deliveryDistance,
    setDeliveryDistance,
    deliveryTime,
    setDeliveryTime,
    amountOfItems,
    setAmountOfItems,
    calculateDeliveryFee,
    totalFee,
  };
};

export default useCalculator;
