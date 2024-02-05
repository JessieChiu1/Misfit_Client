export const createRootComment = async(payload, token) => {
	console.log("triggering createRootComment")
    console.log(payload)
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