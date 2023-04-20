import React, { useState } from 'react'
import './styles/App.css'
import PostList from './components/PostList.jsx'
import PostForm from './components/UI/PostForm.jsx'
import MySelect from './components/UI/select/MySelect'
import MyInput from './components/UI/input/MyInput'

function App() {
	const [posts, setPosts] = useState([
		{ id: 1, title: 'JavaScript', body: 'Description' },
		{ id: 2, title: 'JavaScript 2', body: 'Description' },
		{ id: 3, title: 'JavaScript 3', body: 'Description' }
	])

	const [selectedSort, setSelectedSort] = useState('')
const [searchQuery, setSearchQuery] = useState('')

function getSortedPosts(){
console.log('sorted post fn worked')
	if(selectedSort){
		[...posts].sort((a,b)=>a[selectedSort].localeCompare(b[selectedSort]))
	}
	return posts
}

const sortedPosts=getSortedPosts()

	const createPost = newPost => {
		setPosts([...posts, newPost])
	}
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	const sortPosts = sort => {
		setSelectedSort(sort);
	}
	return (
		<div className='App'>
			<PostForm create={createPost} />
			<hr style={{ margin: '15px 0' }} />
			<div>
			<MyInput 
			value={searchQuery}
			onChange={e=> setSearchQuery(e.target.value)}
			placeholder='Search...' />
				<MySelect
					selectedSort={selectedSort}
					onChange={sortPosts}
					defaultValue='Sort by'
					option={[
						{ value: 'title', name: 'By name' },
						{ value: 'body', name: 'By description' }
					]}
				/>
			</div>
			{posts.length ? (
				<PostList remove={removePost} posts={sortedPosts} title='Posts List 1' />
			) : (
				<h1 style={{ textAlign: 'center' }}>No post found</h1>
			)}
		</div>
	)
}

export default App
