import React from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../src/components/ui/tooltip"
import { Button } from "../../src/components/ui/button"

const TooltipExample = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button>Tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>Tooltip</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export { TooltipExample }
