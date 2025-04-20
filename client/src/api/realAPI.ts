export const fetchSeed = async () => {
  const res = await fetch(`/api/grid/seed`);
  return res.json();
};

export const fetchTodayData = async () => {
  const res = await fetch(`/api/grid/todayData`);
  return res.json();
};

export const fetchLastData = async () => {
  const res = await fetch(`/api/grid/lastData`);
  return res.json();
};
