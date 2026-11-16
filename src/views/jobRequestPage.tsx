import PublicJobRequest from "@/component/publicJob";
import PrivateJobRequest from "@/component/privateJob";
import { useState } from "react";

type jobProps = "public" | "private";

const tabs: { title: string; value: jobProps }[] = [
  {
    title: "Public Jobs",
    value: "public",
  },
  {
    title: "Private Jobs",
    value: "private",
  },
];

function JobRequestpage() {
  const [activeTab, setActiveTab] = useState<jobProps>("public");

  return (
    <div className="flex flex-col gap-5 bg-background transition-colors duration-300">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setActiveTab(t.value)}
            className={`cursor-pointer rounded-full border border-border px-4 py-2 text-sm transition-colors focus:outline-none ${
              activeTab === t.value
                ? "bg-main text-white"
                : "bg-background text-muted hover:bg-secondary hover:text-text"
            }`}
          >
            {t.title}
          </button>
        ))}
      </div>

      <div>
        {activeTab === "public" ? <PublicJobRequest /> : <PrivateJobRequest />}
      </div>
    </div>
  );
}

export default JobRequestpage;