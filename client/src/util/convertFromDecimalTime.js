const convertFromDecimalTime = (timeInDecimal) => {
  return {
    hours: Math.floor(timeInDecimal),
    minutes: Math.round((timeInDecimal - Math.floor(timeInDecimal)) * 60),
  };
};

export default convertFromDecimalTime;
