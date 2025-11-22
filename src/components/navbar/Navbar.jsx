import { cn } from "@/lib/utils";

export default function Navbar({ activeTab, setActiveTab, tabs }) {
    return (
        <>
        <nav className="mb-8">
       <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap",
                  "border-b-2 -mb-px",
                  activeTab === tab.id
                    ? "font-semibold"
                    : "border-transparent h "
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
    </nav>
        </>
)
}