import { Stat, StatNumber, StatHelpText, StatLabel } from '@chakra-ui/react';

const SimpleStat = ({ title, symbolBefore, symbolAfter, amount, helpText }) => {
  return (
    <Stat>
      <StatLabel opacity='.8' fontSize='.8rem'>
        {title}
      </StatLabel>
      <StatNumber fontSize='1rem' opacity='.95'>
        {symbolBefore}
        {amount}
        {symbolAfter}
      </StatNumber>
      <StatHelpText fontSize='.75rem'>{helpText}</StatHelpText>
    </Stat>
  );
};

export default SimpleStat;
