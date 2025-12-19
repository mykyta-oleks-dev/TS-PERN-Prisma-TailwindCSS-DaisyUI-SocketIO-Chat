import { type Dispatch, type SetStateAction, createContext } from 'react';

export type AuthUserType = {
	id: string;
	fullName: string;
	email: string;
	avatar: string;
	gender: string;
};

export const AuthContext = createContext<{
	authUser: AuthUserType | null;
	setAuthUser: Dispatch<SetStateAction<AuthUserType | null>>;
	isLoading: boolean;
}>({
	authUser: null,
	setAuthUser: () => {},
	isLoading: true,
});
