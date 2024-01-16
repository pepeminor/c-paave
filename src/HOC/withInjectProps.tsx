import React, { ComponentType } from 'react';

/**
 * Injects props into a component
 *
 * @param Component to inject props into
 * @returns a function that takes in props to inject and returns a Injected Component
 */
export default function withInjectedProps<OriginalProps, AdditionalProps>(
  Component: ComponentType<OriginalProps & AdditionalProps>
) {
  return (props: AdditionalProps) => (hocProps: OriginalProps) =>
    <Component {...props} {...hocProps} children={undefined} />;
}
