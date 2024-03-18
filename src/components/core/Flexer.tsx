import React from 'react';

type FlexProps = {
  direction?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  children: React.ReactNode;
  className?: string;
  width?: string;
};

export default function Flexer({ width = 'w-full', direction = 'row', justify = 'flex-start', align = 'stretch', wrap = 'nowrap', children, className = '', ...rest }: FlexProps) {
  return (
    <div className={`flex ${width} ${direction} ${justify} ${align} ${wrap} ${className}`} {...rest}>
      {children}
    </div>
  );
};