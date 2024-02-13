import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Accordion, makeStyles, Text } from "@fluentui/react-components"
import { useState } from "react"
import CustomAccordionItem from "@/components/accordionItem"

const SoftLaunchTodo = [{
    order: 1,
    headerText: "HashTags",
    contextText: "I aim to add hashtags to allow users to better categorize their posts. This will also assist in promoting specific tags to address particular challenges within the transgender community, such as narrow shoulders, wide shoulders, big feet, small feet, and sleeve length.",
}, {
    order: 2,
    headerText: "Improve UX and focus on content for every page",
    contextText: "There is a lot of people who are interested in the project but it seems like my implementation or lack of content is turning the users off",
}, {
    order: 3,
    headerText: "Community-Approved Language",
    contextText: "Seek input from the community to ensure the language and terminology used in the app are appropriate and respectful. This collaborative approach will help in creating a platform that truly reflects the needs and preferences of the community.",
}]

const afterSoftLaunchTodo = [{
    order: 4,
    headerText: "OAuth: Change Login/Signup to 'Sign in with Gmail'",
    contextText: "Revise the login/signup functionality to use email instead of a username. Allow users to reset passwords by sending them a password reset email.",
}, {
    order: 5,
    headerText: "Allow Bug Reports",
    contextText: "Develop a system for registering an email address with a domain name and enable users to submit bug reports.",
}, {
    order: 6,
    headerText: "Adding Mood Board and Saved Post Collections",
    contextText: "Enable users to create a mood board and add posts to them. Allow users to save posts and access them on their profile page. The mood board can be shared through a URL that can be copied.",
}, {
    order: 7,
    headerText: "Fill in Misfit Guidelines and FAQs based on community-approved content",
    contextText: "Engage the community to gather input on essential FAQs to include and guidelines they believe are important.",
}, {
    order: 8,
    headerText: "UI and Website Styling",
    contextText: "Determine the best font, color, and other visual aspects of the website.",
}, {
    order: 9,
    headerText: "Self-Sustainability",
    contextText: "Explore ways to monetize the website to ensure it pays for itself. This may involve adding Google Ads or a donation button.",
}]


const useStyles = makeStyles({
    accordion: {
        marginLeft: "10vw",
        marginRight: "10vw",
        marginTop: "5vh",
        marginBottom: "5vh",
    },
    page: {
        minHeight: "100vh"
    }
})

export default function FutureFeatures() {
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
                <Text size={700} weight={"semibold"}>Soft Launch Goal</Text>
                {SoftLaunchTodo.map((item) => (
                    <CustomAccordionItem
                        key={item.order}
                        order={item.order}
                        headerText={item.headerText}
                        contextText={item.contextText}
                    />
                ))}
            </Accordion>
                <br/>
            <Accordion
                openItems={openItems}
                onToggle={handleToggle}
                multiple
                collapsible
                className={styles.accordion}
            >
                <Text size={700} weight={"semibold"}>After Soft Launch Goal</Text>
                {afterSoftLaunchTodo.map((item) => (
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