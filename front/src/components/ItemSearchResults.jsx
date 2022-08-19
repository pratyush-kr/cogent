import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
	{ headerName: "id", field: "inventoryId" },
	{ headerName: "name", field: "itemName" },
	{ headerName: "code", field: "itemCode" },
	{ headerName: "specs", field: "specs" },
	{ headerName: "count", field: "count" },
];

export const ItemSearchResults = (props) => {
	return (
		<div>
			<div>
				<span className="h1">Search Item</span>
			</div>
			<DataGrid
				rows={props.data}
				columns={columns}
				getRowId={(row) => row.inventoryId}
				style={{ height: "60vh", width: "40vw" }}
				checkboxSelection={true}
			/>
		</div>
	);
};
