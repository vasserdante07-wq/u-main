import styled from "styled-components";

const FooterStyles = styled.footer`
  padding: 25px 0;
  border-top: 1px solid #000;
  text-align: center;

  p {
    font-size: 1.1rem;
    margin: 0;
  }
`;

const Footer = () => {
  const date = new Date();
  return (
    <FooterStyles>
      <div className="wrapper">
        <p>
          &copy; {date.getFullYear()} singlemotherworkethic productions. All
          rights reserved.
        </p>
      </div>
    </FooterStyles>
  );
};

export default Footer;
