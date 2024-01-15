// createPost
export const createPost = async(payload, token) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post`, {
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

// get specific post
export const getPost = async(postId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${postId}`, {
        method: "GET",

    })
    const data = await response.json()
    return data
}

// query style - query string
export const getPostByStyle = async(style) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post?style=${style}`, {
        method: "GET",
    })
    const data = await response.json()
    return data
}
  
// get latest
export const getLatestPost = async() => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/`, {
        method: "GET",
    })
    const data = await response.json()
    return data
}

// delete post
export const deletePost = async(postId) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/post/${postId}`, {
        method: "DELETE",
        Authorization: `Bearer ${token}`,
    })
    const data = await response.json()
    return data
}


export const getPostByUserId = async(userId) => {
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${userId}`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/${userId}`, {
        method: "GET",
    })
    const data = await response.json()
    return data
}