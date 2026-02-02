import { Plus } from "lucide-react";

import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import AddAudio from "./audio";
import AddImage from "./image";
import AddTable from "./table";

const Additional = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          افزودن
          <Plus />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup className="flex flex-col">
          <DropdownMenuItem asChild>
            <AddImage />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AddTable />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <AddAudio />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Additional;
