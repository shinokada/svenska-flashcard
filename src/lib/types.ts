import type { SVGAttributes } from 'svelte/elements';
type TitleType = {
  id?: string;
  title?: string;
};

type DescType = {
  id?: string;
  desc?: string;
};

export interface BaseProps extends SVGAttributes<SVGElement> {
  size?: string;
  role?: string;
  color?: string;
  variation?: 'solid' | 'outline' | 'mini' | 'micro';
  strokeWidth?: string;
}

export interface Props extends BaseProps {
  title?: TitleType;
  desc?: DescType;
  ariaLabel?: string;
}

export interface BaseWord {
  category: string;
  explanation?: string;
  [key: string]: string | undefined;
}

export interface WordPair {
  front: string;
  back: string;
}

export type LangPair = {
  id: string;
  lang1Code: string;
  lang2Code: string;
  lang1: string;
  lang2: string;
  dir?: 'ltr' | 'rtl';
};
