import { IconLogout } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Button } from "@/components/dashboard/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dashboard/ui/dialog";
import { Spinner } from "@/components/dashboard/ui/spinner";
import { signOut } from "@/lib/auth-client";

const SignoutButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleSignOut = () => {
    startTransition(async () => {
      await signOut(() => router.push("/admin/login"));
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full justify-start"
          disabled={isPending}
          variant="ghost"
        >
          {isPending ? <Spinner /> : <IconLogout />}
          خروج
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>آیا از حذف این فایل اطمینان دارید؟</DialogTitle>
        </DialogHeader>
        <DialogDescription>این کار غیر قابل بازگشت است</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">خیر</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSignOut}>بله</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignoutButton;
