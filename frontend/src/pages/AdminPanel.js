import { useEffect } from 'react';
import { FaRegCircleUser } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user]);

  console.log('user dans AdminPanel :', user);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex">
      <aside className="bg-custom-bg min-h-full w-full md:max-w-52">
        <div className="h-40 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profile_pic ? (
              <img
                src={user?.profile_pic}
                className="w-20 h-20 rounded-full"
                alt={`${user?.first_name} ${user?.last_name}`}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/***navigation */}

        <div className=''>
          <nav className="flex flex-row justify-around bg-white md:grid p-4 mx-2 rounded-2xl">
            <Link to={'all-users'} className="p-2 py-1 hover:bg-slate-100 font-semibold">
              Utilisateurs
            </Link>
            <Link to={'all-products'} className="p-2 py-1 hover:bg-slate-100 font-semibold">
              Produits
            </Link>
            <Link to={'all-orders'} className="p-2 py-1 hover:bg-slate-100 font-semibold">
              Commandes
            </Link>
          </nav>
        </div>
      </aside>

      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
