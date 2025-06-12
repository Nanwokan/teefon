import { useContext, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { FaCartShopping, FaRegCircleUser } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ROLE from '../common/role';
import Context from '../context';
import { setUserDetails } from '../store/userSlice';
import Logo from './Logo';

const Header = () => {
  const user = useSelector((state) => state?.user.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll('q');
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include',
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <header className="h-16 pb-2- fixed w-full z-40 bg-custom-bg">
      <div
        className="h-full container mx-auto flex items-center px-4 justify-between"
        style={{ margin: 0, minWidth: '100%' }}
      >
        <div className="ml-3">
          <Link to={'/'}>
            <Logo w={100} h={60} />
          </Link>
        </div>
        <div className="hidden bg-white md:flex items-center w-full justify-between md:max-w-md border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full outline-none pl-2"
            onChange={handleSearch}
            value={search}
          />
          <div
            className="text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white"
            style={{ backgroundColor: '#805a46' }}
          >
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          {user?.id && (
            <Link to={'/cart'} className="text-2xl cursor-pointer relative">
              <span>
                <FaCartShopping />
              </span>

              <div className="bg-red-600 text-white w-5 h-5 p-1 flex items-center justify-center rounded-full absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          <div className="relative flex justify-center">
            {user?.id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((preve) => !preve)}
              >
                {user?.profile_pic ? (
                  <img
                    src={user?.profile_pic}
                    className="w-10 h-10 rounded-full"
                    alt={`${user?.first_name} ${user?.last_name}`}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
  <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded min-w-[180px]">
    <nav className="flex flex-col">
      {/* Liens communs à tous les utilisateurs */}
      <Link
        to="/about"
        className="hover:bg-slate-100 p-2"
        onClick={() => setMenuDisplay(false)}
      >
        À propos
      </Link>
      <Link
        to="/product-category"
        className="hover:bg-slate-100 p-2"
        onClick={() => setMenuDisplay(false)}
      >
        Catalogue
      </Link>
      <Link
        to="/contacts"
        className="hover:bg-slate-100 p-2"
        onClick={() => setMenuDisplay(false)}
      >
        Contacts
      </Link>
      <Link
        to="/on-order"
        className="hover:bg-slate-100 p-2"
        onClick={() => setMenuDisplay(false)}
      >
        À la demande
      </Link>

      {/* Liens spécifiques à l’admin */}
      {user?.role === ROLE.ADMIN && (
        <Link
          to="/admin-panel/all-products"
          className="hover:bg-slate-100 p-2"
          onClick={() => setMenuDisplay(false)}
        >
          Admin Panel
        </Link>
      )}

      {/* Liens spécifiques à l’utilisateur général */}
      {user?.role === ROLE.GENERAL && (
        <Link
          to="/my-orders"
          className="hover:bg-slate-100 p-2"
          onClick={() => setMenuDisplay(false)}
        >
          Mes commandes
        </Link>
      )}
    </nav>
  </div>
)}

          </div>

          <div>
            {user?.id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700"
              >
                <FiLogOut size={20} />
              </button>
            ) : (
              <Link
                to={'/login'}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
