"use client";

import { useCallback, useRef, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";
import Image from "next/image";

export default function Modal({ children }: { children: ReactNode }) {
  const overlay = useRef<HTMLDivElement>(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === overlay.current && onDismiss) {
        onDismiss();
      }
    },
    [onDismiss, overlay]
  );

  return (
    <div ref={overlay} className="modal" onClick={(e) => handleClick(e)}>
      <button
        type="button"
        onClick={onDismiss}
        className="absolute top-2 right-8"
      >
        <IoClose className="w-10 h-10 text-white pb-2" />
      </button>

      <div ref={wrapper} className="modal-wrapper">
        {children}
      </div>
    </div>
  );
}
