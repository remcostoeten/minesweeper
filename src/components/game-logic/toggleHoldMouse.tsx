import { Switch } from "../ui/switch";

export default function ToggleHoldMouse({ toggleHoldMouse, toggleHoldMouseClick }: { toggleHoldMouse: boolean; toggleHoldMouseClick: () => void }) {
    return (
        <div>
            <h4>Toggle Hold Mouse</h4>
            <p>Toggle to allow for holding the mouse button to reveal cells</p>
            <Switch checked={toggleHoldMouse} onClick={toggleHoldMouseClick} />
            Currently {toggleHoldMouse ? 'enabled' : 'disabled'}
        </div>
    );
}