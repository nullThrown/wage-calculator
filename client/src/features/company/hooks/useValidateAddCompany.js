import { useState, useEffect } from 'react';

const useAddCompanyVal = (company) => {
  const { name, position } = company;

  const [isNameError, setIsNameError] = useState(false);
  const [isPositionError, setIsPositionError] = useState(false);

  useEffect(() => {
    name.length < 1 ? setIsNameError(true) : setIsNameError(false);
  }, [name]);
  useEffect(() => {
    position.length < 1 ? setIsPositionError(true) : setIsPositionError(false);
  }, [position]);

  return { isNameError, isPositionError };
};

export default useAddCompanyVal;
