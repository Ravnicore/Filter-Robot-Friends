import React, { Component } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchField, requestRobots } from '../components/actions';

const mapStateToProps = (state) => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}
//Learning with redux
const mapDispatchToProps = (dispatch) => {
	return {
		onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}


class App extends Component {
	//$$removed since redux uses this now$$
	// constructor() {
	// 	super()
	// 	this.state = {
	// 		robots: [],
	// 		// searchField: '' 
	// 	}
	// }

	componentDidMount() {
		this.props.onRequestRobots();
		// fetch('https://jsonplaceholder.typicode.com/users')
		// 	.then(response=>  response.json())
		// 	.then(users => this.setState({ robots: users}))
	}

	// $$removed since redux uses this now$$
	// onSearchChange = (event) =>{
	// 	this.setState({ searchField: event.target.value })
	// }

	render(){
		const { searchField, onSearchChange, robots, isPending } = this.props;
		const filteredRobots = robots.filter(robot=>{
			return robot.name.toLowerCase().includes(searchField.toLowerCase());
		})
		return isPending ?
			<h1>Loading</h1> : //if there are no robots
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={onSearchChange}/>
				<Scroll>
					<CardList robots={filteredRobots}/>
				</Scroll>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);