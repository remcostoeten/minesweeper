/**
 * v0 by Vercel.
 * @see https://v0.dev/t/sHfwROndv2X
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"

export default function Component() {
  return (
    <div className="flex h-screen bg-[#1c1c2b] text-white">
      <aside className="w-1/6 bg-[#25253d] p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <HotelIcon className="h-6 w-6" />
            <span>Casino</span>
          </div>
          <div className="flex items-center space-x-2">
            <ClubIcon className="h-6 w-6" />
            <span>Sports</span>
          </div>
        </div>
      </aside>
      <section className="w-1/3 p-4">
        <div className="bg-[#2d2d44] p-4 rounded-lg space-y-4">
          <div className="flex justify-between">
            <Button className="bg-[#5d5d81]">Manual</Button>
            <Button className="bg-[#5d5d81]">Auto</Button>
          </div>
          <div className="space-y-2">
            <div>Your Balance</div>
            <div>15 398 W</div>
          </div>
          <div className="flex space-x-2">
            <Button className="bg-[#5d5d81]">1/2</Button>
            <Button className="bg-[#5d5d81]">2x</Button>
            <Button className="bg-[#5d5d81]">MAX</Button>
          </div>
          <div className="space-y-2">
            <div>Number of Lines</div>
            <div>8</div>
          </div>
          <div className="space-y-2">
            <div>Choose a risk</div>
            <div className="flex space-x-2">
              <Button className="bg-[#5d5d81]">Low</Button>
              <Button className="bg-[#5d5d81]">Average</Button>
              <Button className="bg-[#5d5d81]">High</Button>
            </div>
          </div>
          <Button className="bg-[#a855f7]">Start The Game</Button>
        </div>
        <div className="bg-[#2d2d44] mt-4 p-4 rounded-lg">
          <Tabs>
            <div className="flex space-x-4">
              <Button variant="ghost">Highest win</Button>
              <Button variant="ghost">Latest bets</Button>
              <Button variant="ghost">High Rollers</Button>
            </div>
          </Tabs>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <div>Mine</div>
              <div>Wade Warren</div>
              <div>0.645688956</div>
              <div>1.12x</div>
              <div>0.645688956</div>
            </div>
          </div>
        </div>
      </section>
      <main className="flex-1 p-4">
        <div className="bg-[#2d2d44] p-4 rounded-lg h-full">
          <div className="h-full w-full bg-[#3b3b58] rounded-lg flex justify-center items-center">
            <span>Game visualization here</span>
          </div>
        </div>
      </main>
    </div>
  )
}
