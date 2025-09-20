import { pairs, type LangPair } from './config';

export function removeHyphensAndCapitalize(str: string) {
	// Handle empty string or strings without '-'
	if (!str || !str.includes('-')) {
		return str;
	}

	// Capitalize the first letter (including after hyphens)
	const capitalized = str.replace(/(^|\s|-)\w/g, (match) => match.toUpperCase());

	// Remove hyphens and ensure spaces after words
	return capitalized.replace(/-|\s{2,}/g, ' ');
}

export function randomword(wordList: string[]) {
	return wordList[Math.floor(Math.random() * wordList.length)];
}

export function getRandomItemFromDictionary<T>(dictionary: { [key: string]: T }): {
	[key: string]: T;
} {
	const keys = Object.keys(dictionary);
	const randomKey = keys[Math.floor(Math.random() * keys.length)];

	return {
		[randomKey]: dictionary[randomKey]
	};
}

export const randomNumberGenerator = (
	min: number,
	max: number,
	maxConsecutiveRepeats: number
): (() => number) => {
	const previousNumbers: number[] = [];

	return () => {
		let randomNumber;

		do {
			randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
		} while (previousNumbers.includes(randomNumber));

		if (previousNumbers.length >= maxConsecutiveRepeats) {
			previousNumbers.shift();
		}

		previousNumbers.push(randomNumber);

		return randomNumber;
	};
};

type WordEntry = Record<string, string> & {
  category: string;
  explanation?: string;
};

export function getRandomPair(
	jsonData: WordEntry[],
	langlang: string,
	pairs: LangPair,
	isExplain = false,
	maxConsecutiveRepeats = 50
) {
	const randomIndexFn = randomNumberGenerator(0, jsonData.length - 1, maxConsecutiveRepeats);
	const randomIndex = randomIndexFn();
	const randomPair = jsonData[randomIndex];
	
	let front: string;
	let back: string;

	if (isExplain) {
		const lang1Value = randomPair[pairs.lang1Code] || '';
		const lang2Value = randomPair[pairs.lang2Code] || '';
		const explanation = randomPair.explanation || '';

		switch (langlang) {
			case 'lang1lang2':
				front = lang1Value;
				back = lang2Value;
				break;
			case 'lang2lang1':
				front = lang2Value;
				back = lang1Value;
				break;
			case 'lang1lang1':
				front = explanation;
				back = lang1Value;
				break;
			default:
				front = lang1Value;
				back = lang2Value;
		}

		return { front, back, explanation };
	} else {
		const lang1Value = randomPair[pairs.lang1Code] || '';
		const lang2Value = randomPair[pairs.lang2Code] || '';

		if (langlang === 'lang1lang2') {
			front = lang1Value;
			back = lang2Value;
		} else if (langlang === 'lang2lang1') {
			front = lang2Value;
			back = lang1Value;
		} else {
			front = lang1Value;
			back = lang2Value;
		}

		return { front, back };
	}
}

export function openTab(word: string, website: string) {
	let baseUrl = '';
	if (website === 'google') {
		baseUrl = 'https://translate.google.com/?hl=en&tab=TT&sl=no&tl=en&op=translate&text=';
	} else {
		baseUrl = 'https://ordbokene.no/bm/search?q=';
	}

	const url = baseUrl + encodeURIComponent(word);
	window.open(url, '_blank');
}

export function cleanWord(word: string) {
	// Remove characters after '/'
	const withoutSlash = word.replace(/\/.*$/, '');

	// Remove characters after ','
	const withoutComma = withoutSlash.replace(/,.*/, '');

	// Remove characters after ' -'
	const withoutHyphen = withoutComma.replace(/ -.*/, '');

	return withoutHyphen.trim(); // Trim to remove leading/trailing spaces
}
