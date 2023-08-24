import MainWrapper from 'components/base/MainWrapper';
import Header from 'components/base/Header';
import Footer from 'components/base/Footer';
import MainContainer from 'components/base/MainContainer';

const ThreeColumnLayout = ({ children }) => {
  return (
    <MainWrapper numOfRows='three'>
      <Header />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </MainWrapper>
  );
};
export default ThreeColumnLayout;
