import React from "react";
import axios from "axios";

export const ItemAdded = (props) => {
	if (
		props.data.itemName === "" ||
		props.data.itemCode === "" ||
		props.data.specs === ""
	) {
		props.states.setIsAdd(false);
		return;
	}
	const handelCancel = (e) => {
		e.preventDefault();
		props.states.setIsAdd(false);
	};
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<div>
				<span className="h1">Add Item</span>
			</div>
			<div className="txt-body">
				<div>
					<span>ItemName: {props.data.itemName}</span>{" "}
				</div>
				<div>
					<span>ItemCode: {props.data.itemCode}</span>
				</div>
				<div>
					<span>Specifications: {props.data.specs}</span>
				</div>
				<div>
					<span>Count: {props.data.count}</span>
				</div>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<button
						className="btn"
						onClick={(e) => {
							e.preventDefault();
							axios
								.post(
									"http://localhost:8080/cogent/AddItem",
									JSON.stringify(props.data)
								)
								.then((res) => {
									console.log(res.data);
								});
						}}
					>
						add
					</button>
					<button className="btn" onClick={handelCancel}>
						cancel
					</button>
				</form>
			</div>
		</div>
	);
};
