import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Accordion, makeStyles, Text } from "@fluentui/react-components"
import { useState } from "react"
import CustomAccordionItem from "@/components/accordionItem"

const faqs = [{
    order: 1,
    headerText: "FAQs placeholder Header text",
    contextText: "FAQs placeholder context text",
}, {
    order: 2,
    headerText: "FAQs placeholder Header text 2",
    contextText: "FAQs placeholder context text 2",
},{
    order: 3,
    headerText: "FAQs placeholder Header text 3",
    contextText: "FAQs placeholder context text 3",
}, {
    order: 4,
    headerText: "FAQs placeholder Header text 4",
    contextText: "FAQs placeholder context text 4",
},{
    order: 5,
    headerText: "FAQs placeholder Header text 5",
    contextText: "FAQs placeholder context text 5",
}] 

const useStyles = makeStyles({
    accordion: {
        marginLeft: "10vw",
        marginRight: "10vw",
        marginTop: "5vh",
        marginBottom: "5vh",
    },
})

export default function FAQs() {
    const styles = useStyles()
    const [openItems, setOpenItems] = useState([])

    const handleToggle = (e, data) => {
      setOpenItems(data.openItems);
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
                <Text size={700} weight={"semibold"}>Frequently Asked Questions</Text>
                {faqs.map((item) => (
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