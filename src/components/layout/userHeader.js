import React, { useContext } from "react"
import { AuthContext } from "@/components/providers/AuthProvider"
import { Avatar, Button, makeStyles, shorthands, Text } from "@fluentui/react-components"
import { useRouter } from "next/router"

const useStyles = makeStyles({
    userHeader: {
        display: "flex",
        justifyContent: "flex-end",
		alignItems: "center",
        "& > *": {
          ...shorthands.margin("10px")
        },
    },
})

export default function UserHeader() {
	const router = useRouter()
	const styles = useStyles()
	const { user, setToken } = useContext(AuthContext)

	const handleClickLogout = () => {
		setToken(undefined)
	}

	const handleNavigation = (route) => {
		router.push(route)
	}

	return (
		<div id="user_header">
			{user ? (
			<div className={styles.userHeader}>
				<Text size={300}>{`Welcome ${user.username}! `}<Avatar name={user.username}/></Text>
				<Button 
					appearance="primary" 
					onClick={handleClickLogout}
					>Logout</Button>
			</div>
			) : (
				<div className={styles.userHeader}>
				<Button 
					appearance="primary" 
					onClick={() => handleNavigation("/signup")}
					>Sign up</Button>
				<Button 
					appearance="primary" 
					onClick={() => handleNavigation("/login")}
					>Login</Button>
			</div>
			)}
		</div>
	)
}