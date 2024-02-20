import { useState, useContext, useCallback } from 'react'
import { AuthContext } from './providers/AuthProvider'
import { Card, CardFooter, CardHeader, CardPreview, makeStyles, Input, Body1, Image, Label, Avatar, Select, SpinButton, Button, shorthands, mergeClasses} from "@fluentui/react-components" 
import { useRouter } from "next/router"
import { createPhoto } from '@/services/photo-service'
import { createPost } from '@/services/post-service'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

const optionList = ["Accessory", "Activewear", "Blouses", "Bra", "Coats", "Dress Pants", "Dress Shirt", "Dresses", "Jackets & Blazers", "Jeans & Denim", "Loungewear", "Outfit Showcase", "Pants & Leggings", "Shoes", "Shorts", "Skirts", "Sleepwear", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "Swimwear", "T-Shirt", "Underwear"]

const useStyles = makeStyles({
    content: {
        display: "flex",
        flexDirection: "column",
    },
    row: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        alignContent: "center",
        "> *": {
            ...shorthands.margin("5px"),
        },
    },
    image: {
        maxHeight: "60vh",
    },
    button_container: {
        ...shorthands.margin("20px"),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    file: {
        minHeight: "50vh",
        width:"100%"
    },
})

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
	hoverEffectSmall: {
		'&:hover': {
			transform: 'scale(1.1)',
		},
	}
})

export default function EditPostForm() {
    const { user, getToken } = useContext(AuthContext)
    const router = useRouter()
    const styles = useStyles()
    const hoverStyles = useHoverStyles()

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
            e.preventDefault()
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
            }
            const response = await createPost(payload, token)
            if (response.hasOwnProperty('_id')) {
                handleNavigation("/")
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    const handleChangeStyle = (e) => {
        setStyle(e.target.value)
    }

    const handleChangePrice = useCallback(
        (_ev, data) => {
          console.log("onSpinButtonChange", data.value)
          if (data.value !== undefined) {
            setPrice(data.value)
          } 
        },
        [setPrice]
    )

    const handleChangePhoto = (e) => {
        const photo = e.target.files[0]
        setPhoto(photo)
    }

    return (
        <div>
            {user ? (
                <form onSubmit={handleSubmit}>
                    <Card size="small">
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
                                    src={URL.createObjectURL(photo)} 
                                    alt="Example" 
                                    className={styles.image}
                                    />
                            ) : (
                                <div>
                                    <Input
                                        id="photo_upload"
                                        type="file"
                                        onChange={handleChangePhoto}
                                        accept="image/*"
                                        className={styles.file}
                                    />
                                </div>
                            )}
                        </CardPreview>
                        <CardFooter className={styles.content}>
                            <div className={styles.row}>
                                <Select 
                                    onChange={handleChangeStyle}
                                    defaultValue={style}>
                                    <option>Feminine</option>
                                    <option>Androgynous</option>
                                    <option>Masculine</option>
                                </Select>
                                <Select 
                                    onChange={handleChangeType} 
                                    defaultValue={type}>
                                    {optionList.map((option) => (
                                        <option key={option}>{option}</option>
                                    ))}
                                </Select>
                            </div>
                            <div className={styles.row}>
                                <SpinButton
                                    value={price.toString()}
                                    displayValue={`$${Math.max(price, 0)}`}
                                    min={0}
                                    onChange={handleChangePrice}
                                />
                                <Button 
                                    onClick={() => setPhoto()}
                                    className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
                                    >
                                    Remove Photo
                                </Button>
                            </div>
                            <EditorContent editor={editor} />
                        </CardFooter>
                    </Card>
                    <div className={styles.button_container}>
                        <Button
                            appearance="primary" 
                            type="submit"
                            className={mergeClasses(hoverStyles.hoverEffectSmall, hoverStyles.hoverTransition)}
                            >
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
