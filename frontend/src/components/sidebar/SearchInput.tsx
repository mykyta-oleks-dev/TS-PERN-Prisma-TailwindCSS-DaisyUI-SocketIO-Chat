import { Search } from 'lucide-react';
import useConversation from '../../store/conversation.store';
import { useGetConversations } from '../../hooks/conversations.hooks';
import toast from 'react-hot-toast';

const SearchInput = () => {
	const { setSelectedConversation } = useConversation();
	const { conversations } = useGetConversations();

	const submitAction = (fd: FormData) => {
		const search = fd.get('search');

		if (typeof search !== 'string' || !search.trim()) {
			return;
		}

		if (search.length < 3) {
			toast.error('Search term has to be at least 3 characters long.');
			return;
		}

		const conversation = conversations.find((c) =>
			c.fullName.toLowerCase().includes(search.toLowerCase())
		);

		if (conversation) {
			setSelectedConversation(conversation);
		} else {
			toast.error('No user is found.');
		}
	};

	return (
		<form action={submitAction} className="flex items-center gap-2">
			<input
				type="text"
				placeholder="Search…"
				className="input-sm md:input input-bordered rounded-full sm:rounded-full w-full"
				id="search"
				name="search"
			/>
			<button
				type="submit"
				className="btn md:btn-md btn-sm btn-circle bg-sky-500 text-white  "
			>
				<Search className="w-4 h-4 md:w-6 md:h-6 outline-none" />
			</button>
		</form>
	);
};
export default SearchInput;
