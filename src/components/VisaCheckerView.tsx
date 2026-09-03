import React, { useState } from 'react';
import { DestinationData, Currency } from '../types';

interface VisaCheckerViewProps {
  destination: DestinationData;
  currency: Currency;
  onSelectDestination: (id: string) => void;
}

export const VisaCheckerView: React.FC<VisaCheckerViewProps> = ({
  destination,
  currency,
  onSelectDestination,
}) => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [dossierState, setDossierState] = useState<Record<string, boolean>>({
    'nv1': true,
    'nv2': true,
    'nv3': false,
    'nv4': false,
    'v1': true,
    'v2': true,
    'v3': true,
    'v4': false,
  });

  const [showParamModal, setShowParamModal] = useState(false);
  const [selectedNationality, setSelectedNationality] = useState(destination.passportNationality);
  const [selectedDestId, setSelectedDestId] = useState(destination.id);

  const toggleDossier = (id: string) => {
    setDossierState(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const visa = destination.visa;

  // Currency multiplier conversion simulation
  const formatCurrency = (usdAmount: number) => {
    switch (currency) {
      case 'EUR': return `€${Math.round(usdAmount * 0.92)}`;
      case 'GBP': return `£${Math.round(usdAmount * 0.78)}`;
      case 'JPY': return `¥${Math.round(usdAmount * 155)}`;
      case 'AUD': return `A$${Math.round(usdAmount * 1.52)}`;
      default: return `$${usdAmount} USD`;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Context Bar */}
      <div className="bg-white rounded-3xl p-5 md:p-6 shadow-xs border border-[#eff4ff] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-xs font-semibold text-[#74777e]">Passport:</span>
            <span className="text-xs font-bold text-[#0b1c30]">{destination.passportNationality}</span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#74777e]">arrow_forward</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#eff4ff] border border-[#dce9ff]">
            <span className="text-xs font-semibold text-[#74777e]">Destination:</span>
            <span className="text-xs font-bold text-[#0b1c30]">{destination.city} ({destination.airportCode.split(' ')[0]})</span>
            <span>{destination.countryFlag}</span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-[#74777e]">calendar_today</span>
          <span className="text-xs text-[#44474d] font-medium">{destination.travelDates}</span>
        </div>

        <button
          onClick={() => setShowParamModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-[#eff4ff] text-[#0c1e34] hover:bg-[#dce9ff] border border-[#dce9ff] transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          Change Parameters
        </button>
      </div>

      {/* Main Visa Status Banner */}
      <div className="bg-[#0c1e34] text-white rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#369571]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#002316] text-[#97f5ca] border border-[#005139] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#97f5ca] animate-pulse"></span>
              STATUS: {visa.status.toUpperCase()}
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {visa.summaryTitle}
            </h2>
            <p className="text-sm text-[#7686a1] mt-1 max-w-2xl">
              {visa.summarySubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-4 text-xs">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-[#97f5ca]">timelapse</span>
                <span>Max Stay: <strong className="text-white">{visa.durationDays} Days</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-[#97f5ca]">repeat</span>
                <span>Entry: <strong className="text-white">{visa.entryType}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg">
                <span className="material-symbols-outlined text-[16px] text-[#97f5ca]">payments</span>
                <span>Standard Fee: <strong className="text-white">{formatCurrency(visa.standardFeeUsd)}</strong></span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/15 lg:w-80 shrink-0">
            <div className="text-[11px] font-bold text-[#97f5ca] uppercase tracking-wider mb-2">
              Processing Telemetry
            </div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs text-white">Standard Issuance:</span>
              <span className="font-mono font-bold text-sm text-white">
                {visa.processingTimeStdHours === 0 ? 'Instant (Gate)' : `${visa.processingTimeStdHours} Hours`}
              </span>
            </div>
            {visa.processingTimeExpHours > 0 && (
              <div className="flex justify-between items-baseline mb-3">
                <span className="text-xs text-[#7686a1]">Expedited Channel:</span>
                <span className="font-mono text-xs text-[#97f5ca]">{visa.processingTimeExpHours} Hours</span>
              </div>
            )}
            <div className="text-[11px] text-[#7686a1] border-t border-white/10 pt-2 mt-2">
              Valid at 28 designated international airports and 5 major seaports.
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Content: Left (Timeline + Dossier + FAQs) & Right (Official Verification + Fees + Consulates) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Application Window & Deadlines Timeline */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Application Window & Critical Milestones
                </h3>
                <p className="text-xs text-[#4f5f78]">Recommended submission intervals before departure</p>
              </div>
              <span className="material-symbols-outlined text-[20px] text-[#0c1e34]">schedule</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {visa.applicationDeadlines.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border flex flex-col justify-between ${
                    step.status === 'passed'
                      ? 'bg-[#eff4ff] border-[#dce9ff]'
                      : step.status === 'recommended'
                      ? 'bg-[#002316] text-white border-[#005139]'
                      : step.status === 'limit'
                      ? 'bg-[#ffdad6]/40 border-[#ffdad6]'
                      : 'bg-white border-[#dce9ff]'
                  }`}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-80">
                    Stage 0{idx + 1}
                  </div>
                  <div className={`font-bold text-xs ${step.status === 'recommended' ? 'text-[#97f5ca]' : 'text-[#0b1c30]'}`}>
                    {step.label}
                  </div>
                  <div className={`text-[11px] font-mono mt-2 ${step.status === 'recommended' ? 'text-white' : 'text-[#74777e]'}`}>
                    {step.dateStr}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Required Dossier Documents Checklist */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30]">
                  Required Sovereign Dossier Documents
                </h3>
                <p className="text-xs text-[#4f5f78]">Ensure all items match passport bio-data before submission</p>
              </div>
              <div className="text-xs font-mono font-bold text-[#0c1e34] bg-[#eff4ff] px-2.5 py-1 rounded-full border border-[#dce9ff]">
                {visa.dossierItems.filter(i => dossierState[i.id]).length} / {visa.dossierItems.length} Ready
              </div>
            </div>

            <div className="space-y-3">
              {visa.dossierItems.map((item) => {
                const isChecked = !!dossierState[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleDossier(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isChecked
                        ? 'bg-[#eff4ff]/60 border-[#dce9ff]'
                        : 'bg-white border-[#c4c6cd]/50 hover:border-[#74777e]'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-1 accent-[#0c1e34] rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold text-xs ${isChecked ? 'text-[#0b1c30]' : 'text-[#0b1c30]'}`}>
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          isChecked ? 'bg-[#002316] text-[#97f5ca]' : 'bg-[#eff4ff] text-[#74777e]'
                        }`}>
                          {isChecked ? 'Verified' : 'Pending Verification'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#44474d] mt-1 leading-relaxed">
                        {item.requirement}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Frequently Addressed Regulations Accordion */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#0b1c30] mb-4">
              Frequently Addressed Consular Regulations
            </h3>

            <div className="space-y-2">
              {visa.faqs.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#dce9ff] rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between gap-3 bg-[#eff4ff]/40 hover:bg-[#eff4ff] transition-colors"
                    >
                      <span className="font-semibold text-xs text-[#0b1c30]">{faq.question}</span>
                      <span className="material-symbols-outlined text-[18px] text-[#74777e] shrink-0">
                        {isOpen ? 'expand_less' : 'expand_more'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-4 text-xs text-[#44474d] bg-white border-t border-[#eff4ff] leading-relaxed">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Column (1 col): Official Verification, Fees, Consular Support */}
        <div className="space-y-6">
          
          {/* Official Channel Verification */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <div className="flex items-center gap-2 text-[#369571] mb-2">
              <span className="material-symbols-outlined text-[20px]">security</span>
              <span className="text-xs font-bold uppercase tracking-wider">Official Portal Channel</span>
            </div>

            <p className="text-xs text-[#44474d] mb-4">
              Direct verification against official sovereign immigration databases. Never apply through non-accredited intermediaries.
            </p>

            <div className="p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff] mb-4">
              <span className="text-[10px] font-mono text-[#74777e] block">AUTHENTIC DOMAIN HOST</span>
              <span className="font-mono text-xs font-bold text-[#0c1e34]">{visa.portalHost}</span>
            </div>

            <div className="bg-[#ffdad6]/40 border border-[#ffdad6] p-3 rounded-xl mb-4 text-[11px] text-[#93000a]">
              ⚠️ <strong>Phishing Alert:</strong> Beware of spoofed agencies charging 300% markups. VoyagePass links directly to official government portals.
            </div>

            <a
              href={visa.officialPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#0c1e34] hover:bg-[#213145] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <span>Direct Access: Official Portal</span>
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </a>
          </div>

          {/* Official Fee Tariff */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30] mb-3">
              Official Sovereign Fee Tariff
            </h4>

            <div className="space-y-2.5">
              <div className="flex justify-between items-center p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                <div>
                  <span className="font-bold text-xs text-[#0b1c30] block">High Season (30 Days)</span>
                  <span className="text-[10px] text-[#74777e]">July through March departures</span>
                </div>
                <span className="font-mono font-bold text-sm text-[#0c1e34]">
                  {formatCurrency(visa.standardFeeUsd)}
                </span>
              </div>

              {visa.shoulderFeeUsd !== undefined && (
                <div className="flex justify-between items-center p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                  <div>
                    <span className="font-bold text-xs text-[#0b1c30] block">Shoulder Season (30 Days)</span>
                    <span className="text-[10px] text-[#74777e]">April through June departures</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#0c1e34]">
                    {formatCurrency(visa.shoulderFeeUsd)}
                  </span>
                </div>
              )}

              {visa.longTermFeeUsd !== undefined && (
                <div className="flex justify-between items-center p-3 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
                  <div>
                    <span className="font-bold text-xs text-[#0b1c30] block">1-Year Multiple Entry</span>
                    <span className="text-[10px] text-[#74777e]">Continuous stays up to 90 days</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-[#0c1e34]">
                    {formatCurrency(visa.longTermFeeUsd)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Consulate General Support */}
          <div className="bg-white rounded-3xl p-6 shadow-xs border border-[#eff4ff]">
            <h4 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#0b1c30] mb-3">
              Consulate General Support Missions
            </h4>

            <div className="space-y-3">
              {visa.embassies.map((emb, idx) => (
                <div key={idx} className="p-3 bg-[#eff4ff] rounded-2xl border border-[#dce9ff]">
                  <div className="font-bold text-xs text-[#0b1c30]">{emb.name}</div>
                  <p className="text-[11px] text-[#44474d] mt-1">{emb.address}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#0c1e34] mt-2 pt-2 border-t border-[#dce9ff]">
                    <span>{emb.phone}</span>
                    <span className="text-[#74777e]">{emb.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Parameter Change Modal */}
      {showParamModal && (
        <div className="fixed inset-0 z-50 bg-[#00040d]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#eff4ff]">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-[#0b1c30]">Adjust Consular Parameters</h3>
              <button
                onClick={() => setShowParamModal(false)}
                className="text-[#74777e] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0c1e34] mb-1.5">Destination</label>
                <select
                  value={selectedDestId}
                  onChange={(e) => setSelectedDestId(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#dce9ff] text-xs font-semibold bg-[#eff4ff]"
                >
                  <option value="tokyo">Tokyo, Japan (HND/NRT)</option>
                  <option value="reykjavik">Reykjavik, Iceland (KEF)</option>
                  <option value="kyoto">Kyoto & Osaka, Japan (KIX)</option>
                  <option value="newdelhi">New Delhi, India (DEL)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0c1e34] mb-1.5">Passport Nationality</label>
                <select
                  value={selectedNationality}
                  onChange={(e) => setSelectedNationality(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#dce9ff] text-xs font-semibold bg-[#eff4ff]"
                >
                  <option value="United States">United States</option>
                  <option value="Australia">Australia</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany / EU">Germany / EU</option>
                  <option value="Singapore">Singapore</option>
                </select>
              </div>

              <div className="pt-3 border-t border-[#eff4ff] flex gap-2">
                <button
                  onClick={() => setShowParamModal(false)}
                  className="flex-1 py-2.5 rounded-xl text-xs font-semibold border border-[#dce9ff] text-[#44474d]"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    onSelectDestination(selectedDestId);
                    setShowParamModal(false);
                  }}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-[#0c1e34] text-white"
                >
                  Apply & Recalculate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
