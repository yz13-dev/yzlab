import { MenuIcon, MousePointer2 } from "lucide-react";
import { Button } from "ui/components/button";

export default function () {
  return (
    <footer className="fixed left-0 right-0 w-fit mx-auto bottom-6">
      <div className="p-2 rounded-full flex items-center gap-1 px-2 border">
        <Button>
          <MenuIcon size={18} />
        </Button>
        <Button variant="secondary">
          <MousePointer2 size={18} />
        </Button>
      </div>
    </footer>
  );
}
