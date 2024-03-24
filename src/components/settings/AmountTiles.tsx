
import React from "react";
import Flexer from "../core/Flexer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { useStore } from "@/core/state/store";
import SettingsShell from "./SettingsShell";
import { Input } from "@ui/index";

const GridSizeSelect = ({ onGridSizeChange }) => {
  const { rows, cols } = useStore();

  return (
    <Select value={`${rows}x${cols}`} onValueChange={onGridSizeChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Grid Size" />
      </SelectTrigger>
      <SelectContent>
        {["3x3", "5x5", "7x7", "9x9"].map(size => (
          <SelectItem key={size} value={size}>{size}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default function SelectTiles() {
  const { rows, cols, bombs, setRows, setCols, setBombs } = useStore();

  const handleGridSizeChange = (value: string) => {
    const [newRows, newCols] = value.split("x").map(Number);
    setRows(newRows);
    setCols(newCols);
  };

  return (
      <SettingsShell title="Grid size">
        <GridSizeSelect onGridSizeChange={handleGridSizeChange} />
      </SettingsShell>
  );
}