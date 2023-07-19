import React from 'react'

interface titleProps {
  title: string
}

const TitlePage = ({ title }: titleProps): JSX.Element => (
  <div className='d-flex align-items-center justify-content-center mt-5 py-4'>
    <h1>{title}</h1>
  </div>
)

export default TitlePage
