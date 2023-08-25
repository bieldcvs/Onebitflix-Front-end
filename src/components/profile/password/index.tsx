import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from "../../../../styles/profile.module.scss";
import { useState , useEffect, FormEvent } from 'react';
import profileService from '@/src/services/profileService';
import ToastComponent from '../../common/toast';


const PasswordForm = function () {
const [currentPassword , setCurrentPassword] = useState("");
const [newPassword , setNewPassword] = useState("");
const [confirmPassword , setConfirmPassword] = useState("");


const [color, setColor] = useState("");
const [toastIsOpen, setToastIsOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  
useEffect(()=>{
  profileService.fetchCurrent().then((pass)=>{
    setCurrentPassword(pass.currentPassword)
    setNewPassword(pass.newPassword);

  })
},[])

const handlePasswordUpdate = async function (e:FormEvent<HTMLFormElement>){
e.preventDefault();

if(newPassword != confirmPassword){
  setToastIsOpen(true);
  setErrorMessage("Senha e confirmação de senha diferentes !")
  setColor("bg-danger")
  setTimeout(()=>{
    setToastIsOpen(false);
  }, 1000 * 3);
  return
}

  if  (currentPassword === newPassword){
    setToastIsOpen(true);
    setErrorMessage("Não coloca a nova senha igual a senha antiga !")
    setColor("bg-danger")
    setTimeout(()=>{
      setToastIsOpen(false);
    }, 1000 * 3);
    return
  }

  const res = await profileService.passwordUpdate({
    currentPassword,
    newPassword
  });

  if(res === 204){
    setToastIsOpen(true);
    setErrorMessage("Senha alterada com sucesso ! ")
    setColor("bg-success")
    setTimeout(()=>{
      setToastIsOpen(false);
    }, 1000 * 3);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  }

  if (res === 400) {
    setToastIsOpen(true);
    setErrorMessage("Senha atual incorreta ! ")
    setColor("bg-danger")
    setTimeout(()=>{
      setToastIsOpen(false);
    }, 1000 * 3);

  }

}

  return(
    <>
    <Form onSubmit={handlePasswordUpdate} className={styles.form}>
      <div className={styles.inputNormalDiv}>
        <FormGroup>
          <Label className={styles.label} for="currentPassword">
            SENHA ATUAL
          </Label>
          <Input
          name="currentPassword"
          type="password"
          id="currentPassword"
          placeholder="******"
          required
          minLength={6}
          maxLength={12}
          className={styles.input}
          value={currentPassword}
          onChange={(e)=>{
            setCurrentPassword(e.currentTarget.value)
          }}
          />
        </FormGroup>
      </div>
      <div className={styles.inputFlexDiv}>
        <FormGroup>
          <Label className={styles.label} for="newPassword">
            NOVA SENHA
          </Label>
          <Input
          name="newPassword"
          type="password"
          id="newPassword"
          placeholder="******"
          required
          minLength={6}
          maxLength={12}
          value={newPassword}
          onChange={(e)=>{
            setNewPassword(e.currentTarget.value)
          }}
          className={styles.inputFlex}
          />
        </FormGroup>
        <FormGroup>
          <Label className={styles.label} for="confirmNewPassword">
            CONFIRMAR NOVA SENHA
          </Label>
          <Input
          name="confirmNewPassword"
          type="password"
          id="confirmNewPassword"
          placeholder="******"
          required
          minLength={6}
          maxLength={12}
          className={styles.inputFlex}
          value={confirmPassword}
          onChange={(e)=>{
          setConfirmPassword(e.currentTarget.value)
          }}
          />
        </FormGroup>
  
      </div>
        <Button type="submit"
        className={styles.formBtn} outline>
          Salvar Alterações
        </Button>
    </Form>
    <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
    
  </>)
}

export default PasswordForm;