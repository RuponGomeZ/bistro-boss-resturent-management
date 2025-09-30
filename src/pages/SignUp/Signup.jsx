import { useForm } from "react-hook-form";
import DynamicTitle from '../Shared/DynamicTitle/DynamicTitle';
import { Helmet } from "react-helmet-async";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../Components/SocialLogin/SocialLogin";




const Signup = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate()


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user added to database')
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "Your work has been saved",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/')
                                }
                            })
                        reset();
                    }
                    )
            })
    }

    return (
        <>
            <DynamicTitle title="Signup" />
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <fieldset className="fieldset">

                                <label className="label">Name*</label>
                                <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                                {errors.name && <span className="text-red-500">Name field is required</span>}

                                <label className="label">Email*</label>
                                <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                                {errors.email && <span className="text-red-500">Email field is required</span>}


                                <label className="label">Password*</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                                })} name="password" className="input" placeholder="Password" />
                                {errors.password?.type === 'required' && <p className="text-red-600">Password must be at least 6 character long</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 character long</p>}
                                {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Your password must contain one uppercase, one lowercase, one number and a special character </p>}



                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input className="btn btn-neutral mt-4" type="submit" value="Register" />
                            </fieldset>
                        </form >
                        <p className='text-center pb-5 '><small>Already have an Account? <Link className='text-blue-400' to={"/login"}>login to your Account</Link></small></p>
                        <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;