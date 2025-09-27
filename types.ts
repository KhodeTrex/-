
export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface Group {
  id: string;
  name: string;
}

export interface User {
  id: string;
  username: string;
  password; 
  role: Role;
  groupId: string;
}

export interface AppFile {
  id: string;
  name: string;
  content: string; 
  type: string; 
  groupId: string;
}
