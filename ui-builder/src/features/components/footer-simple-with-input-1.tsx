import { ReactNode } from 'react'
import imageUrl from '../../assets/components/footer-simple-with-input-1.png'
import { deserializeElement } from '../../utils/deserialize'
import { box, form, frame, img, input, link, submit, txt } from '../elements/constructor'
import { BoxElement } from '../elements/extensions/box'
import { ButtonElement } from '../elements/extensions/button'
import { ImageElement } from '../elements/extensions/image'
import { LinkElement } from '../elements/extensions/link'
import { TextElement } from '../elements/extensions/text'
import { useSelectedElement } from '../selection/use-selected-component'
import { ButtonStyler } from '../simple/stylers/button-styler'
import { ImageStyler } from '../simple/stylers/image-styler'
import { LinkStyler } from '../simple/stylers/link-styler'
import { TextStyler } from '../simple/stylers/text-styler'
import { Component, ElementOptions } from './component'
import { DividerCollapsible } from './helpers'
import { ComponentWrapper } from './helpers/component-wrapper'
import { DndTabs } from './helpers/dnd-tabs'
import { OptionsWrapper } from './helpers/options-wrapper'

export class FooterSimpleWithInput extends Component {
	name = 'Simple footer with input'
	image = imageUrl
	defaultData = deserializeElement(defaultData)

	renderOptions(options: ElementOptions): ReactNode {
		return <FooterSimpleWithInputOptions options={options} />
	}
}

// =============  renderOptions =============

function FooterSimpleWithInputOptions({ options }: { options: ElementOptions }) {
	const component = useSelectedElement<BoxElement>()!
	const logo = component.find<ImageElement>(tagIds.logo)!
	const topLinks = component.find(tagIds.topLinks) as BoxElement
	const bottomLinks = component.find(tagIds.bottomLinks) as BoxElement
	const bottomText = component.find(tagIds.bottomText) as TextElement
	const inputDesc = component.find(tagIds.inputDesc) as TextElement
	const inputLabel = component.find(tagIds.inputLabel) as TextElement
	const button = component.find(tagIds.button) as ButtonElement
	return (
		<ComponentWrapper name="Simple footer with input">
			<ImageStyler element={logo} />
			<DividerCollapsible closed title="Input">
				<TextStyler label="Input Label " element={inputLabel} />
				<ButtonStyler label="Submit button" element={button} />
				<TextStyler label="Input description text" element={inputDesc} />
			</DividerCollapsible>
			<DividerCollapsible closed title="Top links">
				<DndTabs
					containerElement={topLinks}
					renderItemOptions={(item) => <TopLinksOptions item={item as LinkElement} />}
					insertElement={() => createLink('New link')}
				/>
			</DividerCollapsible>

			<DividerCollapsible closed title="Bottom links">
				<TextStyler label="Bottom text" element={bottomText} />

				<DndTabs
					containerElement={bottomLinks}
					renderItemOptions={(item) => <TopLinksOptions item={item as LinkElement} />}
					insertElement={() => createLink('New link', true)}
				/>
			</DividerCollapsible>
		</ComponentWrapper>
	)
}

function TopLinksOptions({ item }: { item: LinkElement }) {
	const link = item
	const text = item.children?.[0] as TextElement

	return (
		<OptionsWrapper>
			<LinkStyler label="Link" element={link} />
			<TextStyler label="Text" element={text} />
		</OptionsWrapper>
	)
}

// =============  defaultData =============

const tagIds = {
	logo: 'logo',
	button: 'button',
	inputDesc: 'inputDesc',
	inputLabel: 'inputLabel',
	form: 'form',
	submit: 'submit',
	topLinks: 'topLinks',
	bottomLinks: 'bottomLinks',
	bottomText: 'bottomText',
}

const logo = img('https://files.dotenx.com/assets/logo1-fwe14we.png')
	.tag(tagIds.logo)
	.alt('Logo')
	.css({
		maxWidth: '100px',
	})

const createLink = (text: string, underline?: boolean) => {
	const l = link()
		.txt(text)
		.href('#')
		.css({
			borderBottomWidth: '2px',
			borderBottomStyle: 'solid',
			borderBottomColor: 'white',
			...(underline
				? {
						textDecoration: 'underline',
				  }
				: {
						textDecoration: 'none',
						fontWeight: '600',
				  }),
		})
		.cssHover({
			borderBottomColor: '#0e0e0e',
			transition: 'border-bottom-color 0.2s',
			textDecoration: 'none',
		})
	l.children[0].css({
		fontSize: '1rem',
		color: '#000000',
	})
	return l
}

