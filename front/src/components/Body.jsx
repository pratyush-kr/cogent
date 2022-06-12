import React, { useState } from "react";
import { AddItem } from "./AddItem";
import { SearchItems } from "./SearchItems";
import { AddCustomer } from "./AddCustomer";
import { ItemAddConf } from "./ItemAddConf";
import { SearchCustomer } from "./SearchCustomer";
import { CustSearchResults } from "./CustSearchResults";
import { InventorySearchResults } from "./InventorySearchResults";
import { CustAddConf } from "./CustAddConf";

export const Body = () => {
	const [isAddItem, setIsAddItem] = useState(false);
	const [isInventorySearch, setIsInventorySearch] = useState(false);
	const [data, setData] = useState({});
	const [isAddCust, setIsAddCust] = useState(false);
	const [isCustSearch, setIsCustSearch] = useState(false);
	const states = {
		setIsAddItem,
		setIsInventorySearch,
		setData,
		setIsAddCust,
		setIsCustSearch,
	};
	const dynamicPart = () => {
		if (isInventorySearch === true) {
			return <InventorySearchResults />;
		} else if (isAddItem === true) {
			return <ItemAddConf data={data} states={states} />;
		} else if (isAddCust === true) {
			return <CustAddConf data={data} states={states} />;
		} else if (isCustSearch === true) {
			return <CustSearchResults data={data} states={states} />;
		}
	};
	return (
		<div className="app-body">
			<div className="part">
				<div>
					<AddItem states={states} />
					<SearchItems states={states} />
				</div>
				<div>
					<AddCustomer states={states} />
					<SearchCustomer states={states} />
				</div>
			</div>
			<div className="part">{dynamicPart()}</div>
		</div>
	);
};
