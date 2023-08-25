import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import styles from "../../../../styles/profile.module.scss";
import { useState , useEffect, FormEvent} from 'react';
import profileService from '@/src/services/profileService';
import ToastComponent from '../../common/toast';
import { useRouter } from 'next/router';

const UserForm = function () {

  const router = useRouter();

const [color, setColor] = useState("");
const [toastIsOpen, setToastIsOpen] = useState(false);
const [errorMessage, setErrorMessage] = useState("");

  const [firstName , setFirstName ] = useState("");
  const [lastName , setLastName ] = useState("");
  const [phone , setPhone] = useState("");
  const [email , setEmail ] = useState("");
  const [created_at , setCreated_at ] = useState("");
  const [initialEmail,setInitialEmail] = useState();
 

  const date = new Date(created_at);
  const month = date.toLocaleDateString("default", { month: "long" });
  
  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setPhone(user.phone);
      setInitialEmail(user.email)
      setEmail(user.email);
      setCreated_at(user.createdAt);
    });
  }, []);
  
  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    const res = await profileService.userUpdate({
      firstName,
      lastName,
      phone,
      email,
      created_at
    });
  
    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Informações alteradas com sucesso!");
      setColor("bg-success");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
      if (email != initialEmail) {
        sessionStorage.clear();
        router.push("/");
      }
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse email!");
      setColor("bg-danger");
      setTimeout(() => setToastIsOpen(false), 1000 * 3);
    }
  };
  
  return(<>
    <Form onSubmit={handleUserUpdate} className={styles.form}>
      <div className={styles.formName}>
        <p className={styles.nameAbreviation}>
        {firstName.slice(0,1)}
        {lastName.slice(0,1)}
        </p>
        <p className={styles.userName}>{`${firstName} ${lastName}`}</p>
      </div>
      <div className={styles.memberTime}>
        <img 
        className={styles.memberTimeImg} 
        src='/profile/iconUserAccount.svg' 
        alt='iconProfile'
        />
        <p 
        className={styles.memberTimeText}
        >	Membro desde <br />
        {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
        </p>
      </div>
      <hr />
      <div className={styles.inputFlexDiv}>
      <FormGroup>
        <Label className={styles.label} for="firstName">
          NOME
        </Label>
        <Input 
        name="firstName"
        type="text"
        id='firstName'
        placeholder="Qual o seu primeiro nome ?"
        required 
        maxLengrh={20}
        className={styles.inputFlex}
        value={firstName}
        onChange={(event) => {setFirstName(event.target.value)}}
        />
      </FormGroup>
      <FormGroup>
        <Label className={styles.label} for="lastName">
          SOBRENOME
        </Label>
        <Input 
        name="lastName"
        type="text"
        id='lastName'
        placeholder="Qual o seu sobrenome ?"
        required 
        maxLengrh={20}
        className={styles.inputFlex}
        value={lastName}
        onChange={(event) => {setLastName(event.target.value)}}
        />
      </FormGroup>
      </div>
      <div className={styles.inputNormalDiv}>
      <FormGroup>
        <Label className={styles.label} for="phone">
          WHATSAPP / TELEGRAM
        </Label>
        <Input 
        name="phone"
        type="tel"
        id='phone'
        placeholder="(XX) 9 XXXX-XXXX"
        required 
        className={styles.input}
        value={phone}
         onChange={(event) => {setPhone(event.target.value)}}
        />
      </FormGroup>
      <FormGroup>
        <Label className={styles.label} form="email">
          E-MAIL
        </Label>
        <Input 
        name="email"
        type="text"
        id='email'
        placeholder="Qual o seu e-mail ?"
        required 
        className={styles.input}
        value={email}
        onChange={(event) => {setEmail(event.target.value)}}
        />
      </FormGroup>
      <Button type="submit" className={styles.formBtn} outline>
        Salvar Alterações
      </Button>
      </div>
    </Form>
    <ToastComponent color={color} isOpen={toastIsOpen} message={errorMessage}/>
     </>)
}

export default UserForm;