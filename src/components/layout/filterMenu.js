import React from 'react'
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink, Button, Label, makeStyles, shorthands } from "@fluentui/react-components"

const optionList = ["Outfit Showcase","Activewear", "Coats", "Jackets & Blazers", "Suits & Separates", "Dresses", "Jeans & Denim", "Loungewear", "Pants & Leggings", "Skirts", "Sleepwear", "Sweaters", "Sweatshirts & Hoodies", "Swimsuits & Cover-Ups", "T-Shirt and Tops", "Shoes", "Accessory", "Underwear", "Bra", "Shorts", "Swimwear", "Dress Shirt", "Blouses", "Jumpsuits & Rompers"]


const useStyles = makeStyles({
    button: {
        ...shorthands.padding("15px")
    },
    label: {
        fontSize: "1.5em"
    }
})

export default function FilterMenu({ style }) {
    const styles = useStyles();

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button appearance='transparent' className={styles.button}>
                    <Label className={styles.label} size="large" weight="bold">{style}</Label>
                </Button>
            </MenuTrigger>
    
            <MenuPopover>
                <MenuList>
                    <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}`} key="All">
                        <Label className={styles.option} size="large" weight="bold">All</Label>
                    </MenuItemLink>
                    {optionList.map((option) => (
                        <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}?type=${option}`} key={option}>
                            <Label size="large" weight="bold">{option}</Label>
                        </MenuItemLink>
                    ))} 
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}
