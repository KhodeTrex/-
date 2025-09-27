import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { USERS, FILES, GROUPS } from './constants';
import { User, AppFile, Group, Role } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>(USERS);
  const [files, setFiles] = useState<AppFile[]>(FILES);
  const [groups, setGroups] = useState<Group[]>(GROUPS);

  const handleLogin = (username: string, password: string) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoginError(null);
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleRegisterUser = (newUser: Omit<User, 'id'>) => {
    const userWithId: User = { ...newUser, id: `user-${Date.now()}`};
    setUsers(prevUsers => [...prevUsers, userWithId]);
  };
  
  const handleFileUpload = (newFile: Omit<AppFile, 'id'>) => {
    const fileWithId: AppFile = { ...newFile, id: `file-${Date.now()}`};
    setFiles(prevFiles => [...prevFiles, fileWithId]);
  };

  const handleAddGroup = (groupName: string) => {
    if (groupName.trim()) {
      const newGroup: Group = {
        id: `group-${Date.now()}`,
        name: groupName.trim(),
      };
      setGroups(prevGroups => [...prevGroups, newGroup]);
    }
  };

  const handleSetUserRole = (userId: string, role: Role) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role } : user
      )
    );
  };

  return (
    <div>
      {currentUser ? (
        <Dashboard 
          currentUser={currentUser}
          users={users}
          files={files}
          groups={groups}
          onLogout={handleLogout}
          onRegisterUser={handleRegisterUser}
          onFileUpload={handleFileUpload}
          onAddGroup={handleAddGroup}
          onSetUserRole={handleSetUserRole}
        />
      ) : (
        <LoginPage onLogin={handleLogin} error={loginError} />
      )}
    </div>
  );
}

export default App;