import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";

gsap.registerPlugin(Draggable, InertiaPlugin);

/**
 * GreenSock's elliptical-carousel helper, typed and kept close to the original.
 *
 * Setup is the part that surprises people: every target starts stacked on top of
 * the others, `position: absolute` at the same point, and this spreads them out
 * around an ellipse from there. It writes x and y only — never rotation — so the
 * cards stay upright the whole way round with no counter-turn to keep in sync.
 *
 * Rotation is a single number, in degrees, that the whole thing is derived from.
 * Dragging, the scroll wheel and autoAdvance are three ways of moving it, which
 * is why they compose instead of fighting: none of them own the position.
 */

export type CarouselDirection = "short" | "cw" | "ccw";

export type CarouselOptions = {
  /** radius on the x-axis, in pixels */
  radiusX?: number;
  /** radius on the y-axis, in pixels */
  radiusY?: number;
  /** the slot considered "active", in degrees: 0 is far right, -90 is 12 o'clock */
  activeAngle?: number;
  /**
   * Turn each item to follow the ring instead of staying upright.
   *
   * The offset is chosen so that an item at 12 o'clock reads level, which means
   * that with `activeAngle: -90` the chosen item is always the upright one and
   * every other item leans by however far round it has travelled. That falls out
   * of the geometry rather than needing a special case for the active item.
   */
  rotateItems?: boolean;
  activeElement?: HTMLElement | string;
  /** seconds of rest between automatic next() calls; omit for no auto-advance */
  autoAdvance?: number;
  draggable?: boolean;
  /** defaults for the tween next()/previous() run; callers can still override per call */
  stepVars?: gsap.TweenVars;
  onClick?: (element: HTMLElement, self: Carousel) => void;
  /** an element became the one nearest the active slot */
  onActivate?: (element: HTMLElement, self: Carousel) => void;
  onDeactivate?: (element: HTMLElement, self: Carousel) => void;
  /** a drag or a to()/next()/previous() animation began */
  onStart?: (element: HTMLElement, self: Carousel) => void;
  onStop?: (element: HTMLElement, self: Carousel) => void;
};

export type Carousel = {
  /** getter/setter for the carousel's rotation, in degrees */
  rotation(value?: number): number;
  resize(radiusX: number, radiusY: number): void;
  render(): void;
  activeElement(value?: HTMLElement | string): HTMLElement;
  /** the rotation at which the given element would be the active one */
  elementRotation(element: HTMLElement | string): number;
  to(
    elOrRotation: HTMLElement | string | number,
    vars?: gsap.TweenVars,
    direction?: CarouselDirection,
  ): gsap.core.Tween;
  next(vars?: gsap.TweenVars, direction?: CarouselDirection): void;
  previous(vars?: gsap.TweenVars, direction?: CarouselDirection): void;
  kill(): void;
  snap: number;
  draggable?: Draggable;
  autoAdvance?: gsap.core.Tween;
};

