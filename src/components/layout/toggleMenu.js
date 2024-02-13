import { LineHorizontal3Filled } from "@fluentui/react-icons"
import { Menu, MenuTrigger, MenuList, MenuItemLink, MenuPopover, Button, Text, makeStyles, shorthands } from "@fluentui/react-components"
import { useContext } from "react"
import { AuthContext } from "@/components/providers/AuthProvider"
import { useRouter } from "next/router"

const useStyles = makeStyles({
	icon: {
	  width: "3vw",
	  height: "auto",
	  minWidth: "30px",
	  cursor: "pointer",
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
		<Menu openOnHover="true">
			<MenuTrigger disableButtonEnhancement>
				<LineHorizontal3Filled 
					className={styles.icon}
					/>
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
