import React from 'react';
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink, Button, Text, Subtitle2, makeStyles, shorthands, MenuItem } from "@fluentui/react-components";

const optionList = [
	"Accessory",
	"Activewear",
	{
		label: "Bottom",
		Androgynous: ["Dress Pants", "Jeans & Denim", "Pants & Leggings", "Shorts", "Skirts"],
		Feminine: ["Dress Pants", "Jeans & Denim", "Pants & Leggings", "Shorts", "Skirts"],
		Masculine: ["Dress Pants", "Jeans & Denim", "Pants & Leggings", "Shorts"],
	},
	"Loungewear",
	"Outfit Showcase",
	"Shoes",
	"Sleepwear",
	"Swimwear",
	{
		label: "Top",
		Androgynous: ["Blouses", "Coats", "Dresses", "Dress Shirt", "Jackets & Blazers", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "T-Shirt"],
		Feminine: ["Blouses", "Coats", "Dresses", "Jackets & Blazers", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "T-Shirt"],
		Masculine: ["Coats", "Dress Shirt", "Jackets & Blazers", "Suits & Separates", "Sweaters", "Sweatshirts & Hoodies", "T-Shirt"],
	},
	{
		label: "Undergarments",
		Androgynous: ["Underwear", "Bra"],
		Feminine: ["Underwear", "Bra"],
		Masculine: ["Underwear"],
	},
]

const useStyles = makeStyles({
button: {
	...shorthands.padding("15px")
}
});

export default function FilterMenu({ style }) {
    const styles = useStyles()

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
						option.label ? (
							<Menu>
								<MenuTrigger disableButtonEnhancement>
									<MenuItem><Subtitle2>{option.label}</Subtitle2></MenuItem>
								</MenuTrigger>
								<MenuPopover>
									<MenuList>
										{option[style]?.map((item) => (
											<MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}?type=${item}`} key={item}>
											<Subtitle2>{item}</Subtitle2>
										</MenuItemLink>
										))}
									</MenuList>
								</MenuPopover>
							</Menu>
						) : (
							<MenuItemLink href={`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}?type=${option}`} key={option}>
								<Subtitle2>{option}</Subtitle2>
							</MenuItemLink>
						)
					))}
				</MenuList>
			</MenuPopover>
		</Menu>
    )
}