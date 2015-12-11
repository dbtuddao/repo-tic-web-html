import config from 'config';

export default function(price, qty) {
  const vat = config.vat;
  const serviceFee = config.serviceFee;
  const totalPrice = price * qty;
  const serviceFeeCost = serviceFee * totalPrice;
  const vatCost = serviceFeeCost * vat;
  const grandTotal = totalPrice + vatCost + serviceFeeCost;
  const vatPercent = vat * 100;

  return {
    price: price,
    totalPrice: totalPrice.toFixed(2),
    vat: vatCost.toFixed(2),
    serviceFee: serviceFeeCost.toFixed(2),
    grandTotal: grandTotal.toFixed(2),
    vatPercent: vatPercent.toFixed(0)
  };
}
