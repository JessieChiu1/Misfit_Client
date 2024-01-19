import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

import { Text, Title1, LargeTitle, makeStyles, shorthands } from "@fluentui/react-components"

const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        ...shorthands.margin("10%"),
        "> *": {
            ...shorthands.padding("10px")
        }
    }
})

export default function About() {
    const styles = useStyles()
    
    return (
        <>
            <Header/>
            <div class={styles.container}>
                <LargeTitle>Welcome to Misfit!</LargeTitle>
                <Text size={500}>Discover a world of style and self-expression at Misfit – a platform crafted exclusively for the transgender community. Here, we invite you to share, inspire, and celebrate your individual fashion journey. At Misfit, we firmly believe that everyone deserves a space to express their authentic selves, particularly when it comes to personal style.</Text>
                <br/>
                <Title1>Why I Started Misfit!</Title1>
                <Text size={500}>As someone who grew up dressing masculine but has a tiny body, it has always been a struggle to find the right fit for me. Clothing and apparel companies just don't cater to our needs. Most of us have a hard time finding the perfect clothes or brand for us. The problem only compounded while I was in college. I was a Finance Major and was in desperate need to find the right fit for everything from suits to shoes to even ties (They are too long for me). I ended up shelling out money for made-to-measure suits just so I could get something to wear for work. I even resorted to buying from the boy's section (Apparently, I am size boy 14), but then you run into issues with quality and style.</Text>
                <br/>
                <Text size={500}>I know finding clothes is even harder for others in the transgender community. Nonetheless, some of you are fashion magicians and can make it work. I am starting this website so we have a place in the community to discover brands or styles that work for us!</Text>
            </div>
            <Footer/>
        </>
    )
}