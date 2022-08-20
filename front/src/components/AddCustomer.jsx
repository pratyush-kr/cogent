import React from "react";

export const AddCustomer = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		props.states.setIsAddItem(false);
		props.states.setIsItemSearch(false);
		props.states.setIsCustSearch(false);
		props.states.setIsAddCust(true);
		const data = {
			name: e.target[0].value,
			phoneNumber: e.target[1].value,
			serialNumber: e.target[2].value,
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
						type="text"
						placeholder="Phone Number"
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
