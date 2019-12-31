import React from 'react'
import PropTypes from 'prop-types'

import './badge.scss'

const Badge = ({ title, value }) => {
  return (
    <div className='badge'>
      <span className='title'>{title}</span>
      <span>{value}</span>
    </div>
  )
}

Badge.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

export default Badge