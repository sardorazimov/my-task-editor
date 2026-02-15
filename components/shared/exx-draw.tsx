"use client"

import { useEffect, useCallback } from "react"
import { useCanvasStore } from "@/lib/canvas-store"
import { Canvas } from "./canvas"
import { ActionsBar } from "./action-bar"

import { Toolbar } from "./tool-bar"
import { PropertiesPanel } from "./properties-panel"
import { BottomBar } from "./zoom-controller"


export function ExcalidrawApp() {
  const store = useCanvasStore()

  const selectedElements = store.elements.filter((el) =>
    store.selectedIds.has(el.id)
  )

  const handleLoadElements = useCallback(
    (newElements: typeof store.elements) => {
      store.pushToUndo()
      store.setElements(newElements)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [store.pushToUndo, store.setElements]
  )

  // Listen for keyboard events dispatched from canvas
  useEffect(() => {
    const handleUndo = () => store.undo()
    const handleRedo = () => store.redo()
    const handleDelete = () => store.deleteSelected()
    const handleDuplicate = () => store.duplicateSelected()
    const handleSelectAll = () => store.selectAll()

    document.addEventListener("canvas-undo", handleUndo)
    document.addEventListener("canvas-redo", handleRedo)
    document.addEventListener("canvas-delete", handleDelete)
    document.addEventListener("canvas-duplicate", handleDuplicate)
    document.addEventListener("canvas-select-all", handleSelectAll)

    return () => {
      document.removeEventListener("canvas-undo", handleUndo)
      document.removeEventListener("canvas-redo", handleRedo)
      document.removeEventListener("canvas-delete", handleDelete)
      document.removeEventListener("canvas-duplicate", handleDuplicate)
      document.removeEventListener("canvas-select-all", handleSelectAll)
    }
  }, [store])

  return (
    <div className="h-screen w-screen overflow-hidden bg-background relative">
      <Canvas
        elements={store.elements}
        camera={store.camera}
        tool={store.tool}
        selectedIds={store.selectedIds}
        strokeColor={store.strokeColor}
        fillColor={store.fillColor}
        fillStyle={store.fillStyle}
        strokeWidth={store.strokeWidth}
        strokeStyle={store.strokeStyle}
        opacity={store.opacity}
        roughness={store.roughness}
        fontSize={store.fontSize}
        onCameraChange={store.setCamera}
        onAddElement={store.addElement}
        onUpdateElement={store.updateElement}
        onSetElements={store.setElements}
        onSelectIds={store.setSelectedIds}
        onPushUndo={store.pushToUndo}
        onToolChange={store.setTool}
      />

      <Toolbar activeTool={store.tool} onToolChange={store.setTool} />

      <PropertiesPanel
        strokeColor={store.strokeColor}
        fillColor={store.fillColor}
        fillStyle={store.fillStyle}
        strokeWidth={store.strokeWidth}
        strokeStyle={store.strokeStyle}
        opacity={store.opacity}
        roughness={store.roughness}
        onStrokeColorChange={store.setStrokeColor}
        onFillColorChange={store.setFillColor}
        onFillStyleChange={store.setFillStyle}
        onStrokeWidthChange={store.setStrokeWidth}
        onStrokeStyleChange={store.setStrokeStyle}
        onOpacityChange={store.setOpacity}
        onRoughnessChange={store.setRoughness}
        selectedElements={selectedElements}
        onUpdateElement={store.updateElement}
      />

      <ActionsBar
        onUndo={store.undo}
        onRedo={store.redo}
        onDelete={store.deleteSelected}
        onDuplicate={store.duplicateSelected}
        hasSelection={store.selectedIds.size > 0}
        elements={store.elements}
        onLoadElements={handleLoadElements}
      />

      <BottomBar camera={store.camera} onCameraChange={store.setCamera} onUndo={store.undo} onRedo={store.redo} />
    </div>
  )
}
