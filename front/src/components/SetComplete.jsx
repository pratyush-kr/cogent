import React from "react";
import axios from "axios";

export const SetComplete = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		const data = {
			serialNumber: e.target[0].value,
			dateOfService: e.target[1].value,
		};
		axios
			.post(
				"http://localhost:8080/cogent/SetComplete",
				JSON.stringify(data)
			)
			.then((res) => {
				props.states.setData(res.data);
			})
			.then(() => {
				props.states.setIsAdd(false);
				props.states.setIsSearch(false);
				props.states.setIsCust(false);
				props.states.setEdit(true);
			});
	};
	return (
		<div className="box">
			<span>Set Complete</span>
			<form onSubmit={handelSubmit}>
				<div>
					<input
						type="tel"
						placeholder="Serial Number"
						className="txt-in"
					/>
					<input type="date" placeholder="Date" className="txt-in" />
				</div>
				<button className="btn">Edit</button>
			</form>
		</div>
	);
};
