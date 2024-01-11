import { LineHorizontal3Filled } from "@fluentui/react-icons"
import { Menu, MenuTrigger, MenuList, MenuItemLink, MenuPopover, Button, makeStyles } from "@fluentui/react-components"
import { useContext } from "react"
import { AuthContext } from "@/components/AuthProvider"
import { useRouter } from "next/router"

const useStyles = makeStyles({
	icon: {
		width: "50px",
		height: "50px",
	},
})

export default function ToggleMenu() {
	const { user } = useContext(AuthContext)
	const router = useRouter()
	const styles = useStyles()

	const handleNavigation = (route) => {
		router.push(route)
	};

	return (
		<Menu>
		<MenuTrigger disableButtonEnhancement>
			<Button>
			<LineHorizontal3Filled className={styles.icon} />
			</Button>
		</MenuTrigger>

		<MenuPopover>
			<MenuList>
			<MenuItemLink onClick={() => handleNavigation(`/${create}`)}>
				PH for user
			</MenuItemLink>
			{user ? (
				<MenuItemLink onClick={() => handleNavigation("/createNewPost")}>
				Create New Post
				</MenuItemLink>
			) : (
				<MenuItemLink onClick={() => handleNavigation("/signup")}>
				Signup or Login To Make A Post
				</MenuItemLink>
			)}
			</MenuList>
		</MenuPopover>
		</Menu>
	);
}
