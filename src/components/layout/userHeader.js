import React, { useContext } from "react"
import { AuthContext } from "@/components/providers/AuthProvider"
import { Avatar, Button, makeStyles, mergeClasses, shorthands, Text } from "@fluentui/react-components"
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

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffectSmall: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
})

export default function UserHeader() {
	const router = useRouter()
	const styles = useStyles()
	const hoverStyles = useHoverStyles()
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
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>Logout</Button>
			</div>
			) : (
				<div className={styles.userHeader}>
				<Button 
					appearance="primary" 
					onClick={() => handleNavigation("/signup")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>Sign up</Button>
				<Button 
					appearance="primary" 
					onClick={() => handleNavigation("/login")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>Login</Button>
			</div>
			)}
		</div>
	)
}