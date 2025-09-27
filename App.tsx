import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import { USERS, FILES, GROUPS, CATEGORIES } from './constants';
import { User, AppFile, Group, Role, Category } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const [users, setUsers] = useState<User[]>(USERS);
  const [files, setFiles] = useState<AppFile[]>(FILES);
  const [groups, setGroups] = useState<Group[]>(GROUPS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);


  const handleLogin = (username: string, password: string) => {
    const trimmedUsername = username.trim();
    const user = users.find(u => u.username === trimmedUsername && u.password === password);
    if (user) {
      if (user.isActive) {
        setCurrentUser(user);
        setLoginError(null);
      } else {
        setLoginError('حساب کاربری شما غیرفعال شده است');
      }
    } else {
      setLoginError('نام کاربری یا رمز عبور اشتباه است');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };
  
  const handleRegisterUser = (newUser: Omit<User, 'id' | 'isActive'>) => {
    const trimmedUsername = newUser.username.trim();
    if (!trimmedUsername) {
      alert("نام کاربری نمی‌تواند خالی باشد.");
      return;
    }
    if (users.some(u => u.username === trimmedUsername)) {
      alert(`نام کاربری "${trimmedUsername}" از قبل وجود دارد.`);
      return;
    }
    const userWithId: User = { ...newUser, username: trimmedUsername, id: `user-${Date.now()}`, isActive: true };
    setUsers(prevUsers => [...prevUsers, userWithId]);
  };

  const handleDeleteUser = (userId: string) => {
    if (currentUser?.id === userId) {
      alert("شما نمی‌توانید حساب کاربری خود را حذف کنید.");
      return;
    }
    if(window.confirm("آیا از حذف این کاربر مطمئن هستید؟")) {
      setUsers(prevUsers => prevUsers.filter(u => u.id !== userId));
    }
  };
  
  const handleFileUpload = (newFile: Omit<AppFile, 'id'>) => {
    const fileWithId: AppFile = { ...newFile, id: `file-${Date.now()}`};
    setFiles(prevFiles => [...prevFiles, fileWithId]);
  };

  const handleDeleteFile = (fileId: string) => {
    if (window.confirm("آیا از حذف این فایل مطمئن هستید؟")) {
      setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    }
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

  const handleDeleteGroup = (groupId: string) => {
    const isGroupInUse = users.some(u => u.groupId === groupId) || files.some(f => f.groupId === groupId);
    if (isGroupInUse) {
      alert("امکان حذف گروه وجود ندارد زیرا کاربران یا فایل‌هایی به آن اختصاص داده شده‌اند.");
      return;
    }
    if (window.confirm("آیا از حذف این گروه مطمئن هستید؟")) {
      setGroups(prevGroups => prevGroups.filter(g => g.id !== groupId));
      setCategories(prevCategories => prevCategories.filter(c => c.groupId !== groupId));
    }
  };

  const handleSetUserRole = (userId: string, role: Role) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, role } : user
      )
    );
  };
  
  const handleChangeUserPassword = (userId: string, newPassword: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, password: newPassword } : user
      )
    );
  };

  const handleChangeUsername = (userId: string, newUsername: string): { success: boolean; message: string } => {
    const trimmedUsername = newUsername.trim();
    if (!trimmedUsername) {
      return { success: false, message: 'نام کاربری نمی‌تواند خالی باشد' };
    }
    if (users.some(user => user.username === trimmedUsername && user.id !== userId)) {
      return { success: false, message: 'این نام کاربری قبلاً استفاده شده است' };
    }

    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, username: trimmedUsername } : user
      )
    );

    if (currentUser?.id === userId) {
      setCurrentUser(prevUser => prevUser ? { ...prevUser, username: trimmedUsername } : null);
    }
    
    return { success: true, message: 'نام کاربری با موفقیت تغییر کرد' };
  };

  const handleToggleUserStatus = (userId: string) => {
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === userId ? { ...user, isActive: !user.isActive } : user
      )
    );
  };

  const handleAddCategory = (name: string, groupId: string) => {
    if (name.trim() && groupId) {
      const newCategory: Category = {
        id: `cat-${Date.now()}`,
        name: name.trim(),
        groupId,
      };
      setCategories(prev => [...prev, newCategory]);
    }
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm("آیا از حذف این دسته‌بندی مطمئن هستید؟ فایل‌های موجود در این دسته‌بندی بدون دسته‌بندی خواهند شد.")) {
      setCategories(prev => prev.filter(c => c.id !== categoryId));
      setFiles(prevFiles => prevFiles.map(f => f.categoryId === categoryId ? {...f, categoryId: undefined} : f));
    }
  };

  return (
    <div>
      {currentUser ? (
        <Dashboard 
          currentUser={currentUser}
          users={users}
          files={files}
          groups={groups}
          categories={categories}
          onLogout={handleLogout}
          onRegisterUser={handleRegisterUser}
          onDeleteUser={handleDeleteUser}
          onFileUpload={handleFileUpload}
          onDeleteFile={handleDeleteFile}
          onAddGroup={handleAddGroup}
          onDeleteGroup={handleDeleteGroup}
          onSetUserRole={handleSetUserRole}
          onChangeUserPassword={handleChangeUserPassword}
          onChangeUsername={handleChangeUsername}
          onToggleUserStatus={handleToggleUserStatus}
          onAddCategory={handleAddCategory}
          onDeleteCategory={handleDeleteCategory}
        />
      ) : (
        <LoginPage onLogin={handleLogin} error={loginError} />
      )}
    </div>
  );
}

export default App;