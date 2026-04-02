"use client"
import React from "react"

interface ButtonProps {
  text: string
  onClick?: () => void
  classname?: string
}

const Button: React.FC<ButtonProps> = ({ text, onClick, classname }) => {
  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 border-1 border-white bg-transparent text-white font-semibold transition-colors duration-300 hover:bg-primary hover:border-primary hover:text-white ${classname}`}
    >
      {text}
    </button>
  )
}

export default Button
