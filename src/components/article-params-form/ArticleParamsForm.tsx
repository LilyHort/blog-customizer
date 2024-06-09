import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { ArticleStateType, OptionType, fontColors, fontFamilyOptions, fontSizeOptions, backgroundColors, contentWidthArr } from 'src/constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';
import { defaultArticleState } from '../../constants/articleProps';
import { Text } from 'components/text';
import { Separator } from '../separator/Separator';

type ArticleParamsFormProps = {
	currenArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
}

export const ArticleParamsForm = ({currenArticleState, setCurrentArticleState}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [newFontColor, setNewFontColor] = useState<OptionType>(currenArticleState.fontColor);
	const [newFontFamily, setNewFontFamily] = useState<OptionType>(currenArticleState.fontFamilyOption);
	const [newFontSize, setNewFontSize] = useState<OptionType>(currenArticleState.fontSizeOption);
	const [newBackgroundColor, setNewBackgroundColor] = useState<OptionType>(currenArticleState.backgroundColor)
	const [newContentWidth, setNewContentWidth] = useState<OptionType>(currenArticleState.contentWidth)

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () =>setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	const handleSubmitForm = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState({
			...currenArticleState,
			fontColor: newFontColor,
			fontSizeOption: newFontSize,
			fontFamilyOption: newFontFamily,
			backgroundColor: newBackgroundColor,
			contentWidth: newContentWidth
		})
	}

	const handleResetForm = (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		setNewFontFamily(defaultArticleState.fontFamilyOption);
		setNewFontColor(defaultArticleState.fontColor);
		setNewFontSize(defaultArticleState.fontSizeOption);
		setNewBackgroundColor(defaultArticleState.backgroundColor);
		setNewContentWidth(defaultArticleState.contentWidth);
		setCurrentArticleState(defaultArticleState);

	}



	return (
		<div ref={rootRef}>
			<ArrowButton isOpen = {isOpen} onClick = {() => setIsOpen(!isOpen)} />
			<aside className={clsx(styles.container, isOpen && styles.container_open)}>

				<form onSubmit={handleSubmitForm} onReset={handleResetForm} className={styles.form}>
				<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
				<Select options={fontFamilyOptions}
						placeholder={newFontFamily.value}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title="Шрифт"/>
				<RadioGroup options={fontSizeOptions}
						name="radio"
						selected={newFontSize}
						onChange={setNewFontSize}
						title="Размер шрифта"/>
				<Select  options={fontColors}
						 placeholder={newFontColor.value}
						 selected={newFontColor}
						 onChange={setNewFontColor}
						 title="Цвет шрифта" />
				<Separator/>
				<Select  options={backgroundColors}
						 placeholder={newBackgroundColor.value}
						 selected={newBackgroundColor}
						 onChange={setNewBackgroundColor}
						 title="Цвет фона" />
				<Select  options={contentWidthArr}
						 placeholder={newContentWidth.value}
						 selected={newContentWidth}
						 onChange={setNewContentWidth}
						 title="Цвет фона" />
					<div className={styles.bottomContainer}>

						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
