import Block from "@/components/Block"

export default function page() {
  return (
    <>
      <Block>dwdwd</Block>
      <div className="flex flex-col container mx-auto my-4">
        <div className="w-full h-16 bg-body">body</div>
        <div className="w-full h-16 bg-card">card</div>
        <div className="w-full h-16 bg-card-inner">card-inner</div>
        <div className="w-full h-16 bg-main">primary</div>
        <div className="w-full h-16 bg-outline">outline</div>
      </div>
    </>
  )
}
