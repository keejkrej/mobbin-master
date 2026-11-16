'use client';
import { useEffect, useRef } from 'react';

type Props = { scene: string; cellSize: number; textOpacity: number; tileOpacity: number; playing: boolean; className?: string; label: string };
export default function AsciiScene({ scene, cellSize, textOpacity, tileOpacity, playing, className = '', label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const sample = document.createElement('canvas');
    const pixels = sample.getContext('2d', { willReadFrequently: true });
    if (!pixels) return;
    let frame = 0, raf = 0, previous = 0, visible = true, loaded = false;
    const source = new Image();
    const chars = ' .:-;i1tfLCG08@';
    function paint() {
      if (!canvas || !context || !pixels || !loaded) return;
      const width = Math.round(canvas.clientWidth), height = Math.round(canvas.clientHeight);
      if (!width || !height) return;
      const density = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * density; canvas.height = height * density;
      context.setTransform(density, 0, 0, density, 0, 0);
      const cellHeight = cellSize * 1.65;
      const columns = Math.ceil(width / cellSize), rows = Math.ceil(height / cellHeight);
      sample.width = columns; sample.height = rows;
      const ratio = Math.max(columns / source.width, rows / source.height);
      const sw = columns / ratio, sh = rows / ratio;
      pixels.drawImage(source, (source.width - sw) / 2, (source.height - sh) / 2, sw, sh, 0, 0, columns, rows);
      const data = pixels.getImageData(0, 0, columns, rows).data;
      context.fillStyle = '#08090c'; context.fillRect(0, 0, width, height);
      context.font = `${cellSize * 1.18}px "Geist Mono", monospace`;
      context.textAlign = 'center'; context.textBaseline = 'middle';
      for (let y = 0; y < rows; y++) for (let x = 0; x < columns; x++) {
        const index = (y * columns + x) * 4;
        const r = data[index], g = data[index + 1], b = data[index + 2];
        const luminance = (r * .299 + g * .587 + b * .114) / 255;
        const wobble = playing ? Math.sin(frame * .3 + x * .11 + y * .17) * .055 : 0;
        const char = chars[Math.min(chars.length - 1, Math.max(0, Math.floor((luminance + wobble) * (chars.length - 1))))];
        context.fillStyle = `rgba(${r},${g},${b},${tileOpacity / 100})`;
        context.fillRect(x * cellSize, y * cellHeight, cellSize - .5, cellHeight - .5);
        context.fillStyle = `rgba(${Math.min(255, r * 1.5 + 22)},${Math.min(255, g * 1.5 + 22)},${Math.min(255, b * 1.5 + 22)},${textOpacity / 100})`;
        context.fillText(char, x * cellSize + cellSize / 2, y * cellHeight + cellHeight / 2);
      }
      canvas.dataset.ready = 'true';
      canvas.dataset.frame = String(frame);
    }
    function animate(time: number) { if (visible && time - previous > 120) { frame++; paint(); previous = time; } raf = requestAnimationFrame(animate); }
    source.onload = () => { loaded = true; paint(); if (playing) raf = requestAnimationFrame(animate); };
    source.src = `/general-intuition/assets/${scene}.webp`;
    document.fonts.ready.then(() => paint());
    const resize = new ResizeObserver(() => paint()); resize.observe(canvas);
    const intersection = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) paint(); }); intersection.observe(canvas);
    return () => { cancelAnimationFrame(raf); resize.disconnect(); intersection.disconnect(); source.onload = null; };
  }, [scene, cellSize, textOpacity, tileOpacity, playing]);
  return <canvas ref={canvasRef} className={`ascii-scene ${className}`} role="img" aria-label={label} />;
}
