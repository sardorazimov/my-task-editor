"use client"

import { Undo2, Redo2, Trash2, Copy, Download, Upload } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import type { CanvasElement } from "@/lib/canvas-types"

interface ActionsBarProps {
  onUndo: () => void
  onRedo: () => void
  onDelete: () => void
  onDuplicate: () => void
  hasSelection: boolean
  elements: CanvasElement[]
  onLoadElements: (elements: CanvasElement[]) => void
}

export function ActionsBar({
  onUndo,
  onRedo,
  onDelete,
  onDuplicate,
  hasSelection,
  elements,
  onLoadElements,
}: ActionsBarProps) {
  const handleExport = () => {
    const data = JSON.stringify(elements, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "drawing.excalidraw.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImport = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          if (Array.isArray(data)) {
            onLoadElements(data)
          }
        } catch {
          // ignore parse errors
        }
      }
      reader.readAsText(file)
    }
    input.click()
  }

  const actions = [
    { icon: Undo2, label: "Undo", shortcut: "Ctrl+Z", onClick: onUndo, enabled: true },
    { icon: Redo2, label: "Redo", shortcut: "Ctrl+Shift+Z", onClick: onRedo, enabled: true },
    { icon: Trash2, label: "Delete", shortcut: "Del", onClick: onDelete, enabled: hasSelection },
    { icon: Copy, label: "Duplicate", shortcut: "Ctrl+D", onClick: onDuplicate, enabled: hasSelection },
    { icon: Download, label: "Export", shortcut: "", onClick: handleExport, enabled: elements.length > 0 },
    { icon: Upload, label: "Import", shortcut: "", onClick: handleImport, enabled: true },
  ]

  return (
    <TooltipProvider delayDuration={200}>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-0.5 bg-card border border-border rounded-lg shadow-lg px-1.5 py-1.5">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Tooltip key={action.label}>
              <TooltipTrigger asChild>
                <button
                  onClick={action.onClick}
                  disabled={!action.enabled}
                  className="flex items-center justify-center w-9 h-9 rounded-md text-foreground/70 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label={action.label}
                >
                  <Icon className="w-[18px] h-[18px]" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="flex items-center gap-2">
                <span>{action.label}</span>
                {action.shortcut && (
                  <kbd className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-mono rounded bg-muted text-muted-foreground">
                    {action.shortcut}
                  </kbd>
                )}
              </TooltipContent>
            </Tooltip>
          )
        })}
      </div>
    </TooltipProvider>
  )
}
