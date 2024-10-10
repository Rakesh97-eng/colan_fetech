import usePublicApi from "../../hooks/usePublicApi"
import AboutUs from "./aboutus"
import Blogs from "./blogs"
import ContactUs from "./contactUs"
import Features from "./features"
import  FetechPricing  from "./fetechPricing"
import Footer from "./footer"
import Header from "./header"
import LandingSlider from "./landingSlider"
import Solutions from "./solutions"

const LandingPageComponent = ()=>{
    const PublicApi = usePublicApi();

    return (
        <>
        <Header/>
        <LandingSlider/>
        <AboutUs/>
        <Features/>
        <Solutions/>
        {/* <FetechPricing/> */}
        <Blogs/>
        <ContactUs/>
        <Footer/>
        </>
    )
}

export default LandingPageComponent