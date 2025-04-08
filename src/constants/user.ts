export enum UserType {
  OWNER = 'owner',
  USER = 'user',
}

export enum UserPermission {
  OWNER = 'owner',
  ADMIN = 'admin',
  USER = 'user',
}

export enum UserStatus {
  ALL = 'all',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  INVITED = 'invited',
}

export enum UserDropdown {
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete',
  RESEND_INVITE = 'resend_invite',
  STATUS = 'status',
}

export enum ChannelUserDropdownEventName {
  VIEW = 'view',
  EDIT = 'edit',
  DELETE = 'delete',
  RESEND_INVITE = 'resend_invite',
}

export enum UserOrganizationStatus {
  ALL = 'all',
  INVITED = 'invited',
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export enum FormType {
  CREATE = 'create',
  EDIT = 'edit',
  VIEW = 'view',
}
