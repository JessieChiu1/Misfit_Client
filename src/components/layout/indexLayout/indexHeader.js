import { Image, makeStyles, shorthands, Text, Button } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        display: "flex",
        alignItem: "center",
        justifyContent: "space-between",
        ...shorthands.padding("10px"),
        height: "10vh",
    },
    logo: {
        maxHeight: "50%",
        width: "auto",
    },
    nav: {
        "> *": {
            ...shorthands.margin("5px")
        },
        display: "flex",
        alignItems: "center",
    },
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

export default function IndexHeader() {
    const styles = useStyles()
    const hoverStyles = useHoverStyles()
    
    return (
        <nav className={styles.container}>
            <div className={styles.nav}>
                <Image 
                    src="/logo.png"
                    alt="logo"
                    className={styles.logo}
                    onClick={() => handleNavigation("/home")}
                />
                <Text size={500} weight="semibold">Explore</Text>
            </div>
            <div className={styles.nav}>
                <Button appearance="primary">Sign up</Button>
                <Button appearance="primary">Login</Button>
            </div>
        </nav>
    )
}