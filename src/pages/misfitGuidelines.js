import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Accordion, makeStyles, Text } from "@fluentui/react-components"
import { useState } from "react"
import CustomAccordionItem from "@/components/accordionItem"

const misfitGuidelines = [{
    order: 1,
    headerText: "Guidelines placeholder Header text",
    contextText: "Guidelines placeholder context text",
}, {
    order: 2,
    headerText: "Guidelines placeholder Header text 2",
    contextText: "Guidelines placeholder context text 2",
},{
    order: 3,
    headerText: "Guidelines placeholder Header text 3",
    contextText: "Guidelines placeholder context text 3",
}, {
    order: 4,
    headerText: "Guidelines placeholder Header text 4",
    contextText: "Guidelines placeholder context text 4",
},{
    order: 5,
    headerText: "Guidelines placeholder Header text 5",
    contextText: "Guidelines placeholder context text 5",
}] 

const useStyles = makeStyles({
    accordion: {
        marginLeft: "10vw",
        marginRight: "10vw",
        marginTop: "5vh",
        marginBottom: "5vh",
    }
})

export default function MisfitGuidelines() {
    const styles = useStyles()
    const [openItems, setOpenItems] = useState([])

    const handleToggle = (e, data) => {
      setOpenItems(data.openItems)
    }

    return (
        <>
            <Header/>
            <Accordion
                openItems={openItems}
                onToggle={handleToggle}
                multiple
                collapsible
                className={styles.accordion}
            >
                <Text size={700} weight={"semibold"}>Misfit Guidelines</Text>
                {misfitGuidelines.map((item) => (
                    <CustomAccordionItem
                        key={item.order}
                        order={item.order}
                        headerText={item.headerText}
                        contextText={item.contextText}
                    />
                ))}
            </Accordion>
            <Footer/>
        </>
    )
}