import React, { Component } from "react";

import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

export default class DiaryCard extends Component {
  render() {
    const { diary } = this.props;

    const d_dateOb = new Date(Date.parse(diary.date));
    const d_date = `${d_dateOb.toDateString()} ${d_dateOb.toLocaleTimeString(
      "en-US"
    )}`;

    return (
      <Card className="my-3" border="info">
        <Card.Header className="blockquote-footer">{d_date}</Card.Header>

        <Card.Body>
          <Card.Title>
            <Link className="text-decoration-none text-dark h2" to="/2">
              {diary.heading}
            </Link>
          </Card.Title>
          <Card.Text>{diary.text}</Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
