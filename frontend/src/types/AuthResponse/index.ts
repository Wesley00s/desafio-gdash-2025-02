export interface AuthResponse {
   access_token: string;
   user: {
      name: string;
      email: string;
   };
}
