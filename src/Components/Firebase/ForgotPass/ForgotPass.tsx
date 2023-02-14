import React from 'react'
import { useState, useRef } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/AuthContext'

const ForgotPass = () => {

    const emailRef = useRef<any>(null);
    const { resetPassword } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [ message, setMessege] = useState<string>('')

    async function handleSubmit(e:any) {     
        e.preventDefault();
          try {
            setMessege('')
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessege('Check your mail for further instructions')
          } catch {
            setError("Failed to reset password ")
          }
          setLoading(false)
    }

  return ( 
      <>
      <div className="container-card">
      <Button> <Link  className='go-home' to='/sign-in'> Back to Log In </Link> </Button>
      <Card>
        <Card.Body style={{color: 'black'}} >
          <h2 className="text-center mb-4">Forgot Password?</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
          <Link to="/sign-in">Sign in</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? 
      </div>
      </div>
    </>

  )
}

export default ForgotPass
