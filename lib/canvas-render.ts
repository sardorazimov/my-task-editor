import type { CanvasElement, Point } from "./canvas-types"

function getRandomOffset(roughness: number): number {
  return (Math.random() - 0.5) * roughness * 2
}

function drawRoughLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  roughness: number
) {
  if (roughness === 0) {
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    return
  }

  const midX = (x1 + x2) / 2 + getRandomOffset(roughness)
  const midY = (y1 + y2) / 2 + getRandomOffset(roughness)

  ctx.moveTo(x1 + getRandomOffset(roughness * 0.5), y1 + getRandomOffset(roughness * 0.5))
  ctx.quadraticCurveTo(
    midX,
    midY,
    x2 + getRandomOffset(roughness * 0.5),
    y2 + getRandomOffset(roughness * 0.5)
  )
}

function drawHachureFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  roughness: number
) {
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.4
  const gap = 8
  const angle = -Math.PI / 4

  for (let i = -Math.max(w, h); i < Math.max(w, h) * 2; i += gap) {
    const x1 = x + i
    const y1 = y
    const x2 = x + i + Math.cos(angle) * Math.max(w, h) * 2
    const y2 = y + Math.sin(angle) * Math.max(w, h) * 2

    ctx.beginPath()
    ctx.save()
    ctx.rect(x, y, w, h)
    ctx.clip()
    drawRoughLine(ctx, x1, y1, x2, y2, roughness * 0.5)
    ctx.stroke()
    ctx.restore()
  }
  ctx.restore()
}

function drawCrossHatchFill(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  color: string,
  roughness: number
) {
  drawHachureFill(ctx, x, y, w, h, color, roughness)
  ctx.save()
  ctx.strokeStyle = color
  ctx.lineWidth = 1
  ctx.globalAlpha = 0.4
  const gap = 8
  const angle = Math.PI / 4

  for (let i = -Math.max(w, h); i < Math.max(w, h) * 2; i += gap) {
    const x1 = x + i
    const y1 = y
    const x2 = x + i + Math.cos(angle) * Math.max(w, h) * 2
    const y2 = y + Math.sin(angle) * Math.max(w, h) * 2

    ctx.beginPath()
    ctx.save()
    ctx.rect(x, y, w, h)
    ctx.clip()
    drawRoughLine(ctx, x1, y1, x2, y2, roughness * 0.5)
    ctx.stroke()
    ctx.restore()
  }
  ctx.restore()
}

function applyStrokeStyle(ctx: CanvasRenderingContext2D, el: CanvasElement) {
  ctx.strokeStyle = el.strokeColor
  ctx.lineWidth = el.strokeWidth
  ctx.globalAlpha = el.opacity

  if (el.strokeStyle === "dashed") {
    ctx.setLineDash([12, 6])
  } else if (el.strokeStyle === "dotted") {
    ctx.setLineDash([2, 4])
  } else {
    ctx.setLineDash([])
  }
}

function drawFill(
  ctx: CanvasRenderingContext2D,
  el: CanvasElement,
  drawShape: () => void
) {
  if (el.fillColor === "transparent" && el.fillStyle === "none") return

  if (el.fillStyle === "solid") {
    ctx.save()
    ctx.fillStyle = el.fillColor
    ctx.globalAlpha = el.opacity * 0.6
    drawShape()
    ctx.fill()
    ctx.restore()
  } else if (el.fillStyle === "hachure" && el.fillColor !== "transparent") {
    drawHachureFill(
      ctx,
      Math.min(el.x, el.x + el.width),
      Math.min(el.y, el.y + el.height),
      Math.abs(el.width),
      Math.abs(el.height),
      el.fillColor,
      el.roughness
    )
  } else if (el.fillStyle === "cross-hatch" && el.fillColor !== "transparent") {
    drawCrossHatchFill(
      ctx,
      Math.min(el.x, el.x + el.width),
      Math.min(el.y, el.y + el.height),
      Math.abs(el.width),
      Math.abs(el.height),
      el.fillColor,
      el.roughness
    )
  }
}

