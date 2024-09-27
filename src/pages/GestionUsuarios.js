import { useState, useMemo } from 'react'
import { Button, TextField, MenuItem, Select, FormControl } from '@mui/material'
import UserComponent from '../components/UserComponent'
import NewUserForm from '../components/NewUserForm'
import { makeStyles } from '@mui/styles'

const GestionUsuarios = () => {
  const classes = useStyles()

  const [users, setUsers] = useState([
    { username: 'user123', password: 'password123', role: 'Admin', canEdit: false, canCreate: false, canManageUsers: false },
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
            InputProps={{
              className: classes.inputField,
            }}
          />
        </div>
        <div className={classes.filterRight}>
          <FormControl fullWidth>
            <Select 
              value={selectedRole} 
              onChange={(e) => setSelectedRole(e.target.value)} 
              displayEmpty
              className={classes.selectField}
            >
              <MenuItem value=""><em>Todos los roles</em></MenuItem>
              {roles.map((role) => (
                <MenuItem key={role} value={role}>{role}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={classes.newUserButton}>
          <Button variant="contained" onClick={handleNewUserClick} className={classes.newUserButtonStyle}>
            Nuevo Usuario
          </Button>
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
    backgroundColor: '#f4f4f4', 
  },
  filters: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    '@media (max-width: 600px)': {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginLeft: '20px',
      marginRight: '20px',
    },
  },
  filterLeft: {
    flex: '1',
    marginRight: '20px',
    '@media (max-width: 600px)': {
      marginRight: '0',
      marginBottom: '10px',
    },
  },
  filterRight: {
    flex: '1',
    marginRight: '20px',
    '@media (max-width: 600px)': {
      marginRight: '0',
      marginBottom: '10px',
    },
  },
  newUserButton: {
    flex: 'none',
    textAlign: 'right',
    '@media (max-width: 600px)': {
      width: '100%',
      textAlign: 'left',
    },
  },
  newUserButtonStyle: {
    backgroundColor: '#5eb219', 
    '&:hover': {
      backgroundColor: '#4cae14', 
    },
  },
  inputField: {
    backgroundColor: '#ffffff', 
  },
  selectField: {
    backgroundColor: '#ffffff', 
  },
  userList: {
    marginTop: '20px',
  },
  userComponent: {
    marginBottom: '15px',
    border: `1px solid #144cae`, 
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#ffffff', 
  },
  errorText: {
    color: '#ae144c', 
  },
}))

export default GestionUsuarios
