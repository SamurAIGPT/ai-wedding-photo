"use client";

import { useSession, signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { IoCheckmarkCircleOutline, IoWalletOutline, IoInformationCircleOutline } from "react-icons/io5";

function PricingContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const [loadingPlan, setLoadingPlan] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  const success = searchParams.get("success");
  const canceled = searchParams.get("canceled");

  useEffect(() => {
    if (success) {
      setAlertMsg("Payment successful! Your credits have been updated.");
    } else if (canceled) {
      setAlertMsg("Payment was canceled. No credits were deducted.");
    }
  }, [success, canceled]);

  const handlePurchase = async (planId) => {
    if (status !== "authenticated") {
      signIn("google");
      return;
    }

    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          window.location.href = data.url;
        }
      } else {
        alert("Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      alert("Error initiating checkout");
    } finally {
      setLoadingPlan("");
    }
  };

  const PLANS = [
    {
      id: "basic",
      name: "Basic Pack",
      price: "$5.00",
      credits: 1000,
      features: [
        "1000 AI Photo Credits",
        "Approx. 55 wedding generations",
        "Standard face blending engine",
        "Classic templates unlocked"
      ]
    },
    {
      id: "standard",
      name: "Standard Pack",
      price: "$10.00",
      credits: 2000,
      features: [
        "2000 AI Photo Credits",
        "Approx. 110 wedding generations",
        "All templates unlocked",
        "Custom wedding style settings",
        "HD download option enabled"
      ]
    },
    {
      id: "pro",
      name: "Professional Pack",
      price: "$20.00",
      credits: 4000,
      popular: true,
      features: [
        "4000 AI Photo Credits",
        "Approx. 220 wedding generations",
        "Priority AI generation queue",
        "HD download option enabled",
        "Exclusive backgrounds and presets"
      ]
    },
    {
      id: "business",
      name: "Business Pack",
      price: "$50.00",
      credits: 10000,
      features: [
        "10000 AI Photo Credits",
        "Approx. 550 wedding generations",
        "Priority AI generation queue",
        "Dedicated creations portfolio storage",
        "Full commercial license options"
      ]
    }
  ];

  return (
    <main className="flex-1 py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full bg-[#09090b]">
      
      {/* Alerts */}
      {alertMsg && (
        <div className="mb-10 rounded-xl border border-emerald-950 bg-emerald-950/20 p-4 flex items-center gap-3 text-sm text-emerald-400">
          <IoInformationCircleOutline className="h-5 w-5 shrink-0 text-emerald-500" />
          <p>{alertMsg}</p>
        </div>
      )}

      <div className="text-center max-w-xl mx-auto space-y-4 mb-16">
        <h1 className="font-outfit text-4xl font-extrabold tracking-tight text-zinc-100">
          Choose Your Credit Plan
        </h1>
        <p className="text-zinc-400 text-sm">
          Purchase credits one-time to generate your AI wedding photos. 
          Each AI generation consumes <span className="font-bold text-fuchsia-400">18 credits</span>.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl bg-zinc-900/40 p-6 flex flex-col justify-between border hover:border-zinc-700 hover:shadow-2xl transition duration-300 ${
              plan.popular 
                ? "border-fuchsia-500/50 shadow-fuchsia-500/5" 
                : "border-zinc-800"
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-md">
                Most Popular
              </span>
            )}

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-bold text-zinc-200">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1 text-zinc-100">
                  <span className="text-3xl font-extrabold font-outfit">{plan.price}</span>
                  <span className="text-xs text-zinc-500">/ one-time</span>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl bg-zinc-900/80 p-3.5 border border-zinc-800">
                <IoWalletOutline className="h-5 w-5 text-fuchsia-400" />
                <span className="text-sm font-bold text-fuchsia-400 font-mono">
                  {plan.credits} Credits
                </span>
              </div>

              <div className="border-t border-zinc-800 my-2"></div>

              <ul className="space-y-3 text-xs text-zinc-400">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 leading-relaxed">
                    <IoCheckmarkCircleOutline className="h-4 w-4 text-fuchsia-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={() => handlePurchase(plan.id)}
                disabled={loadingPlan === plan.id}
                className={`w-full rounded-xl py-3.5 text-center text-xs font-bold tracking-wider uppercase transition cursor-pointer ${
                  plan.popular
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:brightness-110 active:scale-98"
                    : "border border-zinc-800 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
                } disabled:opacity-50`}
              >
                {loadingPlan === plan.id ? "Processing..." : `Get ${plan.credits} Credits`}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default function Pricing() {
  return (
    <Suspense fallback={
      <div className="flex-1 flex items-center justify-center bg-[#09090b]">
        <div className="h-10 w-10 rounded-full border-4 border-zinc-800 border-t-fuchsia-500 animate-spin"></div>
      </div>
    }>
      <PricingContent />
    </Suspense>
  );
}
