import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-custom-dark text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Teefon</h2>
          <p className="text-sm mb-4">Lorem ipsum dolor sit amet</p>
          <div className="flex space-x-4">
            <Link to="#" className="text-white hover:text-gray-400">
              <FaTwitter size={20} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              <FaFacebook size={20} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              <FaInstagram size={20} />
            </Link>
            <Link to="#" className="text-white hover:text-gray-400">
              <FaGithub size={20} />
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-bold mb-4">COMPANY</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/features" className="hover:text-gray-400">
                Features
              </Link>
            </li>
            <li>
              <Link to="/works" className="hover:text-gray-400">
                Works
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:text-gray-400">
                Careers
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-xl font-bold mb-4">HELP</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/support" className="hover:text-gray-400">
                Customer Support
              </Link>
            </li>
            <li>
              <Link to="/delivery-details" className="hover:text-gray-400">
                Delivery Details
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-gray-400">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-gray-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* FAQ */}
        <div>
          <h3 className="text-xl font-bold mb-4">FAQ</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/account" className="hover:text-gray-400">
                Account
              </Link>
            </li>
            <li>
              <Link to="/manage-deliveries" className="hover:text-gray-400">
                Manage deliveries
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-gray-400">
                Orders
              </Link>
            </li>
            <li>
              <Link to="/payments" className="hover:text-gray-400">
                Payments
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div title="Teefon 2024" className="text-center text-sm mt-10">
        © 2024 Teefon. Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
