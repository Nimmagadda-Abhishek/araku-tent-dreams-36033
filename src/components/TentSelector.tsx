import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TentSelectorProps {
  selectedTents: number[];
  onTentSelect: (tentNumber: number) => void;
  bookedTents: number[];
}

const TentSelector = ({ selectedTents, onTentSelect, bookedTents }: TentSelectorProps) => {
  const totalTents = 50;
  const tents = Array.from({ length: totalTents }, (_, i) => i + 1);

  const getTentStatus = (tentNumber: number) => {
    if (bookedTents.includes(tentNumber)) return "booked";
    if (selectedTents.includes(tentNumber)) return "selected";
    return "available";
  };

  const getTentColor = (status: string) => {
    switch (status) {
      case "booked": return "bg-destructive hover:bg-destructive cursor-not-allowed";
      case "selected": return "bg-accent hover:bg-accent";
      case "available": return "bg-primary hover:bg-primary/80";
      default: return "bg-muted";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <span className="text-sm">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-destructive" />
          <span className="text-sm">Booked</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-accent" />
          <span className="text-sm">Selected</span>
        </div>
      </div>

      <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 p-4 bg-muted/30 rounded-lg">
        {tents.map((tentNumber) => {
          const status = getTentStatus(tentNumber);
          const isDisabled = status === "booked";
          
          return (
            <button
              key={tentNumber}
              onClick={() => !isDisabled && onTentSelect(tentNumber)}
              disabled={isDisabled}
              className={`
                relative w-full aspect-square rounded-lg
                ${getTentColor(status)}
                text-primary-foreground font-semibold text-xs sm:text-sm
                transition-all duration-200
                ${!isDisabled && "hover:scale-110"}
                ${isDisabled && "opacity-50"}
                flex items-center justify-center
              `}
              title={`Tent ${tentNumber} - ${status}`}
            >
              T{tentNumber}
            </button>
          );
        })}
      </div>

      <div className="bg-card p-4 rounded-lg border border-border">
        <h4 className="font-semibold mb-2">Selected Tents:</h4>
        {selectedTents.length === 0 ? (
          <p className="text-muted-foreground text-sm">No tents selected</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {selectedTents.map((tent) => (
              <Badge key={tent} variant="secondary">
                Tent {tent}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TentSelector;
