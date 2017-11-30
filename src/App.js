import React, {Component} from 'react';
import axios from "axios";

const dataCall = {
	allTime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime",
	recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent"
}

class Leaderboard extends Component {
   constructor(props) {
      super(props);
		this.recentHandler = this.recentHandler.bind(this);
		this.allTimeHandler = this.allTimeHandler.bind(this);
		this.state = {
			listItems: [],
			underLine: false
		}
   }

	componentDidMount(){
		axios.get(dataCall.recent)
		.then(response => {
			const updatedData = response.data.map(items => items);

			this.setState({
				listItems: updatedData
			});
		})
	}

	recentHandler(e){
		e.preventDefault();
		axios.get(dataCall.recent)
		.then(response => {
			const updatedData = response.data.map(items => items);

			this.setState({
				listItems: updatedData,
				underLine: false
			});
		})
	}

	allTimeHandler(e){
		e.preventDefault();
		axios.get(dataCall.allTime)
		.then(response => {
			const updatedData = response.data.map(items => items);

			this.setState({
				listItems: updatedData,
				underLine: true
			});
		})
	}

   render() {

      return (
			<div className="App">
				<Title />
				<table>
					<thead>
						<tr id="header-row">
							<th>#</th>
							<th>Name</th>
							<th className={!this.state.underLine ? "underline" : null}>
							 	<span
							 		onClick={this.recentHandler}
							 		className="points-link">Last 30 days pts
								</span>
							</th>
							<th className={this.state.underLine ? "underline" : null}>
							 	<span
							 		onClick={this.allTimeHandler}
							 		className="points-link">All time pts
								</span>
							</th>
						</tr>
					</thead>
					<tbody>
					{this.state.listItems.map((item, index) => {
						return <ListItem
						key={index}
						index={index + 1}
						image={item.img}
						profile={"https://www.freecodecamp.org/" + item.username}
						name={item.username}
						thirty={item.recent}
						allTime={item.alltime}
						 />;
					})
					}
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

const ListItem = (props) => {
	return (
		<tr>
			<td className="number">{props.index}</td>
			<td>
				<a href={props.profile}>
					<img src={props.image}  alt={props.alt} />
					<br/>
					{props.name}
				</a></td>
			<td>{props.thirty}</td>
			<td>{props.allTime}</td>
		</tr>
	);
}

export default Leaderboard;
