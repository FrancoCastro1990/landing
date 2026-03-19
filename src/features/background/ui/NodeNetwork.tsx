import { useEffect, useRef } from 'react';

const CONNECTION_DISTANCE = 150;
const MOUSE_CONNECTION_DISTANCE = 200;
const NODE_LINE_OPACITY = 0.12;
const MOUSE_LINE_OPACITY = 0.25;
const DRIFT_AMPLITUDE_MIN = 15;
const DRIFT_AMPLITUDE_MAX = 40;
const DRIFT_FREQUENCY_MIN = 0.0003;
const DRIFT_FREQUENCY_MAX = 0.001;
const NODE_RADIUS = 2;
const COLOR_REFRESH_INTERVAL = 60;

interface Node {
  baseX: number;
  baseY: number;
  driftAmpX: number;
  driftAmpY: number;
  driftFreqX: number;
  driftFreqY: number;
  phaseX: number;
  phaseY: number;
}

function getNodeCount(width: number): number {
  if (width >= 1024) return 40;
  if (width >= 768) return 25;
  return 15;
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createNodes(width: number, height: number): Node[] {
  const count = getNodeCount(width);
  const nodes: Node[] = [];

  for (let i = 0; i < count; i++) {
    nodes.push({
      baseX: Math.random() * width,
      baseY: Math.random() * height,
      driftAmpX: randomInRange(DRIFT_AMPLITUDE_MIN, DRIFT_AMPLITUDE_MAX),
      driftAmpY: randomInRange(DRIFT_AMPLITUDE_MIN, DRIFT_AMPLITUDE_MAX),
      driftFreqX: randomInRange(DRIFT_FREQUENCY_MIN, DRIFT_FREQUENCY_MAX),
      driftFreqY: randomInRange(DRIFT_FREQUENCY_MIN, DRIFT_FREQUENCY_MAX),
      phaseX: Math.random() * Math.PI * 2,
      phaseY: Math.random() * Math.PI * 2,
    });
  }

  return nodes;
}

function getNodePosition(node: Node, time: number): { x: number; y: number } {
  return {
    x: node.baseX + Math.sin(time * node.driftFreqX + node.phaseX) * node.driftAmpX,
    y: node.baseY + Math.cos(time * node.driftFreqY + node.phaseY) * node.driftAmpY,
  };
}

function readPrimaryColor(): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--color-primary')
    .trim();
  if (!raw) return '250, 204, 21';
  return raw.replace(/\s+/g, ', ');
}

const NodeNetwork: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let nodes: Node[] = [];
    let primaryColor = readPrimaryColor();
    let frameCount = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes = createNodes(width, height);
    }

    function draw(time: number) {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx!.clearRect(0, 0, width, height);

      frameCount++;
      if (frameCount % COLOR_REFRESH_INTERVAL === 0) {
        primaryColor = readPrimaryColor();
      }

      const positions = nodes.map((node) => getNodePosition(node, time));

      // Draw connections between nodes
      for (let i = 0; i < positions.length; i++) {
        for (let j = i + 1; j < positions.length; j++) {
          const dx = positions[i].x - positions[j].x;
          const dy = positions[i].y - positions[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const opacity = NODE_LINE_OPACITY * (1 - dist / CONNECTION_DISTANCE);
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(positions[i].x, positions[i].y);
            ctx!.lineTo(positions[j].x, positions[j].y);
            ctx!.stroke();
          }
        }
      }

      // Draw mouse connections
      const mouse = mouseRef.current;
      if (mouse) {
        for (let i = 0; i < positions.length; i++) {
          const dx = mouse.x - positions[i].x;
          const dy = mouse.y - positions[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MOUSE_CONNECTION_DISTANCE) {
            const opacity = MOUSE_LINE_OPACITY * (1 - dist / MOUSE_CONNECTION_DISTANCE);
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx!.lineWidth = 1;
            ctx!.moveTo(mouse.x, mouse.y);
            ctx!.lineTo(positions[i].x, positions[i].y);
            ctx!.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < positions.length; i++) {
        ctx!.beginPath();
        ctx!.arc(positions[i].x, positions[i].y, NODE_RADIUS, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${primaryColor}, 0.4)`;
        ctx!.fill();
      }
    }

    function loop(time: number) {
      draw(time);
      animationId = requestAnimationFrame(loop);
    }

    function drawStatic() {
      draw(0);
    }

    resize();

    if (prefersReducedMotion.matches) {
      drawStatic();
    } else {
      animationId = requestAnimationFrame(loop);
    }

    function handleMotionChange(e: MediaQueryListEvent) {
      if (e.matches) {
        cancelAnimationFrame(animationId);
        drawStatic();
      } else {
        animationId = requestAnimationFrame(loop);
      }
    }

    prefersReducedMotion.addEventListener('change', handleMotionChange);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion.matches) {
        drawStatic();
      }
    });
    resizeObserver.observe(document.documentElement);

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      prefersReducedMotion.removeEventListener('change', handleMotionChange);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <canvas ref={canvasRef} className="block w-full h-full" role="presentation" />
    </div>
  );
};

export default NodeNetwork;
