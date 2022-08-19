import React, { useState } from "react";

export const AddItem = (props) => {
	const [count, setCount] = useState(0);
	const [itemName, setItemName] = useState("");
	const [itemCode, setItemCode] = useState("");
	const [specs, setSpecs] = useState("");
	const addItems = () => {
		const data = {
			count: count,
			itemName: itemName,
			itemCode: itemCode,
			specs: specs,
		};
		props.states.setIsAddItem(true);
		props.states.setIsItemSearch(false);
		props.states.setIsAddCust(false);
		props.states.setIsCustSearch(false);
		props.states.setData(data);
	};
	return (
		<div className="box add-item">
			<span>Add Item</span>
			<form>
				<div>
					<input
						type="text"
						value={itemName}
						placeholder="Item name"
						className="txt-in item-name"
						onChange={(e) => {
							e.preventDefault();
							setItemName(e.target.value);
						}}
					/>
					<input
						type="number"
						min="0"
						value={count}
						onChange={(e) => {
							e.preventDefault();
							setCount(e.target.value);
						}}
						className="txt-in quantity"
					/>
					<input
						type="text"
						placeholder="item code"
						className="txt-in"
						value={itemCode}
						onChange={(e) => {
							e.preventDefault();
							setItemCode(e.target.value);
						}}
					/>
					<input
						type="text"
						value={specs}
						placeholder="Specification"
						className="txt-in"
						onChange={(e) => {
							e.preventDefault();
							setSpecs(e.target.value);
						}}
					/>
				</div>
				<div>
					<input
						type="button"
						value="add items"
						className="btn"
						onClick={addItems}
					/>
					<input
						type="button"
						value="clear"
						className="btn"
						onClick={(e) => {
							e.preventDefault();
							setCount(0);
							setItemCode("");
							setItemName("");
							setSpecs("");
						}}
					/>
				</div>
			</form>
		</div>
	);
};
