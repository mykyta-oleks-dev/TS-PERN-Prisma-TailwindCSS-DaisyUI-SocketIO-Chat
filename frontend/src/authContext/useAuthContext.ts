import { use } from 'react';
import { AuthContext } from './context';

export const useAuthContext = () => {
	return use(AuthContext);
};
