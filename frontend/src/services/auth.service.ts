import { api } from "./api";

interface RegisterDTO {
  name: string;
  email: string;
  password: string;
}

interface LoginDTO {
  email: string;
  password: string;
}

export const register = async (data: RegisterDTO) => {
  const response = await api.post("auth/register", data);
  return response.data;
};

export const login = async (data: LoginDTO) => {
  const response = await api.post("auth/login", data);
  return response.data;
};

export type { RegisterDTO, LoginDTO };
