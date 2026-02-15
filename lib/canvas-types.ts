export type Tool =
  | "select"
  | "hand"
  | "rectangle"
  | "diamond"
  | "ellipse"
  | "arrow"
  | "line"
  | "freedraw"
  | "text"
  | "eraser"

export type StrokeStyle = "solid" | "dashed" | "dotted"
export type FillStyle = "none" | "solid" | "hachure" | "cross-hatch"

export interface Point {
  x: number
  y: number
}

export interface CanvasElement {
  id: string
  type: "rectangle" | "diamond" | "ellipse" | "arrow" | "line" | "freedraw" | "text"
  x: number
  y: number
  width: number
  height: number
  points?: Point[]
  text?: string
  strokeColor: string
  fillColor: string
  fillStyle: FillStyle
  strokeWidth: number
  strokeStyle: StrokeStyle
  opacity: number
  roughness: number
  isSelected?: boolean
  rotation: number
  fontSize?: number
}

export interface Camera {
  x: number
  y: number
  zoom: number
}

export const STROKE_COLORS = [
  "#1e1e1e",
  "#e03131",
  "#2f9e44",
  "#1971c2",
  "#f08c00",
  "#6741d9",
]

export const FILL_COLORS = [
  "transparent",
  "#ffc9c9",
  "#b2f2bb",
  "#a5d8ff",
  "#ffec99",
  "#d0bfff",
]

export const STROKE_WIDTHS = [1, 2, 4]

export function generateId(): string {
  return Math.random().toString(36).slice(2, 11)
}
