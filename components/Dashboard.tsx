import React, { useState } from 'react';
import { User, AppFile, Group, Role } from '../types';
import { UserIcon, FileIcon, LogoutIcon, UploadIcon, PlusIcon, EyeIcon, GroupIcon, ShieldIcon, KeyIcon, LockClosedIcon, LockOpenIcon, CogIcon } from './icons';

interface DashboardProps {
  currentUser: User;
  users: User[];
  files: AppFile[];
  groups: Group[];
  onLogout: () => void;
  onRegisterUser: (newUser: Omit<User, 'id' | 'isActive'>) => void;
  onFileUpload: (newFile: Omit<AppFile, 'id'>) => void;
  onAddGroup: (groupName: string) => void;
  onSetUserRole: (userId: string, role: Role) => void;
  onChangeUserPassword: (userId: string, newPassword: string) => void;
  onChangeUsername: (userId: string, newUsername: string) => { success: boolean, message: string };
  onToggleUserStatus: (userId: string) => void;
}

interface AdminViewProps {
  currentUser: User;
  users: User[];
  files: AppFile[];
  groups: Group[];
  getGroupName: (groupId: string) => string;
  onRegisterUser: (e: React.FormEvent) => void;
  newUsername: string;
  setNewUsername: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  newUserGroup: string;
  setNewUserGroup: (val: string) => void;
  onAddGroup: (e: React.FormEvent) => void;
  newGroupName: string;
  setNewGroupName: (val: string) => void;
  onFileUpload: (e: React.FormEvent) => void;
  onFileSelect: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fileGroup: string;
  setFileGroup: (val: string) => void;
  onSetUserRole: (userId: string, role: Role) => void;
  setPasswordChangeUser: (user: User | null) => void;
  onToggleUserStatus: (userId: string) => void;
}

