import TestContainer from '../components/base/TestContainer';
import AddEntryForm from '../components/card/AddEntryForm';
import CompanySelect from 'features/companySelect/components/CompanySelect';
import CompanyDisplay from 'features/companySelect/components/CompanyDisplay';
const Test = () => {
  return (
    <TestContainer>
      <CompanySelect />
      <CompanyDisplay />
    </TestContainer>
  );
};

export default Test;
