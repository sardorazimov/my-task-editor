import { useCallback, useRef, useState } from "react"
import { Camera, CanvasElement, FillStyle, generateId, StrokeStyle, Tool } from "./canvas-types"


export interface CanvasState {
  elements: CanvasElement[]
  selectedIds: Set<string>
  tool: Tool
  camera: Camera
  strokeColor: string
  fillColor: string
  fillStyle: FillStyle
  strokeWidth: number
  strokeStyle: StrokeStyle
  opacity: number
  roughness: number
  fontSize: number
}

export function useCanvasStore() {
  const [elements, setElements] = useState<CanvasElement[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [tool, setTool] = useState<Tool>("select")
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 })
  const [strokeColor, setStrokeColor] = useState("#1e1e1e")
  const [fillColor, setFillColor] = useState("transparent")
  const [fillStyle, setFillStyle] = useState<FillStyle>("none")
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [strokeStyle, setStrokeStyle] = useState<StrokeStyle>("solid")
  const [opacity, setOpacity] = useState(1)
  const [roughness, setRoughness] = useState(1)
  const [fontSize, setFontSize] = useState(20)

  const undoStack = useRef<CanvasElement[][]>([])
  const redoStack = useRef<CanvasElement[][]>([])

  const pushToUndo = useCallback(() => {
    undoStack.current.push(JSON.parse(JSON.stringify(elements)))
    redoStack.current = []
  }, [elements])

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return
    redoStack.current.push(JSON.parse(JSON.stringify(elements)))
    const prev = undoStack.current.pop()!
    setElements(prev)
    setSelectedIds(new Set())
  }, [elements])

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return
    undoStack.current.push(JSON.parse(JSON.stringify(elements)))
    const next = redoStack.current.pop()!
    setElements(next)
    setSelectedIds(new Set())
  }, [elements])

  const addElement = useCallback(
    (partial: Partial<CanvasElement> & { type: CanvasElement["type"] }) => {
      const el: CanvasElement = {
        id: generateId(),
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        strokeColor,
        fillColor,
        fillStyle,
        strokeWidth,
        strokeStyle,
        opacity,
        roughness,
        rotation: 0,
        fontSize,
        ...partial,
      }
      setElements((prev) => [...prev, el])
      return el
    },
    [strokeColor, fillColor, fillStyle, strokeWidth, strokeStyle, opacity, roughness, fontSize]
  )

  const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    )
  }, [])

  const deleteSelected = useCallback(() => {
    if (selectedIds.size === 0) return
    pushToUndo()
    setElements((prev) => prev.filter((el) => !selectedIds.has(el.id)))
    setSelectedIds(new Set())
  }, [selectedIds, pushToUndo])

  const duplicateSelected = useCallback(() => {
    if (selectedIds.size === 0) return
    pushToUndo()
    const selected = elements.filter((el) => selectedIds.has(el.id))
    const newIds = new Set<string>()
    const newEls = selected.map((el) => {
      const id = generateId()
      newIds.add(id)
      return {
        ...el,
        id,
        x: el.x + 20,
        y: el.y + 20,
        isSelected: true,
      }
    })
    setElements((prev) => [
      ...prev.map((el) => ({ ...el, isSelected: false })),
      ...newEls,
    ])
    setSelectedIds(newIds)
  }, [selectedIds, elements, pushToUndo])

  const selectAll = useCallback(() => {
    const allIds = new Set(elements.map((el) => el.id))
    setSelectedIds(allIds)
    setElements((prev) =>
      prev.map((el) => ({ ...el, isSelected: true }))
    )
  }, [elements])

  const clearSelection = useCallback(() => {
    setSelectedIds(new Set())
    setElements((prev) =>
      prev.map((el) => ({ ...el, isSelected: false }))
    )
  }, [])

  return {
    elements,
    setElements,
    selectedIds,
    setSelectedIds,
    tool,
    setTool,
    camera,
    setCamera,
    strokeColor,
    setStrokeColor,
    fillColor,
    setFillColor,
    fillStyle,
    setFillStyle,
    strokeWidth,
    setStrokeWidth,
    strokeStyle,
    setStrokeStyle,
    opacity,
    setOpacity,
    roughness,
    setRoughness,
    fontSize,
    setFontSize,
    addElement,
    updateElement,
    deleteSelected,
    duplicateSelected,
    selectAll,
    clearSelection,
    pushToUndo,
    undo,
    redo,
  }
}
