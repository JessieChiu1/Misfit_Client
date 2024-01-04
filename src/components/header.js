import UserHeader from "@/components/userHeader"
import Filter from "@/components/filter"


export default function Header() {
    return (
        <div id="header">
            <Filter/>
            <UserHeader/>
        </div>
    )
}