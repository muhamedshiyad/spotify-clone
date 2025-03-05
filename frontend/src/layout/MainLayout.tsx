import { ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
    const isMobile = false;
  return <div className="h-screen bg-black text-white flex flex-col">
      <ResizablePanelGroup>
        {/*left sidebar */}
        <ResizablePanel defaultSize={20} minSize ={isMobile ? 0 : 20} maxSize={30}>
            lift sidebar 
        </ResizablePanel>

         {/*main content */}
        <ResizablePanel defaultSize={isMobile ? 80:60}>
            <Outlet/>
        </ResizablePanel>

         {/*right sidebar */}
        <ResizablePanel>
            right sidebar
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>  
};
export default MainLayout
