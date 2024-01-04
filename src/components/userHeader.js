import { useContext } from "react"
import { AuthContext } from "@/components/AuthProvider"
import { Avatar } from "@fluentui/react-components";
import { useRouter } from 'next/router';
import { ToggleButton } from "@fluentui/react-components";

export default function UserHeader() {
    const router = useRouter()
    const { user, setToken } = useContext(AuthContext)

    const handleClickLogout = () => {
      setToken(undefined)
    }

    const handleNavigation = (route) => {
        router.push(route)
    }

    return (
        <div id="header">
            
            {user ? (
                <>
                    <Avatar onClick={() => handleNavigation(`/${user}`)}/>
                    <button onClick={handleClickLogout}>Logout</button>
                </>
            ) : (
                <>
                    <ToggleButton onClick={() => handleNavigation("/signup")}>
                        SignUp
                    </ToggleButton>
                    <ToggleButton onClick={() => handleNavigation("/login")}>
                        Login
                    </ToggleButton>
                </>
            )}
        </div>
    )
}