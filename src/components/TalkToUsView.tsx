import React, { useEffect, useState } from 'react';

// Declaration for Disqus global object
declare global {
  interface Window {
    disqus_config?: () => void;
    DISQUS?: {
      reset: (options: {
        reload: boolean;
        config?: (this: {
          page: {
            url: string;
            identifier: string;
            title?: string;
          };
        }) => void;
      }) => void;
    };
  }
}

// Real fixed values for Disqus configuration
const DISQUS_PAGE_URL = 'https://travel-advisory-1.disqus.com/talk-to-us';
const DISQUS_PAGE_IDENTIFIER = 'travel-advisory-talk-to-us';

interface TalkToUsViewProps {
  onNavigateToView?: (view: any) => void;
}

export const TalkToUsView: React.FC<TalkToUsViewProps> = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const configureAndLoadDisqus = () => {
    // Fixed canonical URL and page identifier configuration function
    const disqusConfigFn = function (this: { page: { url: string; identifier: string; title?: string } }) {
      this.page.url = DISQUS_PAGE_URL;
      this.page.identifier = DISQUS_PAGE_IDENTIFIER;
      this.page.title = 'Talk to Us - VoyagePass Travel Advisory & Consular Forum';
    };

    if (window.DISQUS) {
      // In a SPA, when navigating back to this tab, window.DISQUS is already present on the window object.
      // Calling DISQUS.reset re-mounts and loads the discussion into the newly rendered #disqus_thread element.
      try {
        window.DISQUS.reset({
          reload: true,
          config: disqusConfigFn,
        });
        setIsLoaded(true);
        setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      } catch (err) {
        console.error('Failed to reset Disqus instance:', err);
      }
    } else {
      // First-time load: assign global configuration and append embed.js script
      window.disqus_config = disqusConfigFn;

      const embedScriptId = 'disqus-embed-script';
      let script = document.getElementById(embedScriptId) as HTMLScriptElement | null;

      if (!script) {
        script = document.createElement('script');
        script.id = embedScriptId;
        script.src = 'https://travel-advisory-1.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        script.async = true;
        script.onload = () => {
          setIsLoaded(true);
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        };
        (document.head || document.body).appendChild(script);
      } else {
        // Script tag was already injected, listen for completion or call reset
        script.addEventListener('load', () => {
          if (window.DISQUS) {
            window.DISQUS.reset({
              reload: true,
              config: disqusConfigFn,
            });
            setIsLoaded(true);
          }
        });
      }
    }

    // Ensure count.js script is included
    const countScriptId = 'dsq-count-scr';
    if (!document.getElementById(countScriptId)) {
      const countScript = document.createElement('script');
      countScript.id = countScriptId;
      countScript.src = '//travel-advisory-1.disqus.com/count.js';
      countScript.async = true;
      (document.head || document.body).appendChild(countScript);
    }
  };

  useEffect(() => {
    configureAndLoadDisqus();
  }, []);

  const handleManualRefresh = () => {
    configureAndLoadDisqus();
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#eff4ff] relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] border border-[#dce9ff] text-xs font-bold text-[#0c1e34] mb-3">
              <span className="material-symbols-outlined text-[16px] text-[#fe875d]">forum</span>
              <span>Traveler Community & Inquiries</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#0b1c30] tracking-tight">
              Talk to Us
            </h1>
            <p className="text-sm text-[#44474d] mt-2 leading-relaxed">
              Have questions about consular regulations, eVisa wait times, customs declarations, or airport transit procedures? Leave your comment or field report below to connect with our advisory team and fellow international travelers.
            </p>

            {/* Quick Discussion Topics */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
              {[
                { label: 'Visa & Entry Clearance', icon: 'verified_user' },
                { label: 'Airport Transit & Layover', icon: 'flight_takeoff' },
                { label: 'Bilateral Exemptions', icon: 'handshake' },
                { label: 'Customs & Border Control', icon: 'shield' },
              ].map((topic) => (
                <div
                  key={topic.label}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium bg-[#f8f9ff] text-[#4f5f78] border border-[#eff4ff]"
                >
                  <span className="material-symbols-outlined text-[14px] text-[#0c1e34]">{topic.icon}</span>
                  <span>{topic.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Telemetry Status & Manual Reload Action */}
          <div className="bg-[#f8f9ff] p-4 rounded-2xl border border-[#dce9ff] shrink-0 flex flex-col gap-2 min-w-[240px]">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#74777e]">Community Forum:</span>
              <span className="flex items-center gap-1 font-mono font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                Connected
              </span>
            </div>

            <div className="text-[11px] text-[#74777e] font-mono flex items-center justify-between">
              <span>Channel:</span>
              <span className="text-[#0b1c30]">travel-advisory-1</span>
            </div>

            <div className="text-[11px] text-[#74777e] font-mono flex items-center justify-between">
              <span>Thread ID:</span>
              <span className="text-[#0b1c30] truncate max-w-[130px]" title={DISQUS_PAGE_IDENTIFIER}>
                {DISQUS_PAGE_IDENTIFIER}
              </span>
            </div>

            <div className="text-[11px] text-[#74777e] font-mono flex items-center justify-between">
              <span>Last Synced:</span>
              <span className="text-[#0b1c30]">{lastRefreshed}</span>
            </div>

            <button
              onClick={handleManualRefresh}
              className="mt-2 w-full py-2 px-3 rounded-xl bg-[#0c1e34] hover:bg-[#162f50] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">refresh</span>
              Reload Discussion
            </button>
          </div>
        </div>
      </div>

      {/* Community Guidelines Card */}
      <div className="bg-gradient-to-r from-[#eff4ff] to-[#f8f9ff] rounded-2xl p-4 border border-[#dce9ff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#44474d]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0c1e34] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[16px]">info</span>
          </div>
          <div>
            <span className="font-bold text-[#0b1c30]">Traveler Advisory Protocol: </span>
            Please avoid posting sensitive personal information such as full passport numbers or booking confirmation codes in public threads.
          </div>
        </div>
        <div className="shrink-0 text-[11px] font-mono text-[#74777e]">
          Disqus Integration · Real-Time
        </div>
      </div>

      {/* Disqus Embed Container Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xs border border-[#eff4ff]">
        <div className="mb-4 pb-3 border-b border-[#eff4ff] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#0c1e34]">chat_bubble</span>
            <h3 className="font-bold text-sm text-[#0b1c30]">Discussion & Inquiries</h3>
          </div>
          <span className="text-xs text-[#74777e]">Powered by Disqus</span>
        </div>

        {/* Embedded Disqus Thread */}
        <div className="min-h-[350px]">
          <div id="disqus_thread"></div>
          <noscript>
            Please enable JavaScript to view the{' '}
            <a href="https://disqus.com/?ref_noscript" className="text-blue-600 underline">
              comments powered by Disqus.
            </a>
          </noscript>
        </div>
      </div>
    </div>
  );
};
