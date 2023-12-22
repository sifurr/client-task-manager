import axios from "axios";

const axiosPublic = axios.create({
    baseURL: `https://server-task-management-two.vercel.app`
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;