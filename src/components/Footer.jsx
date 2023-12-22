import { Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <footer className="bg-gray-100">
            <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="flex justify-center text-gray-800">
                   <h2 className="text-4xl uppercase font-bold">Task Manager</h2>
                </div>

                <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
                Explore seamless task management with our intuitive platform. Effortlessly organize, prioritize, and collaborate on tasks. Elevate your productivity and achieve your goals efficiently.
                </p>

                <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
                    <li>
                        <Link className="text-gray-700 transition hover:text-gray-700/75" to="/"> Home </Link>
                    </li>

                    <li>
                        <Link className="text-gray-700 transition hover:text-gray-700/75" to="/about"> About </Link>
                    </li>
                   
                </ul>

                <ul className="mt-12 flex justify-center gap-6 md:gap-8">                           


                    <li>
                        <Link
                            to="https://github.com/sifurr"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">GitHub</span>
                            <Github/>
                         
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="https://www.linkedin.com/in/mr-saifur-rahman"
                            rel="noreferrer"
                            target="_blank"
                            className="text-gray-700 transition hover:text-gray-700/75"
                        >
                            <span className="sr-only">Linked In</span>
                            <Linkedin/>
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;