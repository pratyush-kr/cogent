import React from "react";

export const AddCustomer = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		props.states.setIsAdd(false);
		props.states.setIsSearch(false);
		props.states.setIsCust(true);
		const current = new Date();
		const data = {
			name: e.target[0].value,
			email: e.target[1].value,
			phoneNumber: e.target[2].value,
			problemDesc: e.target[3].value,
			serialNumber: e.target[4].value,
			dateOfService: `${current.getFullYear()}-${
				current.getMonth() + 1
			}-${current.getDate()}`,
		};
		props.states.setData(data);
	};
	return (
		<div className="box add-customer">
			<span>Add Customer</span>
			<form onSubmit={handelSubmit}>
				<div>
					<input type="text" placeholder="Name" className="txt-in" />
					<input
						type="email"
						placeholder="Email"
						className="txt-in"
					/>
					<input
						type="text"
						placeholder="Phone Number"
						className="txt-in"
					/>
					<input
						type="text"
						placeholder="Problem Description"
						className="txt-in"
					/>
					<input
						type="text"
						placeholder="Serial Number"
						className="txt-in"
					/>
				</div>
				<button className="btn">Add</button>
			</form>
		</div>
	);
};
