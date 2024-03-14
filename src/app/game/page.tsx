import HeaderShell from "@/components/header/headerShell";
import Setings from "@/components/layout/mainShell";
import Sidebar from "@/components/sidebar/MainSidebar";

export default function page() {
  return (<>
    <div className='flex flex-col container mx-auto my-4'>

          <div className="w-full h-16 bg-body">body
        </div>
        <div className="w-full h-16 bg-card">card
        </div>
        <div className="w-full h-16 bg-card-inner">card-inner

        </div>
        <div className="w-full h-16 bg-main">primary
        </div>
        <div className="w-full h-16 bg-outline">outline
        </div>

    </div></>
  )
}
