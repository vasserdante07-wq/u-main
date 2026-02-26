import {
  css,
  CSSObject,
  SimpleInterpolation,
  FlattenSimpleInterpolation,
} from "styled-components";

// Media Queries
export const sizes: ObjectMap<number> = {
  xxl: 1800,
  xl: 1600,
  laptop: 1440,
  large: 1200,
  medium: 992,
  small: 768,
  xsmall: 376,
};

type ObjectMap<T> = { [key: string]: T };

export const media = Object.keys(sizes).reduce(
  (
    acc: {
      [key: string]: (
        first: TemplateStringsArray | CSSObject,
        ...interpolations: SimpleInterpolation[]
      ) => FlattenSimpleInterpolation;
      // ^^^ this is the first implementation of  `BaseThemedCssFunction`
    },
    label
  ) => {
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label]}px) {
        ${css(...args)};
      }
    `;
    return acc;
  },
  {}
);

// Transitions
export const TransitionMixin = (transitionSpeed: string) => ` 
      -moz-transition:    ${transitionSpeed};
      -o-transition:      ${transitionSpeed};
      -webkit-transition: ${transitionSpeed};
      transition:         ${transitionSpeed};    
  `;

// ${TransitionMixin('.25s')}

export function truncateText(text: string, amount: number) {
  const words = text.split(" ");
  const truncated = words.slice(0, amount).join(" ");

  if (words.length > amount) {
    return truncated + "...";
  }

  return truncated;
}

export function sortByDate(array: any[]) {
  array.sort(function (a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return array;
}
