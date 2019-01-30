import React, { Component } from "react"
import { Layout } from "./layout"
import { withFirebase } from "./firebase"
import { compose } from "recompose"

class Favorites extends Component {
  render() {
    return (
      <Layout>
        <div>it's a fave</div>
      </Layout>
    )
  }
}

export { Favorites }
