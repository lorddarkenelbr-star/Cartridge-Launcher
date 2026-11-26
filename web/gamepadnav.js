(function () {
  const DEADZONE = 0.4;
  const REPEAT_DELAY_MS = 200;
  const STORAGE_KEY = "cartridge_gamepad_custom_map_v1";
  const SELECTED_CLASS = "gamepad-selected";

  function loadCustomMap(gamepadId) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return all[gamepadId] || null;
    } catch {
      return null;
    }
  }

  function saveCustomMap(gamepadId, map) {
    try {
      const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      all[gamepadId] = map;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    } catch {
      // ignora erro de storage
    }
  }

  function detectProfile(gp) {
    const saved = loadCustomMap(gp.id);
    if (saved) return saved;

    if (gp.mapping === "standard" || gp.buttons.length >= 16) {
      return {
        confirm: [0],          // X / A
        back: [1],             // Círculo / B
        secondary: [2, 3],     // Quadrado / Triângulo ou X / Y
        dpadUp: [12],
        dpadDown: [13],
        dpadLeft: [14],
        dpadRight: [15],
        axisX: 0,
        axisY: 1,
        dpadAxisX: null,
        dpadAxisY: null,
      };
    }

    const btnCount = gp.buttons.length;
    return {
      confirm: [btnCount > 1 ? 1 : 0, 0],
      back: [btnCount > 2 ? 2 : 1, 0],
      secondary: [btnCount > 3 ? 3 : 0],
      dpadUp: btnCount > 12 ? [12] : [],
      dpadDown: btnCount > 13 ? [13] : [],
      dpadLeft: btnCount > 14 ? [14] : [],
      dpadRight: btnCount > 15 ? [15] : [],
      axisX: 0,
      axisY: 1,
      dpadAxisX: gp.axes.length > 6 ? 6 : gp.axes.length > 4 ? 4 : null,
      dpadAxisY: gp.axes.length > 7 ? 7 : gp.axes.length > 5 ? 5 : null,
    };
  }

  const stateByIndex = new Map();
  let lastRepeatTime = 0;
  let prevDir = null;

  function isElementVisibleAndEnabled(el) {
    if (!el || el.disabled) return false;
    if (el.offsetParent === null && getComputedStyle(el).position !== "fixed") {
      return false;
    }
    const style = getComputedStyle(el);
    return style.display !== "none" && style.visibility !== "hidden";
  }

  function getFocusableElements() {
    const selector = [
      "button:not([disabled])",
      "[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
      "[data-focusable='true']",
      ".game-card",
      ".launcher-item",
    ].join(",");

    return Array.from(document.querySelectorAll(selector)).filter(
      isElementVisibleAndEnabled
    );
  }

  function clearSelectionClasses() {
    document.querySelectorAll(`.${SELECTED_CLASS}`).forEach((el) => {
      el.classList.remove(SELECTED_CLASS);
    });
  }

  function focusElement(el) {
    if (!el) return;
    clearSelectionClasses();
    el.classList.add(SELECTED_CLASS);

    if (!el.hasAttribute("tabindex") && el.tabIndex < 0) {
      el.setAttribute("tabindex", "0");
    }
    el.focus({ preventScroll: false });
    el.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }

  function dispatchArrowKey(direction) {
    const keyMap = {
      up: { key: "ArrowUp", code: "ArrowUp" },
      down: { key: "ArrowDown", code: "ArrowDown" },
      left: { key: "ArrowLeft", code: "ArrowLeft" },
      right: { key: "ArrowRight", code: "ArrowRight" },
    };
    const info = keyMap[direction];
    if (!info) return;

    const target = document.activeElement || document.body;
    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: info.key,
        code: info.code,
        bubbles: true,
        cancelable: true,
      })
    );
  }

  function moveFocus(direction) {
    dispatchArrowKey(direction);

    const items = getFocusableElements();
    if (items.length === 0) return;

    const active = document.activeElement;
    const currentIndex = items.indexOf(active);

    if (currentIndex === -1) {
      focusElement(items[0]);
      return;
    }

    const currentRect = active.getBoundingClientRect();
    const cx = currentRect.left + currentRect.width / 2;
    const cy = currentRect.top + currentRect.height / 2;

    let bestCandidate = null;
    let bestScore = Infinity;

    for (let i = 0; i < items.length; i++) {
      if (i === currentIndex) continue;
      const rect = items[i].getBoundingClientRect();
      const tx = rect.left + rect.width / 2;
      const ty = rect.top + rect.height / 2;
      const dx = tx - cx;
      const dy = ty - cy;

      let valid = false;
      let primaryDist = 0;
      let secondaryDist = 0;

      if (direction === "up" && dy < -8) {
        valid = true;
        primaryDist = Math.abs(dy);
        secondaryDist = Math.abs(dx);
      } else if (direction === "down" && dy > 8) {
        valid = true;
        primaryDist = Math.abs(dy);
        secondaryDist = Math.abs(dx);
      } else if (direction === "left" && dx < -8) {
        valid = true;
        primaryDist = Math.abs(dx);
        secondaryDist = Math.abs(dy);
      } else if (direction === "right" && dx > 8) {
        valid = true;
        primaryDist = Math.abs(dx);
        secondaryDist = Math.abs(dy);
      }

      if (valid) {
        const score = primaryDist + secondaryDist * 1.5;
        if (score < bestScore) {
          bestScore = score;
          bestCandidate = items[i];
        }
      }
    }

    if (bestCandidate) {
      focusElement(bestCandidate);
      return;
    }

    if (direction === "down" || direction === "right") {
      focusElement(items[(currentIndex + 1) % items.length]);
    } else if (direction === "up" || direction === "left") {
      focusElement(items[(currentIndex - 1 + items.length) % items.length]);
    }
  }

  function triggerConfirm() {
    const items = getFocusableElements();
    let target = document.activeElement;

    if (!target || !items.includes(target)) {
      target = items[0];
      if (target) focusElement(target);
      if (!target) return;
    }

    target.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Enter",
        code: "Enter",
        bubbles: true,
        cancelable: true,
      })
    );
    target.click();
    target.dispatchEvent(
      new CustomEvent("gamepad:confirm", { bubbles: true, detail: { element: target } })
    );
  }

  function triggerBack() {
    document.dispatchEvent(new CustomEvent("gamepad:back", { bubbles: true }));
    const openModalClose = document.querySelector(
      ".modal.open [data-close], .modal.active [data-close], [data-modal-close]"
    );
    if (openModalClose && isElementVisibleAndEnabled(openModalClose)) {
      openModalClose.click();
      return;
    }
    document.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        bubbles: true,
        cancelable: true,
      })
    );
  }

  function anyButtonPressed(gp, indices) {
    if (!indices || !indices.length) return false;
    return indices.some((idx) => Boolean(gp.buttons[idx]?.pressed));
  }

  function getDirectionFromGamepad(gp, profile) {
    if (anyButtonPressed(gp, profile.dpadUp)) return "up";
    if (anyButtonPressed(gp, profile.dpadDown)) return "down";
    if (anyButtonPressed(gp, profile.dpadLeft)) return "left";
    if (anyButtonPressed(gp, profile.dpadRight)) return "right";

    if (profile.dpadAxisX !== null && profile.dpadAxisY !== null) {
      const dax = gp.axes[profile.dpadAxisX] ?? 0;
      const day = gp.axes[profile.dpadAxisY] ?? 0;
      if (day < -DEADZONE) return "up";
      if (day > DEADZONE) return "down";
      if (dax < -DEADZONE) return "left";
      if (dax > DEADZONE) return "right";
    }

    const axisX = gp.axes[profile.axisX ?? 0] ?? 0;
    const axisY = gp.axes[profile.axisY ?? 1] ?? 0;

    if (Math.abs(axisY) > Math.abs(axisX)) {
      if (axisY < -DEADZONE) return "up";
      if (axisY > DEADZONE) return "down";
    } else {
      if (axisX < -DEADZONE) return "left";
      if (axisX > DEADZONE) return "right";
    }

    return null;
  }

  function actionJustPressed(gp, prevButtons, indices) {
    if (!indices || !indices.length) return false;
    const now = indices.some((idx) => Boolean(gp.buttons[idx]?.pressed));
    const was = indices.some((idx) => Boolean(prevButtons[idx]));
    return now && !was;
  }

  function pickActiveGamepad(gamepads) {
    const connected = Array.from(gamepads).filter((pad) => pad && pad.connected);
    if (!connected.length) return null;

    const activeNow = connected.find(
      (pad) =>
        pad.buttons.some((b) => b?.pressed) ||
        pad.axes.some((a) => Math.abs(a ?? 0) > DEADZONE)
    );
    return activeNow || connected[0];
  }

  function pollGamepads() {
    const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
    const gp = pickActiveGamepad(gamepads);

    if (gp) {
      if (!stateByIndex.has(gp.index)) {
        stateByIndex.set(gp.index, {
          profile: detectProfile(gp),
          prevButtons: [],
        });
      }

      const padState = stateByIndex.get(gp.index);
      const { profile, prevButtons } = padState;
      const now = performance.now();
      const dir = getDirectionFromGamepad(gp, profile);

      if (dir) {
        if (dir !== prevDir || now - lastRepeatTime >= REPEAT_DELAY_MS) {
          moveFocus(dir);
          prevDir = dir;
          lastRepeatTime = now;
        }
      } else {
        prevDir = null;
      }

      if (actionJustPressed(gp, prevButtons, profile.confirm)) {
        triggerConfirm();
      }

      if (actionJustPressed(gp, prevButtons, profile.back)) {
        triggerBack();
      }

      if (actionJustPressed(gp, prevButtons, profile.secondary)) {
        document.dispatchEvent(new CustomEvent("gamepad:secondary", { bubbles: true }));
      }

      padState.prevButtons = gp.buttons.map((b) => Boolean(b?.pressed));
    } else {
      prevDir = null;
    }

    requestAnimationFrame(pollGamepads);
  }

  window.CartridgeGamepad = {
    setCustomMap(gamepadId, customMap) {
      const current = detectProfile({ id: gamepadId, mapping: "standard", buttons: [], axes: [] });
      saveCustomMap(gamepadId, { ...current, ...customMap });
      stateByIndex.clear();
    },
    resetCustomMap(gamepadId) {
      try {
        const all = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
        delete all[gamepadId];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        stateByIndex.clear();
      } catch {
        // ignora
      }
    },
    debugState() {
      const pads = Array.from(navigator.getGamepads ? navigator.getGamepads() : [])
        .filter(Boolean)
        .map((p) => ({
          index: p.index,
          id: p.id,
          mapping: p.mapping,
          buttons: p.buttons.map((b, i) => (b.pressed ? i : null)).filter((v) => v !== null),
          axes: p.axes.map((a) => Number(a.toFixed(2))),
        }));
      return {
        gamepads: pads,
        focusableCount: getFocusableElements().length,
        activeElement: document.activeElement?.tagName || null,
      };
    },
  };

  window.addEventListener("gamepadconnected", (e) => {
    const profile = detectProfile(e.gamepad);
    stateByIndex.set(e.gamepad.index, { profile, prevButtons: [] });
    console.log("[Cartridge Gamepad] Conectado:", e.gamepad.id, "| Mapeamento:", e.gamepad.mapping || "auto");
    const items = getFocusableElements();
    if (items.length > 0 && !items.includes(document.activeElement)) {
      focusElement(items[0]);
    }
  });

  window.addEventListener("gamepaddisconnected", (e) => {
    stateByIndex.delete(e.gamepad.index);
    console.log("[Cartridge Gamepad] Desconectado:", e.gamepad.id);
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      requestAnimationFrame(pollGamepads);
    });
  } else {
    requestAnimationFrame(pollGamepads);
  }
})();