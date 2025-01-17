import Nav from "components/Nav";
import { Outlet } from "react-router-dom";

// TODO: Esse componente permite adição de estruturas comuns a todas as páginas
const Layout = () => {
  return (
    <>
      <Nav />
      <div className="mt-4 px-[2vw] md:px-[6vw] xl:px-[10vw]">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
