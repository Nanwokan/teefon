import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import ROLE from '../common/role';

const ChangeUserRole = ({
  firstName,
  lastName,
  email,
  role,
  userId,
  onClose,
  callFunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);

    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }

    if (responseData.error) {
      toast.error(responseData.message);
    }

    console.log('role mis a jour', responseData);
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-custom-dark bg-opacity-60">
      <div className=" mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={onClose}>
          <IoClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">
          Changer le role utilisateur
        </h1>
        <p>Prenom: {firstName}</p>
        <p>Nom: {lastName}</p>
        <p>Email: {email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role :</p>
          <select
            className="bg-custom-third-color text-white rounded p-2"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => {
              return (
                <option value={el} key={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-fit mx-auto block border py-1 px-3 rounded-full bg-green-600 text-white hover:bg-custom-third-color hover:text-white "
          onClick={updateUserRole}
        >
          Valider
        </button>
      </div>
    </div>
  );
};

import PropTypes from 'prop-types';

ChangeUserRole.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  callFunc: PropTypes.func.isRequired,
};


export default ChangeUserRole;
