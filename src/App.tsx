import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRootStateType } from './core/redux/store'
import { Header } from './component/header/Header'
import { Sidebar } from './component/sidebar/Sidebar'
import { ProjectRoutes } from './pages/routes'
import { restoreFromLocalStorage } from './utils/localStorage'
import { useDispatch } from 'react-redux'
import { setUserData } from './modules/auth/authorizationSlice'

const App = () => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(
        (state) => state.auth.isLoggedIn
    )
    const dispatch = useDispatch()

    useEffect(() => {
        const token = restoreFromLocalStorage('token')
        if (token) dispatch(setUserData())
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
