import TestContainer from 'components/base/TestContainer';
import Entries from 'features/entries/components/displayEntry/Entries';
const Test = () => {
  return (
    <TestContainer>
      <Entries filter='all' />
    </TestContainer>
  );
};

export default Test;
