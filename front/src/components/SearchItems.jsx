import React from "react";
import { useState } from "react";

export const SearchItems = (props) => {
	const [itemCode, setItemCode] = useState("");
	const [itemName, setItemName] = useState("");
	const [specs, setSpecs] = useState("");

	const handelSubmit = (e) => {
		e.preventDefault();
		setItemCode(e.target[0].value);
		setItemName(e.target[1].value);
		setSpecs(e.target[2].value);
		props.states.setIsAdd(false);
		props.states.setIsSearch(true);
		props.states.setIsCust(false);
		props.states.setEdit(false);
		const data = {
			itemCode: itemCode,
			itemName: itemName,
			specs: specs,
		};
		props.states.setData(data);
		console.log(data);
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
