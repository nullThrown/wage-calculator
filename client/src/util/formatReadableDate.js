const formatReadableDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-us');
};

export default formatReadableDate;
