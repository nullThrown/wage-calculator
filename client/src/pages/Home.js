import Container from '../components/base/container';
import MainHeading from '../components/typography/MainHeading';
import AddEntryBtn from '../components/button/AddEntry';
import Header from '../components/base/Header';
const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <MainHeading text='Welcome, <username>' />
        <AddEntryBtn />
      </Container>
    </>
  );
};

export default Home;
