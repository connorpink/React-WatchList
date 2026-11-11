import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from './Layout'
import { routes } from './routes'
import { AuthProvider, RequireAuth, GuestOnly } from './auth'

function wrap(route) {
  if (route.auth === "required") return <RequireAuth>{route.element}</RequireAuth>
  if (route.auth === "guest") return <GuestOnly>{route.element}</GuestOnly>
  return route.element
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            {routes.map((route) => (
              <Route key={route.path} path={route.path} element={wrap(route)} />
            ))}
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
export default App;
