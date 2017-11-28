import React, {Component} from 'react';
import axios from "axios";

const allTime = "https://fcctop100.herokuapp.com/api/fccusers/top/alltime";
const lastThirty = "https://fcctop100.herokuapp.com/api/fccusers/top/recent";

class Leaderboard extends Component {
   constructor(props) {
      super(props);

   }

   render() {
      return (
			<div className="App">
				<Title />
				<table>
					<TableHeading />
					<tbody>

					</tbody>
				</table>
			</div>
      );
   }
}


const Title = (props) => {
   return (
      <div className="header-div">
         <span className="title">Free Code Camp Leaderboard</span>
      </div>
   );
}

const TableHeading = (props) => {
	return (
		<thead>
			<tr>
				<th>#</th>
				<th>Name</th>
				<th><a href="">Last 30 days pts</a></th>
				<th><a href="">All time pts</a></th>
			</tr>
		</thead>
	);
}

const ListItem = (props) => {
	return (
		<tr>
			<td>{props.index}</td>
			<td>{props.name}</td>
			<td>{props.thirty}</td>
			<td>${props.alltime}</td>
		</tr>
	);
}


export default Leaderboard;
