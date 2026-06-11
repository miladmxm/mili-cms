"use client";

import { redirect, useRouter } from "next/navigation";
import { useRef } from "react";

import Button from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { authClient } from "@/lib/auth-client";

const LogOut = () => {
  const router = useRouter();

  const signOut = () => {
    authClient.signOut();
    router.refresh();
  };

  return (
    <Button type="button" onClick={signOut}>
      خروج
    </Button>
  );
};

const ResetPass = ({ phoneNumber }: { phoneNumber: string }) => {
  const passRef = useRef<HTMLInputElement>(null);

  const reset = async () => {
    if (passRef.current) {
      const result = await authClient.phoneNumber.requestPasswordReset({
        phoneNumber,
      });
      console.log(result);
      // const { data, error } = await authClient.resetPassword({
      //   newPassword: passRef.current.value,
      // });
      // console.log(data, error);
    }
  };

  return (
    <div className="flex">
      <input className="rounded-full p-3 border" ref={passRef} />
      <Button onClick={reset}>تغییر</Button>
    </div>
  );
};

const DeleteUser = () => {
  const deleteUser = async () => {
    const result = await authClient.deleteUser();
    console.log(result);
  };

  return (
    <Button type="button" onClick={deleteUser}>
      حذف کاربر
    </Button>
  );
};

const Profile = () => {
  const user = useSession();
  if (!user.data) redirect("/");
  return (
    <section className="container">
      <div className="flex flex-col gap-3 mb-4">
        <div>{user.data.user.email}</div>
        <div>{user.data.user.name}</div>
      </div>
      <LogOut />
      <DeleteUser />
      <ResetPass phoneNumber={user.data.user.phoneNumber || ""} />
    </section>
  );
};

export default Profile;
