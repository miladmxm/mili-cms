export const isEqualDatesWithOffset = (
  d1: Date,
  d2: Date,
  { offsetBySecconds }: { offsetBySecconds: number },
): boolean => {
  const offset = offsetBySecconds * 1000;
  const d1TimeWithOffset = (d1.getTime() / offset).toFixed();
  const d2TimeWithOffset = (d2.getTime() / offset).toFixed();
  return d1TimeWithOffset === d2TimeWithOffset;
};
