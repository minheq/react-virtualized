import React from 'react'
import { render } from 'react-dom'
import Application from './Application'

render(
  <Application />,
  document.getElementById('root')
)

// Import and attach the favicon
document.querySelector('[rel="shortcut icon"]').href = require('file!./favicon.png')
