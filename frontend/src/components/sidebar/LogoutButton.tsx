import { LogOut } from 'lucide-react';
import { useLogOut } from '../../hooks/auth.hooks';

const LogoutButton = () => {
	const { loading, logOut } = useLogOut();

	return (
		<button className="mt-auto" onClick={logOut} disabled={loading}>
			<LogOut className="w-6 h-6 text-white cursor-pointer" />
		</button>
	);
};
export default LogoutButton;
