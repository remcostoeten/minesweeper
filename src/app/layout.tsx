import { TailwindIndicator } from "@/components/core/TailwindIndicator"
import { Toaster } from "sonner"
import ConvexClientProvider from "./ConvexClientProvider"
import '../styles/app.scss'

import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import Block from "@/components/Block"

const THEME_STYLES = {
  radius: 'rounded-md'
}

export default function Component() {
  return (
    <Body>
      <Aside>
<></>      </Aside>
      <Section>
        <GameControl />
        <GameStats />
      </Section>
      <Main>
        <GameVisualization />
      </Main>
    </Body>
  )
}

function Body({ children }) {
  return (
    <body className="flex h-screen gap-4 bg-body text-white">
      {children}
    </body>
  )
}

function Aside({ children }) {
  return (
    <Block width='1/5' as="aside" >
      <div className="space-y-4">
        {children}
      </div>
    </Block>
  )
}

function Section({ children }) {
  return (
    <Block width='1/3' as="section" >
      {children}
    </Block>
  )
}

function GameControl() {
  // Add your game control logic here
  return <div>Game Control</div>
}

function GameStats() {
  // Add your game stats logic here
  return <div>Game Stats</div>
}

function Main({ children }) {
  return (
    <Block width="full" as="main" >
      {children}
    </Block>
  )
}

function GameVisualization() {
  // Add your game visualization logic here
  return <div>Game Visualization</div>
}


function ClubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
      <path d="M12 17.66L12 22" />
    </svg>
  )
}


function HotelIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
      <path d="M8 7h.01" />
      <path d="M16 7h.01" />
      <path d="M12 7h.01" />
      <path d="M12 11h.01" />
      <path d="M16 11h.01" />
      <path d="M8 11h.01" />
      <path d="M10 22v-6.5m4 0V22" />
    </svg>
  )
}
