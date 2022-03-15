import { Outlet } from "remix";

import BuilderNavBar from "~/components/BuilderNavBar";

export default function Page() {
  return (
    <main>
      <BuilderNavBar />
      <Outlet />
    </main>
  );
}
