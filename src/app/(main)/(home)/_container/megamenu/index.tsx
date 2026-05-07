import { AnimatePresence, motion, useMotionValue } from "motion/react";
import { useEffect, useEffectEvent, useRef } from "react";

import type { Category } from "@/services/product/type";

import ArrowToLeft from "@/assets/icons/arrowToLeft.svg";
import DefaultImage from "@/components/ui/defaultImage";
import { cn } from "@/lib/utils";

import { useHomePageContext } from "../../_context";
import { useMegaMenuStore } from "./store";

const ParentMenuItem = ({ name, id, thumbnail }: Category) => {
  const { activeId, setActiveIndex } = useMegaMenuStore();
  const isActive = activeId === id;
  return (
    <li className="group relative isolate">
      <AnimatePresence>
        {isActive && (
          <motion.div
            className="bg-gradient-to-r from-transparent from-10% to-90% via-45% via-thready-400/50 to-transparent absolute inset-y-0 -z-10"
            exit={{ opacity: 0, insetInline: "100%" }}
            initial={{ opacity: 0, insetInline: "100%" }}
            animate={{ opacity: 1, insetInline: "0" }}
          />
        )}
      </AnimatePresence>
      <button
        onClick={() => setActiveIndex(id)}
        className="flex size-full gap-6 py-4 px-6 items-center"
        type="button"
      >
        <DefaultImage
          height={40}
          width={50}
          image={thumbnail}
          className="h-2/3 object-contain"
        />
        <strong className="font-bold text-primary-900">{name}</strong>
      </button>
      <div
        className={cn(
          "flex group-last:hidden h-[1px] w-full bg-gradient-to-l from-transparent via-thready-800/30 to-transparent items-center justify-end",
          { "to-thready-800/30": isActive },
        )}
      >
        <AnimatePresence>
          {isActive && (
            <motion.span
              exit={{ x: "-100%", opacity: 0 }}
              initial={{ x: "200%" }}
              animate={{ x: "0%" }}
              className="group-last:hidden text-thready-500"
            >
              <ArrowToLeft className="size-2" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </li>
  );
};

const ParentMenu = () => {
  const { productCategories } = useHomePageContext();
  const setActiveIndex = useMegaMenuStore((store) => store.setActiveIndex);
  const setFirstItem = useEffectEvent(() =>
    setActiveIndex(productCategories[0].id),
  );
  useEffect(() => {
    setFirstItem();
  }, []);
  return (
    <ul className="grid auto-rows-fr">
      {productCategories.map((item) => {
        return <ParentMenuItem key={item.id} {...item} />;
      })}
    </ul>
  );
};

const ChildMenu = () => {
  const activeId = useMegaMenuStore((store) => store.activeId);

  const { productCategories } = useHomePageContext();
  const activeChildren = productCategories.find(({ id }) => id === activeId);
  if (!activeChildren) return null;
  console.log(activeChildren.children);
  return null;
};

const Menu = () => {
  return (
    <div className="flex gap-6">
      <ParentMenu />
      <ChildMenu />
    </div>
  );
};

const MegaMenu = () => {
  const productsItemInNavRef = useRef<HTMLSpanElement>(null);
  const top = useMotionValue(10);

  const setTop = useEffectEvent((t: number) => top.set(t));
  useEffect(() => {
    if (productsItemInNavRef.current) {
      const { bottom } = productsItemInNavRef.current.getBoundingClientRect();
      setTop(bottom);
    }
  }, []);
  return (
    <li className="cursor-pointer product-nav-trigger">
      <span className="flex h-full items-center" ref={productsItemInNavRef}>
        محصولات
      </span>
      <motion.div
        style={{ top }}
        className="mega-menu pt-4 container w-full fixed inset-x-0 top-20 transition-all duration-300 invisible h-0 pointer-events-none opacity-0 translate-y-10 -z-10"
      >
        <div className="p-4 rounded-6xl shadow-lg-gray h-full">
          <Menu />
        </div>
      </motion.div>
    </li>
  );
};

export default MegaMenu;
