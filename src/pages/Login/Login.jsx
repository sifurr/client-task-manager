import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAuth from "../../hooks/useAuth";


const Login = () => {

    const { login, googleSingIn } = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const from = location?.state?.from?.pathname || '/';

    const onSubmit = data => {
        login(data.email, data.password)
            .then(res => {
                const email = data.email;
                const user = { email };                
                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                    .then(res => {                        
                        if (res.data.success) {
                            toast.success("Logged in successfully!");                            
                            navigate("/task-management")
                            // navigate(from, { replace: true })
                        }
                    })
            })
            .catch(err => {                
                toast.error(`${err.message}`)
                // console.log(err.message)
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

                // console.log ("user:", user);
                
                axiosPublic.post("/api/v1/auth/access-token", user, { withCredentials: true })
                .then(res => {
                        // console.log ("res-->:", res);
                        navigate("/task-management")
                       
                        if (res.data.success) {
                            axiosPublic.post("/api/v1/users", userInfo)
                                .then(result => {
                                    if (result.data.insertedId) {
                                        toast.success("Logged in successfully")                                        
                                    }
                                })
                            .catch(err => {
                                // console.log(err)
                            })
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
                <h2 className='text-3xl text-center uppercase'>Login</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-full md:w-2/3 lg:w-1/3">                   
                    
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
                            type="submit"
                            value="Login"
                            className="p-4 cursor-pointer rounded-b-lg bg-gray-300 hover:bg-gray-200 font-bold border-b duration-200  w-full"
                        />
                    </div>
                </form>
                <div>
                    <p className="mt-2 text-sm  text-neutral-900 dark:text-neutral-300">
                        Not a member yet?
                        <Link to="/signup" className=" text-neutral-900 dark:text-neutral-300 underline"> Sign up</Link>
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

export default Login;