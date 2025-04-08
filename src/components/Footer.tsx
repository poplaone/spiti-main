
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Instagram, Facebook, MapPin, Mail, Phone, ChevronRight } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();
  
  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  };
  
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    navigate(path);
  };
  
  return (
    <footer className="text-white py-12 bg-neutral-950">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-cyan-500">Spiti Valley Tours</h3>
            <p className="mb-4">
              Experience the magic of the Himalayan cold desert with our expert-guided tours. Discover ancient monasteries, high-altitude villages, and stunning landscapes of Spiti Valley.
            </p>
            <div className="flex space-x-4 bg-transparent">
              <a href="https://www.facebook.com/profile.php?id=61571449392965" target="_blank" rel="noopener noreferrer" className="hover:text-spiti-green transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/spitivalleytravels?igsh=NWdndDQ4bGNsM2t1" target="_blank" rel="noopener noreferrer" className="hover:text-spiti-green transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-500">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-500">Popular Tours</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/LAHAUL-SPITI-BIKE-TOUR" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Lahaul Spiti Bike Tour
                </Link>
              </li>
              <li>
                <Link to="/INTO-THE-HEART-OF-SPITI" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Into The Heart Of Spiti
                </Link>
              </li>
              <li>
                <Link to="/BUDDHIST-AND-TRIBAL-CIRCUIT–SPITI" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Buddhist and Tribal Circuit
                </Link>
              </li>
              <li>
                <Link to="/SPITI-VALLEY-WOMEN-ONLY-TOUR" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Women Only Tour
                </Link>
              </li>
              <li>
                <Link to="/SPITI-VALLEY-TOUR-IN-YOUR-OWN-CAR" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Own Car Tour
                </Link>
              </li>
              <li>
                <Link to="/UNEXPLORED-SPITI" className="hover:text-spiti-green transition-colors flex items-center">
                  <ChevronRight size={16} className="mr-1" /> Unexplored Spiti
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-sky-500">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="mr-2 mt-1 text-spiti-green" size={18} />
                <span>Quality Restaurant Building, 1st Floor, Main Bazar Chirgaon, Distt. Shimla, Himachal Pradesh</span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2 text-spiti-green" size={18} />
                <span>+91 8353040008 / 8353010033</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 text-spiti-green" size={18} />
                <span>hello@spitivalleytravels.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p className="text-sky-300">© {new Date().getFullYear()} Spiti Valley Tours. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy-policy" className="hover:text-spiti-green transition-colors mr-4">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-spiti-green transition-colors">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
