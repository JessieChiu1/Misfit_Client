import { MessageBar, MessageBarBody, MessageBarTitle } from "@fluentui/react-components"
import { useContext } from "react"
import { MessageContext } from "./providers/MessageProvider"

export default function CustomMessageBar() {

    const { message, setMessage } = useContext(MessageContext)

    const handleDismiss = () => {
        setMessage(undefined)
    }

    return (
        message && (
          <MessageBar key="error" intent="error">
            <MessageBarBody>
              <MessageBarTitle>Error: {message}</MessageBarTitle>
            </MessageBarBody>
            <MessageBarActions
              containerAction={
                <Button
                  aria-label="dismiss"
                  appearance="transparent"
                  icon={<DismissRegular />}
                  onClick={handleDismiss}
                />
              }
            >
            </MessageBarActions>
          </MessageBar>
        )
    )
}