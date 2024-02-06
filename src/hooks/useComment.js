import { useState, useEffect } from "react"
import * as postService from "../services/post-service"

export const useCommentByPostId = (postId) => {
	const [allComment, setAllComment] = useState([])
	const [isLoading, setIsLoading] = useState(true)
	const [commentAdded, setCommentAdded] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true)

				const data = await postService.getCommentByPostId(postId)

				if (Array.isArray(data)) {
					setAllComment(data)
				} else {
					setAllComment([])
				}
			} catch (e) {
				console.error('Error fetching posts:', e)
				setAllComment([])
			} finally {
				setIsLoading(false);
			}
		}

	fetchData()
	}, [postId, commentAdded])

	const addComment = () => {
		setCommentAdded((boo) => !boo)
	}

	return { allComment, isLoading, addComment }
	
}