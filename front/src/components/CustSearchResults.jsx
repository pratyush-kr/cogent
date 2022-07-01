import React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { useState } from "react";

export const CustSearchResults = (props) => {
	const [selectedRows, setSelectedRows] = useState([]);
	const [editBtnClass, setEditBtnClass] = useState("btn disabled");
	if (props.data.phoneNumber === "") return;
	const handelCancel = (e) => {
		e.preventDefault();
		props.states.setIsCustSearch(false);
	};
	const cols = [
		{ field: "name", headerName: "Name", width: 150 },
		{ field: "email", headerName: "Email", width: 200 },
		{ field: "phoneNumber", headerName: "Contact", width: 120 },
		{ field: "problemDesc", headerName: "Problems", width: 150 },
		{ field: "serialNumber", headerName: "Sl No", width: 150 },
		{ field: "dateOfService", headerName: "Date", width: 150 },
	];
	const addId = () => {
		for (var key in props.data) {
			const id = {
				id: `${props.data[key]["serialNumber"]}-${props.data[key]["dateOfService"]}`,
			};
			Object.assign(props.data[key], id);
		}
	};
	const handelEdit = (e) => {
		e.preventDefault();
		if (editBtnClass === "btn disabled") {
			return;
		} else {
			console.log(selectedRows);
			props.states.setData(selectedRows);
			props.states.setIsAddItem(false);
			props.states.setIsInventorySearch(false);
			props.states.setIsAddCust(false);
			props.states.setIsCustSearch(false);
			props.states.setIsEdit(true);
		}
	};
	return (
		<div>
			<span className="h1">Search Results</span>
			<form
				className="grid-table"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				{addId()}
				<DataGrid
					className="grid-table"
					rows={props.data}
					columns={cols}
					style={{
						height: "50vh",
						width: "48vw",
						justifyContent: "center",
						justifySelf: "center",
					}}
					checkboxSelection
					onSelectionModelChange={(ids) => {
						const selectedIds = new Set(ids);
						if (ids.length === 1) {
							setEditBtnClass("btn");
						} else {
							setEditBtnClass("btn disabled");
						}
						setSelectedRows(
							props.data.filter((row) =>
								selectedIds.has(row.id.toString())
							)
						);
					}}
				/>
				<button className={editBtnClass} onClick={handelEdit}>
					Edit
				</button>
				<button className="btn" onClick={handelCancel}>
					cancel
				</button>
			</form>
		</div>
	);
};
