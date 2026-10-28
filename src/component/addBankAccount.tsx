"use client";

import { useState } from "react";
import Button from "./button";
import { Form } from "./form";
import { InputField } from "./inputField";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosClose } from "react-icons/io";
import {
  MdAccountBalance,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import {
  useGetBankDetail,
  useGetBankList,
  useAddBankAccount,
  useGetUserBank,
} from "@/api/bank";
import BankInfo from "./bankInfo";
import { bankAccountDTO, bankAccountSchema } from "@/schema/bankSchema";

function Banking() {
  const [openModal, setOpenModal] = useState(false);
  const [bankCode, setBankCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  const {
    data: userBankData,
    isLoading: userBankLoading,
    isError: userBankError,
  } = useGetUserBank();

  const {
    data: bankListData,
    isLoading: bankListLoading,
    isError: bankListError,
  } = useGetBankList();

  const {
    data: bankDetails,
    isError: bankDetailsError,
    isLoading: bankDetailsLoading,
  } = useGetBankDetail({ bankCode, accountNumber });

  const { mutate: addBankdata, isPending: addBankPending } =
    useAddBankAccount();

  const banks = Array.isArray(bankListData)
    ? bankListData
    : Array.isArray(bankListData?.data)
      ? bankListData.data
      : [];
  const userBanks = userBankData?.data ?? [];
  const accountLimitReached = userBanks.length >= 3;

  const onSubmit = (data: bankAccountDTO) => {
    addBankdata(data, {
      onSuccess: () => {
        setOpenModal(false);
        setBankCode("");
        setAccountNumber("");
      },
    });
  };

  const closeModal = () => {
    if (addBankPending) return;

    setOpenModal(false);
    setBankCode("");
    setAccountNumber("");
  };

  return (
    <section className="w-full space-y-6 text-text">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl text-main">Bank accounts</h2>
          <p className="mt-1 text-sm text-muted">
            Manage the accounts you can withdraw your funds to.
          </p>
        </div>

        {!accountLimitReached && (
          <div className="shrink-0">
            <Button type="button" onClick={() => setOpenModal(true)}>
              Add bank account
            </Button>
          </div>
        )}
      </div>

      {/* Saved bank accounts */}
      <div className="space-y-3">
        {userBankLoading ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-white p-8 text-sm text-muted">
            <AiOutlineLoading3Quarters className="animate-spin text-primary" />
            Loading bank accounts...
          </div>
        ) : userBankError ? (
          <div className="rounded-2xl border border-border bg-white p-6 text-sm text-muted">
            Could not load your bank accounts. Please try again.
          </div>
        ) : userBanks.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-border bg-white px-6 py-10 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
              <MdOutlineAccountBalanceWallet size={28} className="text-muted" />
            </div>

            <h3 className="font-semibold text-text">No bank accounts yet</h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
              Add a bank account to make withdrawals from your Onika wallet
              easier.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {userBanks.map((bank) => (
              <BankInfo key={bank._id} {...bank} />
            ))}
          </div>
        )}
      </div>

      {accountLimitReached && (
        <p className="rounded-xl border border-border bg-secondary/60 px-4 py-3 text-sm text-muted">
          You have reached the limit of 3 bank accounts. Delete an existing
          account if you need to add another one.
        </p>
      )}

      {/* Add bank account modal */}
      {openModal && !accountLimitReached && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-main/60 px-4 py-6 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="bank-modal-title"
            className="my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-background shadow-2xl"
          >
            <Form<bankAccountDTO>
              onSubmit={onSubmit}
              schema={bankAccountSchema}
              defaultValues={{
                bankCode: "",
                accountNumber: "",
              }}
            >
              {(methods) => {
                const bankCodeField = methods.register("bankCode");
                const accountNumberField = methods.register("accountNumber");

                return (
                  <>
                    {/* Modal header */}
                    <div className="flex items-start justify-between border-b border-border px-5 py-5 sm:px-7">
                      <div className="flex items-start gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-text">
                          <MdAccountBalance size={24} />
                        </div>

                        <div>
                          <h3
                            id="bank-modal-title"
                            className="font-heading text-xl text-main"
                          >
                            Add bank account
                          </h3>
                          <p className="mt-1 text-sm leading-5 text-muted">
                            Enter your bank details to verify your account.
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={closeModal}
                        disabled={addBankPending}
                        aria-label="Close modal"
                        className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-muted transition hover:bg-secondary hover:text-text disabled:opacity-50"
                      >
                        <IoIosClose size={27} />
                      </button>
                    </div>

                    {/* Modal form */}
                    <div className="space-y-5 px-5 py-6 sm:px-7">
                      {/* Bank selection */}
                      <div className="space-y-2">
                        <label
                          htmlFor="bankCode"
                          className="block text-sm font-semibold text-text"
                        >
                          Select bank
                        </label>

                        <select
                          id="bankCode"
                          {...bankCodeField}
                          disabled={bankListLoading || addBankPending}
                          onChange={async (event) => {
                            await bankCodeField.onChange(event);
                            setBankCode(event.target.value);
                          }}
                          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-text outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:cursor-not-allowed disabled:bg-secondary"
                        >
                          <option value="">Choose your bank</option>

                          {banks.map((bank: { name: string; code: string }) => (
                            <option key={bank.code} value={bank.code}>
                              {bank.name}
                            </option>
                          ))}
                        </select>

                        {bankListLoading && (
                          <p className="flex items-center gap-2 text-xs text-muted">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                            Loading available banks...
                          </p>
                        )}

                        {bankListError && (
                          <p className="text-xs text-red-600">
                            Could not load banks. Please try again.
                          </p>
                        )}

                        {methods.formState.errors.bankCode && (
                          <p className="text-xs text-red-600">
                            {methods.formState.errors.bankCode.message}
                          </p>
                        )}
                      </div>

                      {/* Account number */}
                      <div className="space-y-2">
                        <InputField
                          label="Account number"
                          placeholder="Enter your 10-digit account number"
                          type="text"
                          registration={{
                            ...accountNumberField,
                            onChange: async (event) => {
                              await accountNumberField.onChange(event);
                              setAccountNumber(
                                event.target.value
                                  .replace(/\D/g, "")
                                  .slice(0, 10),
                              );
                            },
                          }}
                          error={methods.formState.errors.accountNumber}
                        />

                        <p className="text-xs text-muted">
                          Enter all 10 digits, including any leading zeros.
                        </p>
                      </div>

                      {/* Account verification */}
                      <div className="rounded-2xl border border-border bg-white p-4">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
                          Account verification
                        </p>

                        {bankDetailsLoading ? (
                          <div className="flex items-center gap-3 text-sm text-muted">
                            <AiOutlineLoading3Quarters className="animate-spin text-primary" />
                            Verifying account details...
                          </div>
                        ) : bankDetailsError ? (
                          <div>
                            <p className="text-sm font-medium text-red-600">
                              Account verification failed
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted">
                              Check the selected bank and account number, then
                              try again.
                            </p>
                          </div>
                        ) : bankDetails?.data?.accountName ? (
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-muted">Account name</p>
                              <p className="mt-1 break-words text-sm font-semibold text-text">
                                {bankDetails.data.accountName}
                              </p>
                            </div>

                            <div className="border-t border-border pt-3">
                              <p className="text-xs text-muted">Bank</p>
                              <p className="mt-1 text-sm font-medium text-text">
                                {bankDetails.data.bankName}
                              </p>
                            </div>

                            <p className="text-xs text-green-700">
                              Account details verified.
                            </p>
                          </div>
                        ) : (
                          <p className="text-sm leading-6 text-muted">
                            Your account name will appear here after you select
                            a bank and enter a valid account number.
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Modal footer */}
                    <div className="flex flex-col-reverse gap-3 border-t border-border bg-secondary/40 px-5 py-5 sm:flex-row sm:justify-end sm:px-7">
                      <Button
                        className="bg-white text-black hover:bg-accent/20"
                        type="button"
                        onClick={closeModal}
                        disabled={addBankPending}
                      >
                        Cancel
                      </Button>

                      <Button
                        type="submit"
                        disabled={
                          addBankPending ||
                          bankListLoading ||
                          !bankCode ||
                          !/^\d{10}$/.test(accountNumber) ||
                          !bankDetails?.data?.accountName
                        }
                        loadingText="Adding..."
                      >
                        Add account
                      </Button>
                    </div>
                  </>
                );
              }}
            </Form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Banking;
