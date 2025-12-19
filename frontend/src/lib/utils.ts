import toast from 'react-hot-toast';

export const hasProperty = (
	obj: unknown,
	field: string | number
): obj is { [field]: string } => {
	return !!obj && typeof obj === 'object' && Object.hasOwn(obj, field);
};

export const handleError = (err: unknown) => {
	console.error(err);

	if (hasProperty(err, 'message')) {
		toast.error(err.message);
	} else {
		toast.error('Unexpected error');
	}
};
