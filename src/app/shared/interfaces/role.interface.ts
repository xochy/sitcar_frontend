export interface RolesResponse {
    data: Role[];
}

export interface RoleResponse {
    data: Role;
}

export interface Role {
    type: string;
    id: string;
    attributes: Attributes;
    relationships: Relationships;
    links: RoleLinks;
}

export interface Attributes {
    name: string;
    display_name: string;
    created_at: Date;
    updated_at: Date;
}

export interface RoleLinks {
    self: string;
}

export interface Relationships {
    users: Users;
}

export interface Users {
    links: UsersLinks;
}

export interface UsersLinks {
    self: string;
    related: string;
}
