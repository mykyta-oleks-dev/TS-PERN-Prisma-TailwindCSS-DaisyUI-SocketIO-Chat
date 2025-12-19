export const hasMessage = (
	obj: unknown,
	field: string | number
): obj is { [field]: string } => {
	return !!obj && typeof obj === 'object' && Object.hasOwn(obj, field);
};
