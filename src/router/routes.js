import { Navigate } from 'react-router-dom'
import About from '../pages/About'
import Error from '../pages/Error'
import Login from '../pages/Login'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'

export const privateRoutes = [
	{ path: '/about', component: <About />, exact: true },
	{ path: '/posts', component: <Posts />, exact: true },
	{ path: '/posts/:id', component: <PostIdPage />, exact: true },
	{ path: '/error', component: <Error />, exact: true },
	{ path: '*', component: <Navigate to='/posts' replace={true} />, exact: true }
]
export const publicRoutes = [
	{ path: '/about', component: <About />, exact: true },
	{ path: '/login', component: <Login />, exact: true },
	{ path: '/error', component: <Error />, exact: true },
	{ path: '*', component: <Navigate to='/login' replace={true} />, exact: true }
]
