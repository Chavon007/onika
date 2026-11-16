
"use client";

import { useState } from "react";
import ProfileForm from "@/component/profileForm";
import Banking from "@/component/addBankAccount";

function Profile() {
  const ActiveTab = [
    {
      title: "Profile",
    },
    {
      title: "Account",
    },
    {
      title: "Favorites",
    },
    {
      title: "Loyalty",
    },
  ];

  const [isActive, setIsActiveTab] = useState("Profile");

  return (
    <div className="min-h-screen w-full overflow-hidden bg-background pt-20 transition-colors duration-300 md:pt-24">
      <div className="container mx-auto flex w-full flex-col gap-[30px] p-3 lg:w-[65%]">
        <section className="flex flex-col md:gap-2">
          <h2 className="font-heading text-base font-extrabold leading-10 tracking-wide text-text md:text-[30px]">
            Account Settings
          </h2>

          <p className="font-sans text-sm font-semibold text-muted">
            Manage your profile and preferences
          </p>
        </section>

        <section className="mt-4 w-full border-b border-border pb-3">
          <div className="flex w-full items-center justify-between md:w-[45%]">
            {ActiveTab.map((a) => (
              <h3
                onClick={() => setIsActiveTab(a.title)}
                className={`-mb-3 cursor-pointer border-b-2 pb-3 font-sans text-sm font-bold transition-colors ${
                  isActive === a.title
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-text"
                }`}
                key={a.title}
              >
                {a.title}
              </h3>
            ))}
          </div>
        </section>

        <section>
          {isActive === "Profile" && (
            <div>
              <ProfileForm />
            </div>
          )}

          {isActive === "Account" && (
            <div>
              <Banking />
            </div>
          )}

          {isActive === "Favorites" && (
            <div className="text-text">
              <p>Favorites</p>
            </div>
          )}

          {isActive === "Loyalty" && (
            <div className="text-text">
              <p>Loyalty</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
