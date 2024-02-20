import Header from "@/components/layout/header"
import { makeStyles} from "@fluentui/react-components"
import Footer from "@/components/layout/footer"
import AboutMisfitBanner from "@/components/layout/cta/aboutMisfitBanner"
import ProblemBanner from "@/components/layout/cta/problemBanner"
import CallToActionBanner from "@/components/layout/cta/callToActionBanner"


const useStyles = makeStyles({

})

export default function Home() {
const styles = useStyles()


const handleLoadMore = () => {
	const newIndex = min(allPost.length, indexShown + 10)
	setIndexShown(newIndex)
}

return (
	<>
	<Header />
	<section >
		<ProblemBanner/>
		<AboutMisfitBanner/>
		<CallToActionBanner/>
	</section>
	<Footer />
	</>
)
}
