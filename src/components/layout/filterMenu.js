import React from 'react'
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink, Button, Text, Subtitle2, makeStyles, shorthands } from "@fluentui/react-components"

const optionList = ["Outfit Showcase","Activewear", "Coats", "Jackets & Blazers", "Suits & Separates", "Dresses", "Jeans & Denim", "Loungewear", "Pants & Leggings", "Skirts", "Sleepwear", "Sweaters", "Sweatshirts & Hoodies", "Swimsuits & Cover-Ups", "T-Shirt and Tops", "Shoes", "Accessory", "Underwear", "Bra", "Shorts", "Swimwear", "Dress Shirt", "Blouses", "Jumpsuits & Rompers"]


const useStyles = makeStyles({
    button: {
        ...shorthands.padding("15px")
    }
})

export default function FilterMenu({ style }) {
    const styles = useStyles();

    return (
        <Menu>
            <MenuTrigger disableButtonEnhancement>
                <Button appearance='transparent' className={styles.button}>
                    <Text size={600}>{style}</Text>
                </Button>
            </MenuTrigger>
    
            <MenuPopover>
                <MenuList>
                    <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}`} key="All">
                        <Subtitle2>All</Subtitle2>
                    </MenuItemLink>
                    {optionList.map((option) => (
                        <MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}?type=${option}`} key={option}>
                            <Subtitle2>{option}</Subtitle2>
                        </MenuItemLink>
                    ))} 
                </MenuList>
            </MenuPopover>
        </Menu>
    )
}
