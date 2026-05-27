import React, { useEffect, useState } from "react";
import { SubmissionRecord } from "../types";
import { RefreshCw, CheckCircle2, ShieldAlert, FileText, Database, Info, Loader } from "lucide-react";

export const DeveloperDashboard: React.FC = () => {
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [envStatus, setEnvStatus] = useState({
    clientIdSet: false,
    clientSecretSet: false,
    stitchFrontendSet: false,
    appUrl: ""
  });

  const fetchState = async () => {
    setLoading(true);
    try {
      // 1. Fetch live in-memory submissions on the server
      const submissionsRes = await fetch("/api/dashboard/submissions");
      if (submissionsRes.ok) {
        const data = await submissionsRes.json();
        setSubmissions(data.submissions || []);
      }

      // 2. Query auth details
      const authUrlRes = await fetch("/api/auth/google/url");
      if (authUrlRes.ok) {
        const data = await authUrlRes.json();
        setEnvStatus({
          clientIdSet: !data.isDemoMode,
          clientSecretSet: !data.isDemoMode,
          stitchFrontendSet: !!window.location.origin,
          appUrl: window.location.origin
        });
      }
    } catch (e) {
      console.error("Dashboard state inquiry failure", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchState();
  }, []);

  return (
    <div className="relative pt-24 pb-16 bg-[#050505]" id="developer-dashboard">
      <div className="glow-green absolute w-[400px] h-[400px] top-[-10%] right-[-100px] opacity-15 blur-[100px] pointer-events-none rounded-full" />

      {/* Header section */}
      <header className="mb-12 flex justify-between items-center flex-wrap gap-4 max-w-7xl mx-auto">
        <div>
          <span className="inline-block px-3 py-1 mb-3 rounded-none border border-amber-500/20 bg-amber-500/5 text-amber-300 font-mono text-[9px] uppercase tracking-widest font-bold">
            System Diagnostics
          </span>
          <h1 className="font-display text-4xl text-white uppercase tracking-tight font-extrabold leading-none animate-fade-in">
            Diagnostics &amp; <span className="text-[#60de8c] font-black uppercase">Submissions</span>
          </h1>
          <p className="font-sans text-xs text-[#b0b4bd] mt-2 font-light">
            Review live active in-memory database submissions and coordinate verification sequences recursively.
          </p>
        </div>
        <button
          onClick={fetchState}
          disabled={loading}
          className="flex items-center gap-2 border border-white/10 hover:border-[#60de8c] hover:text-white px-5 py-3 rounded-none transition-all text-xs font-mono uppercase tracking-widest font-bold cursor-pointer text-[#b0b4bd] bg-[#0a0a0a]"
        >
          {loading ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
          <span>Sync State</span>
        </button>
      </header>

      {/* Environment Diagnostics Panel */}
      <section className="mb-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        <div className="bg-[#0a0a0a] p-6 rounded-none border border-white/10 flex items-start gap-4">
          <Info className="text-[#60de8c] w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-mono text-[10px] text-[#60de8c] uppercase tracking-widest font-bold mb-1">CORS &amp; Dynamic URL</h3>
            <p className="font-mono text-[10px] text-[#b0b4bd]/80 break-all leading-relaxed font-light">
              APP_URL: {envStatus.appUrl || "Determining..."}
            </p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-none border border-white/10 flex items-start gap-4">
          <Database className="text-[#60de8c] w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-mono text-[10px] text-[#60de8c] uppercase tracking-widest font-bold mb-1">State Persistence</h3>
            <p className="font-sans text-xs text-[#b0b4bd] leading-relaxed font-light">
              Active Server Store: <span className="text-[#60de8c] font-bold">{submissions.length} submissions</span> recorded in-memory.
            </p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] p-6 rounded-none border border-white/10 flex items-start gap-4">
          {envStatus.clientIdSet ? (
            <CheckCircle2 className="text-[#60de8c] w-5 h-5 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="text-amber-500 w-5 h-5 shrink-0 mt-0.5" />
          )}
          <div>
            <h3 className="font-mono text-[10px] text-[#60de8c] uppercase tracking-widest font-bold mb-1">Google Credentials</h3>
            <span className="font-mono text-[9px] tracking-widest block leading-none py-1.5 px-2 mt-1 rounded-none uppercase font-bold border border-dashed border-white/10 bg-black/45">
              {envStatus.clientIdSet ? (
                <span className="text-[#60de8c]">REAL OAuth Connected</span>
              ) : (
                <span className="text-amber-400">DEMO Sign-In Mode</span>
              )}
            </span>
          </div>
        </div>
      </section>

      {/* Live submissions list */}
      <section className="bg-[#0a0a0a] border border-white/10 rounded-none p-8 mb-12 max-w-7xl mx-auto">
        <h2 className="font-display uppercase tracking-tight font-extrabold text-2xl text-white mb-6">Submissions Received</h2>

        {submissions.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-white/10 rounded-none">
            <Database className="w-12 h-12 text-[#b0b4bd]/20 mx-auto mb-4" />
            <p className="font-sans text-xs text-[#b0b4bd]/60 font-light">
              No submissions recorded yet. Navigate to "Apply Now", connect, and click "Submit Application"!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {submissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-[#050505] border border-white/10 p-6 rounded-none hover:border-[#60de8c]/35 transition-colors relative"
              >
                {/* Email Transmit State badge */}
                <div className="absolute top-6 right-6 flex items-center gap-2">
                  <span className={`inline-block w-2 h-2 rounded-full ${submission.isRealEmailSent ? "bg-[#60de8c] animate-pulse" : "bg-purple-500"}`}></span>
                  <span className="font-mono text-[8px] text-[#b0b4bd] uppercase tracking-widest font-bold">
                    {submission.isRealEmailSent ? "Real Email Dispatched" : "Simulated/Logged Delivery"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#b0b4bd]/60 font-bold mb-1 block">Full Name &amp; Email</span>
                    <h3 className="font-display uppercase tracking-tight font-extrabold text-lg text-[#60de8c]">{submission.fullName}</h3>
                    <p className="font-mono text-xs text-[#b0b4bd]/80 mt-1">{submission.applicantEmail}</p>
                  </div>

                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#b0b4bd]/60 font-bold mb-1 block">Organization &amp; Website</span>
                    <p className="font-sans font-bold text-white text-sm uppercase tracking-wider">{submission.organization}</p>
                    <p className="font-mono text-xs text-[#b0b4bd]/80 mt-1">{submission.website}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="font-mono text-[9px] uppercase tracking-widest text-[#b0b4bd]/60 font-bold mb-1 block">Selected Services Required</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {submission.servicesRequired.length > 0 ? (
                      submission.servicesRequired.map(s => (
                        <span key={s} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-none text-[9px] font-mono text-[#60de8c] uppercase tracking-widest font-bold">
                          {s}
                        </span>
                      ))
                    ) : (
                      <span className="text-xs text-[#b0b4bd]/40 italic">None selected</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] rounded-none p-4 text-xs font-sans border border-white/10">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-[#60de8c] font-bold mb-2 block">Idea Pitch</span>
                    <p className="text-[#b0b4bd] leading-relaxed break-words whitespace-pre-line font-light">{submission.idea}</p>
                  </div>

                  <div className="bg-[#0a0a0a] rounded-none p-4 text-xs border border-white/10 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[#60de8c] font-bold mb-2 block">Attachments</span>
                      {submission.pitchDeckName ? (
                        <div className="flex items-center gap-2 text-white">
                          <FileText className="w-4 h-4 text-[#60de8c]" />
                          <span className="font-sans text-xs underline">{submission.pitchDeckName}</span>
                        </div>
                      ) : (
                        <span className="text-xs text-[#b0b4bd]/40 italic">No attachments uploaded</span>
                      )}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/10 text-[9px] font-mono text-[#b0b4bd]/60 uppercase tracking-widest">
                      ID: {submission.id} • Submitted: {new Date(submission.submittedAt).toLocaleTimeString()}
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
