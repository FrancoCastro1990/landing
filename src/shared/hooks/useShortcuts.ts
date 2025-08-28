import { useEffect } from "react";

type ShortcutMap = {
  [key: string]: () => void;
};

export function useShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Evitar que se disparen atajos mientras escribes en inputs/textarea
      const target = e.target as HTMLElement;
      const isTyping =
        target.isContentEditable ||
        /(input|textarea|select)/i.test(target.tagName);
      if (isTyping) return;

      // Normalizamos la tecla (ej: "a" en vez de "A")
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      const pressed = [];
      if (e.ctrlKey) pressed.push("Ctrl");
      if (e.shiftKey) pressed.push("Shift");
      if (e.altKey) pressed.push("Alt");
      if (e.metaKey) pressed.push("Meta");

      pressed.push(key);

      const combo = pressed.join("+");

      if (shortcuts[combo]) {
        e.preventDefault();
        shortcuts[combo]();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [shortcuts]);
}