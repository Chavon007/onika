"use client";

import { BankDetails } from "@/lib/types";
import {
  MdOutlineDelete,
  MdAccountBalance,
  MdCheckCircle,
  MdRadioButtonUnchecked,
} from "react-icons/md";
import { useDeletBankAccount } from "@/api/bank";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

type BankInfoProps = BankDetails & {
  selectable?: boolean;
  selected?: boolean;
  onSelect?: () => void;
};

function BankInfo({
  selectable = false,
  selected = false,
  onSelect,
  ...data
}: BankInfoProps) {
  const { mutate, isPending, variables } = useDeletBankAccount();

  const isDeleting = isPending && variables === data._id;

  const onDelete = () => {
    mutate(data._id);
  };

  return (
    <div
      onClick={selectable ? onSelect : undefined}
      role={selectable ? "radio" : undefined}
      aria-checked={selectable ? selected : undefined}
      tabIndex={selectable ? 0 : undefined}
      onKeyDown={
        selectable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
      className={`flex items-center justify-between gap-4 rounded-2xl border p-4 transition-all sm:p-5 ${
        selectable ? "cursor-pointer" : ""
      } ${
        selected
          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
          : "border-border bg-background hover:border-primary/40"
      }`}
    >
      <div className="flex min-w-0 items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-text">
          <MdAccountBalance size={22} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-text">{data.bankName}</h3>

          <p className="mt-1 text-sm font-medium tracking-wide text-muted">
            {data.accountNumber}
          </p>

          <p className="mt-1 truncate text-sm text-muted">{data.accountName}</p>

          <p className="mt-2 text-xs text-muted">
            <span className="font-medium">Added:</span>{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {selectable ? (
        <div className="shrink-0">
          {selected ? (
            <MdCheckCircle className="text-primary" size={22} />
          ) : (
            <MdRadioButtonUnchecked className="text-muted" size={22} />
          )}
        </div>
      ) : (
        <button
          type="button"
          disabled={isDeleting}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label={`Delete ${data.bankName} account`}
          title="Delete bank account"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? (
            <AiOutlineLoading3Quarters size={20} className="animate-spin" />
          ) : (
            <MdOutlineDelete size={21} />
          )}
        </button>
      )}
    </div>
  );
}

export default BankInfo;
