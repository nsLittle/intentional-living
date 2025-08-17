// src/components/DropDownPanelContainer.tsx
"use client";

import { PropsWithChildren } from "react";

export type DropDownPanelContainerProps = PropsWithChildren<{
  /** Controls visibility/animation */
  isOpen: boolean;
  /** Called on mouse/focus entry */
  onOpen: () => void;
  /** Called on mouse/focus leave/blur */
  onClose: () => void;
  /** Optional extra classes on the outer fixed panel */
  outerClassName?: string;
  /** Optional extra classes on the inner grid wrapper */
  innerClassName?: string;
}>;

/**
 * Shell for header dropdown panels.
 * Handles hover/focus open/close, animation, and the inner max-width grid.
 */
export default function DropDownPanelContainer({
  isOpen,
  onOpen,
  onClose,
  outerClassName = "",
  innerClassName = "",
  children,
}: DropDownPanelContainerProps) {
  const base = "fixed top-14 left-0 w-full z-40 transition-all duration-150";
  const openCls = "opacity-100 translate-y-0 pointer-events-auto";
  const closedCls = "opacity-0 -translate-y-1 pointer-events-none";

  return (
    <div
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocus={onOpen}
      onBlur={onClose}
      className={`${base} ${isOpen ? openCls : closedCls} ${outerClassName}`}>
      <div className="bg-[#fefcf9] border-t border-black/10 shadow-lg">
        <div
          className={`mx-auto max-w-6xl px-4 sm:px-6 py-6 grid grid-cols-12 gap-6 ${innerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
