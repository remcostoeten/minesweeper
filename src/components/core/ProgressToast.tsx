"use client"

import { useEffect } from "react"
import { toast, Toaster } from "sonner"

import useToastPreference from "@/core/hooks/useToastPreference"

export default function InProgressToast() {
  const { isToastDismissed, dismissToast } = useToastPreference()

  useEffect(() => {
    const isDismissed = localStorage.getItem("toastDismissed")
    if (!isToastDismissed && !isDismissed) {
      toast("Game is in progress. Far from done, so will contain bugs..", {
        duration: 7500,
        onDismiss: () => {
          dismissToast()
          localStorage.setItem("toastDismissed", "true")
        },
      })
    }
  }, [isToastDismissed, dismissToast])

  return <Toaster />
}
