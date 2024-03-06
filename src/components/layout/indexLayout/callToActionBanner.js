import SignUpForm from "@/components/signUpForm"
import { makeStyles, Title1, shorthands, Button, mergeClasses} from "@fluentui/react-components"
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#fffff9",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "center",
        ...shorthands.padding("20px"),
        width: "100%",
        opacity: "0",
        transitionProperty: "opacity",
        transitionDuration: "2s",
        transitionTimingFunction: "ease",
    },
    text: {
        color: "#B2B29B",
        textAlign: "center",
    },
    text_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        "> *": {
            ...shorthands.margin("20px")
        }
    },
    fade_in: {
        opacity: "1",
        backgroundColor: "light pink",
    }
})

export default function CallToActionBanner() {
    const [visible, setVisible] = useState(false)
    const styles = useStyles()
    const router = useRouter()
    const containerRef = useRef(null)

    const handleNavigation = (route) => {
        router.push(route)
    }


    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if(entry.isIntersecting){
                setVisible(true)
                observer.unobserve(entry.target)
            }
        }, {
            threshold: 0.5,
        })

        observer.observe(containerRef.current)

    }, [])

    return (
        <div ref={containerRef} className={mergeClasses(styles.container, visible && styles.fade_in)}>
            <div className={styles.text_container}>
                <Title1 className={styles.text}>Sign up or start exploring to find your perfect fit today!</Title1>
                <Button 
                    size="large" 
                    appearance="primary"
                    onClick={() => handleNavigation("/home")}
                    >Explore Now!</Button>
            </div>
            <SignUpForm/>
        </div>
    )
    
}
