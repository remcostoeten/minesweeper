import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StatisticTabsProps {
  triggerOne: any
  triggerTwo: any
  contentOne: any
  contentTwo: any
}

export default function StatisticTabs({
  triggerOne,
  triggerTwo,
  contentOne,
  contentTwo,
}: StatisticTabsProps) {
  return (
    <Tabs defaultValue={triggerOne}>
      <TabsList>
        <TabsTrigger value={triggerOne}>{triggerOne}</TabsTrigger>
        <TabsTrigger value={triggerTwo}>{triggerTwo}</TabsTrigger>
      </TabsList>
      <TabsContent value={triggerOne}>{contentOne}</TabsContent>
      <TabsContent value={triggerTwo}>{contentTwo}</TabsContent>
    </Tabs>
  )
}
