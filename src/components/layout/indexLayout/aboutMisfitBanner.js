import { makeStyles, Title1, Display, LargeTitle, shorthands, Image, mergeClasses } from "@fluentui/react-components"
import { useState, useEffect, useRef } from "react"

const useStyles = makeStyles({
    container: {
        backgroundColor: "#BAEBFD",
        width: "100vw",
        ...shorthands.padding("20px"),
    },
    text: {
        color: "#0AACEA"
    },
    header_container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        "> *": {
            ...shorthands.margin("20px")
        }
    },
    row_container: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "flex-start",
        "> *": {
            flex: "0 1 calc(30% - 40px)",
            maxWidth: "calc(30% - 40px)",
            ...shorthands.margin("20px"),
            opacity: "0",
        }
    },
    message_container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "> *": {
            ...shorthands.margin("20px")
        }
    },
    photo: {
        width: "100%",
        height: "100%"
    },
})

export default function AboutMisfitBanner() {
    const styles = useStyles()
    const containerRef = useRef(null)

    useEffect(() => {
        const containerChildren = Array.from(containerRef.current.childNodes)

        containerChildren.forEach((entry, index) => {
            console.log(index)
            const observer = new IntersectionObserver(([entry]) => {
                if(entry.isIntersecting){
                    setTimeout(() => {
                        entry.target.style.transitionProperty = "opacity"
                        entry.target.style.transitionDuration = "2s"
                        entry.target.style.transitionTimingFunction = "ease"
                        entry.target.style.opacity = "1"
                        observer.unobserve(entry.target);
                    }, 1000 * (index + 1))
                }
            }, {
                threshold: 0.5,
            })

            observer.observe(entry)
        })

    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header_container}>
                <Display className={styles.text}>Misfit</Display>
                <LargeTitle className={styles.text}>Dare to be Different</LargeTitle>
            </div>
            <div className={styles.row_container} ref={containerRef}>
                <div className={styles.message_container}>
                    <Title1 className={styles.text}>Discover the Perfect Fit</Title1>
                    <Image className={styles.photo} src="/undraw_online_shopping_re_k1sv.svg"/>
                </div>
                <div className={styles.message_container}>
                    <Title1 className={styles.text}>Share Fashion Advice</Title1>
                    <Image className={styles.photo} src="/undraw_fashion_blogging_re_fhi5.svg"/>
                </div>
                <div className={styles.message_container}>
                    <Title1 className={styles.text}>Showcase Your Style</Title1>
                    <Image className={styles.photo} src="/undraw_fashion_photoshoot_mtq8.svg"/>
                </div>
            </div>
        </div>
    )
}