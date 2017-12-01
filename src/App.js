import React, {Component} from 'react';
import axios from "axios";

const url = {
	recent: "https://fcctop100.herokuapp.com/api/fccusers/top/recent",
	allTime: "https://fcctop100.herokuapp.com/api/fccusers/top/alltime"
}

class Leaderboard extends Component {
   constructor(props) {
      super(props);
		this.getUsers = this.getUsers.bind(this);
		this.state = {
			users: [],
			underLine: false
		}
   }

	componentDidMount(){
		this.getUsers(url.recent);
	}

	getUsers(call){
		axios.get(call)
		.then(response => {
			const updatedData = response.data.map(items => items);

			this.setState({
				users: updatedData
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
							 		onClick={() => {
										this.getUsers(url.recent);
										this.setState({
											underLine: false
										})
									}}
							 		className="points-link">Last 30 days pts
								</span>
							</th>
							<th className={this.state.underLine ? "underline" : null}>
							 	<span
							 		onClick={() => {
										this.getUsers(url.allTime);
										this.setState({
											underLine: true
										})
									}}
							 		className="points-link">All time pts
								</span>
							</th>
						</tr>
					</thead>
					<tbody>

					{
						this.state.users.map((item, index) => {
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
