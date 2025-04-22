import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Privacy Policy</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                How we collect, use, and protect your personal information.
              </p>
            </div>
          </div>
        </div>
        {/* Animated background */}
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-3xl space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Introduction</h2>
              <p className="text-muted-foreground">Last Updated: April 22, 2025</p>
              <p>
                CyberShield ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains
                how we collect, use, disclose, and safeguard your information when you visit our website or use our
                services.
              </p>
              <p>
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy,
                please do not access the site or use our services.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Information We Collect</h2>
              <p>We may collect information about you in a variety of ways. The information we may collect includes:</p>
              <h3 className="text-xl font-semibold">Personal Data</h3>
              <p>
                When you use our services or contact us, we may collect personally identifiable information, such as
                your name, email address, telephone number, and company name. This information is collected on a
                voluntary basis when you provide it to us.
              </p>
              <h3 className="text-xl font-semibold">Usage Data</h3>
              <p>
                We may also collect information on how the website is accessed and used. This usage data may include
                information such as your computer's Internet Protocol (IP) address, browser type, browser version, the
                pages of our website that you visit, the time and date of your visit, the time spent on those pages, and
                other diagnostic data.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Use of Your Information</h2>
              <p>We may use the information we collect from you for various purposes, including to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, operate, and maintain our website and services</li>
                <li>Improve, personalize, and expand our website and services</li>
                <li>Understand and analyze how you use our website and services</li>
                <li>Develop new products, services, features, and functionality</li>
                <li>Communicate with you, including for customer service, updates, and marketing purposes</li>
                <li>Send you emails and newsletters</li>
                <li>Find and prevent fraud</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Disclosure of Your Information</h2>
              <p>
                We may share information we have collected about you in certain situations. Your information may be
                disclosed as follows:
              </p>
              <h3 className="text-xl font-semibold">By Law or to Protect Rights</h3>
              <p>
                If we believe the release of information about you is necessary to respond to legal process, to
                investigate or remedy potential violations of our policies, or to protect the rights, property, and
                safety of others, we may share your information as permitted or required by any applicable law, rule, or
                regulation.
              </p>
              <h3 className="text-xl font-semibold">Third-Party Service Providers</h3>
              <p>
                We may share your information with third parties that perform services for us or on our behalf,
                including payment processing, data analysis, email delivery, hosting services, customer service, and
                marketing assistance.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Security of Your Information</h2>
              <p>
                We use administrative, technical, and physical security measures to help protect your personal
                information. While we have taken reasonable steps to secure the personal information you provide to us,
                please be aware that despite our efforts, no security measures are perfect or impenetrable, and no
                method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Your Rights</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, such as:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>The right to access the personal information we have about you</li>
                <li>The right to request that we correct any personal information we have about you</li>
                <li>The right to request that we delete any personal information we have about you</li>
                <li>The right to opt out of marketing communications</li>
              </ul>
              <p>To exercise any of these rights, please contact us using the contact information provided below.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p>If you have questions or comments about this Privacy Policy, please contact us at:</p>
              <p>
                CyberShield
                <br />
                123 Security Street
                <br />
                Cyber City, CC 12345
                <br />
                Email: privacy@cybershield.com
                <br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
