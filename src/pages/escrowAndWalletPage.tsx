import Card from "@/component/card";
import { formatNaira } from "@/ultiz/formatMoney";
import TransactionHistorysection from "@/component/transactionHistory";
import Button from "@/component/button";
import { GoPlus } from "react-icons/go";
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
    <div className=" flex flex-col gap-4">
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

      <div className="bg-[#fff] border border-border rounded-2xl">
        <div className=" flex justify-between items-center border-b p-3 border-muted/30">
          <h4 className="text-text font-sans text-sm font-bold">Transaction History</h4>
          <Button className="w-[130px] text-xs font-heading font-semibold bg-muted hover:bg-muted/70">
            <GoPlus /> Top up wallet
          </Button>
        </div>
        <TransactionHistorysection />
      </div>
    </div>
  );
}

export default EscrowAndWalletPage;
