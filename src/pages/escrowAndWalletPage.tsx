
import Card from "@/component/card";
import { formatNaira } from "@/ultiz/formatMoney";
import TransactionHistorysection from "@/component/transactionHistory";
import Button from "@/component/button";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import { Form } from "../component/form";
import { InputField } from "../component/inputField";
import useAuthStore from "@/store/authStore";
import { useGetArtisanCurrentMonthEarnings } from "@/api/earnings";
import { useShallow } from "zustand/shallow";
import {
  walletFundingDTO,
  walletFundingSchema,
} from "@/schema/walletFundingSchema";
import { useFundingWallet, useGetWallet } from "@/api/wallet";
import { useCustomerTotalSpent } from "@/api/job";
import { useCustomerAmountInEscrow } from "@/api/escrow";
import { useGetArtisanAllTimeEarnings } from "@/api/earnings";

function EscrowAndWalletPage() {
  const { role, joined } = useAuthStore(
    useShallow((s) => ({
      role: s.user?.role,
      joined: s.user?.createdAt,
    })),
  );

  const joinedDate = joined
    ? new Date(joined).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently Joined";

  const [openModal, setOpenModal] = useState(false);
  const { mutate, isPending } = useFundingWallet();
  const { data: wallet } = useGetWallet();
  const { data: escrowBalance } = useCustomerAmountInEscrow();
  const { data: totalSpent } = useCustomerTotalSpent();
  const { data: monthEarnings } = useGetArtisanCurrentMonthEarnings();
  const { data: allTimeEarnings } = useGetArtisanAllTimeEarnings();

  const balance = wallet?.balance ?? 0;

  const date = new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const onSubmit = (data: walletFundingDTO) => {
    mutate({ ...data });
  };

  const customerWalletStats = [
    {
      icon: "🛅",
      title: "Wallet Balance",
      amount: formatNaira(balance),
      desc: "Available to spend",
      background: "var(--secondary)",
    },
    {
      icon: "🔒",
      title: "In Escrow",
      amount: formatNaira(escrowBalance),
      desc: "Held for active jobs",
      background: "var(--secondary)",
    },
    {
      icon: "📊",
      title: "Total Spent",
      amount: formatNaira(totalSpent),
      desc: "All-time",
      background: "var(--secondary)",
    },
  ];

  const artisanWalletStats = [
    {
      title: "Wallet Balance",
      amount: formatNaira(balance),
      desc: "Ready to withdraw",
    },
    {
      title: "This Month",
      amount: formatNaira(monthEarnings),
      desc: date,
    },
    {
      title: "All-time Earned",
      amount: formatNaira(allTimeEarnings),
      desc: joinedDate,
    },
  ];

  const baseStats =
    role === "artisan" ? artisanWalletStats : customerWalletStats;

  const stats = baseStats.map((s) =>
    s.title === "Wallet Balance" ? { ...s, amount: formatNaira(balance) } : s,
  );

  return (
    <div className="flex flex-col gap-4 bg-background transition-colors duration-300">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {stats.map((w) => (
          <div
            key={w.title}
            className="h-auto w-full rounded-xl border border-border bg-background p-3"
          >
            <Card
              desc={w.desc}
              amount={w.amount}
              text={w.title}
              icon={"icon" in w ? w.icon : undefined}
              background={"background" in w ? w.background : undefined}
            />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border p-3">
          <h4 className="font-sans text-xs font-bold text-text md:text-sm">
            Transaction History
          </h4>

          {role === "customer" && (
            <div className="flex items-center gap-3">
              <Button
                onClick={() => setOpenModal(true)}
                className="w-25 bg-main font-heading text-[10px] font-semibold text-white hover:bg-main/90 md:w-[130px] md:text-xs"
              >
                <GoPlus className="hidden md:flex" /> Top up wallet
              </Button>

              <Button
                onClick={() => setOpenModal(true)}
                className="w-25 border border-border bg-background font-heading text-[9px] font-semibold text-text hover:bg-secondary hover:border-border md:w-[130px] md:text-xs"
              >
                Withdraw Funds
              </Button>
            </div>
          )}

          {role === "artisan" && (
            <Button
              onClick={() => setOpenModal(false)}
              className="w-[130px] bg-main font-heading text-xs font-semibold text-white hover:bg-main/90"
            >
              Withdraw Funds
            </Button>
          )}
        </div>

        <TransactionHistorysection />
      </div>

      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-main/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-border bg-background px-6 pb-5 pt-6 sm:px-8">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GoPlus size={26} />
                </div>

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-muted transition-colors hover:text-text"
                  aria-label="Close modal"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>

              <h3 className="font-heading text-2xl font-bold text-text">
                Fund your wallet
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Add money to your wallet securely and use it whenever you need
                to make a payment.
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-6 sm:px-8">
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-border bg-secondary p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-background text-text">
                  <span className="text-lg font-bold">₦</span>
                </div>

                <div>
                  <p className="text-sm font-semibold text-text">
                    Wallet top-up
                  </p>
                  <p className="mt-0.5 text-xs text-muted">
                    Secure payment powered by Paystack
                  </p>
                </div>

                <div className="ml-auto rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
                  Secure
                </div>
              </div>

              <Form<walletFundingDTO>
                onSubmit={onSubmit}
                schema={walletFundingSchema}
              >
                {(methods) => (
                  <div className="space-y-6">
                    <div>
                      <InputField
                        label="Amount to add"
                        type="number"
                        placeholder="e.g. 10,000"
                        registration={methods.register("amount", {
                          valueAsNumber: true,
                        })}
                        error={methods.formState.errors.amount}
                      />

                      <p className="mt-2 text-xs leading-5 text-muted">
                        Enter the amount you want to add to your wallet in
                        naira. Minimum funding amount is ₦100.
                      </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={() => setOpenModal(false)}
                        className="w-full rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold text-text transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={isPending}
                        loadingText="Redirecting..."
                        className="w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                      >
                        Continue to payment
                      </Button>
                    </div>
                  </div>
                )}
              </Form>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-2 border-t border-border bg-background px-6 py-3.5">
              <span className="text-xs text-muted">
                <span className="font-semibold text-text">Paystack</span> secure
                checkout · Your payment details are protected
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EscrowAndWalletPage;
