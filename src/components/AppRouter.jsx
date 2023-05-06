import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from '../context/context.js'
import { privateRoutes, publicRoutes } from '../router/routes.js'
import Loader from './UI/Loader/Loader.jsx'

function AppRouter() {
	const { isAuth, isLoading } = useContext(AuthContext)
	console.log(isAuth)
	if (isLoading) {
		return <Loader />
	}
	return isAuth ? (
		<Routes>
			{privateRoutes.map(route => (
				<Route
					key={route.path}
					exact={route.exact}
					path={route.path}
					element={route.component}
				/>
			))}
		</Routes>
	) : (
		<Routes>
			{publicRoutes.map(route => (
				<Route
					key={route.path}
					exact={route.exact}
					path={route.path}
					element={route.component}
				/>
			))}
		</Routes>
	)
}

export default AppRouter
