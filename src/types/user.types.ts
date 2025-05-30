import { ResponseType } from "./response.types";

export interface UserType {
	email: string;
	firstName: string;
	lastName: string;
	varified?: boolean;
	role: UserRole;
	id: string;
	image?: string | null;
	emailVerified: Date | null;
}

export interface UserAuthType {
	user: UserType;
}

export interface RefreshTokenType {
	refreshToken: string;
	expiresIn: number;
	token: string;
}

export type LoginResponseType = ResponseType<UserAuthType & RefreshTokenType>;

export type RegisterResponseType = ResponseType<UserAuthType>;
export type LogoutResponseType = ResponseType<UserAuthType>;

export type GetUsersResponseType = ResponseType<UserType[]>;
export type GetUserResponseType = ResponseType<UserType>;

export type UserRole = "ADMIN" | "USER";
