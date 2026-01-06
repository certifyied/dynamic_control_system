import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, Instagram, Linkedin, Youtube } from "lucide-react";
import dynamicLogo from "@/assets/dynamic_logo.png";

const Footer = () => {
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Blog", path: "/blog" },
    { name: "Clients", path: "/clients" },
    { name: "Contact", path: "/contact" },
  ];

  const contactInfo = {
    company: "Dynamic Control Systems",
    address: "52/3106, Near SBI Bank, NH Bypass, Vyttila, Kochi, Ernakulam Dist., Kerala, 682019",
    email: "sales@dynamiccontrolsystems.in",
    phones: ["+91 48440 41177", "+91 94477 07855", "+91 85473 27855"],
    website: "dynamiccontrolsystems.in",
  };

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src={dynamicLogo}
                alt="Dynamic Control System"
                className="h-10 w-auto"
              />
              <span className="font-display font-bold text-lg">Dynamic Control System</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Leading provider of industrial automation solutions in Kochi. Authorized Channel Partner for Mitsubishi Electric India Private Limited.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://www.instagram.com/dynamiccontrolsystems?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors" 
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://www.linkedin.com/company/110205638/admin/?lipi=urn%3Ali%3Apage%3Ad_flagship3_feed%3B4zfSZZBgR6ub8Fnn0osTMw%3D%3D" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors" 
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="#" 
                className="hover:text-primary transition-colors" 
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary mt-0.5 flex-shrink-0" size={18} />
                <span className="text-sm text-secondary-foreground/80">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary flex-shrink-0" size={18} />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary flex-shrink-0" size={18} />
                <div className="flex flex-col gap-1">
                  {contactInfo.phones.map((phone, index) => (
                    <a
                      key={index}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Globe className="text-primary flex-shrink-0" size={18} />
                <a
                  href={`https://${contactInfo.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors"
                >
                  {contactInfo.website}
                </a>
              </li>
            </ul>
          </div>

          {/* Training Institute */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Training</h3>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Specialized training focused on Industrial Automation in Kochi, preparing students for real-world industrial automation roles.
            </p>
            <a
              href="https://dcsri.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              Visit Training Institute
              <span className="text-xs">→</span>
            </a>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-sm text-secondary-foreground/60">
                © {new Date().getFullYear()} Dynamic Control Systems. All rights reserved.
              </p>
              <p className="text-sm text-secondary-foreground/60">
                Designed and developed by Fawas A Shemeer.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link
                to="/about"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-secondary-foreground/60 hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
