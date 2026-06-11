"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/ui/button";
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

const DeleteUser = () => {
  const deleteUser = () => {
    authClient.deleteUser();
  };

  return (
    <Button type="button" onClick={deleteUser}>
      حذف کاربر
    </Button>
  );
};

const Profile = () => {
  return (
    <section className="container">
      <LogOut />
      <DeleteUser />
    </section>
  );
};

export default Profile;
