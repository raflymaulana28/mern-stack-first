import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Balance = props => (
  <tr>
    <td>{props.balance.username}</td>
    <td>{props.balance.balance}</td>
    <td>{props.balance.date.substring(0, 10)}</td>
    <td>{props.balance.description}</td>
    <td>
      <Link to={"/edit/" + props.balance._id}>Edit</Link>|
      <a
        href="#"
        onClick={() => {
          props.deleteBalance(props.balance._id);
        }}
      >
        Delete
      </a>
    </td>
  </tr>
);

export default class BalanceList extends Component {
  constructor(props) {
    super(props);
    this.deleteBalance = this.deleteBalance.bind(this);

    this.state = { balances: [] };
  }
  componentDidMount() {
    axios
      .get("http://localhost:5000/balances/")
      .then(response => {
        this.setState({ balances: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteBalance(id) {
    axios
      .delete("http://localhost:5000/balances/" + id)
      .then(res => console.log(res.data));
    this.setState({
      balances: this.state.balances.filter(el => el._id !== id)
    });
  }

  balanceList() {
    return this.state.balances.map(currentbalance => {
      return (
        <Balance
          balance={currentbalance}
          deleteBalance={this.deleteBalance}
          key={currentbalance._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>BalanceList</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Balance</th>
              <th>Date</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.balanceList()}</tbody>
        </table>
      </div>
    );
  }
}
