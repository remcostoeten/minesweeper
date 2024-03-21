type EuroSignProps = {
    children?: React.ReactNode;
    variant?: 'input';
};

export default function EuroSign({ variant }: EuroSignProps) {
    return (
        <span className={variant === 'input' ? "text-text absolute left-2 top-1/2 transform -translate-y-1/2" : ""}>
            €
        </span>
    );
}
