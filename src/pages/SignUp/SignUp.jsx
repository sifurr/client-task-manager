import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";



const SignUp = () => {
    const [passwordNotSameError, setPasswordNotSameError] = useState('');

    const { register, formState: { errors }, reset, handleSubmit } = useForm();
    const { createUser, googleSingIn, logOut, setLoading, updateNewUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const onSubmit = (data) => {

        if (data.password !== data.confirmPassword) {
            return setPasswordNotSameError("Passwords did not match");
        }

        createUser(data.email, data.password)
            .then(res => {
                setLoading(true)
                updateNewUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photo: data.photoURL,
                        }
                        axiosPublic.post('/api/v1/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    toast.success("Account created successfully")
                                    setLoading(false);
                                    logOut()
                                        .then(() => {
                                            // console.log("");
                                            navigate(from, { replace: true })
                                        })
                                        .catch(err => {
                                            // console.log("e1",err)
                                        })
                                }
                            })
                    })
                    .catch(err => {

                        // console.log("e2",err);
                    })
            })
            .catch(err => {
                // console.log("e3",err);
            })
    }

    const handleGoogleLogin = () => {
        googleSingIn()
            .then(res => {
                // console.log(res.user)
                const userInfo = {
                    name: res.user?.displayName,
                    email: res.user?.email,
                    photo: res.user?.photoURL,
                }
                const email = res.user.email;
                const user = { email };

                console.log ("user:", user);
                
                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                .then(res => {
                        console.log ("res-->:", res);
                        // console.log("token res,", res.data)
                        if (res.data.success) {
                            axiosPublic.post("/api/v1/users", userInfo)
                                .then(result => {
                                    if (result.data.insertedId) {
                                        toast.success("Logged in successfully")
                                        // console.log("user: ", res.user);
                                        navigate(from, { replace: true })
                                    }
                                })
                            .catch(err => console.log(err))
                        }
                    })
            })
            .catch(err => {
                // console.log(err)
            })
    }



    return (
        <div className="bg-gray-50 dark:bg-gray-900 text-neutral-900 dark:text-neutral-300">
            <div className="drop-shadow-lg min-h-screen flex flex-col justify-center items-center rounded">
                <h2 className='text-3xl text-center uppercase'>Registration</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full md:w-2/3 lg:w-1/3">
                    {passwordNotSameError.length > 0 ?
                        <p className="text-xs mb-4 text-red-500">{passwordNotSameError}</p>
                        : <p className="text-xs mb-4 text-red-500"></p>
                    }
                    <div >
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            placeholder="Name"
                            className="p-4 border-b outline-none w-full"
                        />
                        {errors.name?.type === "required" && (
                            <p className="text-[10px] text-red-500">Name is required</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            placeholder="Email"
                            className="p-4 border-b outline-none w-full"
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-[10px] text-red-500">Email is required</p>
                        )}
                    </div>

                    <div>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            placeholder="Password"
                            className="p-4 border-b outline-none w-full"
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-[10px] text-red-500">Password is required</p>
                        )}
                    </div>
                    <div>
                        <input
                            {...register("confirmPassword", { required: true })}
                            type="password"
                            placeholder="Confirm password"
                            className="p-4 border-b outline-none w-full"
                        />
                        {errors.confirmPassword?.type === "required" && (
                            <p className="text-[10px] text-red-500">Confirm password is required</p>
                        )}
                    </div>
                    <div >
                        <input
                            {...register("photoURL", { required: true })}
                            type="url"
                            placeholder="Photo URL"
                            className="p-4 border-b outline-none w-full"
                        />
                        {errors.photoURL?.type === "required" && (
                            <p className="text-[10px] text-red-500">Photo is required</p>
                        )}
                    </div>
                    <div>
                        <div className="flex p-4 border-b w-full bg-white">
                            <input
                                {...register("termsAndConditions", { required: true })}
                                type="checkbox"
                                className="p-4 border-b outline-none"
                            />
                            <div className="pl-2">Agree to our terms & conditions</div>
                            {errors.termsAndConditions?.type === "required" && (
                                <p className="text-[10px] text-red-500">You did not agree to the terms and conditions</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Sign up"
                            className="p-4 cursor-pointer rounded-b-lg bg-gray-300 hover:bg-gray-200 font-bold border-b duration-200  w-full"
                        />
                    </div>
                </form>
                <div>
                    <p className="mt-2 text-sm  text-neutral-900 dark:text-neutral-300">
                        Already have an account?
                        <Link to="/login" className=" text-neutral-900 dark:text-neutral-300 underline"> Log in</Link>
                    </p>
                </div>
                <div className="col-span-6 mt-2 sm:flex sm:items-center sm:gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="group inline-block bg-gray-300 hover:bg-gray-200 border border-indigo-500 px-4 py-2 focus:outline-none focus:ring"
                    >
                        Login with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignUp;