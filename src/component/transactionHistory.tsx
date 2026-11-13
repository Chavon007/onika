import { useFetchTransactionHistory } from "@/api/wallet";
import { useState } from "react";
import { Transaction } from "@/lib/types";
import { formatNaira } from "@/ultiz/formatMoney";

const typeLabels: Record<Transaction["type"], string> = {
  funding: "Wallet funding",
  escrow_hold: "Held in escrow",
  escrow_release: "Payment received",
  refund: "Refund",
  withdrawal: "Withdrawal",
  commission: "Platform fee",
};

function TransactionHistorysection() {
  const [page] = useState(1);
  const { data, isError, isLoading } = useFetchTransactionHistory(page);

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />
          <p className="font-sans text-sm font-medium text-muted">
            Loading...
          </p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-background">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load transaction history
        </p>
      </div>
    );

  const transaction = data?.data ?? [];

  if (transaction.length === 0)
    return (
      <div className="rounded-xl border border-border bg-background p-6 text-center font-sans text-sm text-muted">
        You have no transactions yet
      </div>
    );

  return (
    <div className="bg-background transition-colors duration-300">
      {transaction.map((t) => {
        const isCredit = t.direction === "credit";

        return (
          <div
            className="flex items-center justify-between border-b border-border last:border-b-0"
            key={t._id}
          >
            <div className="flex flex-col gap-1 p-4">
              <h3 className="font-sans text-sm font-bold text-text">
                {typeLabels[t.type] ?? t.type}
              </h3>

              {t.description && (
                <p className="font-heading text-sm text-muted">
                  {t.description}
                </p>
              )}

              <p className="font-sans text-xs text-muted/70">
                {new Date(t.createdAt).toLocaleString("en-NG", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <div className="p-4">
              <p
                className={`font-heading text-base font-bold ${
                  isCredit
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {isCredit ? "+" : "-"}
                {formatNaira(t.amount)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TransactionHistorysection;