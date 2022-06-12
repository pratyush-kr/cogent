import React from "react";
import { DataGrid } from "@material-ui/data-grid";

export const CustSearchResults = (props) => {
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
		console.log(props.data);
	};
	return (
		<div>
			<span className="h1">Edit</span>
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
				/>
				<button className="btn">Edit</button>
				<button className="btn" onClick={handelCancel}>
					cancel
				</button>
			</form>
		</div>
	);
};
