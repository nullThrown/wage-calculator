import React from 'react';
import { Box, Text, Badge, VStack, Button } from '@chakra-ui/react';
const data = {
  timeWorkedDec: 7.45,
  totalSales: 659.92,
  totalSalesApplicable: true,
  creditTips: 87.65,
  cashTips: 23.87,
  tipOut: 15.9,
  shiftTime: 'night',
  company: '62a7587df15d762968bf629c',
  position: 'Iron Cactus',
  hourlyWage: 2.13,
  specialEvent: false,
  shiftDate: '2022-06-20T05:00:00.000Z',
  totalTips: 111.52000000000001,
  trueTotalTips: 95.62,
  totalWages: 15.8685,
  totalEarned: 127.38850000000001,
  trueTotalEarned: 111.4885,
  tipPct: 0.16899018062795493,
  trueTipPct: 0.14489635107285734,
  _id: '62b0aaee5d3a6d08c610391f',
  updatedAt: '2022-06-20T17:14:22.936Z',
  createdAt: '2022-06-20T17:14:22.936Z',
};
const EntryDisplay = ({ entry }) => {
  return (
    <button
      style={{
        padding: '1em',
        borderRadius: '10px',
        boxShadow: '5px 5px 10px rgb(240,240,240)',
      }}>
      <Box>
        <Text textAlign='center'>{entry.position}</Text>
        <VStack alignItems='left'>
          <Badge p='.2em' variant='outline'>
            Time Worked: {entry.timeWorkedDec}
          </Badge>
          <Badge p='.2em' colorScheme='green'>
            Total Earned: ${entry.trueTotalEarned.toFixed(2)}
          </Badge>
        </VStack>
      </Box>
    </button>
  );
};
// background='rgba(245,245,245, .6)'

export default EntryDisplay;
