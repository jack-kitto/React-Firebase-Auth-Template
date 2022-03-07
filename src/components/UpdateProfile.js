
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, setEmail, setPassword, deleteAccount} = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(e){
      e.preventDefault()
      
      // Check if passwords match, return an error if they don't match
      if(passwordRef.current.value !== passwordConfirmRef.current.value){
          return setError("Passwords do not match")
      }

      const promises = []
      setLoading(true)
      setError("")

      if(emailRef.current.value !== currentUser.email){
          promises.push(setEmail(emailRef.current.valule))
      }

      if(passwordRef.current.value){
          promises.push(setPassword(passwordRef.current.value))
      }

      Promise.all(promises)
        .then(() => {
            navigate("/")
        })
        .catch(() => {
            setError("Failed to update")
        })
        .finally(() => {
            setLoading(false)
        })



  }

  async function handleDelete(){
    try{
      setError("")
      setLoading(true)
      await deleteAccount(currentUser)
    }catch{
      setError("Could not delete accout")
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" defaultValue={currentUser.email} ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control placeholder="Leave blank to keep the same" type="password" ref={passwordConfirmRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-3" type="submit">
              Update
            </Button>
            <Button disabled={loading} className="w-100 mt-3" variant="danger" onClick={handleDelete}>
              DELETE ACCOUNT
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}