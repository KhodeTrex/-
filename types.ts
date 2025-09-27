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
  password: string;
  role: Role;
  groupId: string;
  isActive: boolean;
}

export interface Category {
  id: string;
  name: string;
  groupId: string;
}

export interface AppFile {
  id: string;
  name: string;
  content: string; 
  type: string; 
  groupId: string;
  categoryId?: string;
}