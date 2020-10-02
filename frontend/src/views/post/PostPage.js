import React, { Component } from "react";
import Container from "react-bootstrap/Container";

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      date: "",
      heading: "",
      text: "",
      loading: true,
    };
  }

  componentDidMount() {
    fetch(`/api/diary/${this.props.match.params.postid}/`)
      .then((response) => {
        if (response.status > 400) {
          //   Redirect to login page
          return (window.location = "/accounts/login/?next=/");
        }
        return response.json();
      })
      .then((data) => {
        this.setState({
          id: data.id,
          date: data.date,
          heading: data.heading,
          text: data.text,
          loading: false,
        });
      });
  }

  render() {
    return (
      <Container className="mt-4 pt-4">
        <h1 className="display-4">{this.state.heading}</h1>
        <hr />
        <pre className="lead my-4 text-wrap wrap-pre">{this.state.text}</pre>
      </Container>
    );
  }
}
