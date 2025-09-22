"use client"
import { useEffect } from "react"

export function ClientEvents() {
  useEffect(() => {
    console.log("view_content", { page: "landing" })
  }, [])
  return null
}


