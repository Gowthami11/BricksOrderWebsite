import React, { PureComponent } from "react";
import Axios from "axios";
import { connect } from "react-redux";
class Orders extends PureComponent {
  state = {
    orders: "",
    orderscopy: ""
  };

  customcomponentDidUpdate = data => {
    console.log("data", data);
    Axios.get(
      `https://brickorder-4ca5f.firebaseio.com/orders.json?auth=${this.props.token}`
    ).then(res => {
      if (data.dispatched !== undefined) alert("Bricks have been dispatched");
      else if (data.bricksNo !== undefined)
        alert(" No of bricks have been updated");
      const orders = [];
      for (let i in res.data) {
        //console.log("igggggggggggg", i);
        orders.push({
          id: i,
          order: res.data[i],
          edit: false
        });
      }
      this.setState({ orders: orders, orderscopy: orders });
    });
  };

  editvalueHandler = (e, bricks, id) => {
    e.preventDefault();

    Axios.patch(
      `https://brickorder-4ca5f.firebaseio.com/orders/${id}.json?auth=${this.props.token}`,
      {
        bricksNo: bricks
      }
    ).then(res => {
      console.log("res.data", res.data);
      this.customcomponentDidUpdate(res.data);
    });
  };
  editChange = (e, id) => {
    e.preventDefault();
    console.log("id is", id);
    const orders = [...this.state.orders];
    const index = orders.findIndex(od => od.id === id);
    const updatedItem = { ...orders[index] };
    updatedItem.edit = !orders[index].edit;
    orders[index] = updatedItem;
    this.setState({ orders });
  };

  SearchName = e => {
    e.preventDefault();
    console.log(e.target.value);
    const orders = [...this.state.orderscopy];
    const orders1 = orders.filter(ord => {
      const od = ord.order.name.toString();
      const search = e.target.value.toString();
      return od.includes(search);
    });
    this.setState({ orders: orders1 });
  };
  componentDidMount = () => {
    // Axios.get(`https://brickorder-4ca5f.firebaseio.com/orders.json/orderBy=userid&equalTo${userId}`)?auth=true
    // Axios.get(
    //   `https://brickorder-4ca5f.firebaseio.com/orders.json?auth=${this.props.token}&orderBy="userId"&equalTo=${this.props.userId}`
    // )

    if (this.props.userId === "wJ5h33jSxNQkix9vuH0ainr4Kxt2") {
      const queryParams = "?auth=" + this.props.token;
      Axios.get(
        "https://brickorder-4ca5f.firebaseio.com/orders.json" + queryParams
      )
        .then(res => {
          console.log(res);
          const orders = [];
          for (let i in res.data) {
            console.log("igggggggggggg", i);
            orders.push({
              id: i,
              order: res.data[i],
              edit: false
            });
          }
          this.setState({ orders: orders, orderscopy: orders });
        })
        .catch(err => console.log(err));
    } else {
      console.log("this.props.token", this.props.token);
      console.log("this.props.userId", this.props.userId);
      const queryParams =
        "?auth=" +
        this.props.token +
        '&orderBy="userId"&equalTo="' +
        this.props.userId +
        '"';
      Axios.get(
        "https://brickorder-4ca5f.firebaseio.com/orders.json" + queryParams
      )
        .then(res => {
          console.log(res);
          const orders = [];
          for (let i in res.data) {
            console.log("igggggggggggg", i);
            orders.push({
              id: i,
              order: res.data[i],
              edit: false
            });
          }
          this.setState({ orders: orders, orderscopy: orders });
        })
        .catch(err => console.log(err));
    }
  };
  fulfilOrder = (e, id) => {
    e.preventDefault();
    Axios.patch(
      `https://brickorder-4ca5f.firebaseio.com/orders/${id}.json?auth=${this.props.token}`,
      {
        dispatched: true
      }
    ).then(res => {
      console.log("res", res);
      this.customcomponentDidUpdate(res.data);
    });
  };

  render() {
    console.log("this.state.orders", this.state.orders);
    let order;
    if (this.state.orders) {
      order = this.state.orders.map(od => (
        <div className="card" style={{ textAlign: "center" }}>
          <i>
            <b>name:</b> {od.order.name}
          </i>

          <i>
            {od.edit ? (
              <span>
                {" "}
                <input
                  type="text"
                  defaultValue={od.order.bricksNo}
                  ref={editval => (this.editval = editval)}
                />
                <span
                  onClick={e =>
                    this.editvalueHandler(e, this.editval.value, od.id)
                  }
                >
                  {" "}
                  <i className="fa fa-check" />
                </span>
              </span>
            ) : (
              <i>
                {" "}
                <i>
                  <b>No of Bricks:</b> {od.order.bricksNo}
                </i>
                {"  "}
                {this.props.userId !== "wJ5h33jSxNQkix9vuH0ainr4Kxt2" ? null : (
                  <span onDoubleClick={e => this.editChange(e, od.id)}>
                    <i className="fa fa-edit" />
                  </span>
                )}
              </i>
            )}
          </i>
          <i>
            <b>date to be delivered:</b> {od.order.date}
          </i>

          <i>
            <b>instructions by user:</b> {od.order.instructions}
          </i>

          <i>
            <b>dispatched:</b> {od.order.dispatched ? "true" : "false"}
          </i>

          {this.props.userId !== "wJ5h33jSxNQkix9vuH0ainr4Kxt2" ? null : (
            <div style={{ textAlign: "center" }}>
              {!od.order.dispatched ? (
                <button
                  style={{ width: "14%", textAlign: "center" }}
                  className="btn btn-success"
                  onClick={e => this.fulfilOrder(e, od.id)}
                >
                  Fulfill order
                </button>
              ) : (
                <button
                  style={{ width: "14%", textAlign: "center" }}
                  className="btn btn-secondary"
                  onClick={e => this.fulfilOrder(e, od.id)}
                  disabled
                >
                  <b> Dispatched</b>
                </button>
              )}
            </div>
          )}
        </div>
      ));
    } else {
      order = (
        <div className="spinner-border text-success ">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
    return (
      <div style={{ textAlign: "center" }}>
        <input
          style={{ borderRadius: "20px" }}
          type="text"
          placeholder="...search "
          onChange={e => this.SearchName(e)}
        />
        <br />
        <br />
        {"  "}
        {order}
      </div>
    );
  }
}
const mapStateToprops = state => {
  return {
    userId: state.userId,
    token: state.idToken
  };
};

export default connect(mapStateToprops, null)(Orders);
