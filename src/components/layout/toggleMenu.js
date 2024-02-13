import { LineHorizontal3Filled } from "@fluentui/react-icons"
import { Menu, MenuTrigger, MenuList, MenuItemLink, MenuPopover, Button, Text, makeStyles, shorthands } from "@fluentui/react-components"
import { useContext } from "react"
import { AuthContext } from "@/components/providers/AuthProvider"
import { useRouter } from "next/router"

const useStyles = makeStyles({
	icon: {
		width: "50px",
		height: "50px",
	},
	menuButton: {
		minWidth: "75px",
		minHeight: "75px",
		...shorthands.padding("0px")
	}

})

export default function ToggleMenu() {
	const { user } = useContext(AuthContext)
	const router = useRouter()
	const styles = useStyles()

	const handleNavigation = (route) => {
		router.push(route)
	}

	return (
		<Menu>
		<MenuTrigger disableButtonEnhancement>
			<Button className={styles.menuButton}>
				<LineHorizontal3Filled className={styles.icon} />
			</Button>
		</MenuTrigger>

		<MenuPopover>
			<MenuList>
			{user ? (
				<>
					<MenuItemLink onClick={() => handleNavigation(`/user/${user.id}`)}>
						<Text>Profile</Text>
					</MenuItemLink>
					<MenuItemLink onClick={() => handleNavigation("/createNewPost")}>
						<Text>Create New Post</Text>
					</MenuItemLink>
				</>
			) : (
				<>
					<MenuItemLink onClick={() => handleNavigation("/signup")}>
						<Text>Signup or Login To Make A Post</Text>
					</MenuItemLink>
				</>
			)}
				<MenuItemLink onClick={() => handleNavigation("/about")}>
						<Text>About</Text>
				</MenuItemLink>
			</MenuList>
		</MenuPopover>
		</Menu>
	)
}
