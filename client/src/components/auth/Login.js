import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    // bind onChange to the Login Component (so that it can call setState() of this Component)
    // in other words, when each DOM element fires onChange={this.onChange}, "this" will be defined as the Login Component
    // this.onChange = this.onChange.bind(this);

    // again, ensure onSubmit binds to this Login component whenever it fires
    // this.onSubmit = this.onSubmit.bind(this);
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  // arrow functions fix the binding problems and automatically have "this" to refer to the context of the code being called (i.e. Login)
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // onSubmit(e) {
  //   e.preventDefault(); // prevent the default action of the event from being triggered

  //   const user = {
  //     email: this.state.email,
  //     password: this.state.password
  //   };

  //   console.log(user);
  // }

  // arrow functions fix the binding problems and automatically have "this" to refer to the context of the code being called (i.e. Login)
  onSubmit = e => {
    e.preventDefault(); // prevent the default action of the event from being triggered

    const user = {
      email: this.state.email,
      password: this.state.password
    };

    console.log(user);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
