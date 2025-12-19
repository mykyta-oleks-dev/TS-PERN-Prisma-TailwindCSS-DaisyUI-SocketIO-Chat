import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { handleError } from '../lib/utils';
import { AuthContext, type AuthUserType } from './context';

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [authUser, setAuthUser] = useState<AuthUserType | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// logic will go here
	useEffect(() => {
		const fetchAuthUser = async () => {
			try {
				const res = await fetch('/api/users/who-am-i');
				const data = await res.json();
				if (!res.ok) {
					throw data;
				}
				setAuthUser(data);
			} catch (error: unknown) {
				handleError(error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchAuthUser();
	}, []);

	const value = useMemo(
		() => ({
			authUser,
			isLoading,
			setAuthUser,
		}),
		[authUser, isLoading, setAuthUser]
	);

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
};
