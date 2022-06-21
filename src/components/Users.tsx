import React, {useEffect} from 'react';
import {useUserStore} from "../store";

const Users = () => {
  const users = useUserStore(state => state.users);
  const addUser = useUserStore(state => state.addUser);
  const fetchUsers = useUserStore(state => state.fetchUsers);
  const removeUser = useUserStore(state => state.removeUser);

  useEffect(() => {
    if(users.length === 0) {
      fetchUsers()
    }
  }, [])

  const createUser = (name: string | null) => {
    if(!name) return;
    addUser({
      name,
      id: Date.now().toString()
    })
  }

  return (
    <div className="users_list">
      <button onClick={() => createUser(prompt('User Name:'))}>Add New User</button>
      {users.map(user => (
        <div className="user" onClick={() => removeUser(user.id)} key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};

export default Users;