export const createPhoto = async(req, res) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/photo`, {
        method: "POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body: JSON.stringify(payload)
    })
    const { id } = await response.json()
    return id
}

export const deletePhoto = async(id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/photo/${id}`, {
        method: "DELETE",
    })
    const data = await response.json()
    return data
}