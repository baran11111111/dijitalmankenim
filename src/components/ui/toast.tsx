"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import type { Toast } from "@/hooks/use-toast";

interface ToastContainerProps {
  toasts: Toast[];
  onRemove: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
  error: <AlertCircle className="w-5 h-5 text-red-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
};

export function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="flex items-start gap-3 bg-white border border-[var(--border-light)] rounded-xl shadow-lg p-4 min-w-[320px] max-w-md"
          >
            {icons[toast.type]}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[var(--text)]">
                {toast.title}
              </p>
              {toast.description && (
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  {toast.description}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(toast.id)}
              className="p-0.5 rounded hover:bg-[var(--surface)] cursor-pointer"
            >
              <X className="w-4 h-4 text-[var(--text-muted)]" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
