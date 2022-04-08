import { Stat, StatNumber, StatHelpText, StatLabel } from '@chakra-ui/react';

const SimpleStat = ({ title, symbolBefore, symbolAfter, amount, helpText }) => {
  return (
    <Stat>
      <StatLabel opacity='.90' fontSize='14px'>
        {title}
      </StatLabel>
      <StatNumber fontSize='22px' opacity='.95'>
        {symbolBefore}
        {amount}
        {symbolAfter}
      </StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default SimpleStat;