const topLinks = [
	createLink('About us'),
	createLink('Contact us'),
	createLink('Terms of use'),
	createLink('FAQ'),
]

const bottomLinks = [
	createLink('Terms and conditions', true),
	createLink('Privacy Policy', true),
	createLink('Cookie policy', true),
	createLink('Sitemap', true),
]
const topFooterLeft = box([
	logo,
	box(topLinks)
		.tag(tagIds.topLinks)
		.css({
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			gap: '1rem',
		})
		.cssMobile({
			flexDirection: 'column',
			alignItems: 'start',
		}),
])
	.css({
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'start',
		justifyContent: 'center',
		rowGap: '2rem',
	})
	.cssTablet({})
	.cssMobile({})
const topFooterRight = box([
	form([
		txt('Subscribe')
			.tag(tagIds.inputLabel)
			.css({
				fontSize: '16px',
				fontWeight: '600',
				gridColumn: 'span 3 / span 3',
				textAlign: 'left',
			})
			.cssTablet({}),
		input().type('text').placeholder('Enter your email address').setName('email').css({
			borderWidth: '1px',
			borderColor: '#000',
			borderStyle: 'solid',
			borderRadius: '5px',
			padding: '10px',
			width: '100%',
			fontSize: '16px',
			fontWeight: '500',
			color: '#6B7280',
			outline: 'none',
			gridColumn: 'span 2 / span 3',
		}),
		submit('Subscribe')
			.tag(tagIds.submit)
			.css({
				backgroundColor: '#000',
				color: '#fff',
				border: 'none',
				padding: '10px',
				borderRadius: '5px',
				fontSize: '16px',
				fontWeight: '500',
				outline: 'none',
				textAlign: 'center',
			})
			.class('submit')
			.tag(tagIds.button),
		txt('By subscribing you agree to with our Privacy Policy')
			.tag(tagIds.inputDesc)
			.css({
				gridColumn: 'span 3 / span 3',

				fontSize: '14px',
			})
			.cssTablet({
				marginBottom: '10px',
			}),
	])
		.tag(tagIds.form)
		.css({
			display: 'grid',
			gridTemplateColumns: '1fr 1fr 1fr',
			minWidth: '400px',
			gap: '10px',
		})
		.cssTablet({
			minWidth: '300px',
		})
		.cssMobile({
			minWidth: '200px',
		}),
])
	.css({
		display: 'flex',
		flexWrap: 'wrap',
		flexDirection: 'column',
		alignItems: 'end',
		justifyContent: 'center',
		rowGap: '1rem',
	})
	.cssTablet({ alignItems: 'start', rowGap: '5px', marginTop: '2rem' })
	.cssMobile({})

const topFooter = box([topFooterLeft, topFooterRight])
	.css({
		display: 'grid',
		paddingBottom: '4rem',
		gridTemplateColumns: ' 1fr 1fr',
		borderBottomWidth: '1px',
		borderBottomStyle: 'solid',
		borderColor: 'black',
	})
	.cssTablet({
		gridTemplateColumns: ' 1fr',

		minWidth: '300px',
	})
	.cssMobile({
		minWidth: '200px',
	})

const bottomFooter = box([
	txt('© 2023 Company name. All rights reserved.')
		.tag(tagIds.bottomText)
		.css({
			fontSize: '14px',
		})
		.cssTablet({
			marginBottom: '10px',
		})
		.cssMobile({ order: 2, marginTop: '1rem' }),

	box(bottomLinks)
		.tag(tagIds.bottomLinks)
		.css({
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-between',
			gap: '10px',
		})
		.cssMobile({
			flexDirection: 'column',
			alignItems: 'start',
		}),
])
	.css({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: '3rem',
		flexWrap: 'wrap',
	})
	.cssTablet({
		paddingTop: '3rem',
	})
	.cssMobile({
		flexDirection: 'column',
		alignItems: 'start',
		paddingTop: '2rem',
	})

const wrapperDiv = frame([topFooter, bottomFooter]).css({
	flexDirection: 'column',
	alignItems: 'stretch',
})

const defaultData = wrapperDiv.serialize()