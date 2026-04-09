"use client";

import { useEffect, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  BarChart3, 
  Plus, 
  ChevronRight, 
  Building,
  Save,
  LogOut,
  X,
  Loader2,
  Calendar,
  Image as ImageIcon,
  Upload,
  Trash2
} from "lucide-react";
import { Send } from "lucide-react";

type RangeKey = "7D" | "30D" | "90D" | "6M" | "1Y";

const formatHMS = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

// Client type
type Client = {
  id: string;
  company_name: string;
  email: string;
  password: string;
  created_at: string;
  status: "active" | "inactive";
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [loadingClients, setLoadingClients] = useState(true);
  const [creatingClient, setCreatingClient] = useState(false);

  type AnalyticsConfig = {
    kpis: {
      impressions: number;
      impressionsChange: number;
      engagement: number;
      engagementChange: number;
      clicks: number;
      clicksChange: number;
      shares: number;
      sharesChange: number;
    };
    donut: {
      likes: number;
      comments: number;
      shares: number;
      saves: number;
    };
    platforms: {
      instagram: number;
      facebook: number;
      tiktok: number;
    };
    content: {
      video: number;
      carousel: number;
      image: number;
    };
    insights: string[];
    asOf?: string;
  };

  const [clientMetrics, setClientMetrics] = useState<Record<string, {
    impressions: number;
    clicks: number;
    likes: number;
    shares: number;
    posts: number;
    watchedSeconds: number;
    adSpend: number;
    engagementRate: number;
    reachChange?: number;
    watchedChange?: number;
    adChange?: number;
    engagementChange?: number;
    periodStart: string;
    periodEnd: string;
    updatedAt?: string;
    logoUrl?: string;
    logoUpdatedAt?: string;
    reports: { title: string; date: string }[];
    analytics?: {
      ranges?: Record<RangeKey, AnalyticsConfig>;
      updatedAt?: string;
    };
    socialAccounts?: SocialAccount[];
    postsData?: SocialPost[];
  }>>({});
  
  // Form state for metrics input
  const [formData, setFormData] = useState({
    impressions: "",
    clicks: "",
    likes: "",
    shares: "",
    posts: "",
    watchedHours: "",
    watchedMinutes: "",
    watchedSeconds: "",
    adSpend: "",
    engagementRate: "",
    reachChange: "12",
    watchedChange: "22",
    adChange: "6",
    engagementChange: "3",
    periodEnd: new Date().toISOString().split("T")[0],
    reportTitle: "",
    reportContent: ""
  });

  const [analyticsForm, setAnalyticsForm] = useState<AnalyticsConfig>({
    kpis: {
      impressions: 684294,
      impressionsChange: 12,
      engagement: 27,
      engagementChange: 3.4,
      clicks: 22900,
      clicksChange: 6.1,
      shares: 12500,
      sharesChange: -1.8
    },
    donut: { likes: 42, comments: 18, shares: 24, saves: 16 },
    platforms: { instagram: 82, facebook: 56, tiktok: 94 },
    content: { video: 92, carousel: 74, image: 58 },
    insights: [
      "Engagement increased by 18% this month.",
      "Video content generates 2x more engagement.",
      "Instagram contributes 65% of total reach.",
      "Consistent growth trend over the last 30 days."
    ],
    asOf: new Date().toISOString().slice(0, 16)
  });
  const [analyticsFormRange, setAnalyticsFormRange] = useState<RangeKey>("30D");

  type SocialAccount = {
    id: string;
    provider: string;
    username: string;
    link: string;
    optimizedAt: string;
    followers: number;
    likes: number;
    comments: number;
    shares: number;
    posts: number;
  };

  const [socialForm, setSocialForm] = useState<SocialAccount>({
    id: crypto.randomUUID(),
    provider: "Instagram",
    username: "",
    link: "",
    optimizedAt: new Date().toISOString().slice(0, 10),
    followers: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    posts: 0
  });

  const [socialList, setSocialList] = useState<SocialAccount[]>([]);

  type CalendarEntry = {
    id: string;
    date: string;
    platform: string;
    type: string;
    contentType: string;
    status: string;
    note?: string;
  };

  const [calendarEntries, setCalendarEntries] = useState<CalendarEntry[]>([]);

  type SocialPost = {
    id: string;
    platform: string;
    description: string;
    postedAt: string;
    impressions: number;
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };

  const [postForm, setPostForm] = useState<SocialPost>({
    id: crypto.randomUUID(),
    platform: "Instagram",
    description: "",
    postedAt: new Date().toISOString().slice(0, 10),
    impressions: 0,
    likes: 0,
    comments: 0,
    shares: 0,
    saves: 0
  });

  const [postsList, setPostsList] = useState<SocialPost[]>([]);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [sendUsername, setSendUsername] = useState("");
  const [sendMessage, setSendMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const normalizeCompanyKey = (name: string) => name.toLowerCase().replace(/\s/g, "_");
  const getLogoStorageKey = (name: string) => `client_logo_${normalizeCompanyKey(name)}`;

  // Form state for adding new client
  const [newClient, setNewClient] = useState({
    company_name: "",
    email: "",
    telegram_username: "",
    password: "",
    confirmPassword: ""
  });

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem("admin_session");
    if (!adminSession) {
      router.push("/dashboard/admin/sign-in");
      return;
    }
    setIsAuthenticated(true);
    
    // Load clients from Supabase
    loadClients();
  }, [router]);

  async function loadClients() {
    try {
      setLoadingClients(true);
      
      // Call the API to get clients from Supabase
      const response = await fetch("/api/admin/clients");
      const data = await response.json();

      if (!response.ok) {
        console.error("Error loading clients:", data.error);
        // Fallback to localStorage
        const storedClients = localStorage.getItem("admin_clients");
        if (storedClients) {
          setClients(JSON.parse(storedClients));
        }
        return;
      }

      if (data.clients && data.clients.length > 0) {
        const clientList: Client[] = data.clients.map((t: any) => ({
          id: t.id,
          company_name: t.company_name,
          email: t.email,
          password: "",
          created_at: t.created_at ? t.created_at.split('T')[0] : new Date().toISOString().split('T')[0],
          status: t.status as "active" | "inactive"
        }));
        setClients(clientList);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingClients(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("admin_session");
    router.push("/dashboard/admin/sign-in");
  }

  function handleClearAllClients() {
    if (!confirm("Are you sure you want to delete ALL registered clients? This cannot be undone.")) return;
    
    // Clear all client data from localStorage
    localStorage.removeItem("admin_clients");
    localStorage.removeItem("client_session");
    localStorage.removeItem("user_company_name");
    
    // Clear all client_* keys
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("client_")) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Clear all metrics_* keys
    const metricsKeysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("metrics_")) {
        metricsKeysToRemove.push(key);
      }
    }
    metricsKeysToRemove.forEach(key => localStorage.removeItem(key));

    // Clear all client_logo_* keys
    const logoKeysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("client_logo_")) {
        logoKeysToRemove.push(key);
      }
    }
    logoKeysToRemove.forEach(key => localStorage.removeItem(key));

    // Clear popup seen flags stored in sessionStorage
    const popupSeenKeys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith("logo_popup_seen_")) {
        popupSeenKeys.push(key);
      }
    }
    popupSeenKeys.forEach((key) => sessionStorage.removeItem(key));
    
    setClients([]);
    setSelectedClient(null);
    setClientMetrics({});
    
    alert("All registered clients have been removed!");
  }

  async function handleAddClient() {
    if (!newClient.company_name || !newClient.password || !newClient.telegram_username || !newClient.email) {
      alert("Company name, email, Telegram username, and password are required!");
      return;
    }
    
    if (newClient.password !== newClient.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }

    setCreatingClient(true);
    
    try {
      // Call the API to create client (admin side)
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          company_name: newClient.company_name,
          password: newClient.password,
          email: newClient.email,
          telegram_username: newClient.telegram_username
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Failed to create client");
        setCreatingClient(false);
        return;
      }

      // Store in localStorage as backup
      const clientEmail = newClient.email || `${newClient.company_name.toLowerCase().replace(/\s/g, '')}@amolex.client`;
      const newClientData: Client = {
        id: data.client.id,
        company_name: newClient.company_name,
        email: clientEmail,
        password: newClient.password,
        created_at: new Date().toISOString().split('T')[0],
        status: "active"
      };
      
      const storedClients = localStorage.getItem("admin_clients");
      const existingClients = storedClients ? JSON.parse(storedClients) : [];
      existingClients.push(newClientData);
      localStorage.setItem("admin_clients", JSON.stringify(existingClients));
      
      // Store credentials for client login validation
      localStorage.setItem(`client_${newClientData.company_name.toLowerCase().replace(/\s/g, '')}`, JSON.stringify({
        password: newClient.password,
        email: clientEmail,
        telegram_username: newClient.telegram_username,
        supabaseUserId: data.client.id
      }));

      // Refresh the clients list
      await loadClients();
      
      alert(`Client "${newClient.company_name}" created successfully in Supabase!`);
    } catch (error) {
      console.error("Error creating client:", error);
      alert("Failed to create client. Please try again.");
    } finally {
      setNewClient({ company_name: "", email: "", telegram_username: "", password: "", confirmPassword: "" });
      setShowAddClient(false);
      setCreatingClient(false);
    }
  }

  async function handleDeleteClient(clientId: string) {
    if (!confirm("Are you sure you want to delete this client?")) return;
    
    const target = clients.find((c) => c.id === clientId);
    if (target) {
      localStorage.removeItem(getLogoStorageKey(target.company_name));
      sessionStorage.removeItem(`logo_popup_seen_${getLogoStorageKey(target.company_name)}`);
    }

    const updatedClients = clients.filter(c => c.id !== clientId);
    localStorage.setItem("admin_clients", JSON.stringify(updatedClients));
    setClients(updatedClients);
    
    if (selectedClient?.id === clientId) {
      setSelectedClient(null);
    }
  }

  function handleClientSelect(client: Client) {
    setSelectedClient(client);
    setShowForm(false);

    const storageKey = `metrics_${client.company_name.toLowerCase().replace(/\s/g, '_')}`;
    const storedMetrics = localStorage.getItem(storageKey);
    const logoKey = getLogoStorageKey(client.company_name);
    const storedLogo = localStorage.getItem(logoKey);

    // Helper to split seconds into hh/mm/ss strings
    const toParts = (totalSeconds: number) => {
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      return {
        watchedHours: hours ? String(hours) : "",
        watchedMinutes: minutes ? String(minutes) : "",
        watchedSeconds: seconds ? String(seconds) : ""
      };
    };

    let existing = clientMetrics[client.id];

    if (storedMetrics) {
      try {
        const parsed = JSON.parse(storedMetrics);
        // Ensure required keys exist
        existing = {
          impressions: Number(parsed.impressions) || 0,
          clicks: Number(parsed.clicks) || 0,
          likes: Number(parsed.likes) || 0,
          shares: Number(parsed.shares) || 0,
          posts: Number(parsed.posts) || 0,
          watchedSeconds: Number(parsed.watchedSeconds) || 0,
          adSpend: Number(parsed.adSpend) || 0,
          engagementRate: Number(parsed.engagementRate) || 0,
          reachChange: Number(parsed.reachChange) || 12,
          watchedChange: Number(parsed.watchedChange) || 22,
          adChange: Number(parsed.adChange) || 6,
          engagementChange: Number(parsed.engagementChange) || 3,
          periodStart: parsed.periodStart || parsed.period_end || "",
          periodEnd: parsed.periodEnd || parsed.period_end || new Date().toISOString().split("T")[0],
          updatedAt: parsed.updatedAt || parsed.updated_at,
          logoUrl: parsed.logoUrl,
          logoUpdatedAt: parsed.logoUpdatedAt,
          reports: parsed.reports || [],
          analytics: parsed.analytics,
          socialAccounts: parsed.socialAccounts || [],
          postsData: parsed.postsData || []
        };

        setClientMetrics(prev => ({
          ...prev,
          [client.id]: existing
        }));
      } catch (e) {
        console.error("Failed to parse stored metrics", e);
      }
    }

    if (existing) {
      const parts = toParts(existing.watchedSeconds || 0);
        setFormData({
          impressions: existing.impressions.toString(),
          clicks: existing.clicks.toString(),
          likes: existing.likes.toString(),
          shares: existing.shares.toString(),
          posts: existing.posts.toString(),
          adSpend: existing.adSpend ? existing.adSpend.toString() : "",
          engagementRate: existing.engagementRate ? existing.engagementRate.toString() : "",
          reachChange: (existing.reachChange ?? 12).toString(),
          watchedChange: (existing.watchedChange ?? 22).toString(),
          adChange: (existing.adChange ?? 6).toString(),
        engagementChange: (existing.engagementChange ?? 3).toString(),
        periodEnd: existing.periodEnd || new Date().toISOString().split("T")[0],
        ...parts,
        reportTitle: "",
        reportContent: ""
      });
      const ranges = existing.analytics?.ranges;
      const preferredRange: RangeKey | undefined =
        (ranges && (ranges["30D"] ? "30D" : (Object.keys(ranges)[0] as RangeKey))) || undefined;
      if (ranges && preferredRange) {
        setAnalyticsFormRange(preferredRange);
        setAnalyticsForm({
          ...analyticsForm,
          ...ranges[preferredRange]
        });
      }
      setSocialList(existing.socialAccounts || []);
      setPostsList(existing.postsData || []);

      // Load calendar entries for this client
      const calendarKey = `calendar_${client.company_name.toLowerCase().replace(/\s/g, "_")}`;
      const storedCalendar = localStorage.getItem(calendarKey);
      if (storedCalendar) {
        try {
          setCalendarEntries(JSON.parse(storedCalendar));
        } catch {
          setCalendarEntries([]);
        }
      } else {
        setCalendarEntries([]);
      }
    } else {
      setFormData({
        impressions: "",
        clicks: "",
        likes: "",
        shares: "",
        posts: "",
        watchedHours: "",
        watchedMinutes: "",
        watchedSeconds: "",
        adSpend: "",
        engagementRate: "",
        reachChange: "12",
        watchedChange: "22",
        adChange: "6",
        engagementChange: "3",
        periodEnd: new Date().toISOString().split("T")[0],
        reportTitle: "",
        reportContent: ""
      });
      setAnalyticsForm({
        kpis: {
          impressions: 684294,
          impressionsChange: 12,
          engagement: 27,
          engagementChange: 3.4,
          clicks: 22900,
          clicksChange: 6.1,
          shares: 12500,
          sharesChange: -1.8
        },
        donut: { likes: 42, comments: 18, shares: 24, saves: 16 },
        platforms: { instagram: 82, facebook: 56, tiktok: 94 },
        content: { video: 92, carousel: 74, image: 58 },
        insights: [
          "Engagement increased by 18% this month.",
          "Video content generates 2x more engagement.",
          "Instagram contributes 65% of total reach.",
          "Consistent growth trend over the last 30 days."
        ],
        asOf: new Date().toISOString().slice(0, 16)
      });
      setAnalyticsFormRange("30D");
      setSocialList([]);
      setPostsList([]);
      setCalendarEntries([]);
    }

    setLogoPreview(storedLogo || existing?.logoUrl || null);
  }

  async function handleSendTelegramMessage() {
    if (!sendUsername || !sendMessage.trim()) {
      alert("Telegram username and message are required.");
      return;
    }
    setSendingMessage(true);
    try {
      const response = await fetch("/api/send-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          telegram_username: sendUsername.replace("@", "").trim(),
          message: sendMessage
        })
      });

      const contentType = response.headers.get("content-type");
      const isJson = contentType && contentType.includes("application/json");
      const data = isJson ? await response.json() : null;

      if (!response.ok || (data && data.success === false)) {
        const errMsg = data?.error || `Request failed (${response.status})`;
        throw new Error(errMsg);
      }

      alert("Message sent successfully.");
      setSendMessage("");
    } catch (error: any) {
      alert(error.message || "Failed to send message");
    } finally {
      setSendingMessage(false);
    }
  }

  function handleSaveMetrics() {
    if (!selectedClient) return;

    const periodEnd = formData.periodEnd || new Date().toISOString().split("T")[0];
    const periodEndDate = new Date(periodEnd);
    const periodStartDate = new Date(periodEndDate);
    periodStartDate.setDate(periodEndDate.getDate() - 6);

    const watchedSeconds =
      (parseInt(formData.watchedHours) || 0) * 3600 +
      (parseInt(formData.watchedMinutes) || 0) * 60 +
      (parseInt(formData.watchedSeconds) || 0);

    // Save metrics to localStorage with company-specific key
    const storageKey = `metrics_${selectedClient.company_name.toLowerCase().replace(/\s/g, '_')}`;
    const metricsData = {
      impressions: parseInt(formData.impressions) || 0,
      clicks: parseInt(formData.clicks) || 0,
      likes: parseInt(formData.likes) || 0,
      shares: parseInt(formData.shares) || 0,
      posts: parseInt(formData.posts) || 0,
      watchedSeconds,
      adSpend: parseFloat(formData.adSpend) || 0,
      engagementRate: parseFloat(formData.engagementRate) || 0,
      reachChange: parseFloat(formData.reachChange) || 0,
      watchedChange: parseFloat(formData.watchedChange) || 0,
      adChange: parseFloat(formData.adChange) || 0,
      engagementChange: parseFloat(formData.engagementChange) || 0,
      periodStart: periodStartDate.toISOString().split("T")[0],
      periodEnd,
      updatedAt: new Date().toISOString(),
      logoUrl: logoPreview || clientMetrics[selectedClient.id]?.logoUrl,
      logoUpdatedAt: logoPreview ? new Date().toISOString() : clientMetrics[selectedClient.id]?.logoUpdatedAt,
      reports: clientMetrics[selectedClient.id]?.reports || [],
      analytics: {
        ranges: {
          ...(clientMetrics[selectedClient.id]?.analytics?.ranges || {}),
          [analyticsFormRange]: {
            ...analyticsForm
          } as AnalyticsConfig
        } as Record<RangeKey, AnalyticsConfig>,
        updatedAt: new Date().toISOString()
      } as const,
      socialAccounts: socialList,
      postsData: postsList
    };
    
    localStorage.setItem(storageKey, JSON.stringify(metricsData));
    
    // Also store in the clientMetrics state
    setClientMetrics(prev => ({
      ...prev,
      [selectedClient.id]: metricsData
    }));

    alert(`Metrics saved for ${selectedClient.company_name}!`);
    setShowForm(false);
  }

  function handleAddReport() {
    if (!selectedClient || !formData.reportTitle) return;

    const storageKey = `metrics_${selectedClient.company_name.toLowerCase().replace(/\s/g, '_')}`;
    let existingMetrics = clientMetrics[selectedClient.id] || {
      impressions: 0,
      clicks: 0,
      likes: 0,
      shares: 0,
      posts: 0,
      watchedSeconds: 0,
      adSpend: 0,
      engagementRate: 0,
      periodStart: new Date().toISOString().split("T")[0],
      periodEnd: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString(),
      reports: [],
      socialAccounts: []
    };

    existingMetrics.reports.push({
      title: formData.reportTitle,
      date: new Date().toISOString().split('T')[0]
    });

    setClientMetrics(prev => ({
      ...prev,
      [selectedClient.id]: existingMetrics
    }));
    localStorage.setItem(storageKey, JSON.stringify(existingMetrics));
    
    setFormData({ ...formData, reportTitle: "", reportContent: "" });
    alert("Report added successfully!");
  }

  function handleLogoFileChange(event: ChangeEvent<HTMLInputElement>) {
    if (!selectedClient) {
      alert("Select a client before uploading a logo.");
      return;
    }

    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result as string;
      const logoKey = getLogoStorageKey(selectedClient.company_name);
      const metricsKey = `metrics_${normalizeCompanyKey(selectedClient.company_name)}`;
      const timestamp = new Date().toISOString();

      localStorage.setItem(logoKey, dataUrl);
      sessionStorage.removeItem(`logo_popup_seen_${logoKey}`);
      setLogoPreview(dataUrl);

      setClientMetrics((prev) => ({
        ...prev,
        [selectedClient.id]: {
          ...(prev[selectedClient.id] || {}),
          logoUrl: dataUrl,
          logoUpdatedAt: timestamp
        }
      }));

      const storedMetrics = localStorage.getItem(metricsKey);
      if (storedMetrics) {
        try {
          const parsed = JSON.parse(storedMetrics);
          parsed.logoUrl = dataUrl;
          parsed.logoUpdatedAt = timestamp;
          localStorage.setItem(metricsKey, JSON.stringify(parsed));
        } catch (error) {
          console.error("Failed to persist logo with metrics", error);
        }
      }

      alert("Logo saved. Clients will see this after they log in.");
    };
    reader.readAsDataURL(file);

    // Reset input so the same file can be chosen again if needed
    event.target.value = "";
  }

  function handleLogoClear() {
    if (!selectedClient) return;
    const logoKey = getLogoStorageKey(selectedClient.company_name);
    localStorage.removeItem(logoKey);
    sessionStorage.removeItem(`logo_popup_seen_${logoKey}`);
    setLogoPreview(null);

    const metricsKey = `metrics_${normalizeCompanyKey(selectedClient.company_name)}`;
    const storedMetrics = localStorage.getItem(metricsKey);
    if (storedMetrics) {
      try {
        const parsed = JSON.parse(storedMetrics);
        delete parsed.logoUrl;
        delete parsed.logoUpdatedAt;
        localStorage.setItem(metricsKey, JSON.stringify(parsed));
      } catch (error) {
        console.error("Failed to clear logo from metrics", error);
      }
    }

    setClientMetrics((prev) => ({
      ...prev,
      [selectedClient.id]: prev[selectedClient.id]
        ? { ...prev[selectedClient.id], logoUrl: undefined, logoUpdatedAt: undefined }
        : prev[selectedClient.id]
    }));
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="container py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-secondary">Admin Panel</p>
          <h1 className="mt-2 font-heading text-4xl font-semibold">Client Management</h1>
          <p className="mt-2 text-muted-foreground">Manage client accounts, profiles and data</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/calendar">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Marketing Calendar
            </Button>
          </Link>
          <Button onClick={() => setShowAddClient(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Client
          </Button>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          <Button variant="outline" onClick={handleClearAllClients} className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
            <X className="h-4 w-4" />
            Clear All
          </Button>
        </div>
      </div>

      {/* Add Client Modal */}
      {showAddClient && (
        <Card className="mb-8 p-6 border-2 border-primary">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Create New Client</h2>
            <button onClick={() => setShowAddClient(false)} className="p-2 hover:bg-muted rounded-full">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Company Name *</label>
              <Input
                value={newClient.company_name}
                onChange={(e) => setNewClient({ ...newClient, company_name: e.target.value })}
                placeholder="e.g., Ghion Communication"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Email *</label>
              <Input
                type="email"
                value={newClient.email}
                onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                placeholder="contact@company.com"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Telegram Username *</label>
              <Input
                value={newClient.telegram_username}
                onChange={(e) => setNewClient({ ...newClient, telegram_username: e.target.value })}
                placeholder="e.g., @brandaccount (without spaces)"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password *</label>
              <Input
                type="password"
                value={newClient.password}
                onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                placeholder="Create a password"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Confirm Password *</label>
              <Input
                type="password"
                value={newClient.confirmPassword}
                onChange={(e) => setNewClient({ ...newClient, confirmPassword: e.target.value })}
                placeholder="Confirm password"
              />
            </div>
          </div>
          <Button onClick={handleAddClient} disabled={creatingClient} className="mt-4 flex items-center gap-2">
            {creatingClient ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {creatingClient ? "Creating..." : "Create Client"}
          </Button>
        </Card>
      )}

      {/* Bot Sender */}
      <Card className="mb-8 p-6 border border-[#e5ecdf]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Telegram Bot Sender</h2>
            <p className="text-sm text-muted-foreground">Send a custom update to a client by Telegram username.</p>
          </div>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium">Telegram Username</label>
            <Input
              value={sendUsername}
              onChange={(e) => setSendUsername(e.target.value)}
              placeholder="@clientusername"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={sendMessage}
              onChange={(e) => setSendMessage(e.target.value)}
              placeholder="Type the update to send…"
              rows={3}
            />
          </div>
        </div>
        <Button
          onClick={handleSendTelegramMessage}
          disabled={sendingMessage}
          className="mt-4 flex items-center gap-2"
        >
          {sendingMessage ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          {sendingMessage ? "Sending..." : "Send Message"}
        </Button>
      </Card>

      <div className="grid gap-8 xl:grid-cols-[300px_1fr]">
        {/* Client List */}
        <Card className="h-fit p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5" />
            <h2 className="text-lg font-semibold">Clients ({clients.length})</h2>
          </div>
          <div className="space-y-2">
            {clients.map((client) => (
              <div
                key={client.id}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  selectedClient?.id === client.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <button
                  onClick={() => handleClientSelect(client)}
                  className="flex items-center gap-3 flex-1"
                >
                  <Building className="h-5 w-5" />
                  <div className="text-left">
                    <p className="font-medium text-sm">{client.company_name}</p>
                    <p className={`text-xs ${selectedClient?.id === client.id ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                      {client.email}
                    </p>
                  </div>
                </button>
                <button 
                  onClick={() => handleDeleteClient(client.id)}
                  className={`p-1 rounded ${selectedClient?.id === client.id ? "text-primary-foreground hover:bg-primary/80" : "text-muted-foreground hover:text-destructive"}`}
                  title="Delete client"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* Main Content Area */}
        <div>
          {!selectedClient ? (
            <Card className="p-12 text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">Select a Client</h3>
              <p className="text-muted-foreground">Choose a client from the list to view or update their data</p>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Client Header */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedClient.company_name}</h2>
                    <p className="text-muted-foreground">{selectedClient.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge>{selectedClient.status}</Badge>
                      <span className="text-sm text-muted-foreground">Created: {selectedClient.created_at}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      {showForm ? "View Data" : "Add Metrics"}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Credentials Info */}
              <Card className="p-4 bg-muted/50">
                <p className="text-sm font-medium">Login Credentials</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Company Name: <span className="font-mono font-medium">{selectedClient.company_name}</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Password: <span className="font-mono">••••••••</span>
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Share these credentials with the client to allow them to access their dashboard.
                </p>
              </Card>

              {/* Client Logo Upload */}
              <Card className="p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">Client Portal Logo</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Upload a logo that will pop up for the client immediately after they sign in.
                    </p>
                    {clientMetrics[selectedClient.id]?.logoUpdatedAt && (
                      <p className="text-xs text-muted-foreground">
                        Updated {new Date(clientMetrics[selectedClient.id].logoUpdatedAt!).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt={`${selectedClient.company_name} logo`}
                        className="max-h-20 max-w-[180px] rounded-lg border border-dashed border-lime-300 bg-white/60 object-contain p-3 shadow-sm"
                      />
                    ) : (
                      <div className="flex h-20 w-[180px] items-center justify-center rounded-lg border border-dashed border-muted-foreground/30 bg-muted/40 text-xs text-muted-foreground">
                        No logo yet
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-dashed border-primary/40 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/10">
                    <Upload className="h-4 w-4" />
                    <span>Upload logo</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoFileChange}
                    />
                  </label>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex items-center gap-2"
                    onClick={handleLogoClear}
                    disabled={!logoPreview}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove logo
                  </Button>
                </div>
              </Card>

              {/* Data Input Form */}
              {showForm && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Add Metrics for {selectedClient.company_name}</h3>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Reach & Engagement</p>
                      <label className="text-sm font-medium">Total Reach / Impressions</label>
                      <Input
                        type="number"
                        value={formData.impressions}
                        onChange={(e) => setFormData({ ...formData, impressions: e.target.value })}
                        placeholder="e.g. 684294"
                      />
                      <label className="text-sm font-medium">Clicks</label>
                      <Input
                        type="number"
                        value={formData.clicks}
                        onChange={(e) => setFormData({ ...formData, clicks: e.target.value })}
                        placeholder="Total clicks"
                      />
                      <label className="text-sm font-medium">Likes</label>
                      <Input
                        type="number"
                        value={formData.likes}
                        onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                        placeholder="Total likes"
                      />
                      <label className="text-sm font-medium">Shares</label>
                      <Input
                        type="number"
                        value={formData.shares}
                        onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                        placeholder="Total shares"
                      />
                      <label className="text-sm font-medium">Engagement Rate (%)</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.engagementRate}
                        onChange={(e) => setFormData({ ...formData, engagementRate: e.target.value })}
                        placeholder="e.g. 27"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Reach Δ %</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.reachChange}
                            onChange={(e) => setFormData({ ...formData, reachChange: e.target.value })}
                            placeholder="e.g. 12"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Engagement Δ pt</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.engagementChange}
                            onChange={(e) => setFormData({ ...formData, engagementChange: e.target.value })}
                            placeholder="e.g. 3"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Activity & Spend</p>
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-sm font-medium">Watch H</label>
                          <Input
                            type="number"
                            value={formData.watchedHours}
                            onChange={(e) => setFormData({ ...formData, watchedHours: e.target.value })}
                            placeholder="31"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Watch M</label>
                          <Input
                            type="number"
                            value={formData.watchedMinutes}
                            onChange={(e) => setFormData({ ...formData, watchedMinutes: e.target.value })}
                            placeholder="14"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Watch S</label>
                          <Input
                            type="number"
                            value={formData.watchedSeconds}
                            onChange={(e) => setFormData({ ...formData, watchedSeconds: e.target.value })}
                            placeholder="42"
                          />
                        </div>
                      </div>
                      <label className="text-sm font-medium">Ad Spend / Budget ($)</label>
                      <Input
                        type="number"
                        step="0.01"
                        value={formData.adSpend}
                        onChange={(e) => setFormData({ ...formData, adSpend: e.target.value })}
                        placeholder="e.g. 200"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-sm font-medium">Watch Δ %</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.watchedChange}
                            onChange={(e) => setFormData({ ...formData, watchedChange: e.target.value })}
                            placeholder="e.g. 22"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Ad Spend Δ %</label>
                          <Input
                            type="number"
                            step="0.1"
                            value={formData.adChange}
                            onChange={(e) => setFormData({ ...formData, adChange: e.target.value })}
                            placeholder="e.g. 6"
                          />
                        </div>
                      </div>
                      <label className="text-sm font-medium">Total Posts (7-day window)</label>
                      <Input
                        type="number"
                        value={formData.posts}
                        onChange={(e) => setFormData({ ...formData, posts: e.target.value })}
                        placeholder="Number of posts this week"
                      />
                      <div className="space-y-1">
                        <label className="text-sm font-medium">Week Ending</label>
                        <Input
                          type="date"
                          value={formData.periodEnd}
                          onChange={(e) => setFormData({ ...formData, periodEnd: e.target.value })}
                        />
                        <p className="text-xs text-muted-foreground">Data rolls up every 7 days (Mon–Sun by default).</p>
                      </div>
                    </div>
                  </div>
                  <Button onClick={handleSaveMetrics} className="mt-4 flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Metrics
                  </Button>

                  {/* Analytics configuration */}
                  <div className="mt-8 space-y-6">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <h4 className="text-lg font-semibold">Analytics Parameters</h4>
                      <div className="flex flex-wrap items-center gap-3">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Range</label>
                          <select
                            className="mt-1 w-32 rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            value={analyticsFormRange}
                            onChange={(e) => {
                              const nextRange = e.target.value as RangeKey;
                              setAnalyticsFormRange(nextRange);
                              const ranges = clientMetrics[selectedClient.id]?.analytics?.ranges;
                              if (ranges && ranges[nextRange]) {
                                setAnalyticsForm(ranges[nextRange]);
                              } else {
                                setAnalyticsForm({
                                  kpis: {
                                    impressions: 684294,
                                    impressionsChange: 12,
                                    engagement: 27,
                                    engagementChange: 3.4,
                                    clicks: 22900,
                                    clicksChange: 6.1,
                                    shares: 12500,
                                    sharesChange: -1.8
                                  },
                                  donut: { likes: 42, comments: 18, shares: 24, saves: 16 },
                                  platforms: { instagram: 82, facebook: 56, tiktok: 94 },
                                  content: { video: 92, carousel: 74, image: 58 },
                                  insights: [
                                    "Engagement increased by 18% this month.",
                                    "Video content generates 2x more engagement.",
                                    "Instagram contributes 65% of total reach.",
                                    "Consistent growth trend over the last 30 days."
                                  ],
                                  asOf: new Date().toISOString().slice(0, 16)
                                });
                              }
                            }}
                          >
                            <option value="7D">7 Days</option>
                            <option value="30D">30 Days</option>
                            <option value="90D">90 Days</option>
                            <option value="6M">6 Months</option>
                            <option value="1Y">1 Year</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Data Timestamp</label>
                          <Input
                            type="datetime-local"
                            value={analyticsForm.asOf || ""}
                            onChange={(e) =>
                              setAnalyticsForm((prev) => ({
                                ...prev,
                                asOf: e.target.value
                              }))
                            }
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 rounded-xl border border-lime-200 p-4">
                        <p className="text-sm font-semibold">KPI Cards</p>
                        {[
                          { key: "impressions", label: "Impressions", changeKey: "impressionsChange" },
                          { key: "engagement", label: "Engagement (%)", changeKey: "engagementChange" },
                          { key: "clicks", label: "Clicks", changeKey: "clicksChange" },
                          { key: "shares", label: "Shares", changeKey: "sharesChange" }
                        ].map((item) => (
                          <div key={item.key} className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">{item.label}</label>
                              <Input
                                type="number"
                                value={(analyticsForm.kpis as any)[item.key]}
                                onChange={(e) =>
                                  setAnalyticsForm((prev) => ({
                                    ...prev,
                                    kpis: { ...prev.kpis, [item.key]: Number(e.target.value) }
                                  }))
                                }
                                placeholder="Value"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Change %</label>
                              <Input
                                type="number"
                                step="0.1"
                                value={(analyticsForm.kpis as any)[item.changeKey]}
                                onChange={(e) =>
                                  setAnalyticsForm((prev) => ({
                                    ...prev,
                                    kpis: { ...prev.kpis, [item.changeKey]: Number(e.target.value) }
                                  }))
                                }
                                placeholder="+/- %"
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 rounded-xl border border-lime-200 p-4">
                        <p className="text-sm font-semibold">Engagement Breakdown (Donut)</p>
                        {[
                          { key: "likes", label: "Likes" },
                          { key: "comments", label: "Comments" },
                          { key: "shares", label: "Shares" },
                          { key: "saves", label: "Saves" }
                        ].map((item) => (
                          <div key={item.key}>
                            <label className="text-xs font-medium text-muted-foreground">{item.label}</label>
                            <Input
                              type="number"
                              value={(analyticsForm.donut as any)[item.key]}
                              onChange={(e) =>
                                setAnalyticsForm((prev) => ({
                                  ...prev,
                                  donut: { ...prev.donut, [item.key]: Number(e.target.value) }
                                }))
                              }
                              placeholder="% or value"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 rounded-xl border border-lime-200 p-4">
                        <p className="text-sm font-semibold">Platform Performance</p>
                        {[
                          { key: "instagram", label: "Instagram" },
                          { key: "facebook", label: "Facebook" },
                          { key: "tiktok", label: "TikTok" }
                        ].map((item) => (
                          <div key={item.key}>
                            <label className="text-xs font-medium text-muted-foreground">{item.label}</label>
                            <Input
                              type="number"
                              value={(analyticsForm.platforms as any)[item.key]}
                              onChange={(e) =>
                                setAnalyticsForm((prev) => ({
                                  ...prev,
                                  platforms: { ...prev.platforms, [item.key]: Number(e.target.value) }
                                }))
                              }
                              placeholder="Value"
                            />
                          </div>
                        ))}
                        <p className="text-xs text-muted-foreground">Tip: use comparable scores or percentages.</p>
                      </div>
                      <div className="space-y-2 rounded-xl border border-lime-200 p-4">
                        <p className="text-sm font-semibold">Content Performance</p>
                        {[
                          { key: "video", label: "Video" },
                          { key: "carousel", label: "Carousel" },
                          { key: "image", label: "Image" }
                        ].map((item) => (
                          <div key={item.key}>
                            <label className="text-xs font-medium text-muted-foreground">{item.label}</label>
                            <Input
                              type="number"
                              value={(analyticsForm.content as any)[item.key]}
                              onChange={(e) =>
                                setAnalyticsForm((prev) => ({
                                  ...prev,
                                  content: { ...prev.content, [item.key]: Number(e.target.value) }
                                }))
                              }
                              placeholder="Value"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2 rounded-xl border border-lime-200 p-4">
                      <p className="text-sm font-semibold">Key Insights (max 4)</p>
                      {analyticsForm.insights.map((insight, idx) => (
                        <Input
                          key={idx}
                          value={insight}
                          onChange={(e) =>
                            setAnalyticsForm((prev) => {
                              const next = [...prev.insights];
                              next[idx] = e.target.value;
                              return { ...prev, insights: next };
                            })
                          }
                          placeholder={`Insight ${idx + 1}`}
                        />
                      ))}
                      <p className="text-xs text-muted-foreground">These will show on the client analytics page.</p>
                    </div>

                    <div className="space-y-3 rounded-xl border border-lime-200 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Social Accounts</p>
                        <button
                          className="text-sm text-primary hover:underline"
                          onClick={() => {
                            if (!socialForm.username) return;
                            setSocialList((prev) => [...prev, socialForm]);
                            setSocialForm({
                              id: crypto.randomUUID(),
                              provider: socialForm.provider,
                              username: "",
                              link: "",
                              optimizedAt: new Date().toISOString().slice(0, 10),
                              followers: 0,
                              likes: 0,
                              comments: 0,
                              shares: 0,
                              posts: 0
                            });
                          }}
                        >
                          Add
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Platform</label>
                          <select
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            value={socialForm.provider}
                            onChange={(e) => setSocialForm((prev) => ({ ...prev, provider: e.target.value }))}
                          >
                            <option>Instagram</option>
                            <option>Twitter</option>
                            <option>Facebook</option>
                            <option>LinkedIn</option>
                            <option>Threads</option>
                            <option>TikTok</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Username / Handle</label>
                          <Input
                            value={socialForm.username}
                            onChange={(e) => setSocialForm((prev) => ({ ...prev, username: e.target.value }))}
                            placeholder="@handle"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Profile Link</label>
                          <Input
                            value={socialForm.link}
                            onChange={(e) => setSocialForm((prev) => ({ ...prev, link: e.target.value }))}
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Optimized Date</label>
                          <Input
                            type="date"
                            value={socialForm.optimizedAt}
                            onChange={(e) => setSocialForm((prev) => ({ ...prev, optimizedAt: e.target.value }))}
                          />
                        </div>
                        {["followers", "likes", "comments", "shares", "posts"].map((key) => (
                          <div key={key}>
                            <label className="text-xs font-medium text-muted-foreground">{key[0].toUpperCase() + key.slice(1)}</label>
                            <Input
                              type="number"
                              value={(socialForm as any)[key]}
                              onChange={(e) => setSocialForm((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                            />
                          </div>
                        ))}
                      </div>
                      {socialList.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Added Accounts</p>
                          <div className="space-y-2">
                            {socialList.map((acc) => (
                              <div key={acc.id} className="flex items-center justify-between rounded-lg border border-lime-200 px-3 py-2 text-sm">
                                <span className="font-semibold">{acc.provider}</span>
                                <span className="text-muted-foreground">@{acc.username}</span>
                                <span className="text-muted-foreground">{acc.followers.toLocaleString()} followers</span>
                                <button
                                  className="text-xs text-red-500 hover:underline"
                                  onClick={() => setSocialList((prev) => prev.filter((p) => p.id !== acc.id))}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 rounded-xl border border-lime-200 p-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Posts (by platform)</p>
                        <button
                          className="text-sm text-primary hover:underline"
                          onClick={() => {
                            if (!postForm.description || !postForm.platform) return;
                            setPostsList((prev) => [...prev, postForm]);
                            setPostForm({
                              id: crypto.randomUUID(),
                              platform: postForm.platform,
                              description: "",
                              postedAt: new Date().toISOString().slice(0, 10),
                              impressions: 0,
                              likes: 0,
                              comments: 0,
                              shares: 0,
                              saves: 0
                            });
                          }}
                        >
                          Add Post
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Platform</label>
                          <select
                            className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
                            value={postForm.platform}
                            onChange={(e) => setPostForm((prev) => ({ ...prev, platform: e.target.value }))}
                          >
                            <option>Instagram</option>
                            <option>Twitter</option>
                            <option>Facebook</option>
                            <option>LinkedIn</option>
                            <option>Threads</option>
                            <option>TikTok</option>
                            <option>Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground">Posted Date</label>
                          <Input
                            type="date"
                            value={postForm.postedAt}
                            onChange={(e) => setPostForm((prev) => ({ ...prev, postedAt: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-muted-foreground">Description</label>
                        <Textarea
                          value={postForm.description}
                          onChange={(e) => setPostForm((prev) => ({ ...prev, description: e.target.value }))}
                          placeholder="Post caption/description"
                          rows={2}
                        />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {["impressions", "likes", "comments", "shares", "saves"].map((key) => (
                          <div key={key}>
                            <label className="text-xs font-medium text-muted-foreground">{key[0].toUpperCase() + key.slice(1)}</label>
                            <Input
                              type="number"
                              value={(postForm as any)[key]}
                              onChange={(e) => setPostForm((prev) => ({ ...prev, [key]: Number(e.target.value) }))}
                            />
                          </div>
                        ))}
                      </div>
                      {postsList.length > 0 && (
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">Added Posts</p>
                          <div className="space-y-2">
                            {postsList.map((p) => (
                              <div key={p.id} className="rounded-lg border border-lime-200 px-3 py-2 text-sm">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold">{p.platform}</span>
                                  <span className="text-muted-foreground">{p.postedAt}</span>
                                </div>
                                <p className="text-muted-foreground line-clamp-1">{p.description}</p>
                                <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                                  <span>{p.impressions} impressions</span>
                                  <span>{p.likes} likes</span>
                                  <span>{p.comments} comments</span>
                                  <span>{p.shares} shares</span>
                                  <span>{p.saves} saves</span>
                                </div>
                                <button
                                  className="mt-1 text-xs text-red-500 hover:underline"
                                  onClick={() => setPostsList((prev) => prev.filter((item) => item.id !== p.id))}
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add Report Section */}
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium mb-4">Add New Report</h4>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium">Report Title</label>
                        <Input
                          value={formData.reportTitle}
                          onChange={(e) => setFormData({ ...formData, reportTitle: e.target.value })}
                          placeholder="e.g., Q1 2024 Performance"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Notes</label>
                        <Textarea
                          value={formData.reportContent}
                          onChange={(e) => setFormData({ ...formData, reportContent: e.target.value })}
                          placeholder="Additional notes..."
                          rows={3}
                        />
                      </div>
                      <Button variant="outline" onClick={handleAddReport} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Report
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Client Metrics Display */}
              {!showForm && clientMetrics[selectedClient.id] && (
                <div className="grid gap-6 md:grid-cols-3">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Impressions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].impressions.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].clicks.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Likes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].likes.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Shares</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].shares.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].posts}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Watch Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-semibold">
                        {formatHMS(clientMetrics[selectedClient.id].watchedSeconds)}
                      </p>
                      <p className="text-xs text-muted-foreground">hh:mm:ss (last 7 days)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Ad Spend / Budget</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${clientMetrics[selectedClient.id].adSpend.toLocaleString()}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{clientMetrics[selectedClient.id].engagementRate}%</p>
                    </CardContent>
                  </Card>
                  <Card className="md:col-span-3">
                    <CardHeader className="pb-1">
                      <CardTitle className="text-sm font-medium">Reporting Week</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">
                        {clientMetrics[selectedClient.id].periodStart} → {clientMetrics[selectedClient.id].periodEnd}
                      </p>
                      {clientMetrics[selectedClient.id].updatedAt && (
                        <p className="text-xs text-muted-foreground mt-1">
                          Last updated: {new Date(clientMetrics[selectedClient.id].updatedAt!).toLocaleString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Reports</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">
                        {clientMetrics[selectedClient.id].reports.length}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Client Reports List */}
              {!showForm && clientMetrics[selectedClient.id]?.reports?.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Reports</h3>
                  <div className="space-y-3">
                    {clientMetrics[selectedClient.id].reports.map((report: { title: string; date: string }, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{report.title}</p>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Marketing Calendar Snapshot */}
              {!showForm && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Marketing Calendar</h3>
                  {calendarEntries.length === 0 ? (
                    <p className="text-sm text-muted-foreground">No scheduled items yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {calendarEntries
                        .slice(0, 6)
                        .map((entry) => (
                          <div key={entry.id} className="flex flex-col gap-1 rounded-lg border border-lime-200/70 bg-[#f7fbf3] px-3 py-2 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[#14301f]">{entry.platform} — {entry.type}</span>
                              <span className="text-xs text-muted-foreground">{new Date(entry.date).toLocaleDateString()}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Content: {entry.contentType} • Status: {entry.status}
                            </div>
                            {entry.note && <p className="text-xs text-[#1f2a17]">Note: {entry.note}</p>}
                          </div>
                        ))}
                      {calendarEntries.length > 6 && (
                        <p className="text-xs text-muted-foreground">+{calendarEntries.length - 6} more scheduled items</p>
                      )}
                    </div>
                  )}
                  <div className="mt-4 text-sm">
                    <Link className="text-primary hover:underline" href="/dashboard/admin/calendar">
                      Open Marketing Calendar
                    </Link>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
