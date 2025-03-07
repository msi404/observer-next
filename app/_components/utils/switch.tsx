import React, { ReactNode, FC, Children, isValidElement, ReactElement, JSXElementConstructor } from "react";

// Define Match Props
interface MatchProps {
  when: boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | undefined ; // Condition to check
  children: ReactNode; // Content to render if the condition is true
}

// Match Component
export const Match: FC<MatchProps> = ({ when, children }) => (when ? <>{children}</> : null);

// Define Switch Props
interface SwitchProps {
  children: ReactNode; // Multiple Match components
}

// Switch Component
export const Switch: FC<SwitchProps> = ({ children }) => {
  const validCase = Children.toArray( children ).find(
  // @ts-ignore
    (child) => isValidElement(child) && child.props.when
  );
  return validCase || null;
};
