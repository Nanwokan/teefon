import { useEffect, useState } from 'react';
import { RiEdit2Fill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: '',
    firstName: '',
    lastName: '',
    role: '',
    _id: '',
  });

  const fetchAllUsers = async () => {
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method: SummaryApi.allUser.method,
      credentials: 'include',
    });

    const dataResponse = await fetchData.json();

    if (dataResponse.success) {
      setAllUsers(dataResponse.data);
    }

    if (dataResponse.error) {
      toast.error(dataResponse.message);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white pb-4">
      <table className="w-full userTable">
        <thead>
          <tr className="">
            <th>Sr.</th>
            <th>Nom</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="pb-4 bg-white">
          {allUser.map((el, index) => {
            return (
              <tr key={el.id}>
                <td>{index + 1}</td>
                <td>{`${el?.first_name || ''} ${el?.last_name || ''}`}</td>
                <td>{el?.role}</td>
                <td>
                  <button
                    className="bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-200 hover:text-white"
                    onClick={() => {
                      setUpdateUserDetails(el);
                      setOpenUpdateRole(true);
                    }}
                  >
                    <RiEdit2Fill />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          firstName={updateUserDetails.firstName}
          lastName={updateUserDetails.lastName}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
