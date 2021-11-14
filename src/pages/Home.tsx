import React from 'react'
import { Link } from 'react-router-dom'

const Home = (): JSX.Element => (
  <ul>
    <li>
      <Link to={process.env.PUBLIC_URL}>MyNotif</Link>
    </li>
    <li>
      <Link to='/patient'>Patient</Link>
    </li>
  </ul>
)

export default Home
