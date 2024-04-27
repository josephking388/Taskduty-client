
import React, {useState} from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import logo from '../assets/images/TDlogo.png'
import { Link,useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

const SignIn = () => {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [reveal,setReveal] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate()
  

  function handleHide (){
    !reveal ? setReveal(true): setReveal(false);
  }



  const handleSignIn = async (e) => {
    e.preventDefault();

    const logInData = {
      email,
      password
    }

    setIsClicked(true)

    try {
      const request = await fetch("https://taskduty-server-c65y.onrender.com/api/v1/login",{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logInData)
      });
      const response = await request.json()
      console.log(response);
      
      if (response.success){
        toast.success(response.message);
        localStorage.setItem("token",response.token)
        setEmail("")
        setPassword("")
        setIsClicked(true)
        navigate('/alltask')
        location.reload()
        return;
      }
      // if(response.token) {
      //   return;
      // }
      

      if (response.success === false){
        toast.error(response.message);
        return;
      }


      
    } catch (error) {
      console.log(error);
    }finally{
      setIsClicked(false)
    }

  }
  const btnText = isClicked ? "Loading....." : "Sign In"
  return (
    <>
<div className='container py-4 w-75 mx-auto '>
    <div className='pb-5'>
      <Link to='/'>
      
      <img src={logo} alt="" />
       </Link>
    </div>
  
<Form onSubmit={handleSignIn}>
  {/* Email address */}
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
      </Form.Group>


      
      <Button variant="purple" type="submit" disabled= {isClicked}>
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
    </>
  )
}

export default SignIn