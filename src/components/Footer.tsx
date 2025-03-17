import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
const Footer = () => {
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  return <footer className="text-white py-12 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-fuchsia-600">Spiti Valley Tours</h3>
            <p className="mb-4">
              Experience the magic of the Himalayan cold desert with our expert-guided tours. Discover ancient monasteries, high-altitude villages, and stunning landscapes of Spiti Valley.
            </p>
            <div className="flex space-x-4 bg-transparent">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-spiti-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-spiti-green transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-spiti-green transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-fuchsia-600">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-spiti-green transition-colors" onClick={e => handleScrollToSection(e, 'top')}>
                  Home
                </a>
              </li>
              <li>
                <a href="#tour-packages" className="hover:text-spiti-green transition-colors" onClick={e => handleScrollToSection(e, 'tour-packages')}>
                  Tour Packages
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-spiti-green transition-colors" onClick={e => handleScrollToSection(e, 'gallery')}>
                  Gallery
                </a>
              </li>
              <li>
                <a href="#about-spiti" className="hover:text-spiti-green transition-colors" onClick={e => handleScrollToSection(e, 'about-spiti')}>
                  About Spiti
                </a>
              </li>
              <li>
                <a href="#contact-us" className="hover:text-spiti-green transition-colors" onClick={e => handleScrollToSection(e, 'contact-us')}>
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-fuchsia-600">Popular Tours</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tour/0" className="hover:text-spiti-green transition-colors">Spiti Valley Bike Tour</Link>
              </li>
              <li>
                <Link to="/tour/2" className="hover:text-spiti-green transition-colors">Buddhist and Tribal Circuit</Link>
              </li>
              <li>
                <Link to="/tour/3" className="hover:text-spiti-green transition-colors">Women Only Tour</Link>
              </li>
              <li>
                <Link to="/tour/5" className="hover:text-spiti-green transition-colors">Hidden Heaven Tour</Link>
              </li>
              <li>
                <Link to="/tour/1" className="hover:text-spiti-green transition-colors">Unexplored Spiti</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-fuchsia-600">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-spiti-green" size={18} />
                <span>123 Himalayan Way, Kaza, Spiti Valley, Himachal Pradesh, India</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-spiti-green" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-spiti-green" size={18} />
                <span>info@spititours.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p className="text-fuchsia-500">© {new Date().getFullYear()} Spiti Valley Tours. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="hover:text-spiti-green transition-colors mr-4">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-spiti-green transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;