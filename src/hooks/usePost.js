import { useState, useEffect } from "react"
import * as postService from "../services/post-service"

export const usePostByStyle = (style, type = undefined) => {
	const [allPost, setPost] = useState([])
  
	useEffect(() => {
		const fetchData = async () => {
			try {
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
				console.error('Error fetching posts:', error)
				setPost([])
			}
		}
	  	fetchData()
	}, [style])
  
	return { allPost, setPost }
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