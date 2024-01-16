import { LineHorizontal3Filled } from "@fluentui/react-icons"
import { Menu, MenuTrigger, MenuList, MenuItemLink, MenuPopover, Button, Label, makeStyles, shorthands } from "@fluentui/react-components"
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
	};

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
						<Label>Profile</Label>
					</MenuItemLink>
					<MenuItemLink onClick={() => handleNavigation("/createNewPost")}>
						<Label>Create New Post</Label>
					</MenuItemLink>
				</>
			) : (
				<>
					<MenuItemLink onClick={() => handleNavigation("/signup")}>
						<Label>Signup or Login To Make A Post</Label>
					</MenuItemLink>
				</>
			)}
				<MenuItemLink onClick={() => handleNavigation("/createNewPost")}>
						<Label>About</Label>
				</MenuItemLink>
			</MenuList>
		</MenuPopover>
		</Menu>
	);
}
