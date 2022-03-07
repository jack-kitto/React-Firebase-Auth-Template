import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from '../contexts/AuthContext'

export default function ResetPassword() {
    const { resetPassword } = useAuth()
    const [error, setError] = useState()
    const [success, setSuccess] = useState()
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()

    async function handleSubmit(e){
        e.preventDefault()

        try{
            setError("")
            setSuccess("")
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setSuccess("An email has been sent to your inbox with further instructions")
        }catch{
            setError("Failed to Reset Password")
        }

        setLoading(false)
    }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        <Link to="/login">Log In</Link>
      </div>
    </>
  )
}
