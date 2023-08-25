import { Container, Form, Input } from 'reactstrap';
import Link from 'next/link';
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { profile } from 'console';
import profileService from '@/src/services/profileService';

Modal.setAppElement("#__next");


const HeaderAuth = function(){
  const router = useRouter();
  const [modalOpen,setModalisOpen] = useState(false);

  const [searchName,setSearchName] = useState("")

  const [initiais , setInitiais] = useState("");

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/search?name=${searchName}`);
		setSearchName("");
  };

  const handleSearchClick = () => {
    router.push(`/search?name=${searchName}`);
		setSearchName("");
  };


  useEffect(()=>{
    profileService.fetchCurrent().then((user) => {
      const firstName = user.firstName.slice(0,1);
      const lastName = user.lastName.slice(0,1);

      setInitiais(firstName + lastName);
    })
  },[])

  const handleOpenModal = () => {
    setModalisOpen(true)
  }
  const handleCloseModal = () => {
    setModalisOpen(false)
  }
  const handleLogout = () => {
    sessionStorage.clear();

    router.push('/')
  };

 

  return(
  <>
  <Container className={styles.nav}>
    <Link href="/home">
      <img src='/logoOnebitflix.svg' alt='logoOnebitflix' className={styles.imgLogoNav}/>
    </Link>
    <div className='d-flex align-items-center'>
      <Form onSubmit={handleSearch}>
        <Input 
        name="search" 
        type="search" 
        placeholder='Pesquisar'
        className={styles.input}
        value={searchName}
        onChange={(event)=>{
          setSearchName(event.currentTarget.value.toLowerCase())
        }}
        />
      </Form>
      <img 
      src='/homeAuth/iconSearch.svg' 
      alt="lupaHeader" 
      onClick={handleSearchClick}
      className={styles.searchImg}/>
    <p className={styles.userProfile} onClick={handleOpenModal}>{initiais}</p>
    </div>
    <Modal 
    isOpen={modalOpen} 
    onRequestClose={handleCloseModal}
    shouldCloseOnEsc={true}
    className={styles.modal}
    overlayClassName={styles.overlayModal}>
      <Link href="/profile">
        <p 
        className={styles.modalLink}>Meus Dados</p>
      </Link>
      <p 
      className={styles.modalLink}
      onClick={handleLogout}>Sair</p>
    </Modal>
  </Container>

  </>)
}
export default HeaderAuth;