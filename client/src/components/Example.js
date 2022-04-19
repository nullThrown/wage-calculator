import { Input, NumberInput, NumberInputField } from '@chakra-ui/react';
import { useState } from 'react';
function Example() {
  const [value, setValue] = useState('');
  const handleChange = (val) => {
    console.log(val);
    setValue(val);
  };

  return (
    <>
      {/* <Input
        value={value}
        onChange={handleChange}
        placeholder='Here is a sample placeholder'
        size='sm'
      /> */}
      <NumberInput value={value} onChange={handleChange}>
        <NumberInputField />
      </NumberInput>
    </>
  );
}

export default Example;
