'use client'
import { useState, useEffect } from 'react'
import PopupEspalda from './PopupEspalda'

export default function Popup() {
  const [showEspalda, setShowEspalda] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEspalda(true)
    }, 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showEspalda && <PopupEspalda onClose={() => setShowEspalda(false)} />}
    </>
  )
}
