import { createContext, useState, useEffect } from "react"

export const MessageContext = createContext({ message: undefined })

export const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState(undefined)

    return (
        <MessageContext.Provider value={{ setMessage }}>
            {children}
        </MessageContext.Provider>
    )
}