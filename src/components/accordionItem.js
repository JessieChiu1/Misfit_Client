import { AccordionItem, AccordionHeader, AccordionPanel, Text, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
    context: {
        marginLeft: "5em"
    }
})

export default function CustomAccordionItem({ order, headerText, contextText }) {
    const styles = useStyles()

    return (
        <AccordionItem value={order}>
            <AccordionHeader>
                <Text size={700}>{headerText}</Text>
            </AccordionHeader>
            <AccordionPanel className={styles.context}>
                <Text size={500}>{contextText}</Text>
            </AccordionPanel>
        </AccordionItem>
    )
}
