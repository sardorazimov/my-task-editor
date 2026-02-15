"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import type { CanvasElement, Point, Camera, Tool } from "@/lib/canvas-types"
import { renderElement, drawGrid, hitTest, getResizeHandle } from "@/lib/canvas-render"

interface CanvasProps {
    elements: CanvasElement[]
    camera: Camera
    tool: Tool
    selectedIds: Set<string>
    strokeColor: string
    fillColor: string
    fillStyle: CanvasElement["fillStyle"]
    strokeWidth: number
    strokeStyle: CanvasElement["strokeStyle"]
    opacity: number
    roughness: number
    fontSize: number
    canvasBg?: string
    onCameraChange: (camera: Camera) => void
    onAddElement: (partial: Partial<CanvasElement> & { type: CanvasElement["type"] }) => CanvasElement
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void
    onSetElements: (elements: CanvasElement[]) => void
    onSelectIds: (ids: Set<string>) => void
    onPushUndo: () => void
    onToolChange: (tool: Tool) => void
}

export function Canvas({
    elements,
    camera,
    tool,
    selectedIds,
    strokeColor,
    fillColor,
    fillStyle,
    strokeWidth,
    strokeStyle,
    opacity,
    roughness,
    fontSize,
    canvasBg,
    onCameraChange,
    onAddElement,
    onUpdateElement,
    onSetElements,
    onSelectIds,
    onPushUndo,
    onToolChange,
}: CanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isDragging, setIsDragging] = useState(false)
    const [isPanning, setIsPanning] = useState(false)
    const activeElementRef = useRef<string | null>(null)
    const dragStartRef = useRef<Point>({ x: 0, y: 0 })
    const elementStartRef = useRef<Map<string, { x: number; y: number }>>(new Map())
    const panStartRef = useRef<Point>({ x: 0, y: 0 })
    const cameraStartRef = useRef<Camera>({ x: 0, y: 0, zoom: 1 })
    const resizeHandleRef = useRef<string | null>(null)
    const resizeStartRef = useRef<{ x: number; y: number; width: number; height: number } | null>(null)
    const textInputRef = useRef<HTMLTextAreaElement>(null)
    const [textInput, setTextInput] = useState<{ visible: boolean; x: number; y: number; id: string | null }>({
        visible: false,
        x: 0,
        y: 0,
        id: null,
    })
    const [textValue, setTextValue] = useState("")

    const screenToWorld = useCallback(
        (sx: number, sy: number): Point => ({
            x: (sx - camera.x) / camera.zoom,
            y: (sy - camera.y) / camera.zoom,
        }),
        [camera]
    )

    // Render loop
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const dpr = window.devicePixelRatio || 1
        const rect = canvas.getBoundingClientRect()
        canvas.width = rect.width * dpr
        canvas.height = rect.height * dpr
        ctx.scale(dpr, dpr)

        ctx.clearRect(0, 0, rect.width, rect.height)

        // Draw grid
        drawGrid(ctx, camera, rect.width, rect.height, canvasBg)

        // Draw elements
        ctx.save()
        ctx.translate(camera.x, camera.y)
        ctx.scale(camera.zoom, camera.zoom)

        for (const el of elements) {
            renderElement(ctx, el)
        }

        ctx.restore()
    }, [elements, camera, canvasBg])

    // Resize observer
    useEffect(() => {
        const container = containerRef.current
        const canvas = canvasRef.current
        if (!container || !canvas) return

        const ro = new ResizeObserver(() => {
            const rect = container.getBoundingClientRect()
            canvas.style.width = rect.width + "px"
            canvas.style.height = rect.height + "px"
            // Trigger re-render
            onCameraChange({ ...camera })
        })
        ro.observe(container)
        return () => ro.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handlePointerDown = useCallback(
        (e: React.PointerEvent) => {
            const canvas = canvasRef.current
            if (!canvas) return
            canvas.setPointerCapture(e.pointerId)

            const rect = canvas.getBoundingClientRect()
            const sx = e.clientX - rect.left
            const sy = e.clientY - rect.top
            const world = screenToWorld(sx, sy)

            if (tool === "hand" || (e.button === 1)) {
                setIsPanning(true)
                panStartRef.current = { x: e.clientX, y: e.clientY }
                cameraStartRef.current = { ...camera }
                return
            }

            if (tool === "select") {
                // Check resize handles first
                for (const el of [...elements].reverse()) {
                    if (el.isSelected && el.type !== "line" && el.type !== "arrow" && el.type !== "freedraw") {
                        const handle = getResizeHandle(el, world.x, world.y)
                        if (handle) {
                            resizeHandleRef.current = handle
                            resizeStartRef.current = { x: el.x, y: el.y, width: el.width, height: el.height }
                            activeElementRef.current = el.id
                            dragStartRef.current = world
                            onPushUndo()
                            setIsDragging(true)
                            return
                        }
                    }
                }

                // Hit test
                let found = false
                for (let i = elements.length - 1; i >= 0; i--) {
                    if (hitTest(elements[i], world.x, world.y)) {
                        found = true
                        const el = elements[i]
                        const isAlreadySelected = selectedIds.has(el.id)

                        if (e.shiftKey) {
                            const newIds = new Set(selectedIds)
                            if (isAlreadySelected) newIds.delete(el.id)
                            else newIds.add(el.id)
                            onSelectIds(newIds)
                            onSetElements(
                                elements.map((e) => ({ ...e, isSelected: newIds.has(e.id) }))
                            )
                        } else if (!isAlreadySelected) {
                            const newIds = new Set([el.id])
                            onSelectIds(newIds)
                            onSetElements(
                                elements.map((e) => ({ ...e, isSelected: e.id === el.id }))
                            )
                        }

                        dragStartRef.current = world
                        elementStartRef.current = new Map()
                        const ids = e.shiftKey ? new Set([...selectedIds, el.id]) : (isAlreadySelected ? selectedIds : new Set([el.id]))
                        for (const id of ids) {
                            const elem = elements.find((e) => e.id === id)
                            if (elem) elementStartRef.current.set(id, { x: elem.x, y: elem.y })
                        }
                        onPushUndo()
                        setIsDragging(true)
                        resizeHandleRef.current = null
                        return
                    }
                }

                if (!found) {
                    onSelectIds(new Set())
                    onSetElements(elements.map((e) => ({ ...e, isSelected: false })))
                }
                return
            }

            if (tool === "eraser") {
                for (let i = elements.length - 1; i >= 0; i--) {
                    if (hitTest(elements[i], world.x, world.y)) {
                        onPushUndo()
                        onSetElements(elements.filter((_, idx) => idx !== i))
                        return
                    }
                }
                return
            }

            if (tool === "text") {
                setTextInput({
                    visible: true,
                    x: sx,
                    y: sy,
                    id: null,
                })
                setTextValue("")
                setTimeout(() => textInputRef.current?.focus(), 50)
                return
            }

            // Drawing tools
            onPushUndo()
            setIsDrawing(true)

            if (tool === "freedraw") {
                const el = onAddElement({
                    type: "freedraw",
                    x: world.x,
                    y: world.y,
                    width: 0,
                    height: 0,
                    points: [{ x: world.x, y: world.y }],
                })
                activeElementRef.current = el.id
            } else if (tool === "line" || tool === "arrow") {
                const el = onAddElement({
                    type: tool,
                    x: world.x,
                    y: world.y,
                    width: 0,
                    height: 0,
                    points: [
                        { x: world.x, y: world.y },
                        { x: world.x, y: world.y },
                    ],
                })
                activeElementRef.current = el.id
            } else {
                const el = onAddElement({
                    type: tool as CanvasElement["type"],
                    x: world.x,
                    y: world.y,
                    width: 0,
                    height: 0,
                })
                activeElementRef.current = el.id
            }
        },
        [tool, camera, elements, selectedIds, screenToWorld, onAddElement, onSetElements, onSelectIds, onPushUndo]
    )

    const handlePointerMove = useCallback(
        (e: React.PointerEvent) => {
            const canvas = canvasRef.current
            if (!canvas) return

            // Cursor
            if (tool === "hand" || isPanning) {
                canvas.style.cursor = isPanning ? "grabbing" : "grab"
            } else if (tool === "select") {
                canvas.style.cursor = "default"
            } else if (tool === "eraser") {
                canvas.style.cursor = "crosshair"
            } else if (tool === "text") {
                canvas.style.cursor = "text"
            } else {
                canvas.style.cursor = "crosshair"
            }

            if (isPanning) {
                const dx = e.clientX - panStartRef.current.x
                const dy = e.clientY - panStartRef.current.y
                onCameraChange({
                    ...cameraStartRef.current,
                    x: cameraStartRef.current.x + dx,
                    y: cameraStartRef.current.y + dy,
                })
                return
            }

            const rect = canvas.getBoundingClientRect()
            const sx = e.clientX - rect.left
            const sy = e.clientY - rect.top
            const world = screenToWorld(sx, sy)

            if (isDragging && resizeHandleRef.current && activeElementRef.current && resizeStartRef.current) {
                const dx = world.x - dragStartRef.current.x
                const dy = world.y - dragStartRef.current.y
                const s = resizeStartRef.current
                const handle = resizeHandleRef.current

                let newX = s.x
                let newY = s.y
                let newW = s.width
                let newH = s.height

                if (handle.includes("e") || handle === "ne" || handle === "se") {
                    newW = s.width + dx
                }
                if (handle.includes("w") || handle === "nw" || handle === "sw") {
                    newX = s.x + dx
                    newW = s.width - dx
                }
                if (handle.includes("s") || handle === "se" || handle === "sw") {
                    newH = s.height + dy
                }
                if (handle.includes("n") || handle === "ne" || handle === "nw") {
                    newY = s.y + dy
                    newH = s.height - dy
                }

                onUpdateElement(activeElementRef.current, {
                    x: newX,
                    y: newY,
                    width: newW,
                    height: newH,
                })
                return
            }

            if (isDragging && !resizeHandleRef.current) {
                const dx = world.x - dragStartRef.current.x
                const dy = world.y - dragStartRef.current.y

                for (const [id, start] of elementStartRef.current) {
                    onUpdateElement(id, { x: start.x + dx, y: start.y + dy })
                }
                return
            }

            if (!isDrawing || !activeElementRef.current) return

            if (tool === "freedraw") {
                const el = elements.find((e) => e.id === activeElementRef.current)
                if (el && el.points) {
                    onUpdateElement(el.id, {
                        points: [...el.points, { x: world.x, y: world.y }],
                    })
                }
            } else if (tool === "line" || tool === "arrow") {
                const el = elements.find((e) => e.id === activeElementRef.current)
                if (el && el.points) {
                    const pts = [...el.points]
                    pts[pts.length - 1] = { x: world.x, y: world.y }
                    onUpdateElement(el.id, { points: pts })
                }
            } else {
                const el = elements.find((e) => e.id === activeElementRef.current)
                if (el) {
                    onUpdateElement(el.id, {
                        width: world.x - el.x,
                        height: world.y - el.y,
                    })
                }
            }
        },
        [tool, isPanning, isDragging, isDrawing, elements, screenToWorld, onCameraChange, onUpdateElement]
    )

    const handlePointerUp = useCallback(
        (e: React.PointerEvent) => {
            const canvas = canvasRef.current
            if (canvas) canvas.releasePointerCapture(e.pointerId)

            setIsDrawing(false)
            setIsDragging(false)
            setIsPanning(false)
            resizeHandleRef.current = null
            resizeStartRef.current = null
            activeElementRef.current = null
        },
        []
    )

    const handleWheel = useCallback(
        (e: React.WheelEvent) => {
            e.preventDefault()

            if (e.ctrlKey || e.metaKey) {
                // Zoom
                const delta = -e.deltaY * 0.001
                const newZoom = Math.max(0.1, Math.min(5, camera.zoom * (1 + delta)))
                const rect = canvasRef.current?.getBoundingClientRect()
                if (!rect) return

                const mx = e.clientX - rect.left
                const my = e.clientY - rect.top

                const worldX = (mx - camera.x) / camera.zoom
                const worldY = (my - camera.y) / camera.zoom

                onCameraChange({
                    x: mx - worldX * newZoom,
                    y: my - worldY * newZoom,
                    zoom: newZoom,
                })
            } else {
                // Pan
                onCameraChange({
                    ...camera,
                    x: camera.x - e.deltaX,
                    y: camera.y - e.deltaY,
                })
            }
        },
        [camera, onCameraChange]
    )

    const handleTextSubmit = useCallback(() => {
        if (!textValue.trim()) {
            setTextInput({ visible: false, x: 0, y: 0, id: null })
            return
        }

        const world = screenToWorld(textInput.x, textInput.y)
        onPushUndo()
        onAddElement({
            type: "text",
            x: world.x,
            y: world.y,
            width: 0,
            height: 0,
            text: textValue,
            fontSize,
        })
        setTextInput({ visible: false, x: 0, y: 0, id: null })
        setTextValue("")
    }, [textValue, textInput, screenToWorld, fontSize, onAddElement, onPushUndo])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't intercept if text input is open
            if (textInput.visible) {
                if (e.key === "Escape") {
                    setTextInput({ visible: false, x: 0, y: 0, id: null })
                    setTextValue("")
                }
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleTextSubmit()
                }
                return
            }

            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            const ctrl = e.ctrlKey || e.metaKey

            if (ctrl && e.key === "z" && !e.shiftKey) {
                e.preventDefault()
                // undo is handled by parent
                document.dispatchEvent(new CustomEvent("canvas-undo"))
            }
            if (ctrl && e.key === "z" && e.shiftKey) {
                e.preventDefault()
                document.dispatchEvent(new CustomEvent("canvas-redo"))
            }
            if (ctrl && e.key === "d") {
                e.preventDefault()
                document.dispatchEvent(new CustomEvent("canvas-duplicate"))
            }
            if (ctrl && e.key === "a") {
                e.preventDefault()
                document.dispatchEvent(new CustomEvent("canvas-select-all"))
            }

            if (e.key === "Delete" || e.key === "Backspace") {
                document.dispatchEvent(new CustomEvent("canvas-delete"))
            }

            const shortcuts: Record<string, Tool> = {
                v: "select",
                h: "hand",
                r: "rectangle",
                d: "diamond",
                o: "ellipse",
                a: "arrow",
                l: "line",
                p: "freedraw",
                t: "text",
                e: "eraser",
            }

            if (!ctrl && !e.shiftKey && shortcuts[e.key.toLowerCase()]) {
                onToolChange(shortcuts[e.key.toLowerCase()])
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [textInput.visible, handleTextSubmit, onToolChange])

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full touch-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onWheel={handleWheel}
            />
            {textInput.visible && (
                <textarea
                    ref={textInputRef}
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    onBlur={handleTextSubmit}
                    className="absolute z-50 bg-transparent border-2 border-primary rounded px-1 font-sans outline-none resize-none text-foreground"
                    style={{
                        left: textInput.x,
                        top: textInput.y,
                        fontSize: fontSize,
                        fontFamily: '"Segoe Print", "Comic Sans MS", cursive',
                        lineHeight: 1.4,
                        minWidth: 100,
                        minHeight: fontSize * 1.4 + 8,
                    }}
                    aria-label="Text input"
                />
            )}
        </div>
    )
}
