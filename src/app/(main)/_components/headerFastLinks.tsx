import Link from "next/link";

import Cart from "@/assets/icons/cart.svg";
import Like from "@/assets/icons/like.svg";
import Profile from "@/assets/icons/profile.svg";
import { getSession } from "@/lib/auth";

import OpenAuthDealog from "./openAuthDealog";

const UserFastLinks = async () => {
  const auth = await getSession();

  return (
    <div className="flex min-w-max gap-2 [&_svg]:size-full *:size-4 md:size-5 *:hover:text-secondary-500 text-primary-900">
      {auth?.user ? (
        <>
          <Link href="#profile">
            <Profile />
          </Link>
          <Link href="#like">
            <Like />
          </Link>
          <Link href="#cart">
            <Cart />
          </Link>
        </>
      ) : (
        <OpenAuthDealog />
      )}
    </div>
  );
};

export default UserFastLinks;
