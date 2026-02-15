"use client"

import type { FillStyle, StrokeStyle, CanvasElement } from "@/lib/canvas-types"
import { STROKE_COLORS, FILL_COLORS, STROKE_WIDTHS } from "@/lib/canvas-types"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

interface PropertiesPanelProps {
  strokeColor: string
  fillColor: string
  fillStyle: FillStyle
  strokeWidth: number
  strokeStyle: StrokeStyle
  opacity: number
  roughness: number
  onStrokeColorChange: (c: string) => void
  onFillColorChange: (c: string) => void
  onFillStyleChange: (f: FillStyle) => void
  onStrokeWidthChange: (w: number) => void
  onStrokeStyleChange: (s: StrokeStyle) => void
  onOpacityChange: (o: number) => void
  onRoughnessChange: (r: number) => void
  selectedElements: CanvasElement[]
  onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void
}

export function PropertiesPanel({
  strokeColor,
  fillColor,
  fillStyle,
  strokeWidth,
  strokeStyle,
  opacity,
  roughness,
  onStrokeColorChange,
  onFillColorChange,
  onFillStyleChange,
  onStrokeWidthChange,
  onStrokeStyleChange,
  onOpacityChange,
  onRoughnessChange,
  selectedElements,
  onUpdateElement,
}: PropertiesPanelProps) {
  const handleStrokeColorChange = (c: string) => {
    onStrokeColorChange(c)
    selectedElements.forEach((el) => onUpdateElement(el.id, { strokeColor: c }))
  }

  const handleFillColorChange = (c: string) => {
    onFillColorChange(c)
    selectedElements.forEach((el) => onUpdateElement(el.id, { fillColor: c }))
  }

  const handleFillStyleChange = (f: FillStyle) => {
    onFillStyleChange(f)
    selectedElements.forEach((el) => onUpdateElement(el.id, { fillStyle: f }))
  }

  const handleStrokeWidthChange = (w: number) => {
    onStrokeWidthChange(w)
    selectedElements.forEach((el) => onUpdateElement(el.id, { strokeWidth: w }))
  }

  const handleStrokeStyleChange = (s: StrokeStyle) => {
    onStrokeStyleChange(s)
    selectedElements.forEach((el) => onUpdateElement(el.id, { strokeStyle: s }))
  }

  const handleOpacityChange = (o: number) => {
    onOpacityChange(o)
    selectedElements.forEach((el) => onUpdateElement(el.id, { opacity: o }))
  }

  const handleRoughnessChange = (r: number) => {
    onRoughnessChange(r)
    selectedElements.forEach((el) => onUpdateElement(el.id, { roughness: r }))
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed left-4 top-20 z-40 w-52 bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        {/* Stroke */}
        <div className="p-3 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Stroke</p>
          <div className="flex flex-wrap gap-1.5">
            {STROKE_COLORS.map((c) => (
              <Tooltip key={c}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-6 h-6 rounded-md border-2 transition-all ${
                      strokeColor === c ? "border-primary scale-110" : "border-transparent"
                    }`}
                    style={{ backgroundColor: c }}
                    onClick={() => handleStrokeColorChange(c)}
                    aria-label={`Stroke color ${c}`}
                  />
                </TooltipTrigger>
                <TooltipContent side="right">{c}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Fill */}
        <div className="p-3 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Background</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {FILL_COLORS.map((c) => (
              <Tooltip key={c}>
                <TooltipTrigger asChild>
                  <button
                    className={`w-6 h-6 rounded-md border-2 transition-all ${
                      fillColor === c ? "border-primary scale-110" : "border-border"
                    } ${c === "transparent" ? "bg-card" : ""}`}
                    style={c !== "transparent" ? { backgroundColor: c } : undefined}
                    onClick={() => handleFillColorChange(c)}
                    aria-label={c === "transparent" ? "No fill" : `Fill color ${c}`}
                  >
                    {c === "transparent" && (
                      <svg viewBox="0 0 16 16" className="w-full h-full text-muted-foreground">
                        <line x1="0" y1="16" x2="16" y2="0" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  {c === "transparent" ? "None" : c}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          {fillColor !== "transparent" && (
            <div className="flex gap-1">
              {(["solid", "hachure", "cross-hatch"] as FillStyle[]).map((f) => (
                <button
                  key={f}
                  className={`flex-1 px-2 py-1 text-[10px] font-medium rounded transition-colors ${
                    fillStyle === f
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-accent"
                  }`}
                  onClick={() => handleFillStyleChange(f)}
                >
                  {f === "cross-hatch" ? "Cross" : f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Stroke Width */}
        <div className="p-3 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Stroke width</p>
          <div className="flex gap-1.5">
            {STROKE_WIDTHS.map((w) => (
              <button
                key={w}
                className={`flex-1 flex items-center justify-center py-1.5 rounded transition-colors ${
                  strokeWidth === w
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => handleStrokeWidthChange(w)}
              >
                <div
                  className="rounded-full bg-current"
                  style={{ width: w * 3 + 4, height: w * 3 + 4 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Stroke Style */}
        <div className="p-3 border-b border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Stroke style</p>
          <div className="flex gap-1">
            {(["solid", "dashed", "dotted"] as StrokeStyle[]).map((s) => (
              <button
                key={s}
                className={`flex-1 flex items-center justify-center py-1.5 rounded transition-colors ${
                  strokeStyle === s
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-accent"
                }`}
                onClick={() => handleStrokeStyleChange(s)}
              >
                <svg viewBox="0 0 40 4" className="w-8 h-1">
                  <line
                    x1="0"
                    y1="2"
                    x2="40"
                    y2="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={
                      s === "dashed" ? "8,4" : s === "dotted" ? "2,4" : undefined
                    }
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders */}
        <div className="p-3 border-b border-border">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-muted-foreground">Sloppiness</p>
            <span className="text-[10px] text-muted-foreground tabular-nums">{roughness.toFixed(1)}</span>
          </div>
          <Slider
            value={[roughness]}
            min={0}
            max={3}
            step={0.5}
            onValueChange={([v]) => handleRoughnessChange(v)}
            className="w-full"
          />
        </div>

        <div className="p-3">
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-xs font-medium text-muted-foreground">Opacity</p>
            <span className="text-[10px] text-muted-foreground tabular-nums">{Math.round(opacity * 100)}%</span>
          </div>
          <Slider
            value={[opacity]}
            min={0.1}
            max={1}
            step={0.1}
            onValueChange={([v]) => handleOpacityChange(v)}
            className="w-full"
          />
        </div>
      </div>
    </TooltipProvider>
  )
}
