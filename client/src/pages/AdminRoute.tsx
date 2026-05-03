import TrpcProvider from "@/lib/TrpcProvider";
import Admin from "./Admin";

export default function AdminRoute() {
  return (
    <TrpcProvider>
      <Admin />
    </TrpcProvider>
  );
}