export function renderElement(ctx: CanvasRenderingContext2D, el: CanvasElement) {
  ctx.save()
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  
  const centerX = el.x + el.width / 2
  const centerY = el.y + el.height / 2
  
  if (el.rotation !== 0) {
    ctx.translate(centerX, centerY)
    ctx.rotate(el.rotation)
    ctx.translate(-centerX, -centerY)
  }

  applyStrokeStyle(ctx, el)

  switch (el.type) {
    case "rectangle": {
      const drawRect = () => {
        ctx.beginPath()
        if (el.roughness > 0) {
          const x = el.x
          const y = el.y
          const w = el.width
          const h = el.height
          const r = el.roughness
          drawRoughLine(ctx, x, y, x + w, y, r)
          drawRoughLine(ctx, x + w, y, x + w, y + h, r)
          drawRoughLine(ctx, x + w, y + h, x, y + h, r)
          drawRoughLine(ctx, x, y + h, x, y, r)
        } else {
          ctx.rect(el.x, el.y, el.width, el.height)
        }
      }
      drawFill(ctx, el, () => {
        ctx.beginPath()
        ctx.rect(el.x, el.y, el.width, el.height)
      })
      drawRect()
      ctx.stroke()
      break
    }

    case "diamond": {
      const cx = el.x + el.width / 2
      const cy = el.y + el.height / 2
      const r = el.roughness

      drawFill(ctx, el, () => {
        ctx.beginPath()
        ctx.moveTo(cx, el.y)
        ctx.lineTo(el.x + el.width, cy)
        ctx.lineTo(cx, el.y + el.height)
        ctx.lineTo(el.x, cy)
        ctx.closePath()
      })

      ctx.beginPath()
      if (r > 0) {
        drawRoughLine(ctx, cx, el.y, el.x + el.width, cy, r)
        drawRoughLine(ctx, el.x + el.width, cy, cx, el.y + el.height, r)
        drawRoughLine(ctx, cx, el.y + el.height, el.x, cy, r)
        drawRoughLine(ctx, el.x, cy, cx, el.y, r)
      } else {
        ctx.moveTo(cx, el.y)
        ctx.lineTo(el.x + el.width, cy)
        ctx.lineTo(cx, el.y + el.height)
        ctx.lineTo(el.x, cy)
        ctx.closePath()
      }
      ctx.stroke()
      break
    }

    case "ellipse": {
      const ecx = el.x + el.width / 2
      const ecy = el.y + el.height / 2
      const rx = Math.abs(el.width) / 2
      const ry = Math.abs(el.height) / 2

      drawFill(ctx, el, () => {
        ctx.beginPath()
        ctx.ellipse(ecx, ecy, rx, ry, 0, 0, Math.PI * 2)
      })

      ctx.beginPath()
      if (el.roughness > 0) {
        const steps = 64
        for (let i = 0; i <= steps; i++) {
          const angle = (i / steps) * Math.PI * 2
          const px = ecx + rx * Math.cos(angle) + getRandomOffset(el.roughness * 0.3)
          const py = ecy + ry * Math.sin(angle) + getRandomOffset(el.roughness * 0.3)
          if (i === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
      } else {
        ctx.ellipse(ecx, ecy, rx, ry, 0, 0, Math.PI * 2)
      }
      ctx.stroke()
      break
    }

    case "line":
    case "arrow": {
      if (el.points && el.points.length >= 2) {
        ctx.beginPath()
        const pts = el.points
        if (el.roughness > 0) {
          ctx.moveTo(
            pts[0].x + getRandomOffset(el.roughness * 0.3),
            pts[0].y + getRandomOffset(el.roughness * 0.3)
          )
          for (let i = 1; i < pts.length; i++) {
            const prevPt = pts[i - 1]
            const pt = pts[i]
            const midX = (prevPt.x + pt.x) / 2 + getRandomOffset(el.roughness)
            const midY = (prevPt.y + pt.y) / 2 + getRandomOffset(el.roughness)
            ctx.quadraticCurveTo(midX, midY, pt.x, pt.y)
          }
        } else {
          ctx.moveTo(pts[0].x, pts[0].y)
          for (let i = 1; i < pts.length; i++) {
            ctx.lineTo(pts[i].x, pts[i].y)
          }
        }
        ctx.stroke()

        if (el.type === "arrow" && pts.length >= 2) {
          const last = pts[pts.length - 1]
          const prev = pts[pts.length - 2]
          const angle = Math.atan2(last.y - prev.y, last.x - prev.x)
          const headLength = 16 + el.strokeWidth * 2
          
          ctx.beginPath()
          ctx.moveTo(last.x, last.y)
          ctx.lineTo(
            last.x - headLength * Math.cos(angle - Math.PI / 6),
            last.y - headLength * Math.sin(angle - Math.PI / 6)
          )
          ctx.moveTo(last.x, last.y)
          ctx.lineTo(
            last.x - headLength * Math.cos(angle + Math.PI / 6),
            last.y - headLength * Math.sin(angle + Math.PI / 6)
          )
          ctx.stroke()
        }
      }
      break
    }

    case "freedraw": {
      if (el.points && el.points.length >= 2) {
        ctx.beginPath()
        ctx.moveTo(el.points[0].x, el.points[0].y)
        for (let i = 1; i < el.points.length - 1; i++) {
          const mid = {
            x: (el.points[i].x + el.points[i + 1].x) / 2,
            y: (el.points[i].y + el.points[i + 1].y) / 2,
          }
          ctx.quadraticCurveTo(el.points[i].x, el.points[i].y, mid.x, mid.y)
        }
        const last = el.points[el.points.length - 1]
        ctx.lineTo(last.x, last.y)
        ctx.stroke()
      }
      break
    }

    case "text": {
      ctx.font = `${el.fontSize || 20}px "Segoe Print", "Comic Sans MS", cursive`
      ctx.fillStyle = el.strokeColor
      ctx.globalAlpha = el.opacity
      ctx.textBaseline = "top"

      const lines = (el.text || "").split("\n")
      const lineHeight = (el.fontSize || 20) * 1.4
      lines.forEach((line, i) => {
        ctx.fillText(line, el.x, el.y + i * lineHeight)
      })
      break
    }
  }

  if (el.isSelected) {
    ctx.setLineDash([6, 4])
    ctx.strokeStyle = "hsl(230, 80%, 56%)"
    ctx.lineWidth = 1.5
    ctx.globalAlpha = 1
    const padding = 6

    if (el.type === "line" || el.type === "arrow" || el.type === "freedraw") {
      if (el.points && el.points.length > 0) {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
        for (const p of el.points) {
          minX = Math.min(minX, p.x)
          minY = Math.min(minY, p.y)
          maxX = Math.max(maxX, p.x)
          maxY = Math.max(maxY, p.y)
        }
        ctx.strokeRect(
          minX - padding, minY - padding,
          maxX - minX + padding * 2, maxY - minY + padding * 2
        )
      }
    } else {
      const sx = Math.min(el.x, el.x + el.width)
      const sy = Math.min(el.y, el.y + el.height)
      const sw = Math.abs(el.width)
      const sh = Math.abs(el.height)
      ctx.strokeRect(sx - padding, sy - padding, sw + padding * 2, sh + padding * 2)

      // draw resize handles
      ctx.setLineDash([])
      ctx.fillStyle = "hsl(0, 0%, 100%)"
      const hs = 8
      const handles = [
        [sx - padding, sy - padding],
        [sx + sw + padding, sy - padding],
        [sx - padding, sy + sh + padding],
        [sx + sw + padding, sy + sh + padding],
      ]
      for (const [hx, hy] of handles) {
        ctx.fillRect(hx - hs / 2, hy - hs / 2, hs, hs)
        ctx.strokeStyle = "hsl(230, 80%, 56%)"
        ctx.lineWidth = 1.5
        ctx.strokeRect(hx - hs / 2, hy - hs / 2, hs, hs)
      }
    }
  }

  ctx.restore()
}

export function drawGrid(
  ctx: CanvasRenderingContext2D,
  camera: { x: number; y: number; zoom: number },
  width: number,
  height: number,
  bgColor?: string
) {
  // Fill background
  if (bgColor) {
    ctx.save()
    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)
    ctx.restore()
  }

  const gridSize = 20
  ctx.save()
  // Detect dark mode from document
  const isDark = typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  ctx.strokeStyle = isDark ? "hsla(240, 4%, 25%, 0.5)" : "hsl(220, 13%, 93%)"
  ctx.lineWidth = 1

  const startX = Math.floor((-camera.x / camera.zoom) / gridSize) * gridSize
  const startY = Math.floor((-camera.y / camera.zoom) / gridSize) * gridSize
  const endX = startX + width / camera.zoom + gridSize * 2
  const endY = startY + height / camera.zoom + gridSize * 2

  ctx.beginPath()
  for (let x = startX; x <= endX; x += gridSize) {
    const screenX = x * camera.zoom + camera.x
    ctx.moveTo(screenX, 0)
    ctx.lineTo(screenX, height)
  }
  for (let y = startY; y <= endY; y += gridSize) {
    const screenY = y * camera.zoom + camera.y
    ctx.moveTo(0, screenY)
    ctx.lineTo(width, screenY)
  }
  ctx.stroke()
  ctx.restore()
}

export function hitTest(el: CanvasElement, px: number, py: number): boolean {
  const padding = 8

  if (el.type === "freedraw" || el.type === "line" || el.type === "arrow") {
    if (!el.points || el.points.length === 0) return false
    for (const p of el.points) {
      const dist = Math.sqrt((p.x - px) ** 2 + (p.y - py) ** 2)
      if (dist < padding + el.strokeWidth) return true
    }
    return false
  }

  if (el.type === "text") {
    const tw = (el.text || "").length * (el.fontSize || 20) * 0.6
    const th = (el.fontSize || 20) * 1.4 * ((el.text || "").split("\n").length)
    return px >= el.x - padding && px <= el.x + tw + padding &&
           py >= el.y - padding && py <= el.y + th + padding
  }

  const minX = Math.min(el.x, el.x + el.width) - padding
  const minY = Math.min(el.y, el.y + el.height) - padding
  const maxX = Math.max(el.x, el.x + el.width) + padding
  const maxY = Math.max(el.y, el.y + el.height) + padding

  return px >= minX && px <= maxX && py >= minY && py <= maxY
}

export function getResizeHandle(
  el: CanvasElement,
  px: number,
  py: number
): string | null {
  const padding = 6
  const hs = 10
  const sx = Math.min(el.x, el.x + el.width)
  const sy = Math.min(el.y, el.y + el.height)
  const sw = Math.abs(el.width)
  const sh = Math.abs(el.height)

  const handles: Record<string, [number, number]> = {
    nw: [sx - padding, sy - padding],
    ne: [sx + sw + padding, sy - padding],
    sw: [sx - padding, sy + sh + padding],
    se: [sx + sw + padding, sy + sh + padding],
  }

  for (const [name, [hx, hy]] of Object.entries(handles)) {
    if (
      px >= hx - hs &&
      px <= hx + hs &&
      py >= hy - hs &&
      py <= hy + hs
    ) {
      return name
    }
  }
  return null
}
