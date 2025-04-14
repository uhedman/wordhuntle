export const getTodayCode = async () => {
  const res = await fetch(`/api/todayCode`);
  return res.json();
}

export const getTodayData = async () => {
  const res = await fetch(`/api/todayData`);
  return res.json();
}

export const getLastData = async () => {
  const res = await fetch(`/api/lastData`);
  return res.json();
}
