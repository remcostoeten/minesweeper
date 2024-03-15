import React from 'react'

type WrapperProps = {
    title?: string;
    children?: React.ReactNode;
    description?: string;
}

export default function Wrapper(props: WrapperProps) {
    const { title, children, description } = props;

    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-2 text-text w-[100%]">
                <span className="text-md text-text">{title}</span>
                {description && <p>{description}</p>}
                {children}
            </div>
        </div>
    );
}
