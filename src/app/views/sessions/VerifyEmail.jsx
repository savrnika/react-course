import { postClient } from "app/apis/apiMethods";
import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import { Redirect } from "react-router-dom";

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: ""
    };
    this.onchange = this.onchange.bind(this);
  }
  onchange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  performVerify = async event => {
    event.preventDefault();

    var data = {
      _id: this.props.userId,
      otp: this.state.otp

    };

    // console.log("data",data)
    // const options = {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json"
    //   },
    //   body: JSON.stringify(data)
    // };
    // const url = "/user/verifyEmail";
    try {
      const response = await postClient(data);
      const result = await response.json();
      console.log(result);
      if (result.data === "verified") {
        return <Navigate to="/session/reset-password" />;
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  render() {
    console.log("data===",this.props.userId)
    return (
      <div>
        <input
          type="text"
          name="otp"
          placeholder="emnter otp"
          onChange={this.onchange}
        />
        <br />
        <button type="submit" onClick={event => this.performVerify(event)}>
          Submit
        </button>
        <hr />
      </div>
    );
  }
}
export default VerifyEmail;
 
