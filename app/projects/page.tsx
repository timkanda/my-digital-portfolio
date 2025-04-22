import { Shield, AlertTriangle, FileCode, Lock, Server, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServicesPage() {
  return (
    <div className="flex flex-col">
      <section className="w-full py-12 md:py-24 lg:py-32 bg-black relative overflow-hidden">
        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Projects</h1>
              <p className="max-w-[700px] text-gray-400 md:text-xl/relaxed">
                Comprehensive cybersecurity solutions to protect from evolving threats.
              </p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-grid-white/5 bg-[size:50px_50px] opacity-10"></div>
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <AlertTriangle className="h-8 w-8 text-primary" />,
                title: "Penetration Testing",
                description: "Identify vulnerabilities before attackers do with our comprehensive penetration testing services.",
                items: [
                  "Web Application Testing",
                  "Network Infrastructure Testing",
                  "Mobile Application Testing",
                  "Social Engineering Assessments",
                  "IoT Device Security Testing",
                ],
              },
              {
                icon: <Shield className="h-8 w-8 text-primary" />,
                title: "Security Audits",
                description: "Comprehensive assessment of your security posture against industry standards and best practices.",
                items: [
                  "Compliance Assessments",
                  "Security Architecture Review",
                  "Cloud Security Assessment",
                  "Risk Assessment",
                  "Security Policy Review",
                ],
              },
              {
                icon: <FileCode className="h-8 w-8 text-primary" />,
                title: "Security Training",
                description: "Empower your team with the knowledge to recognize and respond to security threats.",
                items: [
                  "Security Awareness Training",
                  "Phishing Simulations",
                  "Developer Security Training",
                  "Incident Response Drills",
                  "Executive Security Briefings",
                ],
              },
              {
                icon: <Lock className="h-8 w-8 text-primary" />,
                title: "Incident Response",
                description: "Rapid and effective response to security incidents to minimize damage and recovery time.",
                items: [
                  "24/7 Incident Response",
                  "Malware Analysis",
                  "Digital Forensics",
                  "Breach Containment",
                  "Post-Incident Analysis",
                ],
              },
              {
                icon: <Server className="h-8 w-8 text-primary" />,
                title: "Cloud Security",
                description: "Secure your cloud infrastructure and applications with our specialized cloud security services.",
                items: [
                  "Cloud Security Architecture",
                  "Cloud Configuration Review",
                  "Container Security",
                  "Serverless Security",
                  "Cloud Security Monitoring",
                ],
              },
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Security Consulting",
                description: "Expert guidance on cybersecurity strategy, architecture, and best practices.",
                items: [
                  "Security Program Development",
                  "Security Architecture Design",
                  "Compliance Consulting",
                  "Security Tool Selection",
                  "CISO as a Service",
                ],
              },
            ].map((service, idx) => (
              <Card key={idx} className="bg-background border-primary/20">
                <CardHeader>
                  <div className="bg-primary/10 p-3 w-fit rounded-lg mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
