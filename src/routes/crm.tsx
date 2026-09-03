import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/lib/supabase";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/config";

export const Route = createFileRoute("/crm")({ component: Crm });
type Lead = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
  webinar_email_events: Array<{ sequence_key: string; status: string; sent_at: string | null }>;
};

function Crm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  async function load() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      setLoading(false);
      return;
    }
    const r = await fetch(`${SUPABASE_URL}/functions/v1/webinar-crm`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${session.access_token}` },
    });
    if (r.ok) {
      setLeads((await r.json()).leads);
      setAuthorized(true);
      setMessage("");
    } else {
      setAuthorized(false);
      setMessage("You are not authorized to view this CRM.");
    }
    setLoading(false);
  }
  useEffect(() => {
    void load();
    const { data } = supabase.auth.onAuthStateChange(() => void load());
    return () => data.subscription.unsubscribe();
  }, []);
  async function signIn(e: FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: window.location.origin + "/crm" },
    });
    setMessage(error ? error.message : "Check your email for the secure sign-in link.");
  }
  if (loading)
    return <main className="min-h-screen bg-background p-8 text-foreground">Loading…</main>;
  if (!authorized)
    return (
      <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
        <form onSubmit={signIn} className="card-cinematic w-full max-w-md rounded-xl p-8">
          <h1 className="font-display text-4xl uppercase">Webinar CRM</h1>
          <p className="mt-2 text-sm text-muted-foreground">Administrator access only.</p>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin email"
            className="mt-6 h-12 w-full rounded-md border border-white/15 bg-white/[0.04] px-4"
          />
          <button className="mt-4 h-12 w-full rounded-md bg-gold-gradient font-bold text-primary-foreground">
            Send secure sign-in link
          </button>
          {message && <p className="mt-4 text-sm">{message}</p>}
        </form>
      </main>
    );
  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs text-gold uppercase">Private dashboard</p>
            <h1 className="font-display text-5xl uppercase">Webinar Registrants</h1>
          </div>
          <button onClick={() => supabase.auth.signOut()} className="text-sm text-muted-foreground">
            Sign out
          </button>
        </div>
        <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
          {!leads.length && (
            <p className="p-8 text-center text-muted-foreground">No webinar registrations yet.</p>
          )}
          {!!leads.length && (
            <table className="w-full text-left text-sm">
              <thead className="bg-white/5">
                <tr>
                  {["Registrant", "Phone", "Registered", "Email sequence"].map((x) => (
                    <th className="p-4" key={x}>
                      {x}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.id} className="border-t border-white/10">
                    <td className="p-4">
                      <b>
                        {l.first_name} {l.last_name}
                      </b>
                      <br />
                      <span className="text-muted-foreground">{l.email}</span>
                    </td>
                    <td className="p-4">{l.phone}</td>
                    <td className="p-4">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="p-4">
                      {l.webinar_email_events.map((e) => (
                        <div key={e.sequence_key}>
                          <span className="text-gold">{e.sequence_key.replaceAll("_", " ")}</span>:{" "}
                          {e.status}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
