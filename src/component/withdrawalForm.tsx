"use client";

import { FaNairaSign } from "react-icons/fa6";
import { useGetUserBank } from "@/api/bank";
import { useGetWallet } from "@/api/wallet";
import { formatNaira } from "@/ultiz/formatMoney";
import { Form } from "./form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Button from "./button";
import { InputField } from "./inputField";
import BankInfo from "./bankInfo";
import { CiWarning } from "react-icons/ci";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useWithdrawalFund } from "@/api/withdrawal";
import { withdrawalDTO, withdrawalSchema } from "@/schema/withdrawSchema";

type WithdrawalFormProps = {
  onClose: () => void;
};

function WithdrawalForm({ onClose }: WithdrawalFormProps) {
  const { data: walletBalance } = useGetWallet();
  const { data: bank, isLoading, isError } = useGetUserBank();

  const balance = walletBalance?.balance ?? 0;
  const chargeFee = 50;

  const { mutate: withdraw, isPending } = useWithdrawalFund();

  const onSubmit = (data: withdrawalDTO) => {
    withdraw(
      {
        ...data,
        amount: data.amount * 100,
      },
      {
        onSuccess: () => {
          onClose();
        },
      },
    );
  };

  return (
    // The whole card scrolls if it is taller than 90% of the screen,
    // and the action buttons stay pinned to the bottom (sticky).
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative mx-auto flex max-h-[90vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl shadow-main/5"
    >
      {/* Header */}
      <div className="border-b border-border bg-background px-5 pb-4 pt-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FaNairaSign size={18} />
          </div>

          <div>
            <h5 className="font-heading text-lg font-bold leading-tight text-text">
              Withdraw to bank
            </h5>
            <p className="text-xs text-muted">
              Secure payout powered by Paystack
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-950/50 dark:text-green-400">
              Secure
            </span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:text-text"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between rounded-xl border border-border bg-secondary px-4 py-3">
          <p className="text-xs font-medium text-muted">Available balance</p>
          <p className="text-lg font-bold text-text">{formatNaira(balance)}</p>
        </div>
      </div>

      <Form<withdrawalDTO>
        onSubmit={onSubmit}
        schema={withdrawalSchema}
        defaultValues={{
          amount: undefined,
          bankAccountId: "",
        }}
      >
        {(methods) => {
          const amount = methods.watch("amount") || 0;
          const selectedBankId = methods.watch("bankAccountId") || "";

          // The form works in naira, but the API and formatNaira work in kobo.
          const amountToReceive = Math.max(amount - chargeFee, 0);
          const exceedsBalance = amount * 100 > balance;

          return (
            <>
              <div className="space-y-4 px-5 py-4">
                {/* Bank account selection */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-text">
                    Select bank account
                  </p>

                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary p-4 text-xs text-muted">
                      <AiOutlineLoading3Quarters className="animate-spin text-primary" />
                      Loading bank accounts...
                    </div>
                  ) : isError ? (
                    <div className="rounded-xl border border-border bg-secondary p-4 text-xs text-muted">
                      Could not load your bank accounts. Please try again.
                    </div>
                  ) : bank?.length === 0 ? (
                    <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-secondary px-4 py-6 text-center">
                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-background text-muted">
                        <MdOutlineAccountBalanceWallet size={22} />
                      </div>
                      <h3 className="text-sm font-semibold text-text">
                        No bank accounts yet
                      </h3>
                      <p className="mt-1 max-w-xs text-xs leading-5 text-muted">
                        Add a bank account to make withdrawals from your Onika
                        wallet easier.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {bank?.map((banks) => (
                        <BankInfo
                          key={banks._id}
                          {...banks}
                          selectable
                          selected={selectedBankId === banks._id}
                          onSelect={() =>
                            methods.setValue("bankAccountId", banks._id, {
                              shouldValidate: true,
                            })
                          }
                        />
                      ))}
                    </div>
                  )}

                  {methods.formState.errors.bankAccountId && (
                    <p className="text-xs text-red-500">
                      {methods.formState.errors.bankAccountId.message}
                    </p>
                  )}
                </div>

                {/* Withdrawal amount */}
                <div className="space-y-1.5">
                  <InputField
                    label="Amount to withdraw"
                    type="number"
                    placeholder="₦50000"
                    registration={methods.register("amount", {
                      valueAsNumber: true,
                    })}
                    error={methods.formState.errors.amount}
                  />

                  <p className="text-xs text-muted">
                    Minimum withdrawal is ₦1000.
                  </p>

                  {exceedsBalance && (
                    <p className="text-xs text-red-500">
                      Amount is more than your available balance.
                    </p>
                  )}
                </div>

                {/* Fee notice */}
                <div className="flex items-start gap-2 rounded-lg border border-primary/20 bg-primary/5 p-2.5 text-xs leading-5 text-muted">
                  <CiWarning className="mt-0.5 shrink-0 text-primary" />
                  <span>
                    A transfer fee of ₦50 will be deducted from your withdrawal
                    amount.
                  </span>
                </div>

                {/* Breakdown */}
                <div className="space-y-2 rounded-xl border border-border bg-secondary/50 p-3">
                  <p className="flex justify-between gap-4 text-xs text-muted">
                    <span>Withdrawal amount</span>
                    <span className="font-medium text-text">
                      {formatNaira(amount * 100)}
                    </span>
                  </p>

                  <p className="flex justify-between gap-4 text-xs text-muted">
                    <span>Transfer fee</span>
                    <span className="font-medium text-text">
                      {formatNaira(chargeFee * 100)}
                    </span>
                  </p>

                  <p className="flex justify-between gap-4 text-xs font-medium text-text">
                    <span>Amount you will receive</span>
                    <span>{formatNaira(amountToReceive * 100)}</span>
                  </p>

                  <div className="border-t border-border pt-2">
                    <p className="flex justify-between gap-4 text-sm font-semibold text-text">
                      <span>Total wallet deduction</span>
                      <span>{formatNaira(amount * 100)}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions: pinned to the bottom of the modal */}
              <div className="sticky bottom-0 z-10 mt-auto flex gap-3 border-t border-border bg-background px-5 py-3">
                <Button
                  type="button"
                  disabled={isPending}
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm font-semibold text-text transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  loadingText="Processing..."
                  isLoading={isPending}
                  disabled={
                    isPending ||
                    !bank?.length ||
                    isLoading ||
                    isError ||
                    exceedsBalance
                  }
                  className="flex-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Withdraw
                </Button>
              </div>
            </>
          );
        }}
      </Form>
    </div>
  );
}

export default WithdrawalForm;