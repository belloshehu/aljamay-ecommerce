import { NextRequest } from "next/server";
import { ResponseType } from "./response.types";
import { User } from "@prisma/client";

export interface UserType extends User {}

export interface UserAuthType {
	user: UserType;
}

export interface RefreshTokenType {
	refreshToken: string;
	expiresIn: number;
	token: string;
}

export interface NextRequestWithUser extends NextRequest {
	user: UserType;
}

export type LoginResponseType = ResponseType<UserAuthType & RefreshTokenType>;

export type RegisterResponseType = ResponseType<UserAuthType>;
export type LogoutResponseType = ResponseType<UserAuthType>;

export type GetUsersResponseType = ResponseType<UserType[]>;
export type GetUserResponseType = ResponseType<UserType>;

export type UserRole = "ADMIN" | "USER";
