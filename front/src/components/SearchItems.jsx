import axios from "axios";
import React from "react";

export const SearchItems = (props) => {
	const handelSubmit = (e) => {
		e.preventDefault();
		const data = {
			itemCode: e.target[1].value,
			itemName: e.target[0].value,
			specs: e.target[2].value,
		};
		axios
			.post("http://localhost:8080/searchItems", data)
			.then((res) => {
				props.states.setData(res.data);
			})
			.then(() => {
				props.states.setIsAddItem(false);
				props.states.setIsItemSearch(true);
				props.states.setIsAddCust(false);
				props.states.setIsCustSearch(false);
				props.states.setIsEdit(false);
			});
	};
	return (
		<div className="box search-item">
			<span>Search Item</span>
			<form onSubmit={handelSubmit}>
				<div>
					<input
						type="text"
						placeholder="Item Name"
						id="item-name"
						className="txt-in"
					/>
					<input
						type="text"
						placeholder="Item Code"
						id="item-code"
						className="txt-in"
					/>
					<input
						type="text"
						placeholder="Specification"
						id="item-specs"
						className="txt-in"
					/>
				</div>
				<div>
					<button className="btn">Search</button>
				</div>
			</form>
		</div>
	);
};
