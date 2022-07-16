import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = (): JSX.Element => {
  return (
    <div>
      {/* TO DO Display image */}
      <h1>Hey, cette page n'existe pas !</h1>
      <Link to='/'>
        Retourner à l'accueil
      </Link>
    </div>
  )
}

export default PageNotFound