const AdminView: React.FC<AdminViewProps> = ({
  currentUser, users, files, groups, getGroupName, onRegisterUser, newUsername, setNewUsername, newPassword, setNewPassword, newUserGroup, setNewUserGroup, onAddGroup, newGroupName, setNewGroupName, onFileUpload, onFileSelect, fileGroup, setFileGroup, onSetUserRole, setPasswordChangeUser, onToggleUserStatus
}) => (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Management Forms */}
      <div className="space-y-8">
        {/* Add User */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><PlusIcon /> افزودن کاربر جدید</h3>
            <form onSubmit={onRegisterUser} className="space-y-4">
                <input type="text" placeholder="نام کاربری" value={newUsername} onChange={e => setNewUsername(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="password" placeholder="رمز عبور" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <select value={newUserGroup} onChange={e => setNewUserGroup(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <button type="submit" className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">افزودن کاربر</button>
            </form>
        </div>
        
        {/* Add Group */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><GroupIcon /> افزودن گروه جدید</h3>
            <form onSubmit={onAddGroup} className="space-y-4">
                <input type="text" placeholder="نام گروه" value={newGroupName} onChange={e => setNewGroupName(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <button type="submit" className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">افزودن گروه</button>
            </form>
        </div>

        {/* Upload File */}
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><UploadIcon /> بارگذاری فایل جدید</h3>
            <form onSubmit={onFileUpload} className="space-y-4">
                <input id="file-upload" type="file" onChange={onFileSelect} required className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                <select value={fileGroup} onChange={e => setFileGroup(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
                <button type="submit" className="flex items-center justify-center w-full gap-2 px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">بارگذاری فایل</button>
            </form>
        </div>
      </div>
      
      {/* Data Lists */}
      <div className="space-y-8">
          <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><UserIcon /> لیست کاربران</h3>
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {users.map(u => (
                  <li key={u.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50">
                    <div className="flex items-center">
                       <span title={u.isActive ? "فعال" : "غیرفعال"} className={`mr-3 inline-block h-2.5 w-2.5 rounded-full ${u.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                      <span>{u.username} </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ml-2 ${u.role === Role.ADMIN ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{u.role}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">{getGroupName(u.groupId)}</span>
                        {currentUser.id !== u.id && (
                          <>
                            {u.role !== Role.ADMIN && (
                                <button onClick={() => onSetUserRole(u.id, Role.ADMIN)} title="ارتقا به ادمین" className="p-1 text-gray-500 rounded-full hover:bg-green-100 hover:text-green-700">
                                    <ShieldIcon className="w-5 h-5" />
                                </button>
                            )}
                            <button onClick={() => setPasswordChangeUser(u)} title="تغییر رمز عبور" className="p-1 text-gray-500 rounded-full hover:bg-yellow-100 hover:text-yellow-700">
                                <KeyIcon className="w-5 h-5" />
                            </button>
                             <button onClick={() => onToggleUserStatus(u.id)} title={u.isActive ? "غیرفعال کردن" : "فعال کردن"} className={`p-1 rounded-full ${u.isActive ? 'text-red-500 hover:bg-red-100' : 'text-green-500 hover:bg-green-100'}`}>
                                {u.isActive ? <LockClosedIcon className="w-5 h-5" /> : <LockOpenIcon className="w-5 h-5" />}
                            </button>
                          </>
                        )}
                    </div>
                  </li>
                ))}
              </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><GroupIcon /> لیست گروه‌ها</h3>
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {groups.map(g => <li key={g.id} className="p-2 rounded-md bg-gray-50"><span>{g.name}</span></li>)}
              </ul>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md">
              <h3 className="flex items-center gap-2 mb-4 text-xl font-semibold text-gray-800"><FileIcon /> لیست همه فایل‌ها</h3>
              <ul className="space-y-3 max-h-48 overflow-y-auto">
                {files.map(f => <li key={f.id} className="flex items-center justify-between p-2 rounded-md bg-gray-50"><span>{f.name}</span><span className="text-sm text-gray-500">{getGroupName(f.groupId)}</span></li>)}
              </ul>
          </div>
      </div>
    </div>
);

interface UserViewProps {
  currentUser: User;
  files: AppFile[];
  getGroupName: (groupId: string) => string;
  onSelectFile: (file: AppFile) => void;
}

const UserView: React.FC<UserViewProps> = ({ currentUser, files, getGroupName, onSelectFile }) => {
    const userFiles = files.filter(f => f.groupId === currentUser.groupId);
    return (
        <div>
            <h2 className="mb-6 text-2xl font-bold text-gray-800">فایل‌های شما از {getGroupName(currentUser.groupId)}</h2>
            {userFiles.length === 0 ? (
                <p className="p-6 text-center text-gray-500 bg-white rounded-lg shadow-md">هیچ فایلی برای گروه شما یافت نشد.</p>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {userFiles.map(file => (
                    <div key={file.id} className="overflow-hidden bg-white rounded-lg shadow-md">
                        <div className="flex items-center justify-center w-full text-indigo-500 bg-indigo-100 h-36">
                            <FileIcon className="w-16 h-16" />
                        </div>
                        <div className="p-4">
                            <h4 className="font-semibold text-gray-800 truncate">{file.name}</h4>
                            <p className="text-sm text-gray-500">{file.type}</p>
                            <button onClick={() => onSelectFile(file)} className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                                <EyeIcon className="w-4 h-4" /> مشاهده
                            </button>
                        </div>
                    </div>
                ))}
                </div>
            )}
        </div>
    );
};


const Dashboard: React.FC<DashboardProps> = ({ currentUser, users, files, groups, onLogout, onRegisterUser, onFileUpload, onAddGroup, onSetUserRole, onChangeUserPassword, onChangeUsername, onToggleUserStatus }) => {
  const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);

  // Admin state
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState<Role>(Role.USER);
  const [newUserGroup, setNewUserGroup] = useState(groups[0]?.id || '');

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileGroup, setFileGroup] = useState(groups[0]?.id || '');
  
  const [newGroupName, setNewGroupName] = useState('');
  
  const [passwordChangeUser, setPasswordChangeUser] = useState<User | null>(null);
  const [newPasswordModalInput, setNewPasswordModalInput] = useState('');
  
  // Profile Modal State
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileNewUsername, setProfileNewUsername] = useState('');
  const [profileNewPassword, setProfileNewPassword] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  const handleUserRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (newUsername && newPassword && newUserGroup) {
      onRegisterUser({
        username: newUsername,
        password: newPassword,
        role: newUserRole,
        groupId: newUserGroup,
      });
      setNewUsername('');
      setNewPassword('');
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

  const handleFileUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (uploadedFile && fileGroup) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        onFileUpload({
          name: uploadedFile.name,
          type: uploadedFile.type,
          content,
          groupId: fileGroup,
        });
        setUploadedFile(null);
        (document.getElementById('file-upload') as HTMLInputElement).value = '';
      };
      if (uploadedFile.type.startsWith('image/')) {
        reader.readAsDataURL(uploadedFile);
      } else {
        reader.readAsText(uploadedFile);
      }
    }
  };

  const handleGroupAdd = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGroup(newGroupName);
    setNewGroupName('');
  };

  const openProfileModal = () => {
    setProfileNewUsername(currentUser.username);
    setProfileNewPassword('');
    setUsernameMessage('');
    setPasswordMessage('');
    setIsProfileModalOpen(true);
  };

  const getGroupName = (groupId: string) => groups.find(g => g.id === groupId)?.name || 'N/A';
  
  const renderFileModal = () => {
    if (!selectedFile) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setSelectedFile(null)}>
        <div className="relative w-full max-w-3xl p-4 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
           <h3 className="text-lg font-bold">{selectedFile.name}</h3>
           <div className="py-4 mt-2 border-t border-b">
            {selectedFile.type.startsWith('image/') ? (
                <img src={selectedFile.content} alt={selectedFile.name} className="object-contain w-full h-auto max-h-[70vh] rounded-md" />
            ) : (
                <pre className="w-full p-4 text-sm bg-gray-100 rounded-md whitespace-pre-wrap max-h-[70vh] overflow-y-auto">{selectedFile.content}</pre>
            )}
           </div>
           <button onClick={() => setSelectedFile(null)} className="absolute px-2 py-1 text-xs font-bold text-white bg-gray-700 rounded-full -top-2 -right-2 hover:bg-gray-900">
             &times;
           </button>
        </div>
      </div>
    );
  };
  
  const renderPasswordChangeModal = () => {
    if (!passwordChangeUser) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPasswordModalInput) {
            onChangeUserPassword(passwordChangeUser.id, newPasswordModalInput);
            setPasswordChangeUser(null);
            setNewPasswordModalInput('');
        }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setPasswordChangeUser(null)}>
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
           <h3 className="text-lg font-bold">تغییر رمز عبور برای {passwordChangeUser.username}</h3>
           <form onSubmit={handleSubmit} className="mt-4 space-y-4">
               <input 
                   type="password" 
                   placeholder="رمز عبور جدید" 
                   value={newPasswordModalInput}
                   onChange={e => setNewPasswordModalInput(e.target.value)}
                   required
                   autoFocus
                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
               />
               <div className="flex justify-end gap-4">
                  <button type="button" onClick={() => setPasswordChangeUser(null)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300">
                    انصراف
                  </button>
                   <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                    ذخیره
                   </button>
               </div>
           </form>
        </div>
      </div>
    );
};

const renderProfileModal = () => {
    if (!isProfileModalOpen) return null;

    const handleUsernameChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = onChangeUsername(currentUser.id, profileNewUsername);
        setUsernameMessage(result.message);
    };

    const handlePasswordChangeSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (profileNewPassword) {
            onChangeUserPassword(currentUser.id, profileNewPassword);
            setPasswordMessage('رمز عبور با موفقیت تغییر کرد');
            setProfileNewPassword('');
        }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75" onClick={() => setIsProfileModalOpen(false)}>
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
           <div className="flex items-center justify-between">
             <h3 className="text-xl font-bold">تنظیمات حساب کاربری</h3>
             <button onClick={() => setIsProfileModalOpen(false)} className="px-2 py-1 text-xs font-bold text-white bg-gray-700 rounded-full hover:bg-gray-900">
                &times;
             </button>
           </div>
           
           <div className="mt-6 space-y-8">
              {/* Change Username Form */}
              <form onSubmit={handleUsernameChangeSubmit} className="space-y-4">
                  <h4 className="font-semibold">تغییر نام کاربری</h4>
                  <div>
                      <label htmlFor="profile-username" className="block text-sm font-medium text-gray-700">نام کاربری جدید</label>
                      <input 
                         id="profile-username"
                         type="text"
                         value={profileNewUsername}
                         onChange={e => {
                           setProfileNewUsername(e.target.value);
                           setUsernameMessage('');
                         }}
                         required
                         className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  {usernameMessage && <p className={`text-sm ${usernameMessage.includes('موفقیت') ? 'text-green-600' : 'text-red-600'}`}>{usernameMessage}</p>}
                  <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">ذخیره نام کاربری</button>
              </form>

              {/* Change Password Form */}
              <form onSubmit={handlePasswordChangeSubmit} className="space-y-4">
                  <h4 className="font-semibold">تغییر رمز عبور</h4>
                  <div>
                      <label htmlFor="profile-password"  className="block text-sm font-medium text-gray-700">رمز عبور جدید</label>
                      <input 
                         id="profile-password"
                         type="password"
                         placeholder="رمز عبور جدید را وارد کنید"
                         value={profileNewPassword}
                         onChange={e => {
                           setProfileNewPassword(e.target.value);
                           setPasswordMessage('');
                         }}
                         required
                         className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      />
                  </div>
                  {passwordMessage && <p className="text-sm text-green-600">{passwordMessage}</p>}
                  <button type="submit" className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">ذخیره رمز عبور</button>
              </form>
           </div>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      {renderFileModal()}
      {renderPasswordChangeModal()}
      {renderProfileModal()}
      <header className="flex items-center justify-between p-4 text-white bg-gray-800 shadow-md">
        <div className="flex items-center gap-3">
          <GroupIcon className="w-8 h-8 text-indigo-400"/>
          <h1 className="text-xl font-bold">پورتال فایل امن</h1>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm">خوش آمدید, {currentUser.username}</span>
            <button onClick={openProfileModal} title="تنظیمات حساب" className="p-2 text-white rounded-full hover:bg-gray-700">
                  <CogIcon className="w-5 h-5" />
            </button>
            <button onClick={onLogout} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                <LogoutIcon className="w-5 h-5" />
                <span>خروج</span>
            </button>
        </div>
      </header>
      <main className="p-8">
        {currentUser.role === Role.ADMIN ? (
          <AdminView
            currentUser={currentUser}
            users={users}
            files={files}
            groups={groups}
            getGroupName={getGroupName}
            onRegisterUser={handleUserRegister}
            newUsername={newUsername}
            setNewUsername={setNewUsername}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
            newUserGroup={newUserGroup}
            setNewUserGroup={setNewUserGroup}
            onAddGroup={handleGroupAdd}
            newGroupName={newGroupName}
            setNewGroupName={setNewGroupName}
            onFileUpload={handleFileUploadSubmit}
            onFileSelect={handleFileSelect}
            fileGroup={fileGroup}
            setFileGroup={setFileGroup}
            onSetUserRole={onSetUserRole}
            setPasswordChangeUser={setPasswordChangeUser}
            onToggleUserStatus={onToggleUserStatus}
          />
        ) : (
          <UserView
            currentUser={currentUser}
            files={files}
            getGroupName={getGroupName}
            onSelectFile={setSelectedFile}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;