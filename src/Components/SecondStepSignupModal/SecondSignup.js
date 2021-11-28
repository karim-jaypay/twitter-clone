import React from 'react'
import axios from 'axios'
import { Formik} from 'formik';
import * as yup from 'yup';

import {Modal, Form } from 'react-bootstrap'

import logo from '../../public/logo.png'

import '../../Styles/SignupModal.scss'


export default function SecondSignup(props) {

    // yup form validation
    const schema = yup.object().shape({
    username: yup.string().required('Invalid username'),
    password: yup.string().required('Required'),
    });
       

    const add_user = (values, {setErrors} ) => {
        const userObject = {
            username: values.username,
            email: props.data.email,
            password: values.password,
        };

        axios.post('http://localhost:5000/register/update', userObject)
            .then((res) => {
                if(res.data.errors && res.data.errors.username === "User Name already exists")
                setErrors({username: "Username already exists"})
                else if(res.data === '"password" length must be at least 6 characters long')
                setErrors({password: "Password must be more than 6 characters"})
                else {
                    props.onHide()
                    props.history.go()
                    props.history.push('/login')
                }
            }).catch((error) => {
                console.log(error)
            });
    }
    
    return (
        <Modal
        {...props}
        centered
        >
            <Modal.Header>
                <Modal.Title className="w-100 text-center">
                    <img src={logo} alt="twitter" style={{width:'40px'}}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'8%'}}>
            <h4 className="fw-bold">Create your account</h4>
                <Formik
                validationSchema={schema}
                onSubmit={add_user}
                initialValues={{
                    username: '',
                    password:'',
                }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        status,
                        isValid,
                        errors,
                    }) => (
            
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                    className="mt-4"
                    placeholder="username"
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    
                    <Form.Control
                    className="mt-4"
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                </Form.Group>
                <button disabled={!isValid || values.username.length === 0} type="submit" className="mt-4 py-2 main__btn--primary w-100">Sign up</button>
            </Form>
                    )}
            </Formik>
            </Modal.Body>
        </Modal>
    )
}
