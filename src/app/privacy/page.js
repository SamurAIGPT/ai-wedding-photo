export default function PrivacyPolicy() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 sm:py-24 text-zinc-300 space-y-6">
      <h1 className="text-3xl font-extrabold text-zinc-100 tracking-tight">Privacy Policy</h1>
      <p className="text-xs text-zinc-500">Last updated: May 28, 2026</p>
      
      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">1. Information We Collect</h2>
        <p className="text-sm leading-relaxed">
          We collect information you provide directly to us when creating an account, including your name, email address, and profile photo when registering via Google OAuth. We also store photos you upload and creations generated through our service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">2. How We Use Information</h2>
        <p className="text-sm leading-relaxed">
          We use the information we collect to operate, maintain, and improve our services, including processing transactions and generating AI wedding photos. Uploaded faces are used strictly for generation and swap pipelines.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-bold text-zinc-200">3. Storage and Safety</h2>
        <p className="text-sm leading-relaxed">
          Your photos are uploaded safely via encrypted CDNs. We retain uploaded assets only as long as necessary to fulfill generation operations. We do not sell or share your personal portraits.
        </p>
      </section>
    </main>
  );
}
