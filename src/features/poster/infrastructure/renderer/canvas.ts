import { OUTPUT_DPI } from "./constants";
import type { CanvasSize } from "../../domain/types";

/**
 * Resolve the canvas size for export in pixels.
 *
 * Historically this function downscaled very large canvases to avoid
 * memory/time blowups in the browser (MAX_PIXELS / MAX_SIDE). To guarantee a
 * target effective DPI (OUTPUT_DPI) we return the full requested pixel
 * dimensions here and leave it to the caller / deployment to ensure the
 * environment can handle the resulting resource usage.
 *
 * Warning: very large pixel canvases may exceed browser limits and lead to
 * out-of-memory errors or renderer failures. Consider introducing server-side
 * rendering or tiling if you need very large exports in production.
 */
export function resolveCanvasSize(
  widthInches: number,
  heightInches: number,
): CanvasSize {
  const requestedWidth = Math.max(600, Math.round(widthInches * OUTPUT_DPI));
  const requestedHeight = Math.max(600, Math.round(heightInches * OUTPUT_DPI));

  return {
    width: requestedWidth,
    height: requestedHeight,
    requestedWidth,
    requestedHeight,
    downscaleFactor: 1,
  };
}
