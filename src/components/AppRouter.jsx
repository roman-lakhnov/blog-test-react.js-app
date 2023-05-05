import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Error from '../pages/Error'
import Posts from '../pages/Posts'
import PostIdPage from '../pages/PostIdPage'
import { routes } from '../router/routes'

function AppRouter() {
	return (
		<Routes>
			{routes.map(route => 
				<Route
					exact={route.exact}
					path={route.path}
					element={route.component}
				/>
			)}

			<Route path='/about' element={<About />} />
			<Route exact path='/posts' element={<Posts />} />
			<Route exact path='/posts/:id' element={<PostIdPage />} />
			<Route path='/error' element={<Error />} />
			<Route path='*' element={<Navigate to='/posts' replace={true} />} />
		</Routes>
	)
}

export default AppRouter
