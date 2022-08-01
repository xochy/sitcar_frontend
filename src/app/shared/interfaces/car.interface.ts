import { CommonResponse } from "./data-interface";

export interface CarsResponse {
    data: Car[];
}

export interface CarResponse {
    data: Car;
}

export interface Car {
    type: string;
    id: string;
    attributes: Attributes;
    relationships: Relationships;
    links: CarLinks;
}

export interface Attributes {
    name: string;
    price: number;
    trademark: string;
    year: number;
    sold: boolean;
    slug: string;
    created_at: Date;
    updated_at: Date;
}

export interface CarLinks {
    self: string;
}

export interface Relationships {
    images: CommonResponse;
}
