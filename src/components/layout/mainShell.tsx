import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export default function mainShell({children}) {
  const selectMode = () => {
    return (
      <Tabs defaultValue="manual" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="account">Manual</TabsTrigger>
    <TabsTrigger value="auto">Auto</TabsTrigger>
  </TabsList>
  <TabsContent value="manual">.</TabsContent>
  <TabsContent value="auto">..</TabsContent>
</Tabs>
    )
  }
  return (
    <main>

        <aside className='w-[40% bg-card border-outline rounded-sm'>
          {selectMode()}
        </aside>
        <section>
           {children}
        </section>
    </main>
  )
}
