import { renderHook, act } from "@testing-library/react";
import useCalculator from "../useCalculator";

let result: any;

beforeEach(() => {
  result = renderHook(() => useCalculator()).result;

  act(() => {
    /* Set cart value and amount of items to 10€ and 4 items,
     * so there won't be any additional surcharges by default.
     * Only the base fee(2€) will apply.
     */
    result.current.setCartValue(10);
    result.current.setDeliveryDistance(900);
    result.current.setAmountOfItems(4);
    result.current.setDeliveryTime("2022-12-31T15:00:00");
  });
});

test("calculateDeliveryFee sets totalFee to 0 when cartValue is 200€ or more", () => {
  // 200€
  act(() => {
    result.current.setCartValue(200);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(0);

  // 300€
  act(() => {
    result.current.setCartValue(300);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(0);
});

test("calculateDeliveryFee calculates small order surcharge correctly", () => {
  // 9.99€ -> 2€ base fee + 0.01€ surcharge = 2.01€
  act(() => {
    result.current.setCartValue(9.99);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2.01);

  // 9.50€ -> 2€ base fee + 0.50€ surcharge = 2.50€
  act(() => {
    result.current.setCartValue(9.5);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2.5);

  // 10€ -> 2€ base fee + 0€ surcharge = 2€ (no surcharge)
  act(() => {
    result.current.setCartValue(10);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);
});

test("calculateDeliveryFee calculates distance fee correctly, without any additional surcharges", () => {
  // Delivery fee is always 2 -> BASE_FEE is set correctly
  act(() => {
    result.current.setDeliveryDistance(1);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);

  // 1000m
  act(() => {
    result.current.setDeliveryDistance(1000);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);

  // 1499m
  act(() => {
    result.current.setDeliveryDistance(1499);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(3);

  // 1500m
  act(() => {
    result.current.setDeliveryDistance(1500);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(3);

  // 1501m
  act(() => {
    result.current.setDeliveryDistance(1501);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(4);

  // 5984m
  act(() => {
    result.current.setDeliveryDistance(5984);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(12);
});

test("calculateDeliveryFee calculates item fee correctly", () => {
  // 4 items, No item fee, Only base(2€) fee
  act(() => {
    result.current.setAmountOfItems(4);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);

  // 5 items, 1 item fee, base(2€) fee + item fee(0.5€)
  act(() => {
    result.current.setAmountOfItems(5);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2.5);

  // 10 items, 6 item fee, base(2€) fee + item fee(0.5€ * 6)
  act(() => {
    result.current.setAmountOfItems(10);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(5);

  // 15 items, 11 item fee, base(2€) fee + item fee(0.5€ * 11) + bulk fee(1.2€)
  act(() => {
    result.current.setAmountOfItems(15);
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(8.7);
});

test("calculateDeliveryFee calculates the delivery free correctly if it is rush hour", () => {
  // Friday, 2.59pm -> Not rush hour
  act(() => {
    result.current.setDeliveryTime("2024-01-19T14:59");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);

  // Friday, 7pm -> Not rush hour
  act(() => {
    result.current.setDeliveryTime("2024-01-19T19:00");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2);

  // Friday, 3pm -> Rush hour
  act(() => {
    result.current.setDeliveryTime("2024-01-19T15:00");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2.4);

  // Friday, 5.04pm -> Rush hour
  act(() => {
    result.current.setDeliveryTime("2024-01-19T17:04");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(2.4);
});

test("calculateDeliveryFee calculates the total delivery fee correctly", () => {
  /* 9.5€ cart value, 2400m distance, 15 items, Saturday 2.02pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (3*1€) = 3€ distance fee
   * no rush hour fee
   * total = 12.2€
   */
  act(() => {
    result.current.setCartValue(9.5);
    result.current.setDeliveryDistance(2400);
    result.current.setAmountOfItems(15);
    result.current.setDeliveryTime("2023-12-23T12:02:00");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(12.2);

  /* 9.5€ cart value, 2400m distance, 15 items, Friday 3.15pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (3*1€) = 3€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 12.2€
   */
  act(() => {
    result.current.setCartValue(9.5);
    result.current.setDeliveryDistance(2400);
    result.current.setAmountOfItems(15);
    result.current.setDeliveryTime("2024-01-05T15:15:15");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(14.64);

  /* 8€ cart value, 3764m distance, 8 items, Friday 6.25pm delivery time
   * 2€ base fee + 2€ small order surcharge + (4 * 0.5) = 2€ item fee + 0€ bulk fee + (10*1€) = 6€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 14.4€
   */
  act(() => {
    result.current.setCartValue(8);
    result.current.setDeliveryDistance(3764);
    result.current.setAmountOfItems(8);
    result.current.setDeliveryTime("2024-01-19T18:25:25");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(14.4);
});

test("calculateDeliveryFee should not exceed 15€", () => {
  /* 5€ cart value, 8764m distance, 16 items, Friday 6.25pm delivery time
   * 2€ base fee + 5€ small order surcharge + (12 * 0.5) = 6€ item fee + 1.2€ bulk fee + (16*1€) = 16€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 41.04€
   */
  act(() => {
    result.current.setCartValue(5);
    result.current.setDeliveryDistance(8764);
    result.current.setAmountOfItems(16);
    result.current.setDeliveryTime("2024-01-19T18:25:25");
  });
  act(() => {
    result.current.calculateDeliveryFee();
  });
  expect(result.current.totalFee).toBe(15);
});
