export default function TermsOfService() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-zinc-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Terms of Service</h1>
      <p className="text-xs text-zinc-500">Last updated: May 28, 2026</p>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">1. Acceptance of Terms</h2>
        <p className="text-sm leading-relaxed">
          By accessing or using the AI Wedding Photo application, you agree to be bound by these Terms of Service. If you do not agree, you must discontinue your use of our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">2. Usage and Credits</h2>
        <p className="text-sm leading-relaxed">
          Generations require one-time credit packages. Unused credits are non-refundable. You represent that you own or have permission for any faces and portraits uploaded to our AI generation endpoints.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">3. Disclaimer</h2>
        <p className="text-sm leading-relaxed">
          The generated wedding outputs are synthesized using advanced machine learning models (specifically the `nano-banana-pro-edit` model). The system does not guarantee full likeness and output styles are final.
        </p>
      </section>
    </main>
  );
}
