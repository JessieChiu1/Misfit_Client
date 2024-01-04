import Image from 'next/image'
import getPost from "../services/post-service"

export default function PostCard({ post }) {
	return (
		<div className="post-card">
			<Link href={`/${post.id}`}>
				<Image src={post.photo[0].mainUrl} alt="No Image"/>
			</Link>
		</div>
	)
}
