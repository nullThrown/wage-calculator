import TestContainer from '../components/base/TestContainer';
import Overview from '../components/card/Overview';
import Day from '../components/card/Day';
import Month from '../components/card/Month';
import Shift from '../components/card/Shift';
import AddEntry from '../components/form/AddEntry';
import TimeInput from '../components/form/TimeInput';
import EditEntryBtn from '../components/button/EditEntry';
import EditEntryModal from '../components/modal/EditEntry';
import Example from '../components/Example';
const Test = () => {
  return (
    <TestContainer>
      <Example />
      <AddEntry />
    </TestContainer>
  );
};

export default Test;
