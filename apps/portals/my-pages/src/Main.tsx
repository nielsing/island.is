import '@island.is/api/mocks'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { isRunningOnEnvironment } from '@island.is/shared/utils'
import { userMonitoring } from '@island.is/user-monitoring'

import { App } from './app/App'
import { environment } from './environments'

if (!isRunningOnEnvironment('local')) {
  userMonitoring.initDdRum({
    service: 'service-portal',
    applicationId: environment.DD_RUM_APPLICATION_ID,
    clientToken: environment.DD_RUM_CLIENT_TOKEN,
    env: environment.ENVIRONMENT,
    version: environment.APP_VERSION,
  })
}

const rootEl = document.getElementById('root')

if (!rootEl) {
  throw new Error('Root element not found')
}

const root = createRoot(rootEl)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
