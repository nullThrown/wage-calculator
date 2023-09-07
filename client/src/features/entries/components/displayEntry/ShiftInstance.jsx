import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  Flex,
  Text,
  Button,
  Badge,
} from '@chakra-ui/react';
import convertFromDecimalTime from 'util/convertFromDecimalTime';

const ShiftInstance = ({ entry, setSelectedEntry }) => {
  const { hours, minutes } = convertFromDecimalTime(entry.timeWorkedDec);
  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        <Flex justifyContent='center' alignItems='center'>
          <button type='button' overflow='hidden'>
            <Badge
              variant='outline'
              maxW='100%'
              textOverflow='ellipsis'
              colorScheme='green'
              isTruncated>
              {entry.companyName} - {entry.position}
            </Badge>
          </button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader bg='purple.700' color='white'>
          {entry.companyName} - {entry.position}
        </PopoverHeader>
        <PopoverBody m='.4em 0'>
          <Flex flexDirection='column' gap='.2em'>
            <Text color='purple.700 !important'>
              time worked: {hours}
              <sub>hrs</sub> {minutes}
              <sub>min</sub>
            </Text>
            <Text> Total earned: ${entry.trueTotalEarned.toFixed(2)}</Text>
            <Text>Earned per hour: ${entry.totalEarnedPerHour.toFixed(2)}</Text>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Button
            type='button'
            m='0 auto'
            display='block'
            size='sm'
            color='purple.500'
            onClick={() => setSelectedEntry(entry)}>
            View
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ShiftInstance;
