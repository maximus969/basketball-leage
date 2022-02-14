import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRootStateType } from './core/redux/store'
import { Header } from './component/header/Header'
import { Sidebar } from './component/sidebar/Sidebar'
import { ProjectRoutes } from './pages/routes'
import { restoreState } from './utils/localStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from './modules/auth/authorizationSlice'

const App = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    )
    const dispatch = useDispatch()

    useEffect(() => {
        const state = restoreState('state')
        if (state) dispatch(setUserData(state))
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                {isLoggedIn && <Header />}
                {isLoggedIn && <Sidebar />}
                <ProjectRoutes />
            </BrowserRouter>
        </div>
    )
}

export default App
