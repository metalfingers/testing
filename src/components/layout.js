import React, { Component } from "react"
import { FeedItem } from "./feeditem"

class Layout extends Component {
  render() {
    return <div className="body-wrap">{this.props.children}</div>
  }
}

class FeedList extends Component {
  state = {
    feedItems: []
  }

  componentDidMount() {
    this.getFeedItems()
  }

  async getFeedItems() {
    await fetch("https://www.reddit.com/r/analog/top/.json")
      .then(response => response.json())
      .then(feedData => {
        console.log(feedData)
        this.setState({ feedItems: feedData.data.children })
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    return (
      <Layout>
        <div className="feed-list">
          {this.state.feedItems.map(({ data }) => (
            <FeedItem
              key={data.id}
              id={data.id}
              title={data.title}
              url={data.url}
              author={data.author}
              created_utc={data.created_utc}
              score={data.score}
            />
          ))}
        </div>
      </Layout>
    )
  }
}

export { FeedList, Layout }
