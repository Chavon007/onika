import React from "react";

interface CardProps {
  icon?: React.ReactNode;
  text?: string;
  desc: string;
  amount: number | string;
  background?: string;
}

function Card({ text, icon, desc, amount, background }: CardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-base"
        style={{ backgroundColor: background }}
      >
        {icon}
      </div>
      <h3 className="font-heading text-[24px] font-bold leading-none text-text">
        {typeof amount === "number" ? amount.toLocaleString() : amount}
      </h3>
      <div>
        <h4 className="font-heading text-base font-semibold text-muted/60">
          {text}
        </h4>
        <p className="font-sans text-[12px] font-light text-muted">{desc}</p>
      </div>
    </div>
  );
}

export default Card;