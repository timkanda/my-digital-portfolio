import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Cookie Policy</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                How we use cookies and similar technologies on our website.
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
                This Cookie Policy explains how CyberShield ("we", "us", or "our") uses cookies and similar technologies
                to recognize you when you visit our website. It explains what these technologies are and why we use
                them, as well as your rights to control our use of them.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">What Are Cookies?</h2>
              <p>
                Cookies are small data files that are placed on your computer or mobile device when you visit a website.
                Cookies are widely used by website owners in order to make their websites work, or to work more
                efficiently, as well as to provide reporting information.
              </p>
              <p>
                Cookies set by the website owner (in this case, CyberShield) are called "first-party cookies". Cookies
                set by parties other than the website owner are called "third-party cookies". Third-party cookies enable
                third-party features or functionality to be provided on or through the website (e.g., advertising,
                interactive content, and analytics). The parties that set these third-party cookies can recognize your
                computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Why Do We Use Cookies?</h2>
              <p>
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical
                reasons in order for our website to operate, and we refer to these as "essential" or "strictly
                necessary" cookies. Other cookies also enable us to track and target the interests of our users to
                enhance the experience on our website. Third parties serve cookies through our website for advertising,
                analytics, and other purposes.
              </p>
              <p>
                The specific types of first and third-party cookies served through our website and the purposes they
                perform are described below:
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Types of Cookies We Use</h2>
              <h3 className="text-xl font-semibold">Essential Cookies</h3>
              <p>
                These cookies are strictly necessary to provide you with services available through our website and to
                use some of its features, such as access to secure areas. Because these cookies are strictly necessary
                to deliver the website, you cannot refuse them without impacting how our website functions.
              </p>
              <h3 className="text-xl font-semibold">Performance and Functionality Cookies</h3>
              <p>
                These cookies are used to enhance the performance and functionality of our website but are non-essential
                to their use. However, without these cookies, certain functionality may become unavailable.
              </p>
              <h3 className="text-xl font-semibold">Analytics and Customization Cookies</h3>
              <p>
                These cookies collect information that is used either in aggregate form to help us understand how our
                website is being used or how effective our marketing campaigns are, or to help us customize our website
                for you in order to enhance your experience.
              </p>
              <h3 className="text-xl font-semibold">Targeting Cookies</h3>
              <p>
                These cookies are used to make advertising messages more relevant to you. They perform functions like
                preventing the same ad from continuously reappearing, ensuring that ads are properly displayed, and in
                some cases selecting advertisements that are based on your interests.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How Can You Control Cookies?</h2>
              <p>
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie
                preferences by clicking on the appropriate opt-out links provided in the cookie banner on our website.
              </p>
              <p>
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject
                cookies, you may still use our website though your access to some functionality and areas of our website
                may be restricted. As the means by which you can refuse cookies through your web browser controls vary
                from browser-to-browser, you should visit your browser's help menu for more information.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">How Often Will We Update This Cookie Policy?</h2>
              <p>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the
                cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this
                Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p>The date at the top of this Cookie Policy indicates when it was last updated.</p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Contact Us</h2>
              <p>If you have any questions about our use of cookies or other technologies, please contact us at:</p>
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
