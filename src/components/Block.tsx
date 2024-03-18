import React from 'react'

type ResponsiveProps = {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
};

type BlockProps = {
    padding?: string;
    bg?: string;
    margin?: string;
    width?: string;
    className?: string;
    children: React.ReactNode;
    direction?: 'col' | 'row';
    responsive?: ResponsiveProps;
};

export default function Block({width = '30' ,padding = '6', children, bg = 'card', margin = 'm-4',  className, direction = 'col', responsive = {}, ...rest }: BlockProps) {
    const responsiveClasses = Object.entries(responsive).map(([key, value]) => `${key}:${value}`).join(' ');
    return (
        <div className={`p-${padding} rounded-md border-outline bg-${bg} w-${width} h-screen ${margin} ${className} flex flex-${direction} ${responsiveClasses}`} {...rest}>
            {children}
        </div>
    )
}