import { ReactNode } from "react";

const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <div
      className="animate-page-enter"
      style={{
        animation: "page-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
      }}
    >
      {children}
    </div>
  );
};

export default PageTransition;
