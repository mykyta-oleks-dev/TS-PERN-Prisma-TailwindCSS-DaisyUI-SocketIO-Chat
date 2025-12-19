import { Link } from 'react-router';
import GenderCheckbox from '../components/GenderCheckbox';

const SignUp = () => {
	return (
		<div className="flex flex-col items-center justify-center min-w-96 mx-auto">
			<div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-1">
				<h1 className="text-3xl font-semibold text-center text-gray-300">
					Sign Up <span className="text-blue-500"> ChatApp</span>
				</h1>

				<form className="flex flex-col gap-3">
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
						<button className="btn btn-block btn-sm mt-2 border border-slate-700">
							Sign Up
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
export default SignUp;
