import React, {Component} from 'react' 
import {Form} from '../form/Form'
import {Link, Redirect} from 'react-router-dom'
import '../form/form.css'

class SignIn extends Component{
        state = {
          email: '',
          password: '',
          redirect: localStorage.getItem('userTokenTime') ? true : false
        }

    onSubmitHandler = () => {
        if (!(this.state.email === '' || this.state.password === '')
        && (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email))) {
            const submitDetails = async ()=>{
                try{
                    const response = await fetch('/api/signin', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json;charset=utf-8'
                        },
                        body: JSON.stringify({email: this.state.email, password: this.state.password})
                      })
                    if (!response.ok) throw Error(response.statusText)
                    const submitedData= await response.json()
                    localStorage.setItem('userTokenTime', JSON.stringify({token: submitedData.token, time: new Date().getTime()}))
                    this.setState({redirect: true})
                }catch(error){
                    console.log('error while user signin',error)
                }
            }
            submitDetails()
        }else {
            alert('Please enter valid details');
        }
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

    render(){
        if (this.state.redirect) return <Redirect to="/" />;
        return(
            <Form onSubmit={this.onSubmitHandler}>
                <h3 className="text-center text-info">Login</h3>
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
                <button onClick={this.onSubmitHandler} className="btn btn-info btn-md" type="button">Submit</button>
                <Link to="/signUp" className="text-info">Sign Up here</Link>
                </div>
            </Form>
        )
    }
}
export default SignIn 