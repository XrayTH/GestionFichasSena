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

  const handleNewUserClick = () => setShowNewUserForm(true)
  const handleSaveNewUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser])
    setShowNewUserForm(false)
  }
  const handleCancelNewUser = () => setShowNewUserForm(false)

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    )
  }, [users, searchText])

  return (
    <div className={classes.container}>
      <div className={classes.filters}>
        <div className={classes.filterLeft}>
          <TextField
            fullWidth
            placeholder="Filtar por usuario"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div className={classes.filterRight}>
          <FormControl fullWidth>
            <Select value="" displayEmpty>
              <MenuItem value=""><em>Todos los roles</em></MenuItem>
              {/* Dropdown vacío, sin funcionalidad */}
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
