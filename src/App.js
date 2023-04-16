import React, { useState } from 'react'
import Counter from './components/Counter.jsx'
import ClassCounter from './components/ClassCounter.jsx'

function App() {
  const [value,setValue]=useState('input text')

	return (
		<div className='App'>
		<Counter/>
		<ClassCounter/>
		</div>
	)
}

export default App
