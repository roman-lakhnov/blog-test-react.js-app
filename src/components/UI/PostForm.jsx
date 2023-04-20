import React from 'react'
import MyButton from './button/MyButton'
import MyInput from './input/MyInput'
import { useState } from 'react'

function PostForm({ create }) {
	const [post, setPost] = useState({ title: '', body: '' })

	function addNewPost(e) {
		e.preventDefault()
		const newPost = { ...post, id: Date.now() }
		create(newPost)
		setPost({ title: '', body: '' })
	}

	return (
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
	)
}

export default PostForm
