export function thirdDaysLater(): Date {
  const oneMonthLater = new Date();
  oneMonthLater.setDate(oneMonthLater.getDate() + 30);

  return oneMonthLater;
}
