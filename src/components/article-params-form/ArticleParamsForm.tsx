import { clsx } from 'clsx';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { SyntheticEvent, useRef, useState } from 'react';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';
import { Separator } from '../separator';
import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (params: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const rootRef = useRef<HTMLDivElement>(null);

	// Начальные значения состояния формы
	const initialArticleState = useRef(currentArticleState);

	const [newFontColor, setNewFontColor] = useState<OptionType>(
		initialArticleState.current.fontColor
	);
	const [newFontFamily, setNewFontFamily] = useState<OptionType>(
		initialArticleState.current.fontFamilyOption
	);
	const [newFontSize, setNewFontSize] = useState<OptionType>(
		initialArticleState.current.fontSizeOption
	);
	const [newBgColor, setNewBgColor] = useState<OptionType>(
		initialArticleState.current.backgroundColor
	);
	const [newContentWidth, setNewContentWidth] = useState<OptionType>(
		initialArticleState.current.contentWidth
	);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onClose: () => setIsOpen(!isOpen),
		onChange: setIsOpen,
	});

	const handleSubmitForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCurrentArticleState({
			...currentArticleState,
			fontColor: newFontColor,
			fontFamilyOption: newFontFamily,
			fontSizeOption: newFontSize,
			backgroundColor: newBgColor,
			contentWidth: newContentWidth,
		});
	};

	const handleResetForm = (e: SyntheticEvent<HTMLFormElement>) => {
		e.preventDefault();
		// Сбросить состояние формы к начальным значениям
		setNewFontColor(initialArticleState.current.fontColor);
		setNewFontFamily(initialArticleState.current.fontFamilyOption);
		setNewFontSize(initialArticleState.current.fontSizeOption);
		setNewBgColor(initialArticleState.current.backgroundColor);
		setNewContentWidth(initialArticleState.current.contentWidth);

		// Применить начальные значения к статье
		setCurrentArticleState({
			fontColor: initialArticleState.current.fontColor,
			fontFamilyOption: initialArticleState.current.fontFamilyOption,
			fontSizeOption: initialArticleState.current.fontSizeOption,
			backgroundColor: initialArticleState.current.backgroundColor,
			contentWidth: initialArticleState.current.contentWidth,
		});
	};

	return (
		<div ref={rootRef}>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					onReset={handleResetForm}
					onSubmit={handleSubmitForm}
					className={styles.form}>
					<Select
						options={fontFamilyOptions}
						placeholder={newFontFamily.value}
						selected={newFontFamily}
						onChange={setNewFontFamily}
						title='Шрифт'
					/>
					<RadioGroup
						name='Размер шрифта'
						options={fontSizeOptions}
						selected={newFontSize}
						title='Размер шрифта'
						onChange={setNewFontSize}
					/>
					<Select
						options={fontColors}
						placeholder={newFontColor.value}
						selected={newFontColor}
						onChange={setNewFontColor}
						title='Цвет шрифта'
					/>

					<Separator />

					<Select
						options={backgroundColors}
						placeholder={newBgColor.value}
						selected={newBgColor}
						onChange={setNewBgColor}
						title='Цвет фона'
					/>
					<Select
						options={contentWidthArr}
						placeholder={newContentWidth.value}
						selected={newContentWidth}
						onChange={setNewContentWidth}
						title='Цвет фона'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' className={styles.reset} />
						<Button title='Применить' type='submit' className={styles.submit} />
					</div>
				</form>
			</aside>
		</div>
	);
};
