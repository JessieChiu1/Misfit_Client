import { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function RichTextEditor() {
    const [content, setContent] = useState('<p>Hello World! 🌎️</p>')

    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML())
            console.log
        },
    })

    return (
        <div>
            <EditorContent editor={editor} />
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
}
