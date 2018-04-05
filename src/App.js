import React, { Component } from 'react';
import axios from "axios";
import Title from "./components/Title";
import ListItem from "./components/ListItem";

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

	componentDidMount = () => {
		this.getUsers(url.recent);
	}

	getUsers = (call) => {
		axios.get(call)
			.then(response => {
				const updatedData = response.data;

				this.setState({
					users: updatedData
				});
			})
	}

	render() {
		const underline = !this.state.underLine;
		return (
			<div className="App">
				<Title />
				<table>
					<thead>
						<tr id="header-row">
							<th>#</th>
							<th>Name</th>
							<th className={underline ? "underline" : null}>
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
							<th className={!underline ? "underline" : null}>
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

export default Leaderboard;