"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Mail, MapPin, Phone, Instagram, Send, Facebook, Linkedin, Music2 } from "lucide-react";

import { SectionHeading } from "@/components/marketing/section-heading";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const serviceDescriptions: Record<string, string> = {
  "mobile-app-development": "Mobile App Development",
  "website-development": "Website Development",
  "ecommerce-platforms": "E-Commerce Solutions",
  "branding": "Branding Services",
  "mechanical-design": "Mechanical Design Services",
  "digital-marketing": "Digital Marketing Services",
};

function ContactForm() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams?.get("service");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (serviceParam && serviceDescriptions[serviceParam]) {
      setSelectedService(serviceDescriptions[serviceParam]);
      setMessage(`Hi, I'm interested in ${serviceDescriptions[serviceParam]}. Please contact me with more information.`);
    }
  }, [serviceParam]);

  return (
    <form className="grid gap-4">
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Name" />
        <Input placeholder="Email" type="email" />
      </div>
      <Input placeholder="Company" />
      <Input 
        placeholder="Project type" 
        value={selectedService}
        onChange={(e) => setSelectedService(e.target.value)}
      />
      <Textarea 
        placeholder="Describe your platform, goals, and timeline." 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button type="submit">Send inquiry</Button>
    </form>
  );
}

function ContactWithParams() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="p-6">
        <ContactForm />
      </Card>
      <Card className="p-6">
        <div className="grid gap-6 text-sm text-muted-foreground">
          <div className="flex items-start gap-3">
            <Mail className="mt-1 h-4 w-4 text-secondary" />
            <div>
              <p className="font-medium text-foreground">Email</p>
              <p>www.amolexdigitaltech@outlook.com</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-1 h-4 w-4 text-secondary" />
            <div>
              <p className="font-medium text-foreground">Phone</p>
              <p>+251-974-238-620</p>
              <p>+251-907-192-311</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-4 w-4 text-secondary" />
            <div>
              <p className="font-medium text-foreground">Location</p>
              <a 
                href="https://www.google.com/maps/place/2Q63%2BMC8,+Addis+Ababa+1000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#B29267] hover:underline hover:text-[#8f7352]"
              >
                Amhara Bank Head Quarter Building (ORDA Building), 15th Floor, Legehar
              </a>
              <p className="text-muted-foreground">Addis Ababa, Ethiopia</p>
            </div>
          </div>
          
          {/* Social Media Links */}
          <div className="flex items-center gap-3 pt-2">
            <p className="text-sm font-medium text-foreground">Follow us:</p>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/p/DVYtTOCDAux/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B29267]/10 text-[#B29267] transition-all hover:bg-[#B29267] hover:text-white" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://t.me/ghion_marketing" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B29267]/10 text-[#B29267] transition-all hover:bg-[#B29267] hover:text-white" aria-label="Telegram">
                <Send className="h-4 w-4" />
              </a>
              <a href="https://web.facebook.com/profile.php?id=61564791870925" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B29267]/10 text-[#B29267] transition-all hover:bg-[#B29267] hover:text-white" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://www.tiktok.com/@ghion_marketing" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B29267]/10 text-[#B29267] transition-all hover:bg-[#B29267] hover:text-white" aria-label="TikTok">
                <Music2 className="h-4 w-4" />
              </a>
              <a href="https://www.linkedin.com/company/107979125/admin/dashboard/" target="_blank" rel="noopener noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B29267]/10 text-[#B29267] transition-all hover:bg-[#B29267] hover:text-white" aria-label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="container py-20 space-y-12">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Contact"
          title="Start a project conversation."
          description="Tell us what you are building, where you need leverage, and how quickly you need to move."
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <ContactWithParams />
      </Suspense>
    </div>
  );
}
