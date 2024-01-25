import { renderHook, act } from "@testing-library/react";
import useCalculator from "../useCalculator";

let result: any;

type SetupProps = {
  result: any;
  cartValue: string;
  deliveryDistanceValue: string;
  amountOfItemsValue: string;
  deliveryTimeValue: string;
};

const setupAndCalculate = ({result, cartValue, deliveryDistanceValue, amountOfItemsValue, deliveryTimeValue }: SetupProps) : void => {
  act(() => {
    result.current.setCartValue(cartValue);
    result.current.setDeliveryDistance(deliveryDistanceValue);
    result.current.setAmountOfItems(amountOfItemsValue);
    result.current.setDeliveryTime(deliveryTimeValue);
  });

    act(() => {
      result.current.calculateDeliveryFee();
    });
};

test("calculateDeliveryFee sets totalFee to 0 when cartValue is 200€ or more. Delivery is free", () => {
  result = renderHook(() => useCalculator()).result;

  // 200€ = 0€
  setupAndCalculate({result: result, cartValue: "200", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(0);

  // 300€ = 0€
  setupAndCalculate({result: result, cartValue: "300", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(0);
});

test("calculateDeliveryFee calculates small order surcharge correctly", () => {
  result = renderHook(() => useCalculator()).result;

  // 9.99€ -> 2€ base fee + 0.01€ surcharge = 2.01€
  setupAndCalculate({result: result, cartValue: "9.99", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2.01);

  // 9.50€ -> 2€ base fee + 0.50€ surcharge = 2.50€
  setupAndCalculate({result: result, cartValue: "9.5", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2.5);

  // 10€ -> 2€ base fee + 0€ surcharge = 2€ (no surcharge) 
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2);
});

test("calculateDeliveryFee calculates distance fee correctly, without any additional surcharges", () => {
  result = renderHook(() => useCalculator()).result;

  // 1m -> 2€ base fee + 0€ surcharge = 2€ (no surcharge) = 2€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2);

  // 1000m -> 2€ base fee + 0€ surcharge = 2€ (no surcharge) = 2€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2);

  // 1499m -> 2€ base fee + 1€ surcharge = 3€ (surcharge for distance over 1000m) = 3€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1499", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(3);

  // 1500m -> 2€ base fee + 1€ surcharge = 3€ (surcharge for distance over 1000m) = 3€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1500", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(3);

  // 1501m -> 2€ base fee + 2€ surcharge = 4€ (surcharge for distance over 1500m) = 4€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1501", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(4);

  // 5984m -> 2€ base fee + 10€ surcharge = 12€ (surcharge for distance over 5000m) = 12€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "5984", amountOfItemsValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(12);
});

test("calculateDeliveryFee calculates item fee correctly", () => {
  result = renderHook(() => useCalculator()).result;

  // 4 items -> 2€ base fee + 0€ item fee = 2€ (no item fee) = 2€ 
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "4", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2);

  // 5 items -> 2€ base fee + 0.5€ item fee = 2.5€ (item fee for 5th item) = 2.5€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "5", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(2.5);

  // 10 items -> 2€ base fee + 3€ item fee = 5€ (item fee for 6 items) = 5€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "10", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(5);

  // 15 items -> 2€ base fee + 5.5€ item fee + 1.2€ bulk fee = 8.7€ (item fee for 11 items, bulk fee for 15 items) = 8.7€
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "15", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(result.current.totalFee).toBe(8.7);
});

test("calculateDeliveryFee calculates the delivery fee correctly if it is rush hour", () => {
  result = renderHook(() => useCalculator()).result;

  // Friday, 2.59pm -> 2€ base fee + 0€ rush hour fee = 2€ (not rush hour)
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2024-01-19T14:59"});
  expect(result.current.totalFee).toBe(2);

  // Friday, 7pm -> 2€ base fee + 0€ rush hour fee = 2€ (not rush hour)
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2024-01-19T19:00"});
  expect(result.current.totalFee).toBe(2);

  // Friday, 3pm -> 2€ base fee + 0.4€ rush hour fee = 2.4€ (rush hour)
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2024-01-19T15:00"});
  expect(result.current.totalFee).toBe(2.4);

  // Friday, 5.04pm -> 2€ base fee + 0.4€ rush hour fee = 2.4€ (rush hour)
  setupAndCalculate({result: result, cartValue: "10", deliveryDistanceValue: "1000", amountOfItemsValue: "1", deliveryTimeValue: "2024-01-19T17:04"});
  expect(result.current.totalFee).toBe(2.4);
});

test("calculateDeliveryFee calculates the total delivery fee correctly", () => {
  result = renderHook(() => useCalculator()).result;

  // 9.5€ cart value, 2400m distance, 15 items, Saturday 2.02pm delivery time = 12.2€
  setupAndCalculate({result: result, cartValue: "9.5", deliveryDistanceValue: "2400", amountOfItemsValue: "15", deliveryTimeValue: "2023-12-23T12:02:00"});
  expect(result.current.totalFee).toBe(12.2);

  // 9.5€ cart value, 2400m distance, 15 items, Friday 3.15pm delivery time = 14.64€
  setupAndCalculate({result: result, cartValue: "9.5", deliveryDistanceValue: "2400", amountOfItemsValue: "15", deliveryTimeValue: "2024-01-05T15:15:15"});
  expect(result.current.totalFee).toBe(14.64);

  // 8€ cart value, 3764m distance, 8 items, Friday 6.25pm delivery time = 14.4€
  setupAndCalculate({result: result, cartValue: "8", deliveryDistanceValue: "3764", amountOfItemsValue: "8", deliveryTimeValue: "2024-01-19T18:25:25"});
  expect(result.current.totalFee).toBe(14.4);
});

test("calculateDeliveryFee should not exceed 15€", () => {
  result = renderHook(() => useCalculator()).result;

  // 5€ cart value, 8764m distance, 16 items, Friday 6.25pm delivery time = 15€
  setupAndCalculate({result: result, cartValue: "5", deliveryDistanceValue: "8764", amountOfItemsValue: "16", deliveryTimeValue: "2024-01-19T18:25:25"});
  expect(result.current.totalFee).toBe(15);
});