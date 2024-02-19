import React from 'react'
import { Menu, MenuTrigger, MenuPopover, MenuList, MenuItemLink, Button, Text, Subtitle2, makeStyles, shorthands, MenuItem, mergeClasses } from "@fluentui/react-components"
import { useRouter } from "next/router"

import { ChevronDown20Regular } from "@fluentui/react-icons"

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
	},
	text: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	}
})

const useHoverStyles = makeStyles({
    hoverTransition: {
      transitionProperty: 'transform',
      transitionDuration: "0.25s",
      transitionTimingFunction: "linear"
    },
    hoverEffect: {
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
})

export default function FilterMenu({ style }) {
	const router = useRouter()
	const styles = useStyles()
	const hoverStyles = useHoverStyles()

	const handleNavigation = (route) => {
		router.push(route)
	}

    return (
		<Menu openOnHover="true">
			<MenuTrigger disableButtonEnhancement>
				<Button appearance="transparent" className={mergeClasses(styles.button, hoverStyles.hoverEffect, hoverStyles.hoverTransition)}>
					<div className={styles.text}>
						<Text size={400} weight="semi-bold">{style}</Text>
						<ChevronDown20Regular/>
					</div>
                </Button>
			</MenuTrigger>
			<MenuPopover>
				<MenuList>
					<MenuItemLink onClick={() => handleNavigation(`${process.env.NEXT_PUBLIC_API_URL}/${style.toLowerCase()}`)} key="All">
						<Text size={300} weight="semi-bold">All</Text>
					</MenuItemLink>
					{optionList.map((option, index) => (
						option.label ? (
							<Menu key={index}>
							<MenuTrigger disableButtonEnhancement>
								<MenuItem>
								<Text size={300} weight="semi-bold">{option.label}</Text>
								</MenuItem>
							</MenuTrigger>
							<MenuPopover>
								<MenuList>
								{option[style]?.map((item) => (
									<MenuItemLink
									onClick={() => handleNavigation(`/${style.toLowerCase()}?type=${item}`)}
									key={`${option.label}_${item}`}
									>
										<Text size={300} weight="semi-bold">{item}</Text>
									</MenuItemLink>
								))}
								</MenuList>
							</MenuPopover>
							</Menu>
						) : (
							<MenuItemLink
							onClick={() => handleNavigation(`/${style.toLowerCase()}?type=${option}`)}
							key={option}
							>
								<Text size={300} weight="semi-bold">{option}</Text>
							</MenuItemLink>
						)
						))}

				</MenuList>
			</MenuPopover>
		</Menu>
    )
}
