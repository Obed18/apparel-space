import React from "react";
import "../styles/Footer.css";
import { motion } from "framer-motion";
import { Eye, ArrowRight, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

type IconProps = {
  size?: number;
  className?: string;
};

const FacebookIcon: React.FC<IconProps> = (props) => React.createElement(FaFacebookF as any, props);
const InstagramIcon: React.FC<IconProps> = (props) => React.createElement(FaInstagram as any, props);
const TwitterIcon: React.FC<IconProps> = (props) => React.createElement(FaXTwitter as any, props);
const LinkedinIcon: React.FC<IconProps> = (props) => React.createElement(FaLinkedinIn as any, props);
const WhatsappIcon: React.FC<IconProps> = (props) => React.createElement(FaWhatsapp as any, props);
const TiktokIcon: React.FC<IconProps> = (props) => React.createElement(FaTiktok as any, props);

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      {/* TOP SUBSCRIBE SECTION */}
      <div className="footer-top">
        <motion.div
          className="footer-subscribe"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2>Stay Updated</h2>
            <p>Get the latest eye care tips and clinic updates.</p>
          </div>

          <div className="subscribe-box">
            <input type="email" placeholder="Enter your email" />
            <button>
              Subscribe <ArrowRight size={18} />
            </button>
          </div>
          <hr className="divider" />
        </motion.div>
      </div>

      {/* MAIN FOOTER */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* BRAND */}
          <motion.div
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
        <div className="logo-icon">
          <div className="courier-logo">
            <img src="/as-text.png" className="logo-circle" alt="NCL Logo" />
          </div>
        </div>

            <p>
              Wear Confidence. Define Your Space. Premium fashion crafted for those who stand out.
            </p>

             <div className="socials">
               {/* <a href="#" className="link-text">
                 <FacebookIcon size={18} />
               </a> */}

        <a href="https://www.instagram.com/r.a.y._healthcare_africa?igsh=NW9qZXZ0Z3p1ajRu&utm_source=qr" className="link-text">
          <InstagramIcon size={18} />
        </a>

        <a href="https://www.tiktok.com/@rayhealthcareafrica?_r=1&_t=ZS-96Zc55qnSgX" className="link-text">
          <TiktokIcon size={18} />
        </a>

        <a href="https://wa.me/233548064492"
          className="link-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsappIcon size={18} className="icon" />
        </a>


        <a href="mailto:rayhealthcareafrica@gmail.com" className="link-text">
          <Mail size={18} />
        </a>

               {/* <a href="#" className="link-text">
                 <TwitterIcon size={18} />
               </a>
               <a href="#" className="link-text">
                 <LinkedinIcon size={18} />
               </a> */}
             </div>
          </motion.div>

          {/* QUICK LINKS */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h4>SHOP</h4>
            <ul>
              <li>Men</li>
              <li>Women</li>
              <li>Children</li>
              <li>New Arrivals</li>
              <li>Sale</li>
            </ul>
          </motion.div>

          {/* SERVICES */}
        <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
        >
            <h4>EXPLORE</h4>
            <ul>
                <li>Promotions</li>
                <li>Size Guide</li>
                <li>Gift Cards</li>
                <li>Returns</li>
                <li>FAQs</li>
            </ul>
        </motion.div>

          {/* CONTACT */}
          <motion.div
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h4>SUPPORT</h4>
            <ul>
              <li><WhatsappIcon size={16} className="icon" /> +233XXXXXXXX</li>
              <li><Mail size={16} className="icon" />info@apparelspace.com</li>
              <li><MapPin size={16} className="icon" /> Accra, Ghana</li>
            </ul>
          </motion.div>
        </div>
      <hr className="divider" />
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 ApparelSpace. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
          <span className="clue-code">Designed & Developed by ClueCode</span>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
};

export default Footer;
