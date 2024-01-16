export const createPhoto = async (photo, token) => {
    try {
        const formData = new FormData()
        formData.append('file', photo)

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/photo`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const { id } = await response.json()
        console.log( id)
        return id
    } catch (e) {
        console.error(e)
        return null
    }
};


export const deletePhoto = async(id) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/photo/${id}`, {
        method: "DELETE",
    })
    const data = await response.json()
    return data
}