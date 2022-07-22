import { Text, Flex, Select, Center } from '@chakra-ui/react';
// in backend, set concat startDateShort & endDateShort into single string
// makes comparison a lot simpler
const WeekSelect = ({ selectChangeHandler, weekPairs, selectedWeek }) => {
  return (
    <Flex m='1em 0 2em'>
      <Center w='100%'>
        <Text mr='1em'>Week Of: </Text>
        <Select variant='filled' maxW='200px' onChange={selectChangeHandler}>
          {weekPairs.map((week, i) => {
            return (
              <option key={i} value={`${week}`}>
                {week}
              </option>
            );
          })}
        </Select>
      </Center>
    </Flex>
  );
};

export default WeekSelect;
