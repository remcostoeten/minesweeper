import React from 'react'

interface WrapperProps {
    as?: keyof JSX.IntrinsicElements
    isFullHeight?: boolean | string
    padding?: 'small' | 'regular' | 'large' | 'xl' | 'none'
    horizontalPadding?: string
    verticalPadding?: string
    hasDottedBg?: boolean
    hasTitle?: boolean
    children?: React.ReactNode
    isEmpty?: boolean
    className?: string
}

export default function Wrapper({
    as: Element = 'div',
    isFullHeight = 'min-h-dvh',
    padding = 'regular',
    horizontalPadding = '',
    verticalPadding = '',
    hasDottedBg = false,
    hasTitle = false,
    children,
    isEmpty,
    className,
    ...rest
}: WrapperProps) {
    const radius = 'rounded-sm'
    const defaultHorizontalPadding = padding === 'small' ? 'py-5' : padding === 'regular' ? 'py-10' : padding === 'large' ? 'py-16' : padding === 'none' ? '' : 'py-20'
    const defaultVerticalPadding = padding === 'small' ? 'px-5' : padding === 'regular' ? 'px-10' : padding === 'large' ? 'px-16' : padding === 'none' ? '' : 'px-20'
    const horizontalPaddingValue = horizontalPadding || defaultHorizontalPadding
    const verticalPaddingValue = verticalPadding || defaultVerticalPadding
    const paddingValues = `${horizontalPaddingValue} ${verticalPaddingValue}`
    const hasNoBg = 'bg-transparent'
    const isEmptyBg = !hasDottedBg && !hasTitle && hasNoBg
    const wrapperStyles: React.CSSProperties = {
        height: isFullHeight ? 'calc(100vh - 110px - 1rem)' : 'auto',
        marginBottom: '25px',
        position: 'relative',
        borderRadius: '16px',
    }

    const solidBgStyles: React.CSSProperties = {
        zIndex: -2,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        borderRadius: '1rem',
    }

    const dottedBgStyles: React.CSSProperties = hasDottedBg ? {
        // @ts-ignore
        '--dot-bg': '#131417',
        '--dot-color': '#26282c',
        '--dot-size': '3px',
        '--dot-space': '22px',
        background: `
            linear-gradient(90deg, var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            linear-gradient(var(--dot-bg) calc(var(--dot-space) - var(--dot-size)), transparent 1%) center / var(--dot-space) var(--dot-space),
            var(--dot-color)
        `,
        zIndex: -1,
        position: 'absolute',
        top: hasTitle ? '5%' : '0',
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '16px',
    } : {};

    const bgStyles = isEmpty ? { background: 'transparent' } : {};

    return (
        <Element
            className={`${radius} ${isEmptyBg ? 'bg-black dark:bg-[#131417]' : 'bg-block'} mb-10 pb-10 Wrapper ${hasTitle ? 'pt-10' : 'bg-block'} ${paddingValues} ${className} `}
            style={{ ...wrapperStyles, ...bgStyles, padding: `${verticalPaddingValue} ${horizontalPaddingValue}` }}
            {...rest}
        >
            {children}
            <div style={solidBgStyles} />
            {hasDottedBg ? (
                <div
                    className="dotted-bg"
                    style={dottedBgStyles}
                />
            ) : null}
        </Element>
    )
}

