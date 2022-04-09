import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default class SignIn extends React.Component {
  constructor() {
    super()
    this.state = {
      email: "",
      password: "",
      isModalOpen: false,

    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = (e) => {
    e.preventDefault()
    let data = {
      email: this.state.email,
      password: this.state.password
    }
    let url = "http://localhost:8000/user/login"
    axios.post(url, data)
      .then(res => {
        if (res.data.logged === true) {
          let name = res.data.data.name
          let user = res.data.data
          let token = res.data.token
          let id = res.data.data.id_user
          localStorage.setItem("name", name)
          localStorage.setItem("id", id)
          localStorage.setItem("user", JSON.stringify(user))
          localStorage.setItem("token", token)
          window.location = '/'
        }
        else {
          window.alert(res.data.message)
        }
      })
  }

  

  
  render() {
    return (
      <div className="dashboard1">
        <div className='ms-5'>
          <br></br><br></br><br></br><br></br>
          <div className='card mb-5 mt-1' id="sign-card">
            <div className="card-body">
              <img src="/assets/techlog.png" className="mx-auto d-block mt-4 mb-5" alt="" id="logo" />
              <form onSubmit={(e) => this.handleLogin(e)}>
                <div className="input-group">
                  <h5 className='form-text' id="sign-text">Email</h5>
                  <input type="email" name="email" id="typeEmailX" className='form' value={this.state.email} onChange={this.handleChange} placeholder='Your email here' required />
                </div>
                <div className="input-group">
                  <h5 className='form-text' id="sign-text">Password</h5>
                  <input type="password" name="password" id="typePasswordX" value={this.state.password} onChange={this.handleChange} className='form' placeholder='Your password here' required />
                </div>
                <div className='input-group text-center mb-4' id="sign-text">
                  <button type="submit" className='button-sign btn btn-dark' id="blue">Login</button>
                </div>
              </form>
              <h6 id="confirm" className='text-center'><NavLink to="/forgotPassword" id="cr-account">Forgot Password</NavLink></h6>
              <h6 className='text-center' id="confirm">Don't have an account? <NavLink to='/signup' id="cr-account">Create account here!</NavLink></h6>
            </div>
          </div>




          <br /><br /><br />

        </div>
        
      </div>
    )
  }
}
