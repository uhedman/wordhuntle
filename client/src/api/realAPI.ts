export const fetchSeed = async () => {
  const res = await fetch(`/api/seed`);
  return res.json();
};

export const fetchTodayData = async () => {
  const res = await fetch(`/api/todayData`);
  return res.json();
};

export const fetchLastData = async () => {
  const res = await fetch(`/api/lastData`);
  return res.json();
};
