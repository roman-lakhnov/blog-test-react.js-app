import React, { useState } from 'react'
import { useRef } from 'react'
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
	const [post, setPost] = useState({ title: '', body: '' })

	function addNewPost(e) {
		e.preventDefault()
		setPosts([...posts, { ...post, id: Date.now() }])
		setPost({ title: '', body: '' })
	}

	return (
		<div className='App'>
			<form action=''>
				<MyInput
					value={post.title}
					onChange={e => setPost({ ...post, title: e.target.value })}
					type='text'
					placeholder='Title'
				/>
				<MyInput
					value={post.body}
					onChange={e => setPost({ ...post, body: e.target.value })}
					type='text'
					placeholder='Body'
				/>
				<MyButton onClick={addNewPost}>Create</MyButton>
			</form>

			<PostList posts={posts} title='Posts List 1' />
		</div>
	)
}

export default App
