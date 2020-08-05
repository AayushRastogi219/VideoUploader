import React from 'react';
import { Link, Redirect } from 'react-router-dom'
import {Form} from '../form/Form'
import '../form/form.css'

class SignUp extends React.Component {
    state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      redirect: localStorage.getItem('userTokenTime') ? true : false
    }

  onSubmitHandler  = (e) => {
    e.preventDefault();
    if (!(this.state.firstName === '' || this.state.lastName === '' || this.state.email === '' || this.state.password === '')
      && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
        const submitDetails = async ()=>{
            try{
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({firstName: this.state.firstName, lastName: this.state.lastName, email: this.state.email, password: this.state.password})
                  })
                if (!response.ok) throw Error(response.statusText)
                this.setState({redirect: true})
            }catch(error){
                console.log('error while user signup', error)
            }
        }
        submitDetails()
    }else {
        alert('Please enter valid details');
    }
  }

  firstNameInputChangeHandler = (event) => {
    this.setState({
      firstName: event.target.value
    });
  }

  lastNameInputChangeHandler = (event) => {
    this.setState({
      lastName: event.target.value
    });
  }

  emailInputChangeHandler = (event) => {
    this.setState({
      email: event.target.value
    });
  }

  passwordInputChangeHandler = (event) => {
    this.setState({
      password: event.target.value
    });
  }

  render() {
    if (this.state.redirect) return <Redirect to='/' />
    return (
        <Form onSubmit={this.onSubmitHandler}>
        <h3 className="text-center text-info">Register</h3>
        <div className="form-group">
          <label htmlFor="first-name" className="text-info">First Name:</label><br />
          <input
            id="first-name"
            className="form-control"
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={this.firstNameInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="last-name" className="text-info">Last Name:</label><br />
          <input
            id="last-name"
            className="form-control"
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={this.lastNameInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="text-info">Email:</label><br />
          <input
            id="email"
            className="form-control"
            type="email"
            name="email"
            placeholder="example@domain.com"
            onChange={this.emailInputChangeHandler}
            required />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="text-info">Password:</label><br />
          <input
            id="password"
            className="form-control"
            type="password"
            name="password"
            placeholder="********"
            onChange={this.passwordInputChangeHandler}
            required />
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <input type="submit" name="submit" className="btn btn-info btn-md" value="Submit" />
          <Link to="/signUp" className="text-info">Login here</Link>
        </div>
      </Form>
    );
  }
}

export default SignUp;
