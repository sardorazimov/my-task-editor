"use client"

import { useState, useRef, useEffect } from "react"
import {
  Menu,
  FolderOpen,
  Download,
  ImageDown,
  Users,
  Zap,
  Search,
  HelpCircle,
  Trash2,
  Sun,
  Moon,
  Monitor,
  ChevronRight,
  SlidersHorizontal,
  Github,
  LogIn,
  MessageCircle,
} from "lucide-react"

import type { CanvasElement } from "@/lib/canvas-types"
import { useTheme } from "next-themes"


const CANVAS_BG_COLORS = [
  { value: "#ffffff", label: "White" },
  { value: "#f8f9fa", label: "Light gray" },
  { value: "#e9ecef", label: "Gray" },
  { value: "#1e1e2e", label: "Dark" },
  { value: "#1a1a2e", label: "Navy" },
  { value: "#16161a", label: "Charcoal" },
]

interface MainMenuProps {
  elements: CanvasElement[]
  onLoadElements: (elements: CanvasElement[]) => void
  onClearCanvas: () => void
  canvasBg: string
  onCanvasBgChange: (color: string) => void
}

export function MainMenu({
  elements,
  onLoadElements,
  onClearCanvas,
  canvasBg,
  onCanvasBgChange,
}: MainMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setShowPreferences(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleOpen = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json,.excalidraw"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string)
          if (Array.isArray(data)) onLoadElements(data)
        } catch {
          /* ignore */
        }
      }
      reader.readAsText(file)
    }
    input.click()
    setIsOpen(false)
  }

  const handleSave = () => {
    const data = JSON.stringify(elements, null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "drawing.excalidraw.json"
    a.click()
    URL.revokeObjectURL(url)
    setIsOpen(false)
  }

  const handleExportImage = () => {
    const canvas = document.querySelector("canvas")
    if (!canvas) return
    const url = canvas.toDataURL("image/png")
    const a = document.createElement("a")
    a.href = url
    a.download = "drawing.png"
    a.click()
    setIsOpen(false)
  }

  const handleResetCanvas = () => {
    onClearCanvas()
    setIsOpen(false)
  }

  return (
    <div ref={menuRef} className="relative z-50">
      <button
        onClick={() => {
          setIsOpen(!isOpen)
          setShowPreferences(false)
        }}
        className="flex items-center justify-center w-9 h-9 rounded-lg bg-card border border-border text-foreground/80 hover:bg-accent transition-colors shadow-sm"
        aria-label="Main menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute top-12 left-0 w-72 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          {!showPreferences ? (
            <>
              {/* File actions */}
              <div className="p-1.5">
                <MenuItem
                  icon={FolderOpen}
                  label="Open"
                  shortcut="Ctrl+O"
                  onClick={handleOpen}
                />
                <MenuItem
                  icon={Download}
                  label="Save to..."
                  onClick={handleSave}
                />
                <MenuItem
                  icon={ImageDown}
                  label="Export image..."
                  shortcut="Ctrl+Shift+E"
                  onClick={handleExportImage}
                />
                <MenuItem
                  icon={Users}
                  label="Live collaboration..."
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  icon={Zap}
                  label="Command palette"
                  shortcut="Ctrl+/"
                  onClick={() => setIsOpen(false)}
                  accent
                />
                <MenuItem
                  icon={Search}
                  label="Find on canvas"
                  shortcut="Ctrl+F"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  icon={HelpCircle}
                  label="Help"
                  shortcut="?"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  icon={Trash2}
                  label="Reset the canvas"
                  onClick={handleResetCanvas}
                />
              </div>

              <div className="h-px bg-border" />

              {/* Links */}
              <div className="p-1.5">
                <MenuItem
                  icon={Zap}
                  label="Excalidraw+"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  icon={Github}
                  label="GitHub"
                  onClick={() => {
                    window.open("https://github.com", "_blank")
                    setIsOpen(false)
                  }}
                />
                <MenuItem
                  icon={MessageCircle}
                  label="Discord chat"
                  onClick={() => setIsOpen(false)}
                />
                <MenuItem
                  icon={LogIn}
                  label="Sign up"
                  onClick={() => setIsOpen(false)}
                  accent
                />
              </div>

              <div className="h-px bg-border" />

              {/* Preferences */}
              <div className="p-1.5">
                <button
                  onClick={() => setShowPreferences(true)}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-accent transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <SlidersHorizontal className="w-4 h-4" />
                    Preferences
                  </span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Back button */}
              <div className="p-1.5">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-foreground/80 hover:bg-accent transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" />
                  <span>Preferences</span>
                </button>
              </div>

              <div className="h-px bg-border" />

              {/* Theme */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-foreground/80">Theme</span>
                  <div className="flex items-center gap-0.5 bg-muted rounded-lg p-0.5">
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                        theme === "light"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label="Light theme"
                    >
                      <Sun className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                        theme === "dark"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label="Dark theme"
                    >
                      <Moon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex items-center justify-center w-8 h-8 rounded-md transition-colors ${
                        theme === "system"
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      aria-label="System theme"
                    >
                      <Monitor className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Language */}
                <div className="mb-4">
                  <select
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                    defaultValue="en"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="tr">Turkish</option>
                    <option value="ja">Japanese</option>
                  </select>
                </div>

                {/* Canvas background */}
                <div>
                  <p className="text-sm text-foreground/80 mb-2">Canvas background</p>
                  <div className="flex gap-1.5">
                    {CANVAS_BG_COLORS.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => onCanvasBgChange(c.value)}
                        className={`w-8 h-8 rounded-lg border-2 transition-all ${
                          canvasBg === c.value
                            ? "border-primary scale-110"
                            : "border-border hover:border-foreground/30"
                        }`}
                        style={{ backgroundColor: c.value }}
                        aria-label={c.label}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function MenuItem({
  icon: Icon,
  label,
  shortcut,
  onClick,
  accent,
}: {
  icon: React.ElementType
  label: string
  shortcut?: string
  onClick?: () => void
  accent?: boolean
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors group"
    >
      <span className={`flex items-center gap-3 ${accent ? "text-primary font-semibold" : "text-foreground/80"}`}>
        <Icon className="w-4 h-4" />
        {label}
      </span>
      {shortcut && (
        <span className={`text-xs ${accent ? "text-primary/70 font-semibold" : "text-muted-foreground"}`}>
          {shortcut}
        </span>
      )}
    </button>
  )
}
