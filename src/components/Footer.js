import React from "react";
import "bulma/css/bulma.min.css";
import { Footer as BulmaFooter, Container, Content, Hero } from "react-bulma-components";

const Footer = () => {
  return (
    <div class="has-background-grey-darker" style={{ margin: "-1rem" }}>
      {/* <BulmaFooter>
        <Container>
          <Content style={{ textAlign: "center" }}>
            Hello this is spotless
            </Content>
        </Container>
      </BulmaFooter> */}
      {/* <Hero size="fullheight">
        <Hero.Header renderAs="header" />
        <Hero.Body />
        <Hero.Footer>
          <Container>
            <Content style={{ textAlign: "center" }}>
              </Content>
          </Container>
          </Hero.Footer>
        </Hero> */}
    </div>
      // <div style={{ margin: '-1rem' }}>
      //   <Hero size="fullheight">
      //     <Hero.Header renderAs="header" />
      //     <Hero.Body />
      //     <Hero.Footer>
      //       <Footer>
      //         <Container>
      //           <Content style={{ textAlign: 'center' }}>
      //             <p>
      //               <strong>Bulma</strong> by{' '}
      //               <a href="http://jgthms.com">Jeremy Thomas</a>. The source code
      //               is licensed under
      //               <a href="http://opensource.org/licenses/mit-license.php">
      //                 {' '}
      //                 MIT
      //               </a>
      //               . The website content is licensed{' '}
      //               <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
      //                 CC BY NC SA 4.0
      //               </a>
      //               .
      //             </p>
      //           </Content>
      //         </Container>
      //       </Footer>
      //     </Hero.Footer>
      //   </Hero>
      // </div>

  );
};

export default Footer;
