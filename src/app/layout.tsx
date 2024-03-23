"use client"

import Flexer from "@/components/core/Flexer"

import "../styles/app.scss"

import { useState } from "react"
import { Toaster } from "sonner"

import Block from "@/components/Block"
import { TailwindIndicator } from "@/components/core/TailwindIndicator"
import HeaderShell from "@/components/header/headerShell"
import Sidebar from "@/components/sidebar/MainSidebar"

import SettingsSidebar from "../components/sidebar/SettingsSidebar"
import ConvexClientProvider from "../core/ConvexClientProvider"

export default function RootLayout({ children }) {
  const [rows, setRows] = useState(3)
  const [cols, setCols] = useState(3)
  const [bombs, setBombs] = useState(1)

  return (
    <html lang="en">
      <Body>
        <Aside>
          <Sidebar />
        </Aside>
        <div className="w-full gap-4 flex flex-col">
          <HeaderShell />
          <Flexer height="h-44" gap="4">
            <Section>
              <GameControl />
            </Section>
            <Main>{children}</Main>
          </Flexer>
        </div>
      </Body>
    </html>
  )
}

function Body({ children }) {
  return (
    <>
      <body className="flex h-screen gap-4 !pt-4 !pl-4 bg-body text-white">
        <ConvexClientProvider>
          {children}
          <TailwindIndicator />
          <Toaster position="top-right" invert closeButton={true} duration={5555} />
        </ConvexClientProvider>
      </body>
    </>
  )
}

function Aside({ children }) {
  return (
    <Block className="w-28 overflow-hidden hidden xl:block" as="aside">
      {children}
    </Block>
  )
}

function Section({ children }) {
  return (
    <Block height="fit" className="w-[50%]" as="section">
      {children}
    </Block>
  )
}

function GameControl() {
  return <SettingsSidebar />
}

function Main({ children }) {
  return (
    <Block width="full" as="main">
      {children}
    </Block>
  )
}
