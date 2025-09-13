export const computeFees = ({ quantity, price }) => {
  const inrOutflow = Number(quantity) * Number(price);
  const brokerageFee = +(inrOutflow * 0.001).toFixed(4);
  const sttFee = +(inrOutflow * 0.0005).toFixed(4);
  const gstFee = +(brokerageFee * 0.18).toFixed(4);
  return { inrOutflow: +inrOutflow.toFixed(4), brokerageFee, sttFee, gstFee };
};
