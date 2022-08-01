import { CommonResponse } from "./data-interface";

export interface UsersResponse {
    data: User[];
}

export interface UserResponse {
    data: User;
}

export interface User {
    type: string;
    id: string;
    attributes: Attributes;
    relationships: Relationships;
    links: UserLinks;
}

export interface Attributes {
    name: string;
    email: string;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

export interface UserLinks {
    self: string;
}

export interface Relationships {
    roles: CommonResponse;
}
