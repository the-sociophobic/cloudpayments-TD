import React from 'react'

import PayForm from './components/PayForm'

import { injectElementsList } from './utils/injectReact'

import './styles/index.sass'

injectElementsList([
  {
    id: "cloudpayments-widget",
    component: <PayForm />
  },
])
