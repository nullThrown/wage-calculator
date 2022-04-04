import { useState } from 'react';
import Container from '../components/base/container';
import AddEntryForm from '../components/form/AddEntry';
import NumInput from '../components/form/Input';
const Test = () => {
  const [error, setError] = useState(false);
  return (
    <Container>
      <AddEntryForm />
    </Container>
  );
};

export default Test;
