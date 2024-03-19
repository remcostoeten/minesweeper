import Flexer from "../core/Flexer";

interface BtnProps {
    text: string;
    onClick?: () => void;
    bg?: string;
    border?: boolean;
    disabled?: boolean;
}

export default function SelectMode(): JSX.Element {
    const Button = ({ text, onClick, bg = 'red-400', border = false, disabled = false }: BtnProps) => {
        return (
            <button
                onClick={onClick}
                className={`bg-${bg} ${disabled ? 'cursor-not-allowed' : '' } text-white w-full h-12 ${border ? 'border-outline' : ''} p-2 rounded-md`}
                disabled={disabled}
            >
                {text}
            </button>
        );
    };

    return (
        <>
            <div className="p-2 flex items-center justify-center bg-card-inner lg:flex-row flex-col">
                <Flexer direction="column" align="center" className="lg:flex-row flex-col">
                    <div className="lg:w-1/2 w-full bg-[#161821]">
                        <Button border text="Manual" />
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <Button bg="transparent" text="Autoplay" disabled />
                    </div>
                </Flexer>
            </div>
        </>
    );
}
