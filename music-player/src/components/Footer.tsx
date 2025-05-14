import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";


const Footer = () => {
    return (
        <footer className="bg-[#efefef] text-[#464646] font-calsans px-6 py-20 mt-10 pb-60 md:pb-40 flex flex-col items-center text-center space-y-10">

    <h1 className="text-base px-12 md:px-10 sm:text-lg">Designed & Developed by Ayan | © 2025 All Rights Reserved</h1>

    <div className="flex items-center justify-center space-x-6">

        <button className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 hover:scale-110 hover:text-black cursor-pointer" onClick={() =>window.open('https://www.linkedin.com/in/ayan-shaikh-3659a0289/', '_blank')}>
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
        </button>

        <button className="w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 hover:scale-110 hover:text-black cursor-pointer" onClick={() =>window.open('https://www.instagram.com/iamayyan_/', '_blank')}>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
        </button>

        <button className="sm:w-10 sm:h-10 transition-transform duration-300 hover:scale-110 hover:text-black cursor-pointer" onClick={() =>window.open('https://github.com/Ayan-004', '_blank')}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
        </button>



      </div>

        <h1 className="text-base sm:text-lg">Looking for a developer? Let's connect!</h1>
    </footer>
    )
}

export default Footer;

// className="text-black w-8 h-8 sm:w-10 sm:h-10 transition-transform duration-300 hover:scale-110 cursor-pointer" onClick={() =>window.open('https://www.linkedin.com/in/ayan-shaikh-3659a0289/', '_blank')}

// onClick={() =>window.open('https://www.instagram.com/iamayyan_/', '_blank')}

// onClick={() =>window.open('https://github.com/Ayan-004', '_blank')}/>