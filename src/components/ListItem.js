import React from "react";

const ListItem = (props) => {
	return (
		<tr>
			<td className="number">{props.index}</td>
			<td>
				<a href={props.profile}>
					<img src={props.image} alt={props.alt} />
					<br />
					{props.name}
				</a></td>
			<td>{props.thirty}</td>
			<td>{props.allTime}</td>
		</tr>
	);
}

export default ListItem;