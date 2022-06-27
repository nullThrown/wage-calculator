import {
  Stat,
  StatGroup,
  StatNumber,
  StatHelpText,
  StatLabel,
} from '@chakra-ui/react';
const ComplexStat = ({
  title,
  firstAmount,
  firstHelpText,
  secAmount,
  secHelpText,
}) => {
  return (
    <Stat>
      <StatLabel>Tips</StatLabel>
      <StatNumber>${firstAmount}</StatNumber>
      <StatHelpText>{firstHelpText}</StatHelpText>
      <StatNumber>${secAmount}</StatNumber>
      <StatHelpText>{secHelpText}</StatHelpText>
    </Stat>
  );
};
export default ComplexStat;
