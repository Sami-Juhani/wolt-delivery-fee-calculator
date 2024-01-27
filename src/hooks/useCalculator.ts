import { useState } from "react";
import formatDate from "../utils/formatDate";
import isRushHour from "../utils/isRushHour";

const FREE_LIMIT: number = 200.0; 
const ITEM_FEE_LIMIT: number = 4;
const BULK_FEE_LIMIT: number = 12;
const DELIVERY_DISTANCE_LIMIT: number = 1000.0;
const MIN_ORDER_VALUE: number = 10.0; 
const BASE_DELIVERY_FEE: number = 2.0; 
const MAX_DELIVERY_FEE: number = 15.0; 
const DELIVERY_FEE: number = 1.0; 
const ITEM_FEE: number = 0.5; 
const BULK_FEE: number = 1.2; 
const RUSH_HOUR_FEE: number = 1.2; 
const RUSH_HOUR_DAY: string = "Friday"; 
const RUSH_HOUR_TIME: string = "15-19";
const NOW = formatDate(new Date());

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
    /* Total delivery fee, set to the base fee */
    let deliveryFee: number = BASE_DELIVERY_FEE; 

    /* Store the separate surcharges if they are needed in billing */
    let smallOrderSurcharge: number = 0.0;
    let itemFee: number = 0.0;
    let bulkFee: number = 0.0;
    let distanceFee: number = 0.0;
    
    /* Check if the cart value is over the free limit */
    if (cartValue >= FREE_LIMIT) {
      setTotalFee(0);
      return;
    }
    
    /* If the cart value is under the minimum order value, add surchage */
    if (cartValue < MIN_ORDER_VALUE) {
      smallOrderSurcharge = MIN_ORDER_VALUE - cartValue;
    }
    
    /* If the amount of items is over the item limit, add surcharge */
    if (amountOfItems > ITEM_FEE_LIMIT) {
      itemFee = (amountOfItems - ITEM_FEE_LIMIT) * ITEM_FEE;
    }
    
    /* If the amount of items is over the bulk limit, add surcharge */
    if (amountOfItems > BULK_FEE_LIMIT) {
      bulkFee = BULK_FEE;
    }
    
    /* If the delivery distance is over 1000 meters, add surcharge */
    if (deliveryDistance > DELIVERY_DISTANCE_LIMIT) {
      /* Calculate the surcharge for the distance traveled in 500-meter increments. 
         Round up to charge for every starting 500 meters. */
      distanceFee +=
        Math.ceil((deliveryDistance - DELIVERY_DISTANCE_LIMIT) / 500.0) * DELIVERY_FEE;
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
