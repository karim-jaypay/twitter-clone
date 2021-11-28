import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/actions';

import {Modal, Form } from 'react-bootstrap'

import { Formik} from 'formik';
import * as yup from 'yup';

import SecondSignup from '../SecondStepSignupModal/SecondSignup';

import logo from '../../public/logo.png'

import '../../Styles/SignupModal.scss'

export default function SignupModal(props) {

    // yup form validation
    const schema = yup.object().shape({
    name: yup.string().required('What\'s your name?'),
    email: yup.string().email('Invalid email').required('Required'),
    day: yup.number().required('Required'),
    month: yup.string().required(),
    year: yup.number().required(),
    });
    
    const {show, history} = props

    const dispatch = useDispatch()

    const result = useSelector(state => state.auth)

    const [showModal, setShowModal] = useState(false)
    const [fmodal, setFmodal] = useState(false)
    const [email_err, setEmail_err] = useState('')

    useEffect(() => {
        if(result.isOpen) {
            setEmail_err('')
            setShowModal(true)
            setFmodal(false)
            
        } else if(result.message) setEmail_err(result.message)

    }, [result])

    useEffect(() => {
        setFmodal(show)
    }, [show])

        
    const days = []
    for(let i = 1;i<32;i++)
    if(i<10)
    days.push("0"+i)
    else days.push(i)

    const years = []
    for(let i = 1990;i<2021;i++)
    years.unshift(i)

    // add user function
    const add_user = (values) => {
        dispatch(registerUser(values))
    }

    return (
        <>
        <Modal
        show={fmodal}
        centered
        >
            <Modal.Header>
                <Modal.Title className="text-center w-100">
                    <div className="d-flex">
                        <div className="w-100">
                            <img className="justify-content-center" src={logo} alt="twitter" style={{width:'40px'}}/>
                        </div>
                        <div className="ms-auto" style={{cursor:'pointer'}} onClick={() => props.onHide()}>X</div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{padding:'8%'}}>
                <h4 className="fw-bold">Create your account</h4>
                <Formik
                validationSchema={schema}
                onSubmit={add_user}
                initialValues={{
                    name: '',
                    email: '',
                    month:'',
                    day:'',
                    year:''
                }}
                >
                    {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        setFieldValue,
                        isValid,
                        errors,
                    }) => (
            
            <Form noValidate onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Control
                    className="mt-4"
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                  {errors.name}
                 
                </Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    
                    <Form.Control
                    className="mt-4"
                    placeholder="Email"
                    type="text"
                    name="email"
                    style={{border: email_err && '1px solid red'}}
                    value={values.email}
                    onChange={(e) => {setFieldValue(e.target.name, e.target.value); email_err && setEmail_err('')}}
                    isInvalid={!!errors.email}
                    />
                    {email_err && <span style={{color:'red'}}>{email_err}</span>}
                    <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
                </Form.Group>
               
               
                <h6 className="mt-5 fw-bold">Date of birth</h6>
                <div>This will not be shown publicly. Confirm your own age, even if this account is for a business, a pet, or something else.</div>
                <Form.Row className="d-flex mt-4">
                <Form.Group className="col-lg-4">
                <Form.Control as="select" className="selector"
                 name="month"
                 value={values.month}
                 onChange={handleChange}
                 isInvalid={!!errors.month} >
                <option key = 'blankChoice' hidden value> Month </option>
                <option>January</option>
                <option>February</option>
                <option>March</option>
                <option>April</option>
                <option>May</option>
                <option>June</option>
                <option>July</option>
                <option>August</option>
                <option>September</option>
                <option>October</option>
                <option>November</option>
                <option>December</option>
                </Form.Control>
                <Form.Control.Feedback className="selectorr" type="invalid">
                  {errors.month}
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-lg-4">
                <Form.Control as="select" className=" ms-2 px-4 selector" 
                 name="day"
                 value={values.day}
                 onChange={handleChange}
                 isInvalid={!!errors.day}>
                <option key = 'blankChoice' hidden value> Day</option>
                {days.map(item => (
                    <option>{item}</option>
                ))}
                </Form.Control>
                <Form.Control.Feedback  type="invalid">
                 
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="col-lg-4">
                <Form.Control as="select" className="ms-3 selector"
                 name="year"
                 value={values.year}
                 onChange={handleChange}
                 isInvalid={!!errors.year} >
                <option key = 'blankChoice' hidden value> Year </option>
                {years.map(item => (
                    <option>{item}</option>
                ))}
                </Form.Control>
                <Form.Control.Feedback  type="invalid">
                 
                </Form.Control.Feedback>
                </Form.Group>
                
                </Form.Row>
                <button disabled={!isValid || values.name.length === 0} type="submit" className="mt-4 py-2 main__btn--primary w-100">Continue</button>

            </Form>
                    )}
            </Formik>
            </Modal.Body>

            
        </Modal>
        <SecondSignup
        show={showModal}
        history={history}
        onHide={() => {setShowModal(false)}}
        data={result.user}
        />
        </>
        
    )
}
