import "./Footer.css";
import Facebook from "../assets/footer_imgs/Facebook.svg";
import Twitter from "../assets/footer_imgs/Twitter.svg";
import Instagram from "../assets/footer_imgs/Instagram.svg";
import Linkedin from "../assets/footer_imgs/Linkedin.svg";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="left">
          <h2>Study Buddy.</h2>
          <p>A platform where you can find all the courses in one place.</p>
          <div className="socials">
            <img src={Twitter} alt="twitter-icon" />
            <img src={Linkedin} alt="linkedin-icon" />
            <img src={Instagram} alt="instagram-icon" />
            <img src={Facebook} alt="facebook-icon" />
          </div>
        </div>

        <div className="middle">
          <h2>Take a Tour</h2>
          <div className="features">
            <h4>Courses</h4>
            <h4>Chat Room</h4>
            <h4>Notes</h4>
            <h4>Reviews</h4>
          </div>
        </div>

        <div className="right">
          <h2>Our Company</h2>
          <div className="contact">
            <h4>Contact Us</h4>
            <h4>Terms & Conditions</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
