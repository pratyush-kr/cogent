import React, { useState } from "react";
import { AddItem } from "./AddItem";
import { SearchItems } from "./SearchItems";
import { AddCustomer } from "./AddCustomer";
import { ItemAdded } from "./ItemAdded";
import { SetComplete } from "./SetComplete";
import { Edit } from "./Edit";
import { SearchResults } from "./SearchResults";
import { CustAddConf } from "./CustAddConf";

export const Body = () => {
	const [isAdd, setIsAdd] = useState(false);
	const [isItSearch, setIsSearch] = useState(false);
	const [data, setData] = useState({});
	const [isCust, setIsCust] = useState(false);
	const [isEdit, setEdit] = useState(false);
	const states = {
		setIsAdd,
		setIsSearch,
		setData,
		setIsCust,
		setEdit,
	};
	const dynamicPart = () => {
		if (isItSearch === true) {
			return <SearchResults />;
		} else if (isAdd === true) {
			return <ItemAdded data={data} states={states} />;
		} else if (isCust === true) {
			return <CustAddConf data={data} states={states} />;
		} else if (isEdit === true) {
			console.log(data);
			return <Edit data={data} states={states} />;
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
					<SetComplete states={states} />
				</div>
			</div>
			<div className="part">{dynamicPart()}</div>
		</div>
	);
};
