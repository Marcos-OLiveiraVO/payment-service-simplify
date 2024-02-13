export interface CalculateFee {
  amount: number;
  paymentMethod: string;
}

export function calculateFee(data: CalculateFee): number {
  const fivePercent = 0.05;
  const threePercent = 0.03;

  const feePercentage = data.paymentMethod === 'credit_card' ? fivePercent : threePercent;
  const feeAmount = data.amount * feePercentage;

  return data.amount - feeAmount;
}
