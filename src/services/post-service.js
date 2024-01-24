// createPost
export const createPost = async(payload, token) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post`, {
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

// query style - query string
export const getPostByStyleAndFilter = async (style, type) => {
	let queryParams = ""

	if (type) {
	queryParams = `?type=${type}`
	}

	console.log(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/style/${style}${queryParams}`)

	const response = await fetch(
	`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/style/${style}${queryParams}`,
	{
		method: "GET",
	}
	)

	const data = await response.json()
	return data
}

// get latest
export const getLatestPost = async() => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/`, {
		method: "GET",
	})
	const data = await response.json()
	return data
}

// delete post
export const deletePost = async (postId, token) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/${postId}`, {
	method: "DELETE",
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${token}`,
	}
	})
	const data = await response.json()
	return data
}

export const getPostByUserId = async(userId) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/user/${userId}`, {
		method: "GET",
	})
	const data = await response.json()
	return data
}

export const likePost = async(postId, userId, token) => {
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/${postId}/${userId}/like`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()
	return data
}

export const unlikePost = async(postId, userId, token) => {
	console.log("trigger unlike")
	const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/post/${postId}/${userId}/unlike`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})

	const data = await response.json()
	return data
}