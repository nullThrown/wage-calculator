import React from 'react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverAnchor,
  PopoverArrow,
  VStack,
  Flex,
  Text,
  Button,
} from '@chakra-ui/react';
const EntryDisplay = ({ entry }) => {
  return (
    <Popover trigger='hover'>
      <PopoverTrigger>
        <button
          type='button'
          style={{
            width: '96%',
            margin: '2px auto',
            backgroundColor: '#00ff80',
            boxShadow: '1px 1px 5px rgb(240,240,240)',
          }}>
          {entry.position}
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverHeader
          bg='green.600'
          color='white'>{`Iron Cactus - ${entry.position}`}</PopoverHeader>
        <PopoverBody>
          <Flex flexDirection='column'>
            <Text>{`time worked: ${entry.timeWorkedDec.toFixed(2)}`}</Text>
            <Text>{`total Earned: ${entry.totalEarned.toFixed(2)}`}</Text>
            <Text>{`tip Pct: ${(entry.tipPct * 100).toFixed(2)}`}</Text>
          </Flex>
        </PopoverBody>
        <PopoverFooter>
          <Button type='button' ml='.5em' size='sm' colorScheme='teal'>
            View
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
};

export default EntryDisplay;
