import { Switch } from "../ui/switch";

export default function FreezeGame({ freezeGame, freezeGameClick }: { freezeGame: boolean; freezeGameClick: () => void }) {
    return (
        <div>
            <h4>Freeze game</h4>
            <Switch checked={freezeGame} onClick={freezeGameClick} />
        </div>
    );
}

