import React, { useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList.jsx'
import PostForm from './components/UI/PostForm.jsx'
import MyModal from './components/UI/MyModal/MyModal'
import MyButton from './components/UI/button/MyButton'
import { usePosts } from './hooks/usePosts'
import PostFilter from './components/PostFilter'

function App() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	return (
		<div className='App'>
			<MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
				Create Post
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr style={{ margin: '15px 0' }} />
			<PostFilter filter={filter} setFilter={setFilter} />
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
