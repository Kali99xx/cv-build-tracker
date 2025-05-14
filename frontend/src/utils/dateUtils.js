export const getDailyCounts = (items) => {
  const dailyCounts = {};

  items.forEach((stepItems) => {
    stepItems.items.forEach((item) => {
      const date = new Date(item.updated_at);
      const formattedDate = date.toISOString().split("T")[0]; // Extracts YYYY-MM-DD
      dailyCounts[formattedDate] = (dailyCounts[formattedDate] || 0) + 1;
    });
  });

  return dailyCounts;
};

export const getWeeklyCounts = (items) => {
  const weeklyCounts = {};
  items.forEach((stepItems) => {
    stepItems.items.forEach((item) => {
      const date = new Date(item.updated_at);
      const weekStart = date.getDate() - date.getDay(); // Calculate week start date
      const weekStartDate = new Date(date.setDate(weekStart))
        .toISOString()
        .split("T")[0];

      weeklyCounts[weekStartDate] = (weeklyCounts[weekStartDate] || 0) + 1;
    });
  });

  return weeklyCounts;
};
