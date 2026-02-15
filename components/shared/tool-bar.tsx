"use client"

import type { Tool } from "@/lib/canvas-types"
import {
  MousePointer2,
  Hand,
  Square,
  Diamond,
  Circle,
  ArrowUpRight,
  Minus,
  Pencil,
  Type,
  Eraser,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ToolbarProps {
  activeTool: Tool
  onToolChange: (tool: Tool) => void
}

const tools: { id: Tool; icon: React.ElementType; label: string; shortcut: string }[] = [
  { id: "select", icon: MousePointer2, label: "Selection", shortcut: "V" },
  { id: "hand", icon: Hand, label: "Hand (pan)", shortcut: "H" },
  { id: "rectangle", icon: Square, label: "Rectangle", shortcut: "R" },
  { id: "diamond", icon: Diamond, label: "Diamond", shortcut: "D" },
  { id: "ellipse", icon: Circle, label: "Ellipse", shortcut: "O" },
  { id: "arrow", icon: ArrowUpRight, label: "Arrow", shortcut: "A" },
  { id: "line", icon: Minus, label: "Line", shortcut: "L" },
  { id: "freedraw", icon: Pencil, label: "Draw", shortcut: "P" },
  { id: "text", icon: Type, label: "Text", shortcut: "T" },
  { id: "eraser", icon: Eraser, label: "Eraser", shortcut: "E" },
]

export function Toolbar({ activeTool, onToolChange }: ToolbarProps) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="flex items-center gap-0.5 bg-card rounded-lg border border-border shadow-lg px-1.5 py-1.5">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isActive = activeTool === tool.id
          return (
            <Tooltip key={tool.id}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onToolChange(tool.id)}
                  className={`relative flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                  }`}
                  aria-label={tool.label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-2">
                <span>{tool.label}</span>
                <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground">
                  {tool.shortcut}
                </kbd>
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
