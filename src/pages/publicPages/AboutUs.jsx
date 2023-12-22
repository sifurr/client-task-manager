import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const AboutUs = () => {
    return (
        <div>
            <Navbar/>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
                    <div className="relative h-64 overflow-hidden rounded-lg sm:h-80 lg:order-last lg:h-full">
                        <img
                            alt="Team Collaboration"
                            src="https://img.freepik.com/free-vector/project-management-business-multitasking-concept-flat-line-art-icons_126523-2192.jpg"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    </div>

                    <div className="lg:py-24">
                        <h2 className="text-3xl font-bold sm:text-4xl">Empowering Your Workflow</h2>

                        <p className="mt-4 text-gray-600">
                            Welcome to our task management platform! We are dedicated to simplifying your daily workflow,
                            fostering collaboration, and enhancing productivity. Our mission is to empower individuals and teams,
                            providing a seamless experience for task organization, prioritization, and accomplishment.
                        </p>

                        <Link
                            to="/login"
                            className="mt-8 inline-block rounded bg-indigo-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>

    );
};

export default AboutUs;