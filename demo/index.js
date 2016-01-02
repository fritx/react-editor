import React, { Component } from 'react'
import { render } from 'react-dom'
import Page from './Page'

const root = document.createElement('div')
document.body.appendChild(root)

render(<Page />, root)
