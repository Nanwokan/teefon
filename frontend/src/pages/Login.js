import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import Context from '../context';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method: SummaryApi.signIn.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate('/');
      fetchUserDetails();
      fetchUserAddToCart();
    }

    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log('data login', data);

  return (
    <section className="min-h-[80vh] flex">
      {/* Left side (dark background) */}
      <div className="hidden lg:flex lg:flex-1 bg-custom-dark"></div>

      {/* Right side (form container) */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-md w-full p-8">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-6 text-custom-dark">
            Identifiez-vous
          </h2>
          <p className="text-custom-dark mb-6">
            Vous n&apos;avez pas encore de compte ?{' '}
            <Link
              to="/sign-up"
              className="text-green-600 font-semibold hover:underline"
            >
              S&apos;inscrire
            </Link>
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit}>
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

            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-custom-dark">Se souvenir de moi</span>
              </label>
              <Link
                to={'/forgot-password'}
                className="text-sm text-blue-600 hover:underline"
              >
                Mot de passe oublié?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full max-w-[300px] mx-auto block bg-custom-dark text-white py-3 rounded-full hover:scale-110 transition-all"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
