import React, { Component } from "react";
import { Link } from "react-router-dom";

import Card from "react-bootstrap/Card";

import { getCookie } from "../../utils/cookie";

export default class DiaryCard extends Component {
  deleteConf = () => {
    const del_conf = confirm("Are you sure?");

    if (del_conf === true) {
      this.deletePage();
    }
  };

  deletePage = () => {
    fetch(`api/diary/${this.props.diary.id}/`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": getCookie("csrftoken"),
      },
    }).then((response) => {
      if (response.status > 400) {
        //   Redirect to login page
        return (window.location = "/accounts/login/?next=/");
      }
      return this.props.fetchDiaries();
    });
  };

  render() {
    const { diary } = this.props;

    const d_dateOb = new Date(Date.parse(diary.date));
    const d_date = `${d_dateOb.toDateString()} ${d_dateOb.toLocaleTimeString(
      "en-US"
    )}`;

    return (
      <Card className="my-3" border="info">
        <Card.Header className="d-flex justify-content-between">
          <div className="blockquote-footer">{d_date}</div>
          <div
            onClick={this.deleteConf}
            className="close"
            type="button"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </div>
        </Card.Header>

        <Card.Body>
          <Card.Title>
            <Link
              className="text-decoration-none text-dark h2"
              to={`/${this.props.diary.id}/`}
            >
              {diary.heading}
            </Link>
          </Card.Title>
          <Card.Text
            className=""
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              width: "200px",
              textOverflow: "ellipsis",
            }}
          >
            {diary.text}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}
