import Card from "@/component/card";
import { formatNaira } from "@/ultiz/formatMoney";
import TransactionHistorysection from "@/component/transactionHistory";
import Button from "@/component/button";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import { Form } from "../component/form";
import { InputField } from "../component/inputField";
import {
  walletFundingDTO,
  walletFundingSchema,
} from "@/schema/walletFundingSchema";
import { useFundingWallet, useGetWallet } from "@/api/wallet";
import { WalletDetails } from "@/lib/types";
const walletStats = [
  {
    icon: "🛅",
    title: "Wallet Balance",
    amount: "1000000",
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
  const [openModal, setOpenModal] = useState(false);
  const { mutate, isPending } = useFundingWallet();
  const { data, isError } = useGetWallet();
  const onSubmit = (data: walletFundingDTO) => {
    mutate({ ...data });
  };

  return (
    <div className=" flex flex-col gap-4">
      <div className="grid  grid-cols-2 md:grid-cols-3 gap-4">
        {walletStats.map((w) => (
          <div
            key={w.title}
            className="bg-[#fff] w-full p-3 h-auto  rounded-xl border border-border"
          >
            <Card
              desc={w.desc}
              amount={formatNaira(data?.balance ?? 0)}
              text={w.title}
              icon={w.icon}
              background={w.background}
            />
          </div>
        ))}
      </div>

      <div className="bg-[#fff] border border-border rounded-2xl">
        <div className=" flex justify-between items-center border-b p-3 border-muted/30">
          <h4 className="text-text font-sans text-sm font-bold">
            Transaction History
          </h4>
          <Button
            onClick={() => setOpenModal(true)}
            className="w-[130px] text-xs font-heading font-semibold bg-muted hover:bg-muted/70"
          >
            <GoPlus /> Top up wallet
          </Button>
        </div>
        <TransactionHistorysection />
      </div>

      {openModal && (
        <div
          onClick={() => setOpenModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a2d4a]/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            {/* Header */}
            <div className="border-b border-border bg-white px-6 pb-5 pt-6 sm:px-8">
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <GoPlus size={26} />
                </div>

                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-transparent text-muted transition-colors hover:bg-transparent hover:text-muted"
                  aria-label="Close modal"
                >
                  <span className="text-2xl leading-none">&times;</span>
                </button>
              </div>

              <h3 className="font-heading text-2xl font-bold text-main">
                Fund your wallet
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted">
                Add money to your wallet securely and use it whenever you need
                to make a payment.
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-6 sm:px-8">
              <div className="mb-5 flex items-center gap-3 rounded-xl border border-border bg-white p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-main">
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

                <div className="ml-auto rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
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
                        naira. Minimum funding amount is ₦10,000.
                      </p>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-border pt-5 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        disabled={isPending}
                        onClick={() => setOpenModal(false)}
                        className="w-full rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-text transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
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
            <div className="flex items-center justify-center gap-2 border-t border-border bg-white px-6 py-3.5">
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
