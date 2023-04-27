import React, { useState } from 'react'
import { useMemo } from 'react'
import './styles/App.css'
import PostList from './components/PostList.jsx'
import PostForm from './components/UI/PostForm.jsx'
import MySelect from './components/UI/select/MySelect'
import MyInput from './components/UI/input/MyInput'
import MyModal from './components/UI/MyModal/MyModal'
import MyButton from './components/UI/button/MyButton'

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: '6 JavaScript', body: 'f Description' },
		{ id: 2, title: ' 7 JavaScript 2', body: 'a Description' },
		{ id: 3, title: '5 JavaScript 3', body: 'b Description' }
	])

	const [selectedSort, setSelectedSort] = useState('')
	const [searchQuery, setSearchQuery] = useState('')
	const [modal, setModal] = useState(false)

	const sortedPosts = useMemo(() => {
		console.log('sorted post fn worked')
		if (selectedSort) {
			return [...posts].sort((a, b) =>
				a[selectedSort].localeCompare(b[selectedSort])
			)
		}
		return posts
	}, [selectedSort, posts])

	const sortedAndSearchedPosts = useMemo(() => {
		return sortedPosts.filter(post =>
			post.title.toLowerCase().includes(searchQuery)
		)
	}, [searchQuery, sortedPosts])

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	const sortPosts = sort => {
		setSelectedSort(sort)
	}
	return (
		<div className='App'>
			<MyButton style={{marginTop:30}} onClick={() => setModal(true)}>
				Create Post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<div>
				<MyInput
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					placeholder='Search...'
				/>
				<MySelect
					value={selectedSort}
					onChange={sortPosts}
					defaultValue='Sort by'
					option={[
						{ value: 'title', name: 'By name' },
						{ value: 'body', name: 'By description' }
					]}
				/>
			</div>
			{sortedAndSearchedPosts.length ? (
				<PostList
					remove={removePost}
					posts={sortedAndSearchedPosts}
					title='Posts List 1'
				/>
			) : (
				<h1 style={{ textAlign: 'center' }}>No post found</h1>
			)}
		</div>
	)
}

export default App
