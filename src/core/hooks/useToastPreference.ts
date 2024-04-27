"use client"

import { useEffect, useState } from "react"

const useToastPreference = () => {
  const [isToastDismissed, setIsToastDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem("toastDismissed")
    setIsToastDismissed(dismissed === "true")
  }, [])

  const dismissToast = () => {
    localStorage.setItem("toastDismissed", "true")
    setIsToastDismissed(true)
  }

  return { isToastDismissed, dismissToast }
}

export default useToastPreference
