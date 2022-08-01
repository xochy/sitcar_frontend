export interface CarBlank {
    data: CarData;
}

export interface CarData {
    id?: string;
    type: string;
    attributes: CarAttributes;
}

export interface CarAttributes {
    name?: string;
    price?: number;
    trademark?: string;
    year?: number;
    sold?: boolean;
}
