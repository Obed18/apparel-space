import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, MapPin, Menu, X, BadgeInfo, Mail, ChevronDown, ShoppingBag, Heart, Search } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../styles/Navbar.css";
import SearchOverlay from "./SearchBox";
import { useAuthModal } from "../contexts/AuthModalContext";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter, FaWhatsapp, FaSnapchat } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";

type IconProps = {
  size?: number;
  className?: string;
};

const FacebookIcon: React.FC<IconProps> = (props) => React.createElement(FaFacebookF as any, props);
const InstagramIcon: React.FC<IconProps> = (props) => React.createElement(FaInstagram as any, props);
const TwitterIcon: React.FC<IconProps> = (props) => React.createElement(FaXTwitter as any, props);
const SnapchatIcon: React.FC<IconProps> = (props) => React.createElement(FaSnapchat as any, props);
const WhatsappIcon: React.FC<IconProps> = (props) => React.createElement(FaWhatsapp as any, props);
const TiktokIcon: React.FC<IconProps> = (props) => React.createElement(FaTiktok as any, props);



type NavItem = {
  path: string;
  label: string;
  isParent?: boolean;
};

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = React.useRef<HTMLDivElement | null>(null);
  const { openAuthModal } = useAuthModal();
  const location = useLocation();

  React.useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileOpen(false);
  }, [location]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const openSearch = (): void => {
    setIsMobileMenuOpen(false);
    setShowSearch(true);
  };

  const doSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setShowSearch(false);
  };

  const handleProfileToggle = (): void => {
    setIsProfileOpen((current) => !current);
  };

  const handleSignInClick = (): void => {
    setIsProfileOpen(false);
    openAuthModal();
  };

  const navItems: NavItem[] = [
    { path: "/home", label: "Home" },
    { path: "/men", label: "Men" },
    { path: "/women", label: "Women" },
    { path: "/children", label: "Children" },
    { path: "/new-arrivals", label: "New Arrivals" },
    { path: "/sale", label: "Sale" },
  ];

  // Helper function to check if a link is active (handles nested routes)
  const isLinkActive = (itemPath: string, isParent?: boolean): boolean => {
    if (isParent) {
      // For parent routes, match if pathname starts with the path
      return location.pathname.startsWith(itemPath);
    }
    // For other routes, do exact match
    return location.pathname === itemPath;
  };

  const navLinks = (
    <ul className="courier-links">
      {navItems.map((item, index) => (
        <li key={index}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              isActive || isLinkActive(item.path, item.isParent)
                ? "link-text active-link"
                : "link-text"
            }
          >
            {item.label}

            {/* Sleek Animated Indicator */}
            {isLinkActive(item.path, item.isParent) && (
              <motion.span
                layoutId="activeIndicator"
                className="active-indicator"
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
          </NavLink>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="courier-header">
      <div className="courier-topbar">
        <div className="courier-contact">
          <a
            href="https://wa.me/233548064492"
            className="top-links"
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsappIcon size={16} className="icon" />
            <span>+233XXXXXXXXX</span>
          </a>
          <a
            href="https://www.bing.com/ck/a?!&&p=418c12a103308f351e05fd0b94113fd722b894484a44be78201a5a3d1b432115JmltdHM9MTc4MDI3MjAwMA&ptn=3&ver=2&hsh=4&fclid=2e8a82bb-9836-6466-27cc-9765992b6588&u=a1L21hcHM_Jm1lcGk9NjB-fkVtYmVkZGVkfkxhcmdlTWFwTGluayZ0eT0xOCZxPUFjY3JhJTJDJTIwR3JlYXRlciUyMEFjY3JhJTIwUmVnaW9uJTJDJTIwR2hhbmEmc2F0aWQ9aWQuc2lkJTNBN2RlYTQ0ZWItNjVkMy1jYTZiLWMzNTMtZWFjOTUxY2JkYzUwJnZkcGlkPTU3NjMxMDQxODA0MTE1NjQwMzYmbWI9NS42NjczNzh-LTAuMjg0MTQyfjUuNTE3MTgxfi0wLjA1NDg0NiZwcG9pcz01LjU5MjI3OTY3MjYyMjY4MV8tMC4xNjk0OTQxNTM5MzE3MzY5NV9BY2NyYSUyQyUyMEdyZWF0ZXIlMjBBY2NyYSUyMFJlZ2lvbiUyQyUyMEdoYW5hX34mdj0yJnNWPTEmRk9STT1NSVJFJnFwdnQ9YWNjcmErZ2hhbmErb24rbWFwcw"
            className="top-links"
          >
            <MapPin size={16} className="icon" />
            <span>Accra, Ghana</span>
          </a>
          <a href="mailto:rayhealthcareafrica@gmail.com" className="top-links">
            <Mail size={16} className="icon" />
            <span>info@apparelspace.com</span>
          </a>
        </div>

        <span className="courier-support">
          <FacebookIcon size={16} /> <InstagramIcon size={16} /> <TwitterIcon size={16} /> <TiktokIcon size={16} />  <SnapchatIcon size={16} />  apparelspace_
        </span>
      </div>

      <motion.nav
        className="courier-navbar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/" className="link-text">
          <div className="courier-logo">
            <img src="/as-text.png" className="logo-circle" alt="NCL Logo" />
          </div>
        </Link>

        <div className="courier-desktop-links">{navLinks}</div>

        <div
          className="courier-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                className="mobile-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />

              <motion.div
                className="mobile-sidebar"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  className="mobile-close-btn"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>

                {navLinks}

                <div className="mobile-actions">
                  <button
                    type="button"
                    className="search-btn action-products"
                    onClick={openSearch}
                  >
                    <Search size={20} className="black-search-icon" /> Search
                  </button>
                  <button className="saved-btn action-products" type="button">
                    <Heart size={20} className="saved-icon" /> Saved items
                  </button>
                  <button className="cart-btn action-products" type="button">
                    <ShoppingBag size={20} className="cart-icon" /> Cart
                  </button>
                  <div className="profile-section">
                    <img src="/account.png" className="profile-img" alt="Profile" />
                    <div className="profile-details">
                      <h2 className="profile-name">My Account</h2>
                      <p className="profile-email">Log in to get started</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <div className={`nav-actions ${isMobileMenuOpen ? "open " : ""}`}>
          <button
            type="button"
            className="search-btn transparent-btn"
            onClick={openSearch}
          >
            <Search size={16} className="black-search-icon" />
          </button>
          <button className="saved-btn transparent-btn">
            <Heart size={16} className="saved-icon" />
          </button>
          <button className="cart-btn transparent-btn">
            <ShoppingBag size={16} className="cart-icon" />
          </button>
          <div className="profile-section" ref={profileMenuRef}>
            <button
              type="button"
              className="profile-trigger"
              onClick={handleProfileToggle}
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
            <img src="/account.png" className="profile-img" alt="Profile" />
            <ChevronDown size={16} className="profile-icon" />
            </button>

            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  className="profile-dropdown"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  role="menu"
                >
                  <h3 className="profile-dropdown-title">My Account</h3>
                  <p className="profile-dropdown-text">
                    Sign in to track orders, manage your wishlist and more.
                  </p>
                  <button
                    type="button"
                    className="profile-signin-btn"
                    onClick={handleSignInClick}
                  >
                    Sign In
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>

      <SearchOverlay
        showSearch={showSearch}
        query={query}
        setQuery={setQuery}
        setShowSearch={setShowSearch}
        doSearch={doSearch}
      />
    </header>
  );
};

export default Navbar;
