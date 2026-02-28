import { Zap } from "lucide-react";
import Link from "next/link";
import { AnimatedThemeToggler } from "../ui/animated-theme-toggler";
import MaxWidthWrapper from "../ui/max-width-wrapper";

const Navbar = () => {
  return (
    <MaxWidthWrapper
      showPlusIcons={true}
      parentBorder="border-b"
      className="sticky top-0 z-50 bg-background/10 backdrop-blur-md"
    >
      <nav className="flex w-full items-center justify-between p-4 md:p-5 gap-5">
        <div className="flex items-center justify-center gap-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Zap className="size-5 text-primary" />
            <span className="text-lg font-medium">Jubeo</span>
          </Link>
        </div>
        <Link
          href="/history"
          className="flex-1 text-right text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          History
        </Link>
        <AnimatedThemeToggler variant="outline" size="icon-sm" />
      </nav>
    </MaxWidthWrapper>
  );
};

export default Navbar;
