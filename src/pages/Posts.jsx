import React, { useEffect, useRef, useState } from 'react'
import PostService from '../API/PostService'
import PostFilter from '../components/PostFilter'
import PostList from '../components/PostList.jsx'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/Loader/Loader'
import MyModal from '../components/UI/MyModal/MyModal'
import Pagination from '../components/UI/pagination/Pagination'
import PostForm from '../components/UI/PostForm.jsx'
import MySelect from '../components/UI/select/MySelect'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
import { usePosts } from '../hooks/usePosts'
import '../styles/App.css'
import { getPageCount } from '../utils/pages'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	// eslint-disable-next-line
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const lastElement = useRef()

	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page)
			setPosts([...posts, ...response.data])
			const totalCount = response.headers['x-total-count']
			setTotalPages(getPageCount(totalCount, limit))
		}
	)

	// useEffect(() => {
	// 	document.title = `Posts ${sortedAndSearchedPosts.length}`
	// })

	useObserver(lastElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1)
	})

	useEffect(() => {
		fetchPosts(limit, page)
		return () => {}
		// eslint-disable-next-line
	}, [page,limit])

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}

	const changePage = page => {
		setPage(page)
		fetchPosts(limit, page)
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
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='post amount on page'
				option={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'all' }
				]}
			/>
			{postError && <h1 style={{ textAlign: 'center' }}>Error ${postError}</h1>}
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title={sortedAndSearchedPosts.length ? 'Posts List' : 'No post found'}
			/>
			<div ref={lastElement} style={{ height: 20, background: 'red' }} />
			{isPostsLoading && (
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						marginTop: 50
					}}
				>
					<Loader />
				</div>
			)}
			<Pagination page={page} totalPages={totalPages} changePage={changePage} />
		</div>
	)
}

export default Posts
