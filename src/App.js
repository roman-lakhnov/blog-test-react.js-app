import React, { useState } from 'react'
import Counter from './components/Counter.jsx'
import ClassCounter from './components/ClassCounter.jsx'
import './styles/App.css'
import PostItem from './components/PostItem.jsx'
import PostList from './components/PostList.jsx'
import MyButton from './components/UI/button/MyButton.jsx'
import MyInput from './components/UI/input/MyInput.jsx'

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'JavaScript', body: 'Description' },
		{ id: 2, title: 'JavaScript 2', body: 'Description' },
		{ id: 3, title: 'JavaScript 3', body: 'Description' }
	])
	const [title, setTitle] = useState('')

	function addNewPost(e) {
		e.preventDefault()
		console.log({ title })
	}

	return (
		<div className='App'>
			<form action=''>
				<MyInput
					value={title}
					onChange={e => setTitle(e.target.value)}
					type='text'
					placeholder='Title'
				/>
				<MyInput type='text' placeholder='Body' />
				<MyButton onClick={addNewPost}>Create</MyButton>
			</form>

			<PostList posts={posts} title='Posts List 1' />
		</div>
	)
}

export default App
