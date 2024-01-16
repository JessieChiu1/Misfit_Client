import React from 'react'
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink, Button, Label, makeStyles, shorthands } from "@fluentui/react-components"

const optionList = ["Outerwear", "Top", "Pant", "Skirt", "Accessory"]

const useStyles = makeStyles({
    button: {
        ...shorthands.padding("15px")
    },
    label: {
        fontSize: "2em",
    },
    option: {
        fontSize: "1.5em",
    }
})

export default function FilterMenu({ style }) {
    const styles = useStyles();

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button appearance='transparent' className={styles.button}>
                    <Label className={styles.label}>{style}</Label>
                </Button>
            </MenuTrigger>
    
            <MenuPopover>
                <MenuList>
                    <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}`} key="All">
                        <Label className={styles.option}>All</Label>
                    </MenuItemLink>
                    {optionList.map((option) => (
                        <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}?type=${option}`} key={option}>
                            <Label className={styles.option}>{option}</Label>
                        </MenuItemLink>
                    ))} 
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}
