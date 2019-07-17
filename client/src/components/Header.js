import React, { Component } from 'react';
import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import LoggedInUser from "./LoggedInUser";

class Header extends Component {

	handleLogout = (e) => {
		window.localStorage.clear();
		this.props.history.push("/login");
	};

	render() {
		const { user } = this.props || null;
		console.log(this.props, user.user, user.isAuthInProgress, "headre props");

		return (
			<Router>
				<nav className="navbar bg-light">
				    <ul className="nav-ul about-sec">
				    	<li>
				    		<Link to="/" className="navbar-brand">
					    		<div className="logo-container">
								  	<img className="logo" src="/dka.jpeg" alt="logo" />
								  </div>
							  </Link>
				    	</li>
				      <li className="nav-item">
					      <Link to="/about" className="nav-link">About</Link>
				      </li>
				      <li className="nav-item">
					      <Link to="/students" className="nav-link">Students</Link>
					    </li>
					    <li className="nav-item">
					      <Link to="/instructors" className="nav-link">Instructors</Link>
					    </li>
					    <li className="nav-item">
					      <Link to="/contact" className="nav-link">Contact</Link>
					    </li>
					    <li className="nav-item">
					      <Link to="/learn" className="nav-link">Learn</Link>
					    </li>
				    </ul>

				    <div >
					    {
					    	// change isAuthInProgress to false after fetching api
					    	!user.user && user.isAuthInProgress ?
								    <ul className="nav-ul login-sec">
								      <li>
								      	<Link 
								      		to="/users/login"
								      		className="hdr-btn btn btn-outline-success my-2 my-sm-0"
								      		type="submit">
								      		Login
								      	</Link>
								      </li>
								      <li>
									      <Link
									      	to="/users/register"
									      	className="hdr-btn btn btn-outline-success my-2 my-sm-0"
									      	type="submit">
									      	Sign-Up
									      </Link>
									    </li>
								    </ul>
								  : 
									<div>
										<LoggedInUser/>
									  <button 
									  	className="hdr-btn btn" 
									  	onClick={ this.handleLogout }>
									  		Logout
									  </button>
								  </div>
							}
						</div>
				</nav>
			</Router>
		);
	}
}

const mapStateToProps = (state) => {
  return { user: state.currentUser };
}

export default connect(mapStateToProps)(Header);
