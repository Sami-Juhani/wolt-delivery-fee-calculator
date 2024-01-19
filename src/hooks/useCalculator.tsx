import { useState } from "react";

const useCalculator = (): {
  cartValue: number;
  deliveryDistance: number;
  amountOfItems: number;
  deliveryTime: string;

  setDeliveryDistance: React.Dispatch<React.SetStateAction<number>>;
  setAmountOfItems: React.Dispatch<React.SetStateAction<number>>;
  setCartValue: React.Dispatch<React.SetStateAction<number>>;
  setDeliveryTime: React.Dispatch<React.SetStateAction<string>>;

  calculatePrice: (
    cartValue: number,
    deliveryDistance: number,
    amountOfItems: number,
    deliveryTime: string
  ) => number;
  
} => {
  const [cartValue, setCartValue] = useState<number>(0);
  const [deliveryDistance, setDeliveryDistance] = useState<number>(0);
  const [amountOfItems, setAmountOfItems] = useState<number>(0);
  const [deliveryTime, setDeliveryTime] = useState<string>("");
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculatePrice = () => {
    return 0;
  };

  return {
    cartValue,
    setCartValue,
    deliveryDistance,
    setDeliveryDistance,
    amountOfItems,
    setAmountOfItems,
    deliveryTime,
    setDeliveryTime,
    calculatePrice,
  };
};

export default useCalculator;
