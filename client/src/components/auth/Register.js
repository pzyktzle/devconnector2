import React, { Component } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  constructor() {
    super();

    // component state
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

  // arrow functions fix the binding problems and automatically have "this" to refer to the context of the code being called (i.e. Register)
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

  // arrow functions fix the binding problems and automatically have "this" to refer to the context of the code being called (i.e. Register)
  onSubmit = e => {
    e.preventDefault(); // prevent the default action of the event from being triggered

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // axios
    //   .post("/api/users/register", newUser)
    //   .then(result => console.log(result.data))
    //   // .catch(err => console.log(err.response.data)); // show the JSON responses for errors sent back by the API
    //   .catch(err => this.setState({ errors: err.response.data })); // set errors object with all JSON errors sent back by API

    this.props.registerUser(newUser, this.props.history);
  };

  // lifecycle method (runs when component receives new props)
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors }); // set LOCAL component state (set errors) from redux state
    }
  }

  // lifecycle method (after rendering? correctly)
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    const { errors } = this.state; // get errors from the LOCAL component state
    // const { user } = this.props.auth; // get auth.user (set by redux state)

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Name"
                  name="name"
                  type="text"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Confirm Password"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.onChange}
                  error={errors.password2}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// prop-types.js
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// redux automatically maps the redux state to our props
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
