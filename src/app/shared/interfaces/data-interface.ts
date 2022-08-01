export interface HasManyData {
    data: Data[];
}

export interface HasOneData {
    data: Data;
}

export interface Data {
    type: string;
    id: string;
}

//*Common responses
export interface CommonResponse {
    links: CommonLinks;
}

export interface CommonLinks {
    self: string;
    related: string;
}

//*Interface for modals
export interface ModalData {
    title: string;
    name: string;
    confirmMessageButton: string;
    cancelMessageButton: string;
}

//* Pagination data

export interface Meta {
    page: Page;
}

export interface Page {
    'current-page': number;
    'per-page': number;
    from: number;
    to: number;
    total: number;
    'last-page': number;
}

export interface ResponseLinks {
    first: string;
    prev: string;
    next: string;
    last: string;
}
