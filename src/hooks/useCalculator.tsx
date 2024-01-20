import { useState } from "react";

const useCalculator = (): {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  deliveryTime: string;
  totalFee: number;

  setDeliveryDistance: React.Dispatch<React.SetStateAction<number>>;
  setAmountOfItems: React.Dispatch<React.SetStateAction<number>>;
  setCartValue: React.Dispatch<React.SetStateAction<number>>;
  setDeliveryTime: React.Dispatch<React.SetStateAction<string>>;

  calculateDeliveryFee: (
  ) => void;

} => {
  const MIN_ORDER_VALUE: number = 10.0;
  const BASE_DELIVERY_FEE: number = 2.00;
  const MAX_DELIVERY_FEE: number = 15.00;
  const FREE_LIMIT: number = 200.00;
  const DELIVERY_FEE: number = 1.0; // 1€ per 500 meters
  const ITEM_FEE: number = 0.5; // 0.5€ per item if the quntity is over 4 items
  const BULK_FEE: number = 1.2; // 1,2€ per item if more than 12 items

  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [amountOfItems, setAmountOfItems] = useState<number>(0);
  const [totalFee, setTotalFee] = useState<number>(0);

  const calculateDeliveryFee = () => {
    setTotalFee(0);

    let surcharge: number = 0;
    let deliveryFee: number = BASE_DELIVERY_FEE;
    let distanceInKms: number;
    let kilometers: number;
    let meters: number;


    if (cartValue >= FREE_LIMIT) {
      setTotalFee(0);
      return;
    }

    if (cartValue < MIN_ORDER_VALUE) {
      surcharge = MIN_ORDER_VALUE - cartValue;
    }

    if (deliveryDistance > 1000) {
      // distanceInKms = (deliveryDistance - 1000.00) / 1000.00;
      // kilometers = Math.floor(distanceInKms);

      // meters = distanceInKms % 1;

      // deliveryFee += kilometers * DELIVERY_FEE * 2;
      // if (meters > 0.0) deliveryFee += DELIVERY_FEE;
      // if (meters > 0.5) deliveryFee += DELIVERY_FEE * 2;
      deliveryFee += Math.floor((deliveryDistance - 1000) / 500) * DELIVERY_FEE;
      console.log(deliveryDistance % 500)
      if (deliveryDistance % 500 > 0) deliveryFee += DELIVERY_FEE;
      if (deliveryDistance % 500 > 0.5) deliveryFee += DELIVERY_FEE * 2;
    }

    console.log(surcharge);
    console.log(deliveryFee);
    setTotalFee(surcharge + deliveryFee);
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
