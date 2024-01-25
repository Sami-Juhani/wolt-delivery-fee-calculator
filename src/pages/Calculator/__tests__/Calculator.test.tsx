import { screen, render, fireEvent } from "@testing-library/react";
import Calculator from "../Calculator";

type setupProps = {
  cartValue: string;
  amountOfItemsValue: string;
  deliveryDistanceValue: string;
  deliveryTimeValue: string;
}

let cartValueInput: HTMLElement;
let deliveryDistanceInput: HTMLElement;
let amountOfItemsInput: HTMLElement;
let calculateButton: HTMLElement;
let totalFee: HTMLElement;
let deliveryTimeInput: HTMLElement;
let expectedTotalFee: HTMLElement;

const setupAndCalculate = ({cartValue, amountOfItemsValue, deliveryDistanceValue, deliveryTimeValue}: setupProps) : HTMLElement => {
  cartValueInput = screen.getByTestId("cartValue");
  amountOfItemsInput = screen.getByTestId("amountOfItems");
  deliveryDistanceInput = screen.getByTestId("deliveryDistance");
  deliveryTimeInput = screen.getByTestId("deliveryTime");
  calculateButton = screen.getByTestId("calculateButton");
  totalFee = screen.getByTestId("totalFee");

  fireEvent.change(cartValueInput, { target: { value: cartValue } });
  fireEvent.change(amountOfItemsInput, { target: { value: amountOfItemsValue } });
  fireEvent.change(deliveryDistanceInput, { target: { value: deliveryDistanceValue } });
  fireEvent.change(deliveryTimeInput, { target: { value: deliveryTimeValue } });

  fireEvent.click(calculateButton);

  return totalFee;
};

test("calculateDeliveryFee calculates small order surcharge correctly", () => {
  const { unmount } = render(<Calculator />);
  
  // 9.99€ -> 2€ base fee + 0.01€ surcharge = 2.01€
  expectedTotalFee = setupAndCalculate({cartValue: "9.99", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2.01");

  // 9.50€ -> 2€ base fee + 0.50€ surcharge = 2.50€
  expectedTotalFee = setupAndCalculate({cartValue: "9.5", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2.5");

  // 10€ -> 2€ base fee + 0€ surcharge = 2€ (no surcharge)
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2");

  unmount();
});

test("Calculator calculates distance fee correctly, without any additional surcharges", () => {
  const { unmount } = render(<Calculator />);
  // Test for 1m = 2€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2");

  // Test for 1000m = 2€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2");

 // Test for 1499m = 3€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1499", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("3");

 // Test for 1500m = 3€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1500", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("3");

 // Test for 1501m = 4€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1501", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("4");

 // Test for 5984m = 12€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "5984", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("12");

  unmount();
});

test("Calculator calculates item fee correctly", () => {
  const { unmount } = render(<Calculator />);

  // 3 items, No item fee, Only base(2€) fee = 2€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "3", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2");

  // 5 items, 1 item fee, base(2€) fee + item fee(0.5€) = 2.5€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "5", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("2.5");

  // 10 items, 6 item fee, base(2€) fee + item fee(0.5€ * 6) = 5€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "10", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("5");

  // 17 items, 13 item fee, base(2€) fee + item fee(0.5€ * 13) + bulk fee(1.2€) = 9.7€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "17", deliveryDistanceValue: "1000", deliveryTimeValue: "2022-12-31T15:00:00"});
  expect(expectedTotalFee.textContent).toBe("9.7");

  unmount();
});

test("calculateDeliveryFee calculates the delivery free correctly if it is rush hour", () => {
  const { unmount } = render(<Calculator />);

  // Friday, 2.59pm -> Not rush hour = 2€
  let expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2024-01-19T14:59"});
  expect(expectedTotalFee.textContent).toBe("2");

  // Friday, 7pm -> Not rush hour = 2€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2024-01-19T19:00"});
  expect(expectedTotalFee.textContent).toBe("2");

  // Friday, 3pm -> Rush hour = 2.4€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2024-01-19T15:00"});
  expect(expectedTotalFee.textContent).toBe("2.4");

  // Friday, 5.04pm -> Rush hour = 2.4€
  expectedTotalFee = setupAndCalculate({cartValue: "10", amountOfItemsValue: "4", deliveryDistanceValue: "1000", deliveryTimeValue: "2024-01-19T17:04"});
  expect(expectedTotalFee.textContent).toBe("2.4");

  unmount();
});

test("calculateDeliveryFee calculates the total delivery fee correctly", () => {
  const { unmount } = render(<Calculator />);

  /* 8.5€ cart value, 1400m distance, 15 items, Saturday 2.02pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (1*1€) = 1€ distance fee
   * no rush hour fee
   * total = 11.2€
   */
  expectedTotalFee = setupAndCalculate({cartValue: "8.5", amountOfItemsValue: "15", deliveryDistanceValue: "1400", deliveryTimeValue: "2023-12-23T12:02:00"});
  expect(expectedTotalFee.textContent).toBe("11.2");

  /* 9.5€ cart value, 2400m distance, 15 items, Friday 3.15pm delivery time
   * 2€ base fee + 0.5€ small order surcharge + (11 * 0.5) = 5.5€ item fee + 1.2€ bulk fee + (3*1€) = 3€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 12.2€
   */
  expectedTotalFee = setupAndCalculate({cartValue: "9.5", amountOfItemsValue: "15", deliveryDistanceValue: "2400", deliveryTimeValue: "2024-01-05T15:15:15"});
  expect(expectedTotalFee.textContent).toBe("14.64");

  /* 8€ cart value, 3764m distance, 8 items, Friday 6.25pm delivery time
   * 2€ base fee + 2€ small order surcharge + (4 * 0.5) = 2€ item fee + 0€ bulk fee + (10*1€) = 6€ distance fee
   * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
   * total = 14.4€
   */
  expectedTotalFee = setupAndCalculate({cartValue: "8", amountOfItemsValue: "8", deliveryDistanceValue: "3764", deliveryTimeValue: "2024-01-19T18:25:25"});
  expect(expectedTotalFee.textContent).toBe("14.4");
  
  unmount();
});

test("calculateDeliveryFee should not exceed 15€", () => {
  const { unmount } = render(<Calculator />);

  /* 5€ cart value, 8764m distance, 16 items, Friday 6.25pm delivery time
 * 2€ base fee + 5€ small order surcharge + (12 * 0.5) = 6€ item fee + 1.2€ bulk fee + (16*1€) = 16€ distance fee
 * rush hour (on friday 3pm - 6pm) fee ( total * 1.2 ) 
 * total = 41.04€
 */
  expectedTotalFee = setupAndCalculate({cartValue: "5", amountOfItemsValue: "16", deliveryDistanceValue: "8764", deliveryTimeValue: "2024-01-19T18:25:25"});
  expect(expectedTotalFee.textContent).toBe("15");

  unmount();
});
