import { useState, useContext, useCallback } from 'react'
import { AuthContext } from './providers/AuthProvider'
import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Input, Body1, Image, Label, shorthands, Avatar, Select, SpinButton, Textarea, Button} from "@fluentui/react-components" 
import { useRouter } from "next/router"
import { createPhoto } from '@/services/photo-service'
import { createPost } from '@/services/post-service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

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
        "> *": {
            ...shorthands.margin("20px"),
            width: "50%",
        },
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "center",
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
	review_text: {
		whiteSpace: "pre-line",
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

export default function newPostForm() {
    const { user, getToken } = useContext(AuthContext)
    const router = useRouter()
    const styles = useStyles()

    const [title, setTitle] = useState("")
    const [type, setType] = useState("Outfit Showcase")
    const [review, setReview] = useState("")
    const [style, setStyle] = useState("Feminine")
    const [price, setPrice] = useState(null | 0)
    const [photo, setPhoto] = useState()
    
    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: 'Please tell us about the item(s) you are showcasing!\n Why are they a great find?', 
            }),
        ],
        onUpdate: ({ editor }) => {
            const formattedReview = editor.getHTML().replace(`</p><p>`, '</p><br/><p>')
            setReview(formattedReview)
        },
    })
    

    const handleNavigation = (route) => {
        router.push(route)
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const token = getToken()
            const photoId = await createPhoto(photo, token)
            const payload = {
                user: user.id,
                title,
                type,
                review,
                style,
                price,
                like: [user.id],
                photo: [photoId],
            };
            const response = await createPost(payload, token)
            if (response.hasOwnProperty('_id')) {
                handleNavigation("/")
            }
        } catch (e) {
            console.log(e)
        }
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
		  console.log("onSpinButtonChange", data.value);
		  if (data.value !== undefined) {
			setPrice(data.value);
		  } 
		},
		[setPrice]
	)

    const handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        setPhoto(photo)
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
                            <Image 
                                src={URL.createObjectURL(photo)} alt="Example" />
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
                        <Select onChange={handleChangeStyle}>
                            <option>Feminine</option>
                            <option>Androgynous</option>
                            <option>Masculine</option>
                        </Select>
                        <Select onChange={handleChangeType}>
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
                        <Button onClick={() => setPhoto()}>Remove Photo</Button>
                        </div>
                        <EditorContent editor={editor} />
                    </CardFooter>
                </Card>
                <div className={styles.buttonContainer}>
                        <Button className={styles.button} appearance="primary" type="submit">
                            Create Post
                        </Button>
                    </div>
                </form>
            ) : (
                <Label size="large" weight="semibold">Please sign up or login to make a post.</Label>
            )}
        </div>
    )
}
