import React, { useContext } from "react"
import { AuthContext } from "@/components/providers/AuthProvider"
import { Avatar, Button, Label, makeStyles, shorthands } from "@fluentui/react-components"
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
	const router = useRouter();
	const styles = useStyles();
	const { user, setToken } = useContext(AuthContext);

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
				<Label>{`Welcome ${user.username}!`}</Label>
				<Avatar name={user.username}/>
				<Button  size="large" onClick={handleClickLogout}>
					<Label>Logout</Label>
				</Button>
			</div>
			) : (
				<div className={styles.userHeader}>
				<Button size="large" onClick={() => handleNavigation("/signup")}>
					<Label>Sign up</Label>
				</Button>
				<Button size="large" onClick={() => handleNavigation("/login")}>
					<Label>Login</Label>
				</Button>
			</div>
			)}
		</div>
	)
}