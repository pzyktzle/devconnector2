import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    // bind onChange to the Register Component so that it can refer to it as "this" when it wants to call this.setState()
    // in other words, when each DOM element fires onChange={this.onChange}, "this" will be defined as the Register Component
    // this.onChange = this.onChange.bind(this);

    // again, ensure onSubmit binds to this Register component no matter where it fires
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

  //   const newUser = {
  //     name: this.state.name,
  //     email: this.state.email,
  //     password: this.state.password,
  //     password2: this.state.password2
  //   };

  //   console.log(newUser);
  // }

  // arrow functions fix the binding problems and automatically have "this" to refer to the context of the code being called (i.e. Login)
  onSubmit = e => {
    e.preventDefault(); // prevent the default action of the event from being triggered

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    console.log(newUser);
  };

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
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
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
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

export default Register;
