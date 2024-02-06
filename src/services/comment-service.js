export const createRootComment = async(payload, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(payload)
	})
	const data = await response.json()
	return data
}

export const upvoteComment = async(commentId, userId, token) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/comment/${commentId}/${userId}/upvote`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
  
	const data = await response.json()
	return data
}

export const downvoteComment = async(commentId, userId, token) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/comment/${commentId}/${userId}/downvote`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()
	return data
}