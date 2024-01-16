import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Text, Body1, Image, Label, shorthands, Avatar} from "@fluentui/react-components"

const useStyles = makeStyles({
	card: {
		...shorthands.margin("20px"),
	  	width: "500px",
	  	maxWidth: "100%",
	},
	review_text: {
		whiteSpace: "pre-line",
	},
	content: {
		display: "flex",
		flexDirection: "column",
	},
	row: {
		display: "flex",
		"> *": {
			marginRight: "10px",
		},
	},
})

export default function PostCard({ post }) {
	const styles = useStyles()

	return (
		<Card className={styles.card} size="large">
			<CardHeader
				image={<Avatar name={post.user.username} />}
                header={
                    <Body1>
                        <Label size="large">{post.title}</Label>
                    </Body1>
                }
			/>
			<CardPreview>
				<Image
					src={post.photo[0].mainUrl}
					alt="Example"
				/>
			</CardPreview>
			<CardFooter className={styles.content}>
				<div className={styles.row}>
					<Label>{post.type}</Label>
					<Label>{`$${post.price}`}</Label>
				</div>
				<div className={styles.row}>
					<Image src="/orange_heart_high_contrast.svg"/>
					<Image src="/orange_heart_flat.svg"/>
				</div>
				<Text className="review_text">{post.review}</Text>
			</CardFooter>
	  	</Card>
	)
}
