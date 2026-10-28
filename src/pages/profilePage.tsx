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
    <div className="min-h-screen w-full overflow-hidden pt-8 bg-background">
      <div className="container mx-auto w-full lg:w-[65%] flex flex-col gap-[30px] p-3">
        <section className="flex flex-col gap-2">
          <h2 className="text-base md:text-[30px] tracking-wide leading-10 font-heading text-[#1c1917] font-extrabold">
            Account Settings
          </h2>
          <p className="font-sans text-sm font-semibold text-muted/70">
            Manage your profile and preferences
          </p>
        </section>

        <section className="w-full border-b border-border pb-3 mt-4">
          <div className="flex w-full md:w-[45%] justify-between items-center">
            {ActiveTab.map((a) => (
              <h3
                onClick={() => setIsActiveTab(a.title)}
                className={`text-sm cursor-pointer font-sans font-bold pb-3 border-b-2 -mb-3 transition-colors ${
                  isActive === a.title
                    ? "text-muted border-text"
                    : "text-[#1c1917]/50 border-transparent"
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
              <Banking/>
            </div>
          )}

          {isActive === "Favorites" && (
            <div>
              <p>Favorites</p>
            </div>
          )}
          {isActive === "Loyalty" && (
            <div>
              <p>Loyalty</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
export default Profile;
