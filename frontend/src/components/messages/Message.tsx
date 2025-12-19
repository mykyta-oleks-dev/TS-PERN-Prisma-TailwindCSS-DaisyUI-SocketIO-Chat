const Message = ({
	message,
}: {
	message: { fromMe?: boolean; body: string };
}) => {
	const fromMe = message.fromMe;
	const chatClass = fromMe ? 'chat-end' : 'chat-start';
	const img = fromMe
		? 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription01&hairColor=Red&facialHairType=BeardLight&facialHairColor=Black&clotheType=CollarSweater&clotheColor=Blue03&eyeType=Cry&eyebrowType=Default&mouthType=Serious&skinColor=Black'
		: 'https://avataaars.io/?avatarStyle=Circle&topType=Hijab&accessoriesType=Wayfarers&hatColor=Heather&clotheType=Hoodie&clotheColor=Pink&eyeType=Close&eyebrowType=Default&mouthType=Sad&skinColor=Yellow';

	const bubbleBg = fromMe ? 'bg-blue-500' : '';
	return (
		<div className={`chat ${chatClass}`}>
			<div className="hidden md:block chat-image avatar">
				<div className="w-6 md:w-10 rounded-full">
					<img alt="Tailwind CSS chat bubble component" src={img} />
				</div>
			</div>
			<p
				className={`chat-bubble text-white ${bubbleBg} text-sm md:text-md`}
			>
				{message.body}
			</p>
			<span className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">
				22:59
			</span>
		</div>
	);
};
export default Message;
