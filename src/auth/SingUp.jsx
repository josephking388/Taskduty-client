import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/TDlogo.png'
import { Link,useNavigate  } from 'react-router-dom';
import './SignUp.css'
import eyeIcon from '../assets/images/eye-icon.png'
import toast from 'react-hot-toast';



const SignUp = () => {
  const [email,setEmail] = useState("")
  const [name,setName] = useState("")
  const [password,setPassword] = useState("")
  const [reveal,setReveal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate()


// const SingUp = (props) => {

  


  // const handleHide = () => {
  //   setReveal(!reveal); // Toggle the state of reveal
  // };

  const handleSignUp = async (e)=>{
    e.preventDefault()
    const signUpData = {
      email,
      password,
      name
    };
    setIsClicked(true)
    try {
      const request = await fetch("https://taskduty-server-c65y.onrender.com/api/v1/register", {
        method:"POST",
        headers:{
          "Content-type":"application/json"
        },
        body:JSON.stringify(signUpData)
      })
      const reponse = await request.json();
      console.log(reponse);
      if (reponse.success === true){
        toast.success(reponse.message);
        setEmail("")
        setName("")
        setPassword("")
        setIsClicked(true)
        navigate("/SignIn")
        return
      }
      if (reponse.success === false){
        toast.error(reponse.message);
        return
      }
      if(reponse.error.code === 11000){
        toast.error("Email address alreay in use")
        return
      }

      if (reponse.error.name === "ValidationError"){
        toast.error(reponse.error.message)
        return
      }

    } catch (error) {
      console.log(error);
    }finally{
      setIsClicked(false)
    }
  };
  const btnText = isClicked ? "Loading....." : "Sign Up"

  function handleHide (){
    !reveal ? setReveal(true): setReveal(false);
  }


  return (
    <>

<div className='container py-4 w-75 mx-auto '>

<div className='pb-5'>
      <Link to='/'>
      
      <img src={logo} alt="" />
       </Link>
    </div>

<Form onSubmit={handleSignUp}>
{/* Name  */}
<Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
        />
      </Form.Group>

{/* Email  */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
{/* Password  */}
      <Form.Group className="mb-3 position-relative " controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type={reveal ? "text" :"password"} placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        />

        <div className={`eye-icon ${reveal ? 'visible' : ''}`} onClick={handleHide}></div>

        {/* <p onClick={handleHide} role='button' className='position-absolute end-0  top-50 pt-1 pe-4' >
          
          {reveal ? "Hide" : "Show"}
          </p> */}
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="purple" type="submit" disabled={isClicked}>
        {btnText}
      </Button>
    </Form>





</div>








    {/* <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal> */}


    <div>
      <Link to="/">
      {/* <img src={logo} alt="" /> */}
      </Link>
    </div>




      

    </>
  );
};

export default SignUp;