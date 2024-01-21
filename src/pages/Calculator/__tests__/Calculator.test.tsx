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
  so there won't be any additional surcharges by default */
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
