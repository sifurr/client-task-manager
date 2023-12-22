import Banner from "../../../components/Banner";
import Footer from "../../../components/Footer";
import Navbar from "../../../components/Navbar";
import UserTypes from "../../../components/UserTypes";

      
        
const Home = () => {
    return (
        <div>            
            <Navbar/> 
            <Banner/>    
            <UserTypes/>
            <Footer/>     
        </div>
    );
};

export default Home;