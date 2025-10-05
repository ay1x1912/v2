import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "./ui/dialog"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"


interface DropdownNodesMenuProps{
    isOpen:boolean,
    setIsOpen:(opne:boolean)=>void,
    setNodeType:(nodeType:string)=>void
}
export function DropdownNodesMenu({setNodeType,isOpen,setIsOpen }:DropdownNodesMenuProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}  >
      {/* <DropdownMenuTrigger   asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger> */}
      <DialogContent className="w-72" >
        <Label>Services</Label>
     
          <Button onClick={()=>setNodeType("counterNode")}>
          Telegram
          </Button>
          <Button onClick={()=>setNodeType("textUpdater")} >
            Resend
           
          </Button>
          

        <Separator />
     
          <Label>Events</Label>
          
          <Button onClick={()=>setNodeType("manual")}>
         Manual
          </Button>
     

        <Button onClick={()=>setNodeType("webhook")}>Webhook</Button>
        <Button onClick={()=>setNodeType("formsubmit")}>Form submit</Button>
        
     
       
      </DialogContent>
    </Dialog>
  )
}
