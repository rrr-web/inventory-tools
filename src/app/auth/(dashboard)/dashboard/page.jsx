import CardsTools from "./CardsTools";
import LowStockWidget from "./LowStockWidget";
import TableRequest from "./TableRequest";



export default function DashboardPage() {
  return (
    <>
      <div className="text-black">
        <CardsTools />
        {/* Tables */}
      </div>
      <div className="md:min-h-fit">
        <div className="mb-4">
        <LowStockWidget />
        </div>
        <TableRequest />
      </div>
      </>
  )
}
