import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPublic from "../hooks/useAxiosPublic";



const UserTypes = () => {

  
    const axiosPublic = useAxiosPublic();
    const [userData, setUserData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {       
          const response = await axiosPublic.get('/api/v1/userTypes');
          setUserData(response.data);        
      };
  
      fetchData();
    }, [axiosPublic]);

    // console.log('userData', userData)


    return (
        <div>
            <section className="bg-gray-900 text-white">
                <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
                    <div className="mx-auto max-w-lg text-center">
                        <h2 className="text-3xl font-bold sm:text-4xl">Explore Our User Community</h2>
                        <p className="mt-4 text-gray-300">
                            Discover how individuals from diverse domains benefit from our Task Manager platform.
                        </p>
                    </div>

                    <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                        {
                            userData.map(userT => (
                                <span key={userT._id}
                                    className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"

                                >
                                    {<UserCircle size={60} />}

                                    <h2 className="mt-4 text-xl font-bold text-white">{userT?.userType}</h2>

                                    <p className="mt-1 text-sm text-gray-300">
                                        {userT?.description}
                                    </p>
                                </span>
                            ))
                        }

                    </div>

                    <div className="mt-12 text-center">
                        <Link to="/signup"

                            className="inline-block rounded bg-gray-300 px-12 py-3 text-sm font-medium text-black transition hover:bg-gray-100 focus:outline-none focus:ring focus:ring-yellow-400"
                        >
                            Get Started Today
                        </Link>
                    </div>
                </div>
            </section>


        </div>
    );
};

export default UserTypes;