import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default class CreateBalance extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeBalance = this.onChangeBalance.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      balance: 0,
      date: new Date(),
      description: "",
      users: []
    };
  }
  componentDidMount() {
    axios.get("http://localhost:5000/users/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeBalance(e) {
    this.setState({
      balance: e.target.value
    });
  }

  onChangeDate(date) {
    this.setState({
      date: date
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const balance = {
      username: this.state.username,
      balance: this.state.balance,
      date: this.state.date,
      description: this.state.description
    };
    console.log(balance);

    axios
      .post("http://localhost:5000/balances/add", balance)
      .then(res => console.log(res.data));
    window.location = "/";
  }
  render() {
    return (
      <div>
        <h3>Create New Balance</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Balance:</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.balance}
              onChange={this.onChangeBalance}
            />
          </div>
          <div className="form-group">
            <label>Date:</label>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              required
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              className="form-control"
              value="Create Balance"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
