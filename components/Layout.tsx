import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </>
  );
};
