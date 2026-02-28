import { Zap } from "lucide-react";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const Navbar = () => {
  return (
    <MaxWidthWrapper
      showPlusIcons={true}
      parentBorder="border-b"
      className="sticky top-0 z-50 bg-background/10 backdrop-blur-md"
    >
      <nav className="flex w-full items-center justify-between p-4 md:p-5">
        <div className="flex items-center justify-center gap-2">
          <Zap className="size-5 text-primary" />
          <span className="text-lg font-medium">Jubeo</span>
        </div>
        <AnimatedThemeToggler variant="outline" size="icon-sm" />
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
