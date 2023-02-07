import React from 'react'
import { useEffect, useState, useMemo, useRef } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/AuthContext'


const SingUp = () => {

    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef =useRef<any>(null);
    const { signup, currentUser } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useNavigate();

    async function handleSubmit(e:any) {
        
        e.preventDefault();


        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError("Passwords do not match")
          }

          try {
            setError("")
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            //history.push("/")
          } catch {
            setError("Failed to create an account")
          }
      
          setLoading(false)

        signup(emailRef.current.value, passwordRef.current.value)
    }

  return (
    
      <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {currentUser && currentUser.email}
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
        Already have an account? 
      </div>
    </>

  )
}

export default SingUp
