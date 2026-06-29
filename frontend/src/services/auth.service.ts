import type {
  LoginSchemaType,
  RegisterSchemaType,
  User,
} from "@/schemas/auth.schema";
import { api } from "./api";

export const registerUser = async (data: RegisterSchemaType) => {
  const response = await api.post("/auth/register", {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    password: data.password,
  });
  return response.data;
};

export const loginUser = async (data: LoginSchemaType) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const loggedInUser = async () => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};
