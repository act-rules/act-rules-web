import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import './rule-header.scss'

const RuleHeader = ({ ruleId, ruleType, ruleName, children }) => {
  const converter = new showdown.Converter()

  return (
    <div className='ruleHeader'>
      <Link to={`/rules/${ruleId}`}>
        <h2 id={`id-${ruleId}`} dangerouslySetInnerHTML={{ __html: converter.makeHtml(ruleName) }}></h2>
      </Link>
      <div className='childContainer'>
        {children}
      </div>
    </div>
  )
}

RuleHeader.propTypes = {
  ruleId: PropTypes.string.isRequired,
  ruleType: PropTypes.string.isRequired,
  ruleName: PropTypes.string.isRequired,
}

export default RuleHeader