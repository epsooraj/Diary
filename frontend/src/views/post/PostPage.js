import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { getCookie } from "../../utils/cookie";

export default class PostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      date: "",
      heading: "",
      text: "",
      newHeading: "",
      newText: "",
      loading: true,
      edit: false,
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
          newHeading: data.heading,
          newText: data.text,
          loading: false,
        });
      });
  }

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  cancelEdit = () => {
    this.setState({
      newHeading: this.state.heading,
      newText: this.state.text,
      edit: false,
    });
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkAndUpdateDiary = async () => {
    await this.setState({
      loading: true,
      validate: true,
    });

    if (this.state.newHeading !== "" && this.state.newText !== "") {
      // PUT request to backend
      await this.updateDiary();

      await this.setState({
        heading: this.state.newHeading,
        text: this.state.newText,

        edit: false,
        loading: false,
        validate: false,
      });
    }

    await this.setState({ loading: false });
  };

  updateDiary = () => {
    fetch(`/api/diary/${this.state.id}/`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        heading: this.state.newHeading,
        text: this.state.newText,
      }),
    }).then((response) => {
      if (response.status > 400) {
        //   Redirect to login page
        return (window.location = "/accounts/login/?next=/");
      }
      return;
    });
  };

  render() {
    return (
      <Container className="mt-4 pt-4">
        {!this.state.edit ? (
          <>
            <h1 className="display-4">{this.state.heading}</h1>
            <hr />
            <pre className="lead my-4 text-wrap wrap-pre">
              {this.state.text}
            </pre>
          </>
        ) : (
          <Form noValidate validated={this.state.validate} className="">
            <Form.Group controlId="heading">
              <Form.Control
                className="border-primary rounded-lg display-4"
                name="newHeading"
                type="text"
                placeholder="Heading"
                size="lg"
                value={this.state.newHeading}
                onChange={this.handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Heading Required.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="diary-body">
              <Form.Label>Diary</Form.Label>
              <Form.Control
                className="border-primary"
                name="newText"
                as="textarea"
                rows="10"
                value={this.state.newText}
                onChange={this.handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Diary Required.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        )}

        {!this.state.edit ? (
          <div className="btn btn-primary px-4" onClick={this.toggleEdit}>
            Edit
          </div>
        ) : (
          <>
            <div
              className="btn btn-success px-4 mr-2"
              onClick={this.checkAndUpdateDiary}
            >
              Save
            </div>
            <div className="btn btn-primary px-4" onClick={this.cancelEdit}>
              Cancel
            </div>
          </>
        )}
        <div className="btn btn-danger px-3 ml-2">Delete</div>
      </Container>
    );
  }
}
