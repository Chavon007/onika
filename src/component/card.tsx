import React from "react";

interface CardProps {
  icon: React.ReactNode;
  desc: string;
  amount: number | string;
  background?: string;
}
function Card({ icon, desc, amount, background }: CardProps) {
  return (
    <div className=" flex flex-col gap-3">
      <div
        className="w-9 h-9 flex justify-center items-center rounded-full text-base"
        style={{ backgroundColor: background }}
      >
        {icon}
      </div>
      <h3 className="font-heading text-[24px] font-bold text-[#1c1917] leading-none">
        {typeof amount === "number" ? amount.toLocaleString() : amount}
      </h3>
      <p className="font-sans text-[12px] text-[#78716c] font-light">{desc}</p>
    </div>
  );
}

export default Card;
