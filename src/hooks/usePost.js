import { useState, useEffect } from "react"
import * as postService from "../services/post-service"

export const usePostByStyle = (style, type = undefined) => {
	const [allPost, setPost] = useState([])
	const [isLoading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
	const fetchData = async () => {
		try {
		setLoading(true)

		let data

		if (style === '') {
			data = await postService.getLatestPost()
		} else {
			data = await postService.getPostByStyleAndFilter(style, type)
		}

		if (Array.isArray(data)) {
			setPost(data)
		} else {
			setPost([])
		}
		} catch (error) {
		console.error('Error fetching posts:', error);
		setError(error.message || 'An error occurred while fetching posts.');
		} finally {
		setLoading(false)
		}
	}

	fetchData();
	}, [style, type])

	return { allPost, isLoading, error }
}

export const usePostByUserId = (userId) => {
	const [allPost, setPost] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
	const fetchData = async () => {
		try {
		setIsLoading(true)

		const data = await postService.getPostByUserId(userId)

		if (Array.isArray(data)) {
			setPost(data)
		} else {
			setPost([])
		}
		} catch (error) {
		console.error('Error fetching posts:', error)
		setPost([])
		} finally {
		setIsLoading(false);
		}
	}

	fetchData()
	}, [userId])

	return { allPost, isLoading }
	
}