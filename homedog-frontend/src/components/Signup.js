import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../actions';

class Signup extends Component{
  constructor() {
    super()

    this.state = {
      error: false,
      fields: {
        img_file_name: "",
        username: "",
        full_name: "",
        password: "",
        is_host: true,
        description: ""
      },
      imagePreviewUrl: ""
    }
  }

  handleFileChange = (e) => {
    console.log(e.target.files[0]);
    let reader = new FileReader();
    let file = e.target.files[0];
    const newFields = { ...this.state.fields, img_file_name: file };
    reader.onloadend = () => {
      this.setState({
        fields: newFields,
        imagePreviewUrl: reader.result
      });
    }
    reader.readAsDataURL(file)
  };

  handleChange = (e) => {
    console.log(`${e.target.name}` ,e.target.value);
    const newFields = { ...this.state.fields, [e.target.name]: e.target.value };
    this.setState({ fields: newFields })
  };

  handleCheckbox = (e) => {
    const newFields = { ...this.state.fields, [e.target.name]: !e.target.checked };
    this.setState({ fields: newFields })
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const data = this.state.fields
    this.props.loginNewUser(data, this.props.history);
  };

  render() {
    let me;
    this.state.imagePreviewUrl ? me = <img src={this.state.imagePreviewUrl}/> : "NO IMAGE"
    let yesHost;
    this.state.fields.is_host ? yesHost = <div className="ui field">
      <label>Description</label>
      <textarea
        name="description"
        placeholder="host description"
        // value={fields.username}
        onChange={this.handleChange}
      />
    </div> : ""

    return(
      <div className="ui form">
        <form onSubmit={this.handleSubmit}>
          <h2><center>Sign Up</center></h2>
          <input onChange={this.handleCheckbox} type="checkbox" id="notHost" name="is_host" value="notHost"/>
          <label htmlFor="notHost">Not a Host</label>
          {/* IMAGE UPLOAD*/}
          <div className="ui field">
            <label>Upload Profile Pic</label>
            <input type="file" name="img" id="img" accept="image/*" onChange={this.handleFileChange}/>
          </div>
          <div className="ui field">
            <label>Username</label>
            <input
              name="username"
              placeholder="username"
              // value={fields.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Full Name</label>
            <input
              name="full_name"
              placeholder="full name"
              // value={fields.full_name}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="password"
              // value={fields.username}
              onChange={this.handleChange}
            />
          </div>
          {yesHost}
          <button type="submit" className="ui basic green button">Submit</button>
        </form>
        {me}
      </div>
    )
  }
}

export default withRouter(connect(null, actions)(Signup));
