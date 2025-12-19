const Avatar = ({ src, size = 80 }: { src: string; size?: number }) => {
	return (
		<img
			src={src}
			className="rounded-full"
			alt="User's avatar"
			width={size}
			height={size}
		/>
	);
};

export default Avatar;
