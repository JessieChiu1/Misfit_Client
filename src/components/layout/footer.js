import { makeStyles, Label, Link, Image, shorthands } from "@fluentui/react-components"
import { useRouter } from "next/router"

const useStyles = makeStyles({
    footer: {
		display: "flex",
		alignItems: "flex-start",
		justifyContent: "space-around",
		...shorthands.padding("20px"),
		width: "100%",
    },
    subItem: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "flex-start",
		"> *": {
			...shorthands.margin("10px"),
		},
	},
    contact_logo_container: {
		display: "flex",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		"> *": {
		  height: "1.5em",
		  ...shorthands.margin("5px"),
		},
    },
	contact_logo: {
		width: "100%",
		height: "auto", 
		maxHeight: "100%",
	},
    label: {
        fontSize: "1.5em",
    }
})

export default function Footer() {
	const router = useRouter()
	const styles = useStyles()

	const handleNavigation = (route) => {
		router.push(route)
	}

    return (
        <footer className={styles.footer}>
            <section className={styles.subItem}>
                <Label className={styles.label}>About</Label>
                <Link onClick={() => handleNavigation("/about")}>About Misfit</Link>
				<Link onClick={() => handleNavigation("/FAQs")}>FAQs</Link>
				<Link onClick={() => handleNavigation("/misfitGuidelines")}>Misfit Guidelines</Link>
				<Link onClick={() => handleNavigation("/futureFeatures")}>Future Features</Link>
            </section>
			{/* <section className={styles.subItem}>
                <Label className={styles.label}>Terms and Condition</Label>
                <Link>Privacy Policy</Link>
                <Link>Terms of Service</Link>
				<Link>Accessibility Information</Link>
            </section> */}
            <section className={styles.subItem}>
                <Label className={styles.label}>Contact Me</Label>
                <div className={styles.contact_logo_container}>
					<Link href="https://www.linkedin.com/in/jessiechiu12/">
						<Image className={styles.contact_logo} src="/LI-Logo.png" alt="LinkedIn Logo"/>
					</Link>
					<Link src="https://github.com/JessieChiu1">
						<Image className={styles.contact_logo} src="/github-mark.png" alt="GitHub Mark"/>
					</Link>
                </div>
            </section>
        </footer>
    )
}
