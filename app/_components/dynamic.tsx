import React, {type ComponentType, type ReactElement, isValidElement, type JSX } from "react";

interface DynamicProps<T = any> {
  component: ComponentType<T> | keyof JSX.IntrinsicElements | ReactElement | null; // Accepts React components or HTML tags
  [key: string]: any; // Allow additional props
}

export const Dynamic = <T,>({ component: Component, ...props }: DynamicProps<T>): JSX.Element | null => {
  if (!Component) return null;

  return isValidElement(Component) ? (
    React.cloneElement(Component, props)
  ) : (
	// @ts-ignore
    <Component {...(props as T)} />
  );
};
