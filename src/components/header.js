import UserHeader from "@/components/userHeader"
import Filter from "@/components/filter"
import CreateNewPost from "@/pages/createNewPost"


export default function Header() {
    return (
        <div id="header">
            <Filter/>
            <UserHeader/>
        </div>
    )
}