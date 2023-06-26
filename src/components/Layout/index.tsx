import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-screen h-screen justify-center items-center flex layout">
      {children}
    </div>
  );
};

export default Layout;
