import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "./auth/signout"

const Navigation = ({ authUser }) => (
  <div className="nav-options body-wrap">
    {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
  </div>
)

const NavigationAuth = ({authUser}) => (
  <ul>
    <li>
      <Link to="/feed">
        <i className="fab fa-reddit-alien" />
        /r/analog
      </Link>
    </li>
    <li>
      <Link to="/favorites">
        <i className="fas fa-heart" /> favorites
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
)

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to="/feed">
        <i className="fab fa-reddit-alien" />
        /r/analog
      </Link>
    </li>
    <li>
      <Link to="/signin">Sign In</Link>
    </li>
  </ul>
)

const Header = props => (
  <header className="header">
    <Navigation authUser={props.authUser} />
  </header>
)

export { Header }
