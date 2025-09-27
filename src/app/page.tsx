"use client"

import * as React from "react"

import "tailwindcss"

import bgImage from "../../public/assets/bg.jpg"
import NavbarMenu from "./components/NavBar"

export default function Home() {
  return (
    <>
    <div 
      style = {{
        backgroundImage: `url(${bgImage.src})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh"
      }}
    >
      <NavbarMenu></NavbarMenu>
      <div className="ml-25 mt-50 flex flex-col">
        <div className="flex flex-col">
          <h5 className="text-5xl">AI-Powered Health Risk Predictor</h5>
          <h1 className="text-2xl">Predict Your Health. Protect Your Future.</h1>
        </div>

        <div className="mt-10 ml-5">
          <ul className="list-disc">
            <li>Personalized Health Risk Assessments</li>
            <li>AI-powered Recommendations</li>
            <li>Health Monitoring Dashboard</li>
            <li>Secure & Private Data Handling</li>
          </ul>
        </div>
      </div>

    </div>
    </>
  )
}

