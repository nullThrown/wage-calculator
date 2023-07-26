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
const ShiftInstance = ({ entry, setSelectedEntry }) => {
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
              {entry.position}
            </Badge>
          </button>
        </Flex>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          bg='green.600'
          color='white'>{`bar - ${entry.position}`}</PopoverHeader>
        <PopoverBody>
          <Flex flexDirection='column'>
            <Text>{`time worked: ${entry.timeWorkedDec.toFixed(2)}`}</Text>
            <Text>{`total Earned: ${entry.totalEarned.toFixed(2)}`}</Text>
            <Text>{`tip Pct: ${(entry.tipPct * 100).toFixed(2)}`}</Text>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Button
            type='button'
            ml='.5em'
            size='sm'
            colorScheme='teal'
            onClick={() => setSelectedEntry(entry)}>
            View
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default ShiftInstance;
