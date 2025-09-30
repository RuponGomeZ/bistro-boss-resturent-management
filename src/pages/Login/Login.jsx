import React, { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DynamicTitle from '../Shared/DynamicTitle/DynamicTitle';
import Swal from 'sweetalert2';
import SocialLogin from '../../Components/SocialLogin/SocialLogin';


const Login = () => {

    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true)
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation()

    const from = location?.state?.from?.pathname || '/';
    console.log('state in', location.state);

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = event => {
        event.preventDefault()
        const form = event.target
        const email = form.email.value
        const password = form.password.value
        console.log(email, password);
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successful",
                    showClass: {
                        popup: `
                            animate__animated
                            animate__fadeInUp
                            animate__faster
    `
                    },
                    hideClass: {
                        popup: `
                            animate__animated
                            animate__fadeOutDown
                            animate__faster
    `
                    }
                });
                navigate(from, { replace: true })
            })
    }

    const handleValidateCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        if (validateCaptcha(user_captcha_value) === true) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }

    return (
        <div className="hero bg-base-200 min-h-screen">
            <DynamicTitle title={"Login"}></DynamicTitle>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center md:w-1/2 lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                </div>
                <div className="card bg-base-100 md:w-1/2 max-w-sm  shadow-2xl">
                    <form onSubmit={handleLogin} className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" name="email" className="input" placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" name="password" className="input" placeholder="Password" />
                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>
                            <div>
                                <LoadCanvasTemplate />
                                <input className="input" type="text" ref={captchaRef} name="captcha" placeholder='Type the Captcha above' />
                                <button type='button' onClick={handleValidateCaptcha} className="btn btn-outline btn-xs mt-2">Validate</button>
                            </div>
                            <input
                                // disabled={disabled}
                                className="btn btn-neutral mt-4" type="submit" value="Login" />
                        </fieldset>
                    </form>
                    <SocialLogin></SocialLogin>
                    <p className='text-center pb-5 '><small>New Here? <Link className='text-blue-400' to={"/signup"}>Create an Account</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;