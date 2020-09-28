import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import DiaryCard from "../../components/cards/DiaryCard";

export default class Home extends Component {
  constructor(props) {
    super(props);

    //   Check for login cookie

    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading",
    };
  }

  componentDidMount() {
    fetch("api/diary/")
      .then((response) => {
        if (response.status > 400) {
          //   Redirect to login page
          return (window.location = "/accounts/login/?next=/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState(() => {
          return {
            data,
            loaded: true,
          };
        });
      });
  }

  render() {
    console.log(this.state);
    return (
      <Container className="mt-4 py-4 text-center">
        <div className="w-100 d-flex flex-column flex-md-row-reverse">
          <div className="w-100">
            <h1 className="py-4">Add New</h1>
          </div>
          <div className="w-100">
            <h1 className="py-4">Your Diaries</h1>
            <div className="px-4">
              {this.state.data.map((diary) => (
                <DiaryCard key={diary.id} diary={diary} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
