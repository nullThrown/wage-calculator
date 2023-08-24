import MainWrapper from 'components/base/MainWrapper';
import Footer from 'components/base/Footer';
import MainContainer from 'components/base/MainContainer';

const TwoColumnLayout = ({ children }) => {
  return (
    <MainWrapper numOfRows='two'>
      <MainContainer>{children}</MainContainer>
      <Footer />
    </MainWrapper>
  );
};
export default TwoColumnLayout;
