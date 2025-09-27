
import { Group, User, AppFile, Role } from './types';

export const GROUPS: Group[] = [
  { id: 'group-1', name: 'گروه ۱ (مهندسی)' },
  { id: 'group-2', name: 'گروه ۲ (فروش)' },
];

export const USERS: User[] = [
  { id: 'user-admin', username: 'admin', password: 'adminpassword', role: Role.ADMIN, groupId: 'group-1' },
  { id: 'user-1', username: 'ali', password: 'password1', role: Role.USER, groupId: 'group-1' },
  { id: 'user-2', username: 'reza', password: 'password1', role: Role.USER, groupId: 'group-1' },
  { id: 'user-3', username: 'sara', password: 'password2', role: Role.USER, groupId: 'group-2' },
  { id: 'user-4', username: 'maryam', password: 'password2', role: Role.USER, groupId: 'group-2' },
];

export const FILES: AppFile[] = [
  { id: 'file-1', name: 'document_engineering.txt', content: 'This is a top secret engineering document.', type: 'text/plain', groupId: 'group-1' },
  { id: 'file-2', name: 'project_schema.png', content: 'https://picsum.photos/seed/projects/800/600', type: 'image/png', groupId: 'group-1' },
  { id: 'file-3', name: 'sales_report_q3.txt', content: 'Sales were up by 20% in the third quarter.', type: 'text/plain', groupId: 'group-2' },
  { id: 'file-4', name: 'client_presentation.png', content: 'https://picsum.photos/seed/clients/800/600', type: 'image/png', groupId: 'group-2' },
  { id: 'file-5', name: 'shared_manual.txt', content: 'This is a shared manual for all engineering staff.', type: 'text/plain', groupId: 'group-1' },
];
