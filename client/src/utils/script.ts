const puntuation = (length: number) => {
  if (length === 4) return 1;
  else return (length - 3) * 2;
};

const insert = (arr: string[], newString: string) => {
  let low = 0;
  let high = arr.length - 1;
  const newArray = [...arr];

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    if (newString === arr[mid]) {
      return newArray;
    } else if (newString < arr[mid]) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  newArray.splice(low, 0, newString);
  return newArray;
};

export { puntuation, insert };
