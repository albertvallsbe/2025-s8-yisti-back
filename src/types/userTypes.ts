export type UserRole = "admin" | "customer" | "seller";
export interface User {
	id: number;
	email: string;
	password: string;
	recoveryToken?: string | null;
	role: UserRole;
	createdAt: Date;
	updatedAt: Date;
}

export type SafeUser = Omit<
	User,
	"password" | "recoveryToken" | "createdAt" | "updatedAt"
>;
export type AuthUser = Pick<User, "id" | "email" | "role">;

export type userJwtPayload = {
	sub: string;
	role?: UserRole;
};
