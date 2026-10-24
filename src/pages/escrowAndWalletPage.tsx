import Card from "@/component/card";
import { formatNaira } from "@/ultiz/formatMoney";

const walletStats = [
  {
    icon: "🛅",
    title: "Wallet Balance",
    amount: "10000",
    desc: "Available to spend",
    background: "#dbeafe",
  },
  {
    icon: "🔒",
    title: "In Escrow",
    amount: "70000",
    desc: "Held for active jobs",
    background: "#fef3c7",
  },
  {
    icon: "📊",
    title: "Total Spent",
    amount: "234000",
    desc: "All-time",
    background: "#fef3c7",
  },
];
function EscrowAndWalletPage() {
  return (
    <div>
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-4">
        {walletStats.map((w) => (
          <div
            key={w.title}
            className="bg-[#fff] w-full p-3 h-auto rounded rounded-xl border border-border"
          >
            <Card
              desc={w.desc}
              amount={formatNaira(w.amount)}
              text={w.title}
              icon={w.icon}
              background={w.background}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default EscrowAndWalletPage;
