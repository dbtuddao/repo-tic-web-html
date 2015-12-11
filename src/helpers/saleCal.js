import config from 'config';

export default function(price, qty) {
  const serviceFee = config.serviceFee;
  const totalPrice = price * qty;
  const feeCost = totalPrice * serviceFee;
  const grandTotal = totalPrice - feeCost;

  return {
    price: price,
    totalPrice: totalPrice.toFixed(2),
    serviceFee: feeCost.toFixed(2),
    grandTotal: grandTotal.toFixed(2)
  };
}
