const PesianNums = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"];
const LatinNums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export const toLatinNumber = (str: string) => {
  let result = "";

  for (const l of str) {
    const indexOfPersian = PesianNums.indexOf(l);

    if (indexOfPersian >= 0) {
      result += LatinNums[indexOfPersian];
    } else {
      result += l;
    }
  }

  return result;
};
