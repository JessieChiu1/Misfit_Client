import { makeStyles, Label, Link, Image, shorthands, mergeClasses } from "@fluentui/react-components"
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

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffect: {
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
	hoverEffectSmall: {
		'&:hover': {
		  transform: 'scale(1.1)',
		},
	},
})

export default function Footer() {
	const router = useRouter()
	const styles = useStyles()
	const hoverStyles = useHoverStyles()

	const handleNavigation = (route) => {
		router.push(route)
	}

    return (
        <footer className={styles.footer}>
            <section className={styles.subItem}>
                <Label className={styles.label}>About</Label>
                <Link 
					onClick={() => handleNavigation("/about")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>About Misfit</Link>
				<Link 
					onClick={() => handleNavigation("/FAQs")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>FAQs</Link>
				<Link 
					onClick={() => handleNavigation("/misfitGuidelines")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>Misfit Guidelines</Link>
				<Link 
					onClick={() => handleNavigation("/futureFeatures")}
					className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
					>Future Features</Link>
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
						<Image 
							className={mergeClasses(styles.contact_logo, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							src="/LI-Logo.png" 
							alt="LinkedIn Logo"
							/>
					</Link>
					<Link href="https://github.com/JessieChiu1">
						<Image 
							className={mergeClasses(styles.contact_logo, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}
							src="/github-mark.png" 
							alt="GitHub Mark"
							/>
					</Link>
                </div>
            </section>
        </footer>
    )
}
