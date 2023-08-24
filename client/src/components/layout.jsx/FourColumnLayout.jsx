import MainNav from 'components/nav/MainNav';
import MainWrapper from 'components/base/MainWrapper';
import Header from 'components/base/Header';
import Footer from 'components/base/Footer';
import MainContainer from 'components/base/MainContainer';

const FourColumnLayout = ({ children }) => {
  return (
    <MainWrapper numOfRows='four'>
      <Header />
      <MainNav />
      <MainContainer>{children}</MainContainer>
      <Footer />
    </MainWrapper>
  );
};
export default FourColumnLayout;
