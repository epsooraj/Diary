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
      saveLoading: false,
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
      saveLoading: true,
      validate: true,
    });

    if (this.state.newHeading !== "" && this.state.newText !== "") {
      // PUT request to backend
      await this.updateDiary();

      await this.setState({
        heading: this.state.newHeading,
        text: this.state.newText,

        edit: false,
        saveLoading: false,
        validate: false,
      });
    }

    await this.setState({ saveLoading: false });
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

  confirmAndDelete = () => {
    const del = confirm("Are you sure?");
    if (del) {
      this.deleteDiary();
    }
  };

  deleteDiary = () => {
    fetch(`/api/diary/${this.state.id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }).then((response) => {
      if (response.status > 400) {
        return (window.location = "/accounts/login/?next=/");
      } else if (response.status > 200) {
        return (window.location = "/");
      }
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
              {this.state.saveLoading ? "Saving..." : "Save"}
            </div>
            <div className="btn btn-primary px-4" onClick={this.cancelEdit}>
              Cancel
            </div>
          </>
        )}
        <div
          className="btn btn-danger px-3 ml-2"
          onClick={this.confirmAndDelete}
        >
          Delete
        </div>
      </Container>
    );
  }
}
