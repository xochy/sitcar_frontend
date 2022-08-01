export interface AuthResponse {
    status_code: number;
    plain_text_token?: string;
    message?: string;
    slug?: string;
}
