import { Container } from 'reactstrap';
import styles from "./styles.module.scss";

const Footer = function(){
  return(
    <>
    <Container className={styles.footer}>
      <img src='/logoOnebitcode.svg' alt='logoFooter' className={styles.footerLogo}/>
      <a href='http://onebitcode.com' target={'blank'} className={styles.footerLink}>ONEBITCODE.COM</a>
    </Container>
    </>
  )
}

export default Footer;