import { Link } from 'react-router';
import GenderCheckbox from '../components/GenderCheckbox';
import { useSignUp } from '../hooks/auth.hooks';
import Avatar from '../components/Avatar';

const SignUp = () => {
	const { signUpAction, loading, avatar, generateAvatar } = useSignUp();

	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-1">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Sign Up <span className="text-blue-500"> ChatApp</span>
				</h1>

				<form action={signUpAction} className="flex flex-col gap-3">
					<div className="flex items-center w-full gap-2 space-y-2 justify-between p-2">
						<Avatar
							src={avatar ?? 'https://avataaars.io/'}
							size={80}
						/>
						<button
							type="button"
							className="btn btn-md mt-2 border border-slate-700"
							onClick={generateAvatar}
						>
							New Avatar
						</button>
					</div>

					<div>
						<label htmlFor="fullName" className="label p-2">
							<span className="text-base label-text">
								Full Name
							</span>
						</label>
						<input
							type="text"
							placeholder="John Doe"
							className="w-full input input-bordered  h-10"
							name="fullName"
							id="fullName"
						/>
					</div>

					<div>
						<label htmlFor="username" className="label p-2 ">
							<span className="text-base label-text">
								Username
							</span>
						</label>
						<input
							type="text"
							placeholder="johndoe"
							className="w-full input input-bordered h-10"
							name="username"
							id="username"
						/>
					</div>

					<div>
						<label htmlFor="password" className="label">
							<span className="text-base label-text">
								Password
							</span>
						</label>
						<input
							type="password"
							placeholder="Enter Password"
							className="w-full input input-bordered h-10"
							name="password"
							id="password"
						/>
					</div>

					<div>
						<label htmlFor="confirmPassword" className="label">
							<span className="text-base label-text">
								Confirm Password
							</span>
						</label>
						<input
							type="password"
							placeholder="Confirm Password"
							className="w-full input input-bordered h-10"
							name="confirmPassword"
							id="confirmPassword"
						/>
					</div>

					<GenderCheckbox />

					<Link
						to={'/login'}
						className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
					>
						Already have an account?
					</Link>

					<div>
						<button
							className="btn btn-block btn-sm mt-2 border border-slate-700"
							disabled={loading}
						>
							Sign Up{' '}
							{loading && (
								<span className="loading loading-spinner loading-md"></span>
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
