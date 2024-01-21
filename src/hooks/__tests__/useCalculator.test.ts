import { renderHook, act } from "@testing-library/react";
import useCalculator from "../useCalculator";

let result: any;

beforeEach(() => {
  result = renderHook(() => useCalculator()).result;

  act(() => {
    result.current.setCartValue(10);
    result.current.setDeliveryDistance(0);
    result.current.setAmountOfItems(1);
    result.current.setDeliveryTime("2022-12-31T15:00:00.000Z");
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
