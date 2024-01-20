// useCalculator.test.js
import { renderHook, act } from '@testing-library/react'
import useCalculator from '../../hooks/useCalculator';

test('if Cart value is equal or over to 200€, totalFee should be 0', () => {
  const { result } = renderHook(() => useCalculator());

  act(() => {
    result.current.setCartValue(200);
    result.current.setDeliveryDistance(2000);
    result.current.setAmountOfItems(5);
    result.current.setDeliveryTime('2022-12-31T15:00:00.000Z'); // Friday 3pm
  });

  act(() => {
    result.current.calculateDeliveryFee();
  });

  expect(result.current.totalFee).toBe(0);
});