import React, {useState} from 'react'

import SignupModal from '../../Components/SignupModal/SignupModal'

import welcome from '../../public/welcome.png'
import logo from '../../public/logo.png'

import '../../App.css'

export default function Welcome(props) {

    const [showModal, setShowModal] = useState(false)

    const togglemodal = () => {
        setShowModal(!showModal)
    }

    return (
        <div>
            <div className="d-lg-flex" >
                <div className="col-lg-6" >
                    <img src={welcome} alt="welcome" className="w-100" />
                </div>
                <div className="col-lg-6 ps-5 pt-5">
                    <div className="w-100">
                        <img src={logo} alt='twitter' width={90} />
                    </div>
                    <div className="w-100 mt-5">
                        <h2 className="fw-bold" style={{fontSize:'60px'}}>Happening now</h2>
                    </div>
                    <div className="w-100 mt-5">
                        <h2 className="fw-bold" style={{fontSize:'45px'}}>Join Twitter today.</h2>
                    </div>
                    <div className="mt-5">
                        <button className="d-block py-3 main__btn--primary" onClick={() => setShowModal(true)}>Sign up</button>
                        <button className="mt-4 py-3 main__btn--secondary" onClick={() => props.history.push('/login')}>Sign in</button>
                    </div>
                </div>
            </div>
        <div className="w-75 mx-auto footer_info mt-3 text-center" >
            <span>About </span><span className="ms-2">Help Center</span>
            <span className="ms-2">Terms of Service</span>
            <span className="ms-2">Privacy Policy</span>
            <span className="ms-2">Cookie Policy</span>
            <span className="ms-2">Ads info</span>
            <span className="ms-2">Blog</span>
            <span className="ms-2">Status</span>
            <span className="ms-2">Careers</span>
            <span className="ms-2">Brand Resources</span>
            <span className="ms-2">Advertising</span>
            <span className="ms-2">Marketing</span>
            <span className="ms-2">Twitter for Business</span>
            <span className="ms-2">Developers</span>
            <span className="ms-2">Directory</span>
            <span className="ms-2">Settings</span>
            <span className="ms-2">@ 2021 Twitter, Inc.</span>
        </div>

        <SignupModal
        show={showModal}
        history={props.history}
        onHide={() => togglemodal()}
        />
        </div>
    )
}
