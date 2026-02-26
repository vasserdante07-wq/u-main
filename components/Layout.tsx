import styled from "styled-components";
import Footer from "./footer/Footer";
import Header from "./header/Header";

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  main {
    flex: 1;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutStyles>
      <Header />
      <main>{children}</main>
      <Footer />
    </LayoutStyles>
  );
};

export default Layout;
