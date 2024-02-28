import { Button } from "../ui";

interface GridSizeShellProps {
  onGridSizeChange: (size: number) => void;
}

export default function GridSizeShell({ onGridSizeChange }: GridSizeShellProps) {
  return (
    <div>
      <h2 className="text-sm font-medium uppercase tracking-widest mb-2">Grid Size</h2>
      <div className="flex space-x-2">
        <Button className="bg-[#1f1f38]" onClick={() => onGridSizeChange(3)}>3x3</Button>
        <Button className="bg-[#00f9ff]" onClick={() => onGridSizeChange(5)}>5x5</Button>
        <Button className="bg-[#1f1f38]" onClick={() => onGridSizeChange(7)}>7x7</Button>
        <Button className="bg-[#1f1f38]" onClick={() => onGridSizeChange(9)}>9x9</Button>
      </div>
    </div>
  );
}
