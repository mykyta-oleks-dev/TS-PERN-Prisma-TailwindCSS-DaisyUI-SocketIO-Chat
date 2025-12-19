import { useState } from 'react';
import { useAuthContext } from '../authContext';
import { handleError } from '../lib/utils';
import { AvatarGenerator } from 'random-avatar-generator';
import toast from 'react-hot-toast';

const generator = new AvatarGenerator();

export const useSignUp = () => {
	const [avatar, setAvatar] = useState<string | undefined>(undefined);
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const generateAvatar = () => {
		setAvatar(generator.generateRandomAvatar());
	};

	const signUpAction = async (fd: FormData) => {
		setLoading(true);

		const fullName = fd.get('fullName');
		const username = fd.get('username');
		const password = fd.get('password');
		const confirmPassword = fd.get('confirmPassword');
		const gender = fd.get('gender');

		try {
			const res = await fetch('/api/users/auth/sign-up', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					fullName,
					username,
					password,
					confirmPassword,
					gender,
					avatar,
				}),
			});
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			setAuthUser(data);
			toast.success('Sign up is successful!');
		} catch (err: unknown) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	};

	return { signUpAction, loading, avatar, generateAvatar };
};

export const useLogIn = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logInAction = async (fd: FormData) => {
		setLoading(true);

		const username = fd.get('username');
		const password = fd.get('password');

		try {
			const res = await fetch('/api/users/auth/log-in', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					username,
					password,
				}),
			});
			const data = await res.json();

			if (!res.ok) {
				throw data;
			}

			setAuthUser(data);
			toast.success('Authentication is successful!');
		} catch (err: unknown) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	};

	return { logInAction, loading };
};

export const useLogOut = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logOut = async () => {
		try {
			const res = await fetch('/api/users/auth/log-out', {
				method: 'DELETE',
			});

			if (!res.ok) {
				throw res;
			}

			setAuthUser(null);
		} catch (err: unknown) {
			handleError(err);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logOut };
};
