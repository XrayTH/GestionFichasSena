import { useState } from 'react';
import { Button } from '@mui/material';
import UserComponent from '../components/UserComponent';
import NewUserForm from '../components/NewUserForm'; // Asegúrate de importar el nuevo formulario

const GestionUsuarios = () => {
  const [users, setUsers] = useState([
    {
      username: 'user123',
      password: 'password123',
      role: 'Admin',
      canEdit: false,
      canCreate: false,
      canManageUsers: false,
    },{
      username: 'user456',
      password: 'password123',
      role: 'Admin',
      canEdit: true,
      canCreate: false,
      canManageUsers: false,
    },
  ]);

  const [showNewUserForm, setShowNewUserForm] = useState(false);

  const handleNewUserClick = () => {
    setShowNewUserForm(true);
  };

  const handleSaveNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setShowNewUserForm(false);
  };

  const handleCancelNewUser = () => {
    setShowNewUserForm(false);
  };

  return (
    <div>
      {/* Botón para agregar un nuevo usuario */}
      <Button onClick={handleNewUserClick}>Nuevo Usuario</Button>

      {/* Formulario para nuevo usuario */}
      {showNewUserForm && (
        <NewUserForm
          onSave={handleSaveNewUser}
          onCancel={handleCancelNewUser}
        />
      )}

      {/* Mostrar lista de usuarios */}
      {users.map((user, index) => (
        <UserComponent key={index} user={user} />
      ))}
    </div>
  );
};

export default GestionUsuarios;
