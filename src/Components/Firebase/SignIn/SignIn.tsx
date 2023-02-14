import { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/AuthContext'
import './SignIn.css'

const LogIn = () => {

    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const { login } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();

    async function handleSubmit(e:any) {
        e.preventDefault();
          try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            nav('/profile')
          } catch {
            setError("Failed to log in ")
          }
          setLoading(false)
        login(emailRef.current.value, passwordRef.current.value)
    }

  return (
      <>
      <div className="container-card">
      <Button> <Link  className='go-home' to='/about-app'> Home </Link> </Button>
      <Card className='card'>
        <Card.Body style={{color: 'black'}} >
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password"  ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In 
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
          <Link  to="/forgot-password">Forgot Password?</Link>
          </div>        
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      <h3>Already have an account? Need an account? <Link to='/sign-up'>Sign Up</Link></h3>
      </div>
      </div>
    </>

  )
}

export default LogIn
