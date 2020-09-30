import React, { Component } from "react";
import Container from "react-bootstrap/Container";

import DiaryCard from "../../components/cards/DiaryCard";
import AddNew from "../../components/add-new";

export default class Home extends Component {
  constructor(props) {
    super(props);

    //   Check for login cookie

    this.state = {
      data: [],
      loading: true,
    };
  }

  async componentDidMount() {
    this.fetchDiaries();
    this.setState({ loading: false });
  }

  fetchDiaries = () => {
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
  };

  render() {
    return (
      <Container className="mt-4 py-4 text-center">
        <div className="w-100 d-flex flex-column flex-md-row-reverse">
          <div className="w-100">
            <h1 className="py-4">New Diary</h1>
            <AddNew fetchDiaries={this.fetchDiaries} />
          </div>
          <div className="w-100">
            <h1 className="py-4">Your Diaries</h1>
            <div className="px-4">
              {this.state.data.map((diary) => (
                <DiaryCard
                  key={diary.id}
                  diary={diary}
                  fetchDiaries={this.fetchDiaries}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
