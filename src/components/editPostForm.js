import { useState, useContext, useCallback } from 'react'
import { AuthContext } from './providers/AuthProvider'
import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Input, Body1, Image, Label, shorthands, Avatar, Select, SpinButton, Button} from "@fluentui/react-components" 
import { useRouter } from "next/router"
import { createPhoto } from '@/services/photo-service'
import { editPost } from '@/services/post-service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const optionList = ["Accessory", "Activewear", "Blouses", "Bra", "Coats", "Dress Pants", "Dress Shirt", "Dresses", "Jackets & Blazers", "Jeans & Denim", "Loungewear", "Outfit Showcase", "Pants & Leggings", "Shoes", "Shorts", "Skirts", "Sleepwear", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "Swimwear", "T-Shirt", "Underwear"]

const useStyles = makeStyles({
    form_container: {
		minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "auto",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
    },
    button: {
        ...shorthands.padding("10px"),
        width: "fit-content",
        "> *": {
            "font-size": "1.5em",
        }
    },
	textArea: {
		height: "15rem",
	},
    card: {
		...shorthands.margin("20px"),
	  	minWidth: "300px",
	},
	content: {
		display: "flex",
		flexDirection: "column",
	},
	row: {
		display: "flex",
        flexWrap: "wrap",
		"> *": {
			marginRight: "10px",
            marginBottom: "10px",
		},
	},
    file_input: {
        minHeight: "50vh",
        width: "100%"
    },
    file_container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%", 
    },
})

export default function EditPostForm({ post, setEditPost, madeChanges }) {
    const { user, getToken } = useContext(AuthContext)
    const styles = useStyles()

    const [title, setTitle] = useState(post.title)
    const [type, setType] = useState(post.type)
    const [review, setReview] = useState(post.review)
    const [style, setStyle] = useState(post.style)
    const [price, setPrice] = useState(post.price)
    const [photo, setPhoto] = useState(post.photo[0].mainUrl)
    const [photoChanged, setPhotoChanged] = useState(false)

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: post.review,
        onUpdate: ({ editor }) => {
            const formattedReview = editor.getHTML().replace(`</p><p>`, '</p><br/><p>')
            setReview(formattedReview)
            console.log(formattedReview)
        },
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const token = getToken()
            let payload
            if (photoChanged) {
                const photoId = await createPhoto(photo, token)
                payload = {
                    title,
                    type,
                    review,
                    style,
                    price,
                    photo: [photoId],
                }
            } else {
                payload = {
                    title,
                    type,
                    review,
                    style,
                    price,
                }
            }
            const response = await editPost(payload, post._id, token)
            if (response.message === "Post Updated successfully") {
				madeChanges()
                setEditPost(null)
			}
        } catch (e) {
            console.log(e)
        }
    }

    const handleClose = () => {
        setEditPost(null)
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleChangeType = (e) => {
        setType(e.target.value);
    }

    const handleChangeStyle = (e) => {
        setStyle(e.target.value);
    }

    const handleChangePrice = useCallback(
		(_ev, data) => {
		  if (data.value !== undefined) {
			setPrice(data.value);
		  } 
		},
		[setPrice]
	)

    const handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        setPhoto(photo)
        setPhotoChanged(true)
    }

    const handleRemovePhoto = () => {
        setPhoto()
        setPhotoChanged(true)
    }

    return (
        <div className={styles.form_container}>

            {user ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                <Card className={styles.card} size="large">
                    <CardHeader
                        image={<Avatar name={user.username} />}
                        header={
                            <Body1>
                                <Input 
                                    size="large"
                                    type="text"
                                    name="title"
                                    placeholder="Title"
                                    value={title}
                                    onChange={handleChangeTitle}
                                />
                            </Body1>
                        }
                    />
                    <CardPreview>
                        {photo ? (
                            <Image src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} alt="Example" />
                        ) : (
                            <div className={styles.file_container}>
                                <Input
                                id="photo_upload"
                                className={styles.file_input}
                                type="file"
                                onChange={handleChangePhoto}
                                accept="image/*"
                                />
                            </div>
                        )}
                    </CardPreview>
                    <CardFooter className={styles.content}>
					<div className={styles.row}>
							<Select onChange={handleChangeStyle} defaultValue={style}>
								<option>Feminine</option>
								<option>Androgynous</option>
								<option>Masculine</option>
							</Select>
							<Select onChange={handleChangeType} defaultValue={type}>
								{optionList.map((option) => (
									<option key={option}>{option}</option>
								))}
							</Select>
							<SpinButton
								value={price.toString()}
								displayValue={`$${Math.max(price, 0)}`}
								min={0}
								onChange={handleChangePrice}
							/>
							<Button onClick={() => handleRemovePhoto()}>Remove Photo</Button>
						</div>
                        <EditorContent editor={editor} />
                    </CardFooter>
                </Card>
                <div className={styles.buttonContainer}>
                        <Button className={styles.button} appearance="primary" onClick={() => handleClose()}>Close</Button>
                        <Button className={styles.button} appearance="primary" type="submit">
                            Update Post
                        </Button>
                    </div>
                </form>
            ) : (
                <Label size="large" weight="semibold">Please sign up or login to make a post.</Label>
            )}
        </div>
    )
}
