import { Link } from "react-router-dom";


const Banner = () => {
    return (
        <div className="bg-gray-900 text-white">
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-3xl text-center">
                    <h1
                        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
                    >
                        Streamlining Efficiency in 

                        <span className="sm:block"> Project Organization </span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                        
Effortlessly manage tasks with our React-based Task Manager, combining intuitive interfaces, dynamic features, and efficient MongoDB storage.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link
                            className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                            to="/login"
                        >
                            Let's Explore
                        </Link>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;