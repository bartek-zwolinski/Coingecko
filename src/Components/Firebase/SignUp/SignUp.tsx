import React from 'react'
import {useState, useRef } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/AuthContext'
import './SignUp.css'

const SingUp = () => {
    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef =useRef<any>(null);
    const { signup } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();

    
    async function handleSubmit(e:any) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
          }
          try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            nav('/sign-in')
          } catch {
            setError("Failed to create an account")
          }
          setLoading(false)
        signup(emailRef.current.value, passwordRef.current.value)
    }

  return (
      <>
      <div className='container-card'>
        <Button> <Link  className='go-home' to='/about-app'> Home </Link> </Button>
      <Card className='card'>
        <Card.Body style={{color: 'black'}}>
          <h2 className="text-center mb-4">Sign Up</h2>
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
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password"  ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <h3>Already have an account? <Link to='/sign-in'>Sign In</Link></h3>
      </div>
      </div>
    </>
  )
}

export default SingUp
