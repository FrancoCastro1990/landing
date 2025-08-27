import { useEffect, useRef, useState } from 'react';

interface AnimatedBackgroundProps {
  intensity?: number;
  paused?: boolean;
  colorPalette?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

interface PulseRing {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  maxRadius: number;
  ringIndex: number; // Para identificar diferentes ondas
}

const DEFAULT_CHARS = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz{}[]()<>=+-*/.,:;';

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  intensity = 1,
  paused = false,
  colorPalette = {
    primary: '#00ff66',
    secondary: '#00cc44',
    accent: '#9aa0a6',
  },
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const pulsesRef = useRef<PulseRing[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addListener(handleChange);

    // Check for low power mode indicators
    const isLowPowerDevice =
      navigator.hardwareConcurrency <= 2 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    setIsLowPower(isLowPowerDevice);

    // Check initial theme
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark !== isDarkMode) {
        setIsDarkMode(isDark);
      }
    };

    checkTheme();

    // Watch for theme changes with debouncing
    let themeChangeTimeout: number;
    const observer = new MutationObserver(mutations => {
      // Only react to actual class changes, not other DOM mutations
      const hasClassChange = mutations.some(
        mutation =>
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class' &&
          mutation.target === document.documentElement
      );

      if (hasClassChange) {
        clearTimeout(themeChangeTimeout);
        themeChangeTimeout = setTimeout(checkTheme, 50); // Debounce 50ms
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
      childList: false,
      subtree: false,
    });

    return () => {
      mediaQuery.removeListener(handleChange);
      observer.disconnect();
      if (themeChangeTimeout) {
        clearTimeout(themeChangeTimeout);
      }
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initPulses = () => {
      pulsesRef.current = [];
      // Inicializar posición del mouse al centro
      mouseRef.current = {
        x: canvas.width / 2,
        y: canvas.height / 2,
      };
    };

    const createPulse = (x: number, y: number) => {
      const maxDistance = Math.min(canvas.width, canvas.height) * 0.6;

      // Crear múltiples ondas concéntricas como una gota de agua
      for (let i = 0; i < 3; i++) {
        const delay = i * 8; // Ondas salen con pequeño delay
        const baseOpacity = 0.2 - i * 0.05; // Cada onda más sutil
        const baseSpeed = (isLowPower ? 1.2 : 1.8) - i * 0.2; // Velocidades diferentes

        pulsesRef.current.push({
          x: x,
          y: y,
          radius: delay, // Empezar con el delay como radio inicial
          opacity: baseOpacity,
          speed: baseSpeed,
          maxRadius: maxDistance - i * 50, // Cada onda llega menos lejos
          ringIndex: i,
        });
      }
    };

    const animate = () => {
      if (paused || isReducedMotion) return;

      // Limpiar canvas para hacer transparente y permitir ver el DynamicBackground
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Animar pulsos existentes

      // Animar pulsos existentes
      pulsesRef.current = pulsesRef.current.filter(pulse => {
        pulse.radius += pulse.speed;

        // Calcular opacidad basada en el progreso y tipo de onda
        const progress = pulse.radius / pulse.maxRadius;
        const baseOpacity = 0.2 - pulse.ringIndex * 0.05;

        if (progress < 0.05) {
          // Fade in muy rápido (efecto de gota)
          pulse.opacity = baseOpacity * (progress / 0.05);
        } else if (progress < 0.15) {
          // Pico de intensidad breve (el impacto)
          pulse.opacity = baseOpacity;
        } else if (progress < 0.6) {
          // Fade out gradual - comienza el desvanecimiento mucho antes
          const fadeProgress = (progress - 0.15) / (0.6 - 0.15);
          pulse.opacity = baseOpacity * (1 - fadeProgress * 0.8); // 80% de fade en esta fase
        } else {
          // Fade out final muy sutil - casi invisible al final
          const finalProgress = (progress - 0.6) / (1 - 0.6);
          pulse.opacity = baseOpacity * 0.2 * (1 - finalProgress); // Solo 20% de opacidad máxima
        }

        // Dibujar solo si es visible - terminar antes del tamaño máximo
        const maxProgressAllowed = 0.85 - pulse.ringIndex * 0.1; // Ondas exteriores terminan aún antes
        if (pulse.radius < pulse.maxRadius * maxProgressAllowed && pulse.opacity > 0.008) {
          // Aplicar blur según la onda
          ctx.filter = `blur(${0.8 + pulse.ringIndex * 0.4}px)`;

          // Color que varía según el índice de la onda y tema
          const hue = pulse.ringIndex * 10; // Ligera variación de color
          let red, green, blue;

          if (isDarkMode) {
            // Colores para tema oscuro (verde terminal suave)
            red = 142 - pulse.ringIndex * 10; // #8ec07c en RGB es 142,192,124
            green = 192 - pulse.ringIndex * 15;
            blue = 124 - pulse.ringIndex * 12;
          } else {
            // Colores para tema claro (verde profundo)
            red = 66 - pulse.ringIndex * 8; // #427b58 en RGB es 66,123,88
            green = 123 - pulse.ringIndex * 12;
            blue = 88 - pulse.ringIndex * 10;
          }

          // Anillo principal - más delgado para efecto de onda
          ctx.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${pulse.opacity})`;
          ctx.lineWidth = 1.5 - pulse.ringIndex * 0.3; // Ondas más lejanas más delgadas
          ctx.beginPath();
          ctx.arc(pulse.x, pulse.y, pulse.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Resplandor interior solo para la primera onda (más cercana al centro)
          if (pulse.ringIndex === 0 && pulse.radius > 10 && progress < 0.4) {
            const innerGradient = ctx.createRadialGradient(
              pulse.x,
              pulse.y,
              0,
              pulse.x,
              pulse.y,
              pulse.radius * 0.8
            );
            innerGradient.addColorStop(
              0,
              `rgba(${red}, ${green + 20}, ${blue + 20}, ${pulse.opacity * 0.15})`
            );
            innerGradient.addColorStop(
              0.7,
              `rgba(${red}, ${green}, ${blue}, ${pulse.opacity * 0.08})`
            );
            innerGradient.addColorStop(1, `rgba(${red}, ${green - 20}, ${blue - 20}, 0)`);
            ctx.fillStyle = innerGradient;
            ctx.beginPath();
            ctx.arc(pulse.x, pulse.y, pulse.radius * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Resetear filtro
          ctx.filter = 'none';

          return true; // Mantener el pulso
        }
        return false; // Remover el pulso
      });

      if (!isLowPower) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Reduce frame rate for low power devices
        setTimeout(() => {
          animationRef.current = requestAnimationFrame(animate);
        }, 33); // ~30 FPS
      }
    };

    resizeCanvas();
    initPulses();

    // Event listeners para el mouse
    const handleMouseMove = (e: MouseEvent) => {
      // Usar coordenadas del viewport directamente
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleClick = (e: MouseEvent) => {
      // Detectar clicks en todo el documento, no solo el canvas
      const clickX = e.clientX;
      const clickY = e.clientY;
      createPulse(clickX, clickY);
    };

    document.addEventListener('mousemove', handleMouseMove);
    // Agregar el listener al documento en lugar del canvas
    document.addEventListener('click', handleClick);
    animate();

    const handleResize = () => {
      resizeCanvas();
      initPulses();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      } else if (!paused && !isReducedMotion) {
        animate();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [intensity, paused, colorPalette, isReducedMotion, isLowPower, isDarkMode]);

  if (isReducedMotion && !paused) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-lightTheme-bg via-lightTheme-magenta/30 to-lightTheme-bg dark:from-darkTheme-bg dark:via-darkTheme-blue/30 dark:to-darkTheme-bg -z-10" />
    );
  }

  return <canvas ref={canvasRef} className="fixed inset-0 -z-10" />;
};

export default AnimatedBackground;
