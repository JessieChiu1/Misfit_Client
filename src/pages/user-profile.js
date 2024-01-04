import { AuthContext } from "@/components/AuthProvider"

export default function UserProfile() {
    const { user, setToken } = useContext(AuthContext)

    return (
        <div>
            <h1>{user}</h1>
        </div>
    )
}