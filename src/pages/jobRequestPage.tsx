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
    <div className=" flex flex-col gap-5">
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setActiveTab(t.value)}
            className={`rounded-full border px-4 py-2 text-sm ${
              activeTab === t.value
                ? "bg-main text-white"
                : "bg-white text-muted"
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
