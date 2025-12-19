const GenderCheckbox = () => {
	return (
		<div>
			<span className="label text-base label-text mb-1">Gender</span>
			<div className="flex gap-3 items-center justify-around w-full input input-bordered cursor-default h-10">
				<div className="form-control">
					<label className={`label gap-2 cursor-pointer`}>
						<span className="label-text">Male</span>
						<input
							type="radio"
							className="radio border-slate-500"
							name="gender"
						/>
					</label>
				</div>
				<div className="form-control">
					<label className={`label gap-2 cursor-pointer`}>
						<span className="label-text">Female</span>
						<input
							type="radio"
							className="radio border-slate-500"
							name="gender"
						/>
					</label>
				</div>
			</div>
		</div>
	);
};
export default GenderCheckbox;
