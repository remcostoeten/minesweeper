import Minesweeper from "@/components/shells/v1"

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  header: React.ReactNode
}) {
  return (
    <section>
      <Minesweeper/>.
    </section>
  )
}