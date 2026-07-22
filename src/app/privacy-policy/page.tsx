export const metadata = {
  title: "Privacy Policy | Exordium",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose prose-headings:font-display">
      <h1 className="font-display text-4xl mb-2">Privacy Policy</h1>
      <p className="text-sm text-charcoal-800/50 mb-10">Last updated: {new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>

      <p>
        Exordium (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) operates this website. This policy explains what
        information we collect, how we use it, and your rights regarding that
        information.
      </p>

      <h2>Information We Collect</h2>
      <p>When you place an order or contact us, we may collect:</p>
      <ul>
        <li>Your name, email address, and phone number</li>
        <li>Your delivery address</li>
        <li>Order details (items purchased, order value)</li>
        <li>Payment method used (we do not store your card or M-Pesa details directly — these are processed securely by our payment providers)</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <ul>
        <li>To process and deliver your orders</li>
        <li>To communicate with you about your order status</li>
        <li>To respond to enquiries sent via email or WhatsApp</li>
        <li>To improve our website and product offering</li>
      </ul>

      <h2>How We Store Your Information</h2>
      <p>
        Order and customer information is stored securely using Supabase, a
        cloud database provider. We take reasonable technical measures to
        protect your data from unauthorized access.
      </p>

      <h2>Cookies and Local Storage</h2>
      <p>
        We use your browser&apos;s local storage to remember items in your
        shopping cart between visits. This information stays on your device
        and is not shared with third parties.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We use third-party providers to operate this website and process
        payments, including Supabase (data storage), Stripe (card payments),
        and Safaricom M-Pesa (mobile payments). These providers have their
        own privacy policies governing how they handle your information.
      </p>

      <h2>Your Rights</h2>
      <p>
        Under the Kenya Data Protection Act, 2019, you have the right to
        access, correct, or request deletion of your personal information.
        To make such a request, contact us using the details below.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have questions about this policy or how your data is handled,
        contact us at{" "}
        <a href="mailto:exordiumltd@gmail.com">exordiumltd@gmail.com</a>.
      </p>
    </div>
  );
}
