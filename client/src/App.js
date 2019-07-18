import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch , withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
const axios = require('axios');


import Home from './components/Home';
import Login from './components/Login';
import Header from './components/Header';
import SignUp from './components/SignUp';
// import Footer from './components/Footer';
import Profile from './components/Profile';
import EditProfile from './components/EditProfile';
import PrivateRoute from './components/PrivateRoute';


class App extends Component {

	componentDidMount() {
    var token = localStorage.getItem("jwt") || "";
    if(token){
      axios.get('http://localhost:3000/api/v1/users/me',
        {
          headers: {"Authorization" : token }
        })
      .then((res) => {
        console.log(res, "login data");
        if(res.data.success){
          console.log(res.data, "/me response");
          this.props.dispatch({ type: "USER_LOGIN_SUCCESS", data: res.data });
          this.props.history.push('/');
        }
      })
      .catch(function (error) {
        console.log(error, "catch error");
      });
    } else {
      this.props.history.push("/users/login")
    }
	}

  render() {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component = {Home}/>
        	<Route path="/users/login" component = {Login}/>
        	<Route path="/users/register" component = {SignUp}/>
        	<Route path="/users/profile" component = {Profile}/>
        	<Route path="/users/:id" component = {EditProfile}/>
        </Switch>
      </div>
    );
  }
}

function mapStateToProps(state){
	console.log(state, "app map state");
	return { state }
}

export default withRouter(connect(mapStateToProps)(App));