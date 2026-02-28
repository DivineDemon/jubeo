import MaxWidthWrapper from "../ui/max-width-wrapper";

const Footer = () => {
  return (
    <MaxWidthWrapper parentBorder="border-none" showPlusIcons={false}>
      <footer className="w-full mt-auto text-center text-sm text-muted-foreground p-5">
        &copy; {new Date().getFullYear()} Jubeo. All rights reserved.
      </footer>
    </MaxWidthWrapper>
  );
};

export default Footer;
