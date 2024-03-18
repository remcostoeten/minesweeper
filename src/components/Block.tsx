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
        width?: string | '[30%]' | 'w-1/3' | 'w-fit'| 'w-full'| 'w-1/6';
        className?: string;
        children: React.ReactNode;
        direction?: 'col' | 'row';
        responsive?: ResponsiveProps;
        as?: keyof JSX.IntrinsicElements;
};

export default function Block({width = '30' ,padding = '6', children, bg = 'card', margin ,  className, direction = 'col', responsive = {}, as = 'div', ...rest }: BlockProps) {
    const responsiveClasses = Object.entries(responsive).map(([key, value]) => `${key}:${value}`).join(' ');
    const AsComponent = as as keyof JSX.IntrinsicElements;
    return (
        <AsComponent className={`p-${padding} rounded-md border-outline bg-${bg} w-${width} h-screen ${margin} ${className} flex flex-${direction} ${responsiveClasses}`} {...rest}>
            {children}
        </AsComponent>
    )
}