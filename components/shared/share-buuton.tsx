"use client"

import { useState, useRef, useEffect } from "react"
import { Share2, Copy, Check, Link2, Users } from "lucide-react"

export function ShareButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* ignore */
    }
  }

  return (
    <div ref={popoverRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 h-9 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm"
      >
        <Share2 className="w-4 h-4" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-80 bg-card border border-border rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-1">Share this drawing</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Anyone with the link can view this drawing.
            </p>

            {/* Link sharing */}
            <div className="flex gap-2 mb-4">
              <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-xs text-muted-foreground overflow-hidden">
                <Link2 className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{typeof window !== "undefined" ? window.location.href : "https://..."}</span>
              </div>
              <button
                onClick={handleCopyLink}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shrink-0"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Live collaboration teaser */}
            <button className="flex items-center gap-3 w-full px-3 py-3 rounded-lg bg-muted/50 border border-border hover:bg-accent transition-colors text-left">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                <Users className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Live collaboration</p>
                <p className="text-xs text-muted-foreground">Invite others to draw together in real-time</p>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
