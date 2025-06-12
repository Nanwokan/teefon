import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';

const SignUp = () => {
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    profilePic: '',
    agreeTerms: false,
  });

  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation de la correspondance des mots de passe
    if (data.password !== data.confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!data.agreeTerms) {
      setError('Vous devez accepter les conditions d\'utilisation.');
      return;
    }
    setError('');
    console.log('Sign Up Data:', data);

    const dataResponse = await fetch(SummaryApi.SignUP.url, {
      method: SummaryApi.SignUP.method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/login');
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <section className="min-h-[80vh] flex">
      {/* Left side (dark background) */}
      <div className="hidden lg:flex lg:flex-1 bg-custom-dark"></div>

      {/* Right side (form container) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-custom-dark">
            Inscription
          </h2>
          <p className="text-custom-dark mb-6">
            Vous avez déjà un compte ?{' '}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                id="firstName"
                placeholder="Prénom"
                name="firstName"
                value={data.firstName}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <input
                type="text"
                id="lastName"
                placeholder="Nom"
                name="lastName"
                value={data.lastName}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                value={data.email}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="password"
                placeholder="Mot de passe"
                name="password"
                value={data.password}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirmez votre mot de passe"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleOnChange}
                className="w-full mt-1 p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-300"
              />
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <div className="mb-4 flex items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={data.agreeTerms}
                onChange={handleOnChange}
                className="mr-2 mt-1"
              />
              <label htmlFor="agreeTerms" className="text-sm text-custom-dark">
                J&apos;accepte la{' '}
                <Link
                  to="/privacy-policy"
                  className="text-green-600 hover:underline"
                >
                  politique de confidentialité
                </Link>{' '}
                et les{' '}
                <Link
                  to="/terms-of-use"
                  className="text-green-600 hover:underline"
                >
                  conditions d&apos;utilisation
                </Link>
              </label>
            </div>

            <button
              type="submit"
              className="w-full max-w-[300px] mx-auto block bg-custom-dark text-white py-3 rounded-full hover:scale-110 transition-all"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
