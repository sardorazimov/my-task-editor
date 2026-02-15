"use client"

import { Minus, Plus, Undo2, Redo2 } from "lucide-react"
import type { Camera } from "@/lib/canvas-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface BottomBarProps {
  camera: Camera
  onCameraChange: (camera: Camera) => void
  onUndo: () => void
  onRedo: () => void
}

export function BottomBar({ camera, onCameraChange, onUndo, onRedo }: BottomBarProps) {
  const zoomPercent = Math.round(camera.zoom * 100)

  const zoomIn = () => {
    const newZoom = Math.min(camera.zoom * 1.2, 5)
    onCameraChange({ ...camera, zoom: newZoom })
  }

  const zoomOut = () => {
    const newZoom = Math.max(camera.zoom / 1.2, 0.1)
    onCameraChange({ ...camera, zoom: newZoom })
  }

  const resetZoom = () => {
    onCameraChange({ x: 0, y: 0, zoom: 1 })
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2">
        {/* Zoom controls */}
        <div className="flex items-center gap-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={zoomOut}
                className="flex items-center justify-center w-9 h-9 text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Zoom out"
              >
                <Minus className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom out</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={resetZoom}
                className="flex items-center justify-center h-9 px-2 text-xs font-mono text-foreground/70 hover:bg-accent hover:text-foreground transition-colors min-w-[52px] border-x border-border"
                aria-label="Reset zoom"
              >
                {zoomPercent}%
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Reset zoom</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={zoomIn}
                className="flex items-center justify-center w-9 h-9 text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Zoom in"
              >
                <Plus className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Zoom in</TooltipContent>
          </Tooltip>
        </div>

        {/* Undo / Redo */}
        <div className="flex items-center gap-0 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onUndo}
                className="flex items-center justify-center w-9 h-9 text-foreground/70 hover:bg-accent hover:text-foreground transition-colors"
                aria-label="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="flex items-center gap-2">
              <span>Undo</span>
              <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground">
                Ctrl+Z
              </kbd>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={onRedo}
                className="flex items-center justify-center w-9 h-9 text-foreground/70 hover:bg-accent hover:text-foreground transition-colors border-l border-border"
                aria-label="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="flex items-center gap-2">
              <span>Redo</span>
              <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground">
                Ctrl+Shift+Z
              </kbd>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
