import AboutMisfitBanner from "@/components/layout/indexLayout/aboutMisfitBanner"
import ProblemBanner from "@/components/layout/indexLayout/problemBanner"
import CallToActionBanner from "@/components/layout/indexLayout/callToActionBanner"
import IndexHeader from "@/components/layout/indexLayout/indexHeader"


export default function Home() {

	return (
		<>
		<IndexHeader/>
		<section >
			<AboutMisfitBanner/>
			<ProblemBanner/>
			<CallToActionBanner/>
		</section>
		</>
	)
}
