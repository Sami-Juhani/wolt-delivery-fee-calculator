import { render, fireEvent } from "@testing-library/react";
import Calculator from "../Calculator";

let cartValueInput: HTMLElement;
let deliveryDistanceInput: HTMLElement;
let amountOfItemsInput: HTMLElement;
let calculateButton: HTMLElement;
let totalFee: HTMLElement;
let deliveryTime: HTMLElement;

beforeEach(() => {
  const { getByTestId } = render(<Calculator />);

  cartValueInput = getByTestId("cartValue");
  deliveryDistanceInput = getByTestId("deliveryDistance");
  amountOfItemsInput = getByTestId("amountOfItems");
  calculateButton = getByTestId("calculateButton");
  totalFee = getByTestId("totalFee");
  deliveryTime = getByTestId("deliveryTime");

  /* Set cart value and amount of items to 10€ and 4 items,
   * so there won't be any additional surcharges by default.
   * Only the base fee(2€) will apply.
   */
  fireEvent.change(cartValueInput, { target: { value: "10" } });
  fireEvent.change(amountOfItemsInput, { target: { value: "4" } });
  fireEvent.change(deliveryTime, { target: { value: "2021-05-05T12:00" } });
});

test("Calculator sets totalFee to 0€ when cartValue is 200€ or more", () => {
  // Test for 200€
  fireEvent.change(cartValueInput, { target: { value: "200" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("0€");

  // Test for 305€
  fireEvent.change(cartValueInput, { target: { value: "305" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("0€");
});

test("calculateDeliveryFee calculates small order surcharge correctly", () => {
  // 9.99€ -> 2€ base fee + 0.01€ surcharge = 2.01€
  fireEvent.change(cartValueInput, { target: { value: "9.99" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2.01€");

  // 9.50€ -> 2€ base fee + 0.50€ surcharge = 2.50€
  fireEvent.change(cartValueInput, { target: { value: "9.5" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2.5€");

  // 10€ -> 2€ base fee + 0€ surcharge = 2€ (no surcharge)
  fireEvent.change(cartValueInput, { target: { value: "10" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");
});

test("Calculator calculates distance fee correctly, without any additional surcharges", () => {
  // Test for 1m
  fireEvent.change(deliveryDistanceInput, { target: { value: "1" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");

  // Test for 1000m
  fireEvent.change(deliveryDistanceInput, { target: { value: "1000" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");

  // Test for 1499m
  fireEvent.change(deliveryDistanceInput, { target: { value: "1499" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("3€");

  // Test for 1500m
  fireEvent.change(deliveryDistanceInput, { target: { value: "1500" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("3€");

  // Test for 1501m
  fireEvent.change(deliveryDistanceInput, { target: { value: "1501" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("4€");

  // Test for 5984m
  fireEvent.change(deliveryDistanceInput, { target: { value: "5984" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("12€");
});

test("Calculator calculates item fee correctly", () => {
  // 3 items, No item fee, Only base(2€) fee
  fireEvent.change(amountOfItemsInput, { target: { value: "3" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");

  // 5 items, 1 item fee, base(2€) fee + item fee(0.5€)
  fireEvent.change(amountOfItemsInput, { target: { value: "5" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2.5€");

  // 10 items, 6 item fee, base(2€) fee + item fee(0.5€ * 6)
  fireEvent.change(amountOfItemsInput, { target: { value: "10" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("5€");

  // 17 items, 13 item fee, base(2€) fee + item fee(0.5€ * 13) + bulk fee(1.2€)
  fireEvent.change(amountOfItemsInput, { target: { value: "17" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("9.7€");
});

test("calculateDeliveryFee calculates the delivery free correctly if it is rush hour", () => {
  // Friday, 2.59pm -> Not rush hour
  fireEvent.change(deliveryTime, {
    target: { value: "2024-01-19T14:59" },
  });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");

  // Friday, 7pm -> Not rush hour
  fireEvent.change(deliveryTime, {
    target: { value: "2024-01-19T19:00" },
  });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2€");

  // Friday, 3pm -> Rush hour
  fireEvent.change(deliveryTime, {
    target: { value: "2024-01-19T15:00" },
  });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2.4€");

  // Friday, 5.04pm -> Rush hour
  fireEvent.change(deliveryTime, {
    target: { value: "2024-01-19T17:04" },
  });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("2.4€");
});

test("calculateDeliveryFee calculates the total delivery fee correctly", () => {
  /* 8.5€ cart value, 1400m distance, 15 items, Saturday 2.02pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (1*1€) = 1€ distance fee
   * no rush hour fee
   * total = 11.2€
   */
  fireEvent.change(cartValueInput, { target: { value: "8.5" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "1400" } });
  fireEvent.change(amountOfItemsInput, { target: { value: "15" } });
  fireEvent.change(deliveryTime, { target: { value: "2023-12-23T12:02:00" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("11.2€");

  /* 9.5€ cart value, 2400m distance, 15 items, Friday 3.15pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (3*1€) = 3€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 12.2€
   */
  fireEvent.change(cartValueInput, { target: { value: "9.5" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "2400" } });
  fireEvent.change(amountOfItemsInput, { target: { value: "15" } });
  fireEvent.change(deliveryTime, { target: { value: "2024-01-05T15:15:15" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("14.64€");

  /* 8€ cart value, 3764m distance, 8 items, Friday 6.25pm delivery time
   * 2€ base fee + 2€ small order surcharge + (4 * 0.5) = 2€ item fee + 0€ bulk fee + (10*1€) = 6€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 14.4€
   */
  fireEvent.change(cartValueInput, { target: { value: "8" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "3764" } });
  fireEvent.change(amountOfItemsInput, { target: { value: "8" } });
  fireEvent.change(deliveryTime, { target: { value: "2024-01-19T18:25:25" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("14.4€");
});

/* 5€ cart value, 8764m distance, 16 items, Friday 6.25pm delivery time
 * 2€ base fee + 5€ small order surcharge + (12 * 0.5) = 6€ item fee + 1.2€ bulk fee + (16*1€) = 16€ distance fee
 * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
 * total = 41.04€
 */
test("calculateDeliveryFee should not exceed 15€", () => {
  fireEvent.change(cartValueInput, { target: { value: "5" } });
  fireEvent.change(deliveryDistanceInput, { target: { value: "8764" } });
  fireEvent.change(amountOfItemsInput, { target: { value: "16" } });
  fireEvent.change(deliveryTime, { target: { value: "2024-01-19T18:25:25" } });
  fireEvent.click(calculateButton);
  expect(totalFee.textContent).toBe("15€");
});
