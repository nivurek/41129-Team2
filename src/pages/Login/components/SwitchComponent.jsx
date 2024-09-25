"use client"

import React, { useState } from "react"
import PropTypes from 'prop-types'

export default function SwitchComponent({ onToggle }) {
  const [selectedOption, setSelectedOption] = useState("SIGN UP")

  const handleToggle = (option) => {
    setSelectedOption(option)
    onToggle(option)
  }

  return (
    <div className="w-full max-w-md p-1 bg-gray-100 rounded-full">
      <div className="relative flex">
        <button
          onClick={() => handleToggle("SIGN UP")}
          className={`w-1/2 py-3 text-sm font-semibold transition-colors duration-200 rounded-full ${
            selectedOption === "SIGN UP"
              ? "bg-white text-black shadow-sm"
              : "text-gray-400"
          }`}
        >
          SIGN UP
        </button>
        <button
          onClick={() => handleToggle("SIGN IN")}
          className={`w-1/2 py-3 text-sm font-semibold transition-colors duration-200 rounded-full ${
            selectedOption === "SIGN IN"
              ? "bg-white text-black shadow-sm"
              : "text-gray-400"
          }`}
        >
          SIGN IN
        </button>
      </div>
    </div>
  )
}

SwitchComponent.propTypes = {
  onToggle: PropTypes.func.isRequired
}