export const signup = async (payload) => {
    console.log(process.env.NEXT_PUBLIC_API_URL)
    console.log(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/signup`)
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/auth/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return data
}

export const login = async (payload) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_API_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const data = await response.json()
    return data
}

