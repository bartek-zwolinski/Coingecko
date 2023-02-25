import React from 'react'
import { useState,useRef } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { useAuth } from '../../../context/AuthContext'


const UpdateProfile = () => {

    const emailRef = useRef<any>(null);
    const passwordRef = useRef<any>(null);
    const passwordConfirmRef =useRef<any>(null);
    const { currentUser, updateEmail,updatePassword } = useAuth();
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const nav = useNavigate();
    
    async function handleSubmit(e:any) {  
        e.preventDefault()
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
          return setError("Passwords do not match")
        }
        const promises = []
        setLoading(true)
        setError("")
        if (emailRef.current.value !== currentUser.email) {
          promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
          promises.push(updatePassword(passwordRef.current.value))
        }
        Promise.all(promises)
          .then(() => {
            nav("/profile")
          })
          .catch(() => {
            setError("Failed to update account - LogOut and LogIn")

          })
          .finally(() => {
            setLoading(false)
          })
      }

    return (
        <>
        <div className='container-card'>
        <Button> <Link  className='go-home' to='/profile'> Back to profile </Link> </Button>
          <Card>
            <Card.Body style={{color: 'black'}}>
              <h2 className="text-center mb-4">Update Profile</h2>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    required
                    defaultValue={currentUser.email}
                  />
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Form.Group id="password-confirm">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    type="password"
                    ref={passwordConfirmRef}
                    placeholder="Leave blank to keep the same"
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100" type="submit">
                  Update
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="w-100 text-center mt-2">
          </div>
          </div>
        </>
      )
    }
export default UpdateProfile
