import { useFetchTransactionHistory } from "@/api/wallet";
import { useState } from "react";
import { Transaction } from "@/lib/types";

const typeLabels: Record<Transaction["type"], string> = {
  funding: "Wallet funding",
  escrow_hold: "Held in escrow",
  escrow_release: "Payment received",
  refund: "Refund",
  withdrawal: "Withdrawal",
  commission: "Platform fee",
};

function TransactionHistorysection() {
  const [page, setPage] = useState(1);
  const { data, isError, isLoading, isPlaceholderData } =
    useFetchTransactionHistory(page);

  if (isLoading)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-secondary border-t-main" />
          <p className="font-sans text-sm font-medium text-muted">Loading...</p>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="font-sans text-sm font-medium text-muted">
          Failed to load transaction history
        </p>
      </div>
    );

  const transaction = data?.data ?? [];
  const totalPages = data?.pagination?.totalPages ?? 1;
  const total = data?.pagination?.total ?? 0;

  if (transaction.length === 0)
    return (
      <div className="rounded-xl border border-border bg-[#fff] p-6 text-center font-sans text-sm text-muted">
        You have no transactions yet
      </div>
    );

  return (
    <div>
      <div>
        {transaction.map((t) => {
          const isCredit = t.direction === "credit";

          return (
            <div key={t._id}>
              <div>
                <h3>{typeLabels[t.type] ?? t.type}</h3>
                {t.description && <p>{t.description}</p>}
                <p>
                  {new Date(t.createdAt).toLocaleString("en-NG", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>

              <div>
                <p>
                  {isCredit ? "+" : "-"}
                  {t.amount}
                </p>

                {t.status !== "successful" && (
                  <span className="font-sans text-[12px] capitalize text-[#78716c]">
                    {t.status}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
