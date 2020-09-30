import React, { Component } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { getCookie } from "../../utils/cookie";

export default class AddNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heading: "",
      text: "",
      validate: false,
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  checkAndAdd = async () => {
    await this.setState({ loading: true, validate: true });

    if (this.state.heading !== "" && this.state.text !== "") {
      this.addNewDiary();

      this.setState({
        heading: "",
        text: "",
        validate: false,
      });
    }

    await this.setState({ loading: false });
  };

  addNewDiary = () => {
    fetch("/api/diary/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": getCookie("csrftoken"),
      },
      body: JSON.stringify({
        heading: this.state.heading,
        text: this.state.text,
      }),
    })
      .then((response) => {
        if (response.status > 400) {
          //   Redirect to login page
          return (window.location = "/accounts/login/?next=/");
        }
        return response.json();
      })
      .then((data) => {
        this.props.fetchDiaries();
      });
  };

  render() {
    return (
      <Form
        noValidate
        validated={this.state.validate}
        className="mt-4 mx-4 text-center"
      >
        <Form.Group controlId="heading">
          {/* <Form.Label>Heading</Form.Label> */}
          <Form.Control
            className="border-primary rounded-lg"
            name="heading"
            type="text"
            placeholder="Heading"
            size="lg"
            value={this.state.heading}
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
            name="text"
            as="textarea"
            rows="10"
            value={this.state.text}
            onChange={this.handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Diary Required.
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          onClick={this.checkAndAdd}
          className=""
          variant="primary"
          size="lg"
        >
          Save
        </Button>
      </Form>
    );
  }
}
