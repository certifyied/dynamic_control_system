import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  const productLinks = [
    "Factory Automation",
    "Building Systems",
    "Energy Solutions",
    "Transportation",
    "Home Appliances",
  ];

  const companyLinks = [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "#" },
    { name: "News", path: "#" },
    { name: "Sustainability", path: "#" },
  ];

  const supportLinks = [
    { name: "Contact", path: "/contact" },
    { name: "Downloads", path: "#" },
    { name: "FAQs", path: "#" },
    { name: "Support Portal", path: "#" },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">M</span>
              </div>
              <span className="font-display font-bold text-lg">Mitsubishi Electric</span>
            </div>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Changes for the Better. Innovation drives our commitment to creating a sustainable future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="#" className="hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Products</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
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

          {/* Support */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
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
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-secondary-foreground/60">
              © {new Date().getFullYear()} Mitsubishi Electric. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Terms of Use
              </a>
              <a href="#" className="text-secondary-foreground/60 hover:text-primary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
