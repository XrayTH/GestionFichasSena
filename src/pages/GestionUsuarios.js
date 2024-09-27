import { useState, useMemo } from 'react'
import { Button, TextField, MenuItem, Select, FormControl } from '@mui/material'
import UserComponent from '../components/UserComponent'
import NewUserForm from '../components/NewUserForm'
import { makeStyles } from '@mui/styles'

const GestionUsuarios = () => {
  const classes = useStyles()

  const [users, setUsers] = useState([
    { username: 'user123', password: 'password123', role: 'Admin', canEdit: false, canCreate: false, canManageUsers: false},
    { username: 'user456', password: 'password123', role: 'Editor', canEdit: true, canCreate: false, canManageUsers: false },
    { username: 'user789', password: 'password123', role: 'Viewer', canEdit: false, canCreate: false, canManageUsers: false },
  ])
  
  const [showNewUserForm, setShowNewUserForm] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleNewUserClick = () => setShowNewUserForm(true)
  const handleSaveNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
    setShowNewUserForm(false)
  }
  const handleCancelNewUser = () => setShowNewUserForm(false)

  const roles = useMemo(() => {
    const uniqueRoles = new Set(users.map(user => user.role));
    return Array.from(uniqueRoles);
  }, [users]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.username.toLowerCase().includes(searchText.toLowerCase());
      const matchesRole = selectedRole ? user.role === selectedRole : true;
      return matchesSearch && matchesRole;
    });
  }, [users, searchText, selectedRole]);

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filterLeft}>
          <TextField
            fullWidth
            placeholder="Filtrar por usuario"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className={classes.filterRight}>
          <FormControl fullWidth>
            <Select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)} 
              displayEmpty
            >
              <MenuItem value=""><em>Todos los roles</em></MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.newUserButton}>
          <Button variant="contained" onClick={handleNewUserClick}>Nuevo Usuario</Button>
        </div>
      </div>

      {showNewUserForm && <NewUserForm onSave={handleSaveNewUser} onCancel={handleCancelNewUser} />}

      <div className={classes.userList}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user.username} className={classes.userComponent}>
              <UserComponent user={user} />
            </div>
          ))
        ) : (
          <p>No se encontraron usuarios</p>
        )}
      </div>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: '1200px', 
    width: '100%', 
    margin: 'auto',
    padding: '20px',
  },
  filters: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  filterLeft: {
    flex: '1',
    marginRight: '20px',
  },
  filterRight: {
    flex: '1',
    marginRight: '20px',
  },
  newUserButton: {
    flex: 'none',
    textAlign: 'right',
  },
  userList: {
    marginTop: '20px',
  },
  userComponent: {
    marginBottom: '15px',
  },
}))

export default GestionUsuarios
