import React, { Component } from "react"
import moment from "moment"
import { withFirebase } from "./firebase"
import { compose } from "recompose"

class FeedItemBase extends Component {
  state = {
    email: ""
  }

  onSaveFavorite = event => {
    const userEmail = this.props.firebase.auth.currentUser.email
      .replace("@", "_")
      .replace(".", "_")
    this.props.firebase.database
      .ref(`users/${userEmail}/${this.props.id}`)
      .set({
        url: this.props.url,
        title: this.props.title,
        author: this.props.author,
        created_utc: this.props.created_utc,
        score: this.props.score
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  render() {
    return (
      <div className="feed-item">
        <div className="feed-item-image-wrapper">
          <i
            className={`fas fa-heart fave-${this.props.isFavorite}`}
            onClick={this.onSaveFavorite}
          />
          <img
            src={this.props.url}
            alt={this.props.title}
            className="feed-item-image"
          />
        </div>
        <div className="feed-item-title">{this.props.title}</div>
        <div className="feed-item-meta">
          <span>
            <i className="fas fa-user" />
            /u/{this.props.author} &bull;
          </span>
          <span>
            <i className="far fa-clock" />
            {moment(this.props.created_utc*1000).fromNow()} &bull;
          </span>
          <span>
            <i className="fas fa-bolt" />
            {this.props.score}
          </span>
        </div>
      </div>
    )
  }
}

const FeedItem = compose(withFirebase)(FeedItemBase)

export { FeedItem }