export function buildCarousel(
  targets: HTMLElement[] | string,
  {
    radiusX = 200,
    radiusY = 200,
    activeAngle = -90,
    rotateItems = false,
    activeElement,
    autoAdvance,
    draggable: useDraggable,
    stepVars,
    onClick,
    onActivate,
    onDeactivate,
    onStart,
    onStop,
  }: CarouselOptions = {},
): Carousel {
  const items = gsap.utils.toArray<HTMLElement>(targets);
  gsap.set(items, { xPercent: -50, x: 0, yPercent: -50, y: 0 });

  const DEG2RAD = Math.PI / 180;
  // Pointer events where they exist, touch where they do not, mouse as the floor.
  const eventTypes = (
    "ontouchstart" in document.documentElement
      ? "touchstart,touchmove,touchcancel,touchend"
      : !("onpointerdown" in document.documentElement)
        ? "mousedown,mousemove,mouseup,mouseup"
        : "pointerdown,pointermove,pointercancel,pointerup"
  ).split(",");
  const round = (value: number) => Math.round(value * 10000) / 10000;
  const tempDiv = document.createElement("div");
  const quantity = items.length;
  const angleInc = 360 / quantity;
  const wrap = gsap.utils.wrap(0, quantity);
  const angleWrap = gsap.utils.wrap(0, 360);
  const xSetters = items.map((el) => gsap.quickSetter(el, "x", "px"));
  const ySetters = items.map((el) => gsap.quickSetter(el, "y", "px"));
  const rotSetters = rotateItems
    ? items.map((el) => gsap.quickSetter(el, "rotation", "deg"))
    : undefined;

  let rotation = 0;
  let active: HTMLElement = items[0];
  let dragged = false;
  let onPressRotation = 0;
  let draggable: Draggable | undefined;

  const autoAdvanceCall = autoAdvance
    ? gsap.delayedCall(autoAdvance, () => {
        self.next();
        autoAdvanceCall!.restart(true);
      })
    : undefined;

  const self: Carousel = {
    rotation(value?: number) {
      if (arguments.length) {
        const previous = active;
        rotation = angleWrap(value!);
        active = items[wrap(Math.round(-value! / angleInc))];
        self.render();
        if (previous !== active) {
          onDeactivate && previous && onDeactivate(previous, self);
          onActivate && onActivate(active, self);
        }
      }
      return rotation;
    },

    resize(rx: number, ry: number) {
      radiusX = rx;
      radiusY = ry;
      self.render();
    },

    render() {
      const inc = angleInc * DEG2RAD;
      let a = (rotation + activeAngle) * DEG2RAD;
      for (let i = 0; i < quantity; i++) {
        xSetters[i](round(Math.cos(a) * radiusX));
        ySetters[i](round(Math.sin(a) * radiusY));
        // +90 puts the seam at 12 o'clock — see the note on rotateItems
        rotSetters && rotSetters[i](round(a / DEG2RAD + 90));
        a += inc;
      }
    },

    activeElement(value?: HTMLElement | string) {
      if (arguments.length) {
        self.rotation(self.elementRotation(value!));
      }
      return active;
    },

    elementRotation(element: HTMLElement | string) {
      const index = items.indexOf(gsap.utils.toArray<HTMLElement>(element)[0]);
      return (quantity - index) * angleInc;
    },

    to(elOrRotation, vars, direction) {
      const tweenVars: gsap.TweenVars = { ...vars };
      tweenVars.rotation =
        typeof elOrRotation === "number"
          ? elOrRotation
          : self.elementRotation(elOrRotation) || parseFloat(elOrRotation as string);
      tweenVars.overwrite = true;

      const { onUpdate, onComplete } = tweenVars;
      const callerOnStart = tweenVars.onStart;
      autoAdvanceCall && autoAdvanceCall.pause();

      tweenVars.onStart = function (this: gsap.core.Tween) {
        onStart && onStart(active, self);
        callerOnStart && callerOnStart.call(this);
      };
      tweenVars.onComplete = function (this: gsap.core.Tween) {
        onStop && onStop(active, self);
        onComplete && onComplete.call(this);
        autoAdvanceCall && autoAdvanceCall.restart(true);
      };

      // A direction means the tween has to run through a proxy: GSAP's "_cw" /
      // "_ccw" suffixes only work on a real rotation property, so a throwaway
      // element carries the value and each frame is copied back onto the carousel.
      if (direction) {
        const getter = gsap.getProperty(tempDiv);
        tweenVars.onUpdate = function (this: gsap.core.Tween) {
          self.rotation(getter("rotation") as number);
          onUpdate && onUpdate.call(this);
        };
        tweenVars.rotation = `${tweenVars.rotation}_${direction}`;
        return gsap.fromTo(tempDiv, { rotation }, tweenVars);
      }
      return gsap.to(self, tweenVars);
    },

    next(vars, direction) {
      const element = items[wrap(items.indexOf(active) + 1)];
      self.to(element, { ...stepVars, ...vars }, direction || "ccw");
    },

    previous(vars, direction) {
      const element = items[wrap(items.indexOf(active) - 1)];
      self.to(element, { ...stepVars, ...vars }, direction || "cw");
    },

    kill() {
      items.forEach((el) => {
        el.removeEventListener("click", handleClick);
        el.removeEventListener(eventTypes[0], onPress);
        el.removeEventListener(eventTypes[2], onRelease);
        el.removeEventListener(eventTypes[3], onRelease);
      });
      gsap.killTweensOf(self);
      tempDiv.parentNode && tempDiv.parentNode.removeChild(tempDiv);
      autoAdvanceCall && autoAdvanceCall.kill();
      draggable && draggable.kill();
    },

    snap: angleInc,
    autoAdvance: autoAdvanceCall,
  };

  function handleClick(event: Event) {
    if (!dragged) {
      autoAdvanceCall && autoAdvanceCall.restart(true);
      onClick && onClick(event.currentTarget as HTMLElement, self);
    }
  }

  function onPress(event: Event) {
    onPressRotation = rotation;
    gsap.set(tempDiv, { rotation });
    autoAdvanceCall && autoAdvanceCall.pause();
    gsap.killTweensOf(self);
    draggable!.startDrag(event);
    dragged = false;
  }

  function onRelease(event: Event) {
    draggable!.endDrag(event);
    // Nothing moved between press and release, so it was a click after all.
    if (rotation === onPressRotation) {
      autoAdvanceCall && autoAdvanceCall.restart(true);
      draggable!.tween && draggable!.tween.kill();
      handleClick(event);
    }
  }

  function syncDraggable() {
    if (!dragged) {
      onStart && onStart(active, self);
      dragged = true;
    }
    self.rotation(draggable!.rotation);
  }

  items[0].parentNode!.appendChild(tempDiv);
  gsap.set(tempDiv, {
    visibility: "hidden",
    position: "absolute",
    width: 0,
    height: 0,
    top: "50%",
    left: "50%",
    xPercent: -50,
    yPercent: -50,
  });

  items.forEach((el) => {
    if (useDraggable) {
      el.addEventListener(eventTypes[0], onPress);
      el.addEventListener(eventTypes[2], onRelease);
      el.addEventListener(eventTypes[3], onRelease);
    } else {
      el.addEventListener("click", handleClick);
    }
  });

  if (useDraggable) {
    self.draggable = draggable = Draggable.create(tempDiv, {
      type: "rotation",
      snap: gsap.utils.snap(angleInc),
      inertia: true,
      onThrowComplete: () => {
        autoAdvanceCall && autoAdvanceCall.restart(true);
        onStop && onStop(active, self);
      },
      onThrowUpdate: syncDraggable,
      onDrag: syncDraggable,
    })[0];
  }

  self.activeElement(
    (activeElement && gsap.utils.toArray<HTMLElement>(activeElement)[0]) || items[0],
  );
  return self;
}
