import React, { Component } from "react"
import ReactDOM from "react-dom"
import "./index.css"

const FeedItem = props => (
  <div className="feedItem">
    <img src={props.url} alt={props.title} />
    <h3>{props.title}</h3>
    <div className="meta">
      <div>/{props.author}</div>
      <div>{props.created_utc}</div>
      <div>{props.score}</div>
    </div>
  </div>
)

class FeedList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feedItems: []
    }
  }

  componentDidMount() {
    this.getFeedItems()
  }

  async getFeedItems() {
    console.log('hi')
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
      <div className="feed-list">
        {this.state.feedItems.map(({data}) =>
          (<FeedItem
            title={data.title}
            url={data.url}
            author={data.author}
            created_utc={data.created_utc}
            score={data.score}
          />)
        )}
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <div className="item name">/r/analog</div>
          <div className="item favorites">favorites (0)</div>
        </header>
        <div className="body">
          <FeedList />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
