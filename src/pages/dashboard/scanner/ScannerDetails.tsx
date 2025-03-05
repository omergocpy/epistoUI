// src/pages/scanner/ScannerDetails.tsx
import React, { useEffect, useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import Accordion from '../../../components/Accordion';
import { useParams } from 'react-router-dom';
import { SubmissionControllerApi } from '../../../api';
import '../../../styles/MetaverseStyles.css';

const BASE_API_URL = "http://45.80.174.126:18081";

const ScannerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [scanDetails, setScanDetails] = useState<any>(null);
  const [scanScreenshotDetails, setScanScreenshotDetails] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      console.error("No id provided in URL");
      return;
    }
    
    setIsLoading(true);
    const submissionId = Number(id);
    const submissionApi = new SubmissionControllerApi();
    
    // Fetch details
    Promise.all([
      submissionApi.detail(submissionId),
      submissionApi.screenshots(submissionId)
    ])
    .then(([detailResponse, screenshotsResponse]) => {
      const detailData = (detailResponse.data as any).data;
      const screenshotsData = (screenshotsResponse.data as any).data;
      
      setScanDetails(detailData);
      setScanScreenshotDetails(screenshotsData);
      setIsLoading(false);
    })
    .catch((err: any) => {
      console.error("API hatası:", err);
      setIsLoading(false);
    });
  }, [id]);

  const handleDownloadJson = () => {
    if (!scanDetails) return;
    const dataStr = JSON.stringify(scanDetails, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `scanner-details-${id}.json`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const nextImage = () => {
    if (scanScreenshotDetails && scanScreenshotDetails.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % scanScreenshotDetails.length);
    }
  };

  const prevImage = () => {
    if (scanScreenshotDetails && scanScreenshotDetails.length > 0) {
      setCurrentIndex((prevIndex) =>
        (prevIndex - 1 + scanScreenshotDetails.length) % scanScreenshotDetails.length
      );
    }
  };

  // Particles Effect
  useEffect(() => {
    const createParticle = () => {
      const container = document.getElementById('particles-container');
      if (!container) return;

      const particle = document.createElement('div');
      
      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      
      // Random opacity
      const opacity = Math.random() * 0.3 + 0.1;
      
      // Random animation duration between 15s and 30s
      const duration = Math.random() * 15 + 15;
      
      // Set styles
      particle.style.cssText = `
        position: fixed;
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(to right, rgba(138, 43, 226, ${opacity}), rgba(176, 38, 255, ${opacity}));
        border-radius: 50%;
        top: ${posY}%;
        left: ${posX}%;
        pointer-events: none;
        z-index: -1;
        animation: float ${duration}s ease-in-out infinite;
        filter: blur(1px);
      `;
      
      container.appendChild(particle);
    };

    // Create multiple particles
    for (let i = 0; i < 30; i++) {
      createParticle();
    }
  }, []);

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="glass rounded-2xl p-8 text-center animate-pulse">
          <div className="flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light animate-spin mb-4">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
            </svg>
            <p className="text-white text-lg">Veri yükleniyor...</p>
          </div>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Risk ve Özeti
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-dark rounded-2xl p-6 neon-border cyber-scan">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white text-lg font-orbitron font-medium">Malscore</h4>
                  <div className="size-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold font-orbitron">
                    {scanDetails?.malscore !== undefined ? scanDetails.malscore : "N/A"}
                  </div>
                </div>
                <div className="h-3 bg-dark-medium rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary" 
                    style={{ width: `${(scanDetails?.malscore || 0) * 10}%` }}
                  ></div>
                </div>
                <p className="text-gray-400 text-sm mt-3">
                  {scanDetails?.malscore > 7 ? 'Tehlikeli seviyede yüksek tehdit skoru' : 
                   scanDetails?.malscore > 4 ? 'Orta seviye tehdit skoru' : 'Düşük tehdit skoru'}
                </p>
              </div>

              <div className="glass-dark rounded-2xl p-6 neon-border cyber-scan">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white text-lg font-orbitron font-medium">Durum</h4>
                  <div className={`py-1 px-3 rounded-full text-sm font-medium ${
                    scanDetails?.malstatus === 'Malicious' ? 'bg-red-900/30 text-red-400' : 
                    scanDetails?.malstatus === 'Suspicious' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-green-900/30 text-green-400'
                  }`}>
                    {scanDetails?.malstatus || "N/A"}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={
                    scanDetails?.malstatus === 'Malicious' ? 'text-red-400' : 
                    scanDetails?.malstatus === 'Suspicious' ? 'text-yellow-400' :
                    'text-green-400'
                  }>
                    {scanDetails?.malstatus === 'Malicious' ? (
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                    ) : (
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    )}
                  </svg>
                  <span className="text-white">
                    {scanDetails?.malstatus === 'Malicious' ? 'Zararlı Yazılım Tespit Edildi' : 
                     scanDetails?.malstatus === 'Suspicious' ? 'Şüpheli Davranış Tespit Edildi' :
                     'Zararlı Tespit Edilmedi'}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6 neon-border cyber-scan">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-white text-lg font-orbitron font-medium">Suricata</h4>
                  <div className="py-1 px-3 rounded-full bg-secondary/30 text-secondary-light text-sm font-medium">
                    #59 Eşleşme
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  {scanDetails?.detections ? "Network Exploit tespit edildi" : "Tespit edilmedi"}
                </p>
                <div className="mt-3 h-6 bg-dark-medium rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 text-xs text-primary-light/30 font-mono whitespace-nowrap overflow-hidden" style={{ animation: 'dataScroll 20s linear infinite' }}>
                    01101010 01011010 10101010 01010101 01010100 10101010 01010
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'file':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Dosya Bilgisi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Dosya Adı</span>
                  <span className="text-white text-lg font-medium">
                    {scanDetails?.target?.file?.name || "N/A"}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">Boyut</span>
                  <span className="text-white text-lg font-medium">
                    {scanDetails?.target?.file?.size ? `${(scanDetails.target.file.size / 1024).toFixed(2)} KB` : "N/A"}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">CRC32</span>
                  <span className="text-white text-lg font-medium font-mono">
                    {scanDetails?.target?.file?.crc32 || "N/A"}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">MD5</span>
                  <span className="text-white text-lg font-medium font-mono">
                    {scanDetails?.target?.file?.md5 || "N/A"}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6 col-span-1 md:col-span-2">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">SHA256</span>
                  <span className="text-white text-lg font-medium font-mono break-all">
                    {scanDetails?.target?.file?.sha256 || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-dark rounded-2xl p-6 mt-6">
              <h4 className="text-white text-lg font-orbitron font-medium mb-4">Dosya Analiz Özeti</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-dark-medium/50 rounded-xl p-4 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mb-2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                  </svg>
                  <span className="text-gray-400 text-xs">Tespit Oranı</span>
                  <span className="text-white text-lg font-medium">35/64</span>
                </div>
                <div className="bg-dark-medium/50 rounded-xl p-4 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mb-2">
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                  </svg>
                  <span className="text-gray-400 text-xs">Dosya Türü</span>
                  <span className="text-white text-lg font-medium">PE32 Executable</span>
                </div>
                <div className="bg-dark-medium/50 rounded-xl p-4 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mb-2">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                    <polyline points="17 6 23 6 23 12"></polyline>
                  </svg>
                  <span className="text-gray-400 text-xs">İlk Görülme</span>
                  <span className="text-white text-lg font-medium">2 Mart 2025</span>
                </div>
                <div className="bg-dark-medium/50 rounded-xl p-4 flex flex-col items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mb-2">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                  </svg>
                  <span className="text-gray-400 text-xs">Paketlenmiş</span>
                  <span className="text-white text-lg font-medium">UPX 3.96</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'pe':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              PE Bilgisi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">EntryPoint</span>
                  <span className="text-white text-lg font-medium font-mono">
                    {scanDetails?.target?.file?.entryPoint || "0x401200"}
                  </span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">ep_bytes</span>
                  <span className="text-white text-lg font-medium font-mono">E9 4E 00 ...</span>
                </div>
              </div>

              <div className="glass-dark rounded-2xl p-6">
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm mb-1">OS Version</span>
                  <span className="text-white text-lg font-medium">6.3 (Win8.1+)</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Accordion title="Imports" defaultOpen={true}>
                <div className="bg-dark-medium/70 rounded-xl p-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-primary-light">•</span>
                      <span className="text-white font-mono">mscoree.dll</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-light">•</span>
                      <span className="text-white font-mono">advapi32.dll</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary-light">•</span>
                      <span className="text-white font-mono">ws2_32.dll</span>
                    </li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="Exports">
                <div className="bg-dark-medium/70 rounded-xl p-4">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <span className="text-secondary">1.</span>
                      <span className="text-white font-mono">DllEntryPoint</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-secondary">2.</span>
                      <span className="text-white font-mono">PluginMain</span>
                    </li>
                  </ul>
                </div>
              </Accordion>

              <Accordion title="Sections">
                <div className="space-y-3">
                  <div className="bg-dark-medium/70 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono">.text</span>
                      <span className="py-1 px-2 rounded-md bg-primary/20 text-primary-light text-xs">CODE</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-400 text-xs">Entropy:</span>
                        <span className="text-white ml-1">6.32</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Size:</span>
                        <span className="text-white ml-1">0x1000</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Characteristics:</span>
                        <span className="text-white ml-1">0x60000020</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-dark-medium/70 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono">.data</span>
                      <span className="py-1 px-2 rounded-md bg-secondary/20 text-secondary text-xs">DATA</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <span className="text-gray-400 text-xs">Entropy:</span>
                        <span className="text-white ml-1">5.12</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Size:</span>
                        <span className="text-white ml-1">0x2000</span>
                      </div>
                      <div>
                        <span className="text-gray-400 text-xs">Characteristics:</span>
                        <span className="text-white ml-1">0xC0000040</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion title="Resources">
                <div className="bg-dark-medium/70 p-4 rounded-xl">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400 text-xs">Name:</span>
                      <span className="text-white ml-1">ICON</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Language:</span>
                      <span className="text-white ml-1">1033</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Entropy:</span>
                      <span className="text-white ml-1">4.22</span>
                    </div>
                  </div>
                </div>
              </Accordion>

              <Accordion title="VersionInfo">
                <div className="space-y-3">
                  <div className="bg-dark-medium/70 p-4 rounded-xl">
                    <div>
                      <span className="text-gray-400 text-xs">Name:</span>
                      <span className="text-white ml-1">FileVersion</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Value:</span>
                      <span className="text-white ml-1">2.0.0.1</span>
                    </div>
                  </div>
                  <div className="bg-dark-medium/70 p-4 rounded-xl">
                    <div>
                      <span className="text-gray-400 text-xs">Name:</span>
                      <span className="text-white ml-1">CompanyName</span>
                    </div>
                    <div>
                      <span className="text-gray-400 text-xs">Value:</span>
                      <span className="text-white ml-1">Malicious Inc.</span>
                    </div>
                  </div>
                </div>
              </Accordion>
            </div>
          </div>
        );

      case 'yara':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Yara &amp; Cape Kuralları
            </h3>
            
            <div className="glass-dark rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-lg font-orbitron font-medium">TrojanDownloader</h4>
                <span className="py-1 px-3 bg-red-900/20 text-red-400 rounded-full text-xs">Zararlı</span>
              </div>
              <div className="bg-dark-medium/70 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Strings:</span>
                  <div className="mt-1 p-2 bg-dark rounded-lg">
                    <code className="text-primary-light text-sm font-mono">["$a = 'http://malicious.com/dl'", "$b = 'PE'"]</code>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Adresler:</span>
                  <div className="mt-1 p-2 bg-dark rounded-lg">
                    <code className="text-primary-light text-sm font-mono">["0x405000", "0x405050"]</code>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Meta.desc:</span>
                  <p className="mt-1 text-white text-sm">İçerik indirerek sistemde çalıştıran trojan.</p>
                </div>
              </div>
            </div>
            
            <div className="glass-dark rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-white text-lg font-orbitron font-medium">RansomCape</h4>
                <span className="py-1 px-3 bg-red-900/20 text-red-400 rounded-full text-xs">CAPE Algılama</span>
              </div>
              <div className="bg-dark-medium/70 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Cape Type:</span>
                  <p className="mt-1 text-white text-sm">Ransom/AnyRun-Check</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Strings:</span>
                  <div className="mt-1 p-2 bg-dark rounded-lg">
                    <code className="text-primary-light text-sm font-mono">["cape_str_rand", "enc_key= 'AES256'"]</code>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Addresses:</span>
                  <div className="mt-1 p-2 bg-dark rounded-lg">
                    <code className="text-primary-light text-sm font-mono">["0x501000"]</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Ağ Aktiviteleri
            </h3>
            
            <div className="glass-dark rounded-2xl p-6">
              <div className="bg-dark-medium/70 p-4 rounded-xl space-y-3">
                <div>
                  <span className="text-gray-400 text-sm">Hosts IP:</span>
                  <p className="mt-1 text-white text-sm">
                    <span className="text-primary-light">8.8.8.8</span>, <span className="text-primary-light">34.34.34.10</span> (ülke: US, tahmini)
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Dead Hosts:</span>
                  <p className="mt-1 text-white text-sm">
                    <span className="text-red-400">192.168.56.101</span> (LAN tarama başarısız)
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Domains:</span>
                  <div className="mt-1 p-2 bg-dark rounded-lg">
                    <code className="text-primary-light text-sm font-mono">["malicious.com", "example.org"]</code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass-dark rounded-2xl p-6 mt-6">
              <h4 className="text-white text-lg font-orbitron font-medium mb-4">Ağ Trafiği Özeti</h4>
              <div className="bg-dark-medium/70 p-4 rounded-xl">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">TCP Bağlantıları</span>
                    <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-sm">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">UDP Paketleri</span>
                    <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-sm">45</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">DNS Sorguları</span>
                    <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-sm">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">HTTP Requests</span>
                    <span className="bg-primary/20 text-primary-light px-3 py-1 rounded-lg text-sm">6</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 bg-dark-medium/70 p-4 rounded-xl overflow-hidden relative cyber-scan">
                <h5 className="text-white text-sm font-medium mb-2">Ağ Trafiği Görselleştirme</h5>
                <div className="h-40 w-full bg-dark/80 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mx-auto mb-2 opacity-50">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <p className="text-primary-light/70 text-sm">Trafik Akış Grafiği</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'behavior':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Davranış Kayıtları
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="glass-dark rounded-2xl p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 bg-dark-medium/50 px-4 py-3 rounded-xl">
                    <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                        <path d="M20 10V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h4"></path>
                        <circle cx="17" cy="15" r="3"></circle>
                        <path d="m21 19-1.9-1.9"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-medium">
                        CreateProcess → powershell.exe
                      </p>
                      <p className="text-gray-400 text-xs">~1 saat önce</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-red-900/20 text-red-400 px-2 py-1 rounded-full text-xs">Kritik</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-dark-medium/50 px-4 py-3 rounded-xl">
                    <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                        <path d="m22 8-6 4 6 4V8Z"></path>
                        <rect x="2" y="6" width="14" height="12" rx="2"></rect>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-medium">
                        CopyFile → C:\Users\Public\mal.dll
                      </p>
                      <p className="text-gray-400 text-xs">~45 dk önce</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-red-900/20 text-red-400 px-2 py-1 rounded-full text-xs">Kritik</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 bg-dark-medium/50 px-4 py-3 rounded-xl">
                    <div className="size-8 flex items-center justify-center bg-primary/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                        <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <path d="M3 15h6"></path>
                        <path d="M3 18h6"></path>
                        <path d="M3 12h6"></path>
                      </svg>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-white text-sm font-medium">
                        Registry Key Created → HKCU\Software\Microsoft\Windows\Run
                      </p>
                      <p className="text-gray-400 text-xs">~40 dk önce</p>
                    </div>
                    <div className="ml-auto">
                      <span className="bg-yellow-900/20 text-yellow-400 px-2 py-1 rounded-full text-xs">Şüpheli</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <h4 className="text-white text-lg font-orbitron font-medium mb-4">Sistem Günlüğü</h4>
                <div className="bg-dark-medium/70 p-4 rounded-xl">
                  <p className="text-white text-sm font-bold">debug.log</p>
                  <div className="mt-2 p-3 bg-dark rounded-lg">
                    <p className="text-primary-light/80 text-sm font-mono">
                      [12:05:23] Process started: powershell.exe<br />
                      [12:05:25] Command executed: powershell -encodedCommand...<br />
                      [12:06:10] Network connection: 34.34.34.10:443<br />
                      [12:10:32] File created: C:\Users\Public\mal.dll<br />
                      [12:15:45] RDP oturumu kapatıldı - normal sonlanma. 0x00.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'extra':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Ekstra Bilgiler
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <path d="M17 18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v9Z"></path>
                    <path d="M20 6h-8a2 2 0 1 0 0 4h8a2 2 0 1 0 0-4Z"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">Detection Family</h4>
                </div>
                <p className="text-primary-light text-lg font-medium">Trojan.Win32.CryptoRansom</p>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <path d="M20 17a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3.9a2 2 0 0 1-1.69-.9l-.81-1.2a2 2 0 0 0-1.67-.9H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"></path>
                    <path d="M2 8v10a2 2 0 0 0 2 2h14"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">.dotnet</h4>
                </div>
                <p className="text-primary-light text-lg font-medium">No .NET metadata found</p>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <path d="M21 7v6h-6"></path>
                    <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">die</h4>
                </div>
                <p className="text-primary-light text-lg font-medium">PE32+ console - MS Visual C++ 2015</p>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M2 8h20"></path>
                    <path d="M6 16h.01"></path>
                    <path d="M10 16h.01"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">selfextract.de4dot.extracted_files</h4>
                </div>
                <ul className="space-y-2 mt-2">
                  <li className="flex items-center gap-2">
                    <span className="size-2 bg-primary-light rounded-full"></span>
                    <span className="text-white">payload.dll</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-2 bg-primary-light rounded-full"></span>
                    <span className="text-white">key.dat</span>
                  </li>
                </ul>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="m12 16 4-4"></path>
                    <path d="m8 12 4 4"></path>
                    <path d="m16 8-4 4"></path>
                    <path d="m8 12 4-4"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">procdump</h4>
                </div>
                <p className="text-primary-light text-lg font-medium">"2 adet dump oluşturuldu."</p>
              </div>
              
              <div className="glass-dark rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <path d="M14 4v10.54a4 4 0 1 1-4-3.54 3.5 3.5 0 0 1 2 .5"></path>
                  </svg>
                  <h4 className="text-white text-lg font-orbitron font-medium">CAPE[*].? ek verisi</h4>
                </div>
                <p className="text-primary-light text-lg font-medium">Suspicious injection algılaması (CAPE - Example)</p>
              </div>
            </div>
          </div>
        );

      case 'screenshots':
        return (
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-white text-xl font-orbitron font-bold mb-6 flex items-center">
              <span className="inline-block mr-2 size-5 bg-primary rounded-md"></span>
              Ekran Görüntüleri
            </h3>
            
            {scanScreenshotDetails && scanScreenshotDetails.length > 0 ? (
              <div className="flex flex-col">
                <div className="relative overflow-hidden rounded-xl border-2 border-primary/30 bg-dark-medium/40 shadow-lg mb-6">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={`${BASE_API_URL}${scanScreenshotDetails[currentIndex]?.path}`}
                      alt={`Screenshot ${currentIndex + 1}`}
                      className="w-full h-full object-contain transition-opacity duration-300"
                    />
                  </div>
                  
                  {/* Navigasyon butonları */}
                  <button
                    onClick={prevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-dark-light/60 backdrop-blur-sm text-white hover:bg-primary/60 transition-colors duration-300"
                    aria-label="Önceki görüntü"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 18-6-6 6-6"></path>
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 size-12 flex items-center justify-center rounded-full bg-dark-light/60 backdrop-blur-sm text-white hover:bg-primary/60 transition-colors duration-300"
                    aria-label="Sonraki görüntü"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                  
                  {/* Bilgi etiketi */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-dark/80 backdrop-blur-sm rounded-lg text-white text-sm">
                    Ekran Görüntüsü {currentIndex + 1} / {scanScreenshotDetails.length}
                  </div>
                </div>
                
                {/* Önizleme şeridi */}
                <div className="grid grid-cols-5 gap-2 mt-2">
                  {scanScreenshotDetails.map((screenshot: any, index: number) => (
                    <div
                      key={index}
                      className={`aspect-video rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ${
                        currentIndex === index 
                          ? 'ring-2 ring-primary scale-105 shadow-lg shadow-primary/30' 
                          : 'ring-1 ring-primary/30 opacity-70 hover:opacity-100'
                      }`}
                      onClick={() => setCurrentIndex(index)}
                    >
                      <img
                        src={`${BASE_API_URL}${screenshot.path}`}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Ekran görüntüsü detayları */}
                <div className="glass-dark rounded-xl p-4 mt-6">
                  <h4 className="text-white text-lg font-medium mb-2">
                    Ekran Görüntüsü Bilgileri
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-dark-medium/50 p-3 rounded-lg">
                      <span className="text-gray-400 text-xs block mb-1">Alınma Zamanı</span>
                      <span className="text-white">12:05:45</span>
                    </div>
                    <div className="bg-dark-medium/50 p-3 rounded-lg">
                      <span className="text-gray-400 text-xs block mb-1">Çözünürlük</span>
                      <span className="text-white">1280 x 720</span>
                    </div>
                    <div className="bg-dark-medium/50 p-3 rounded-lg">
                      <span className="text-gray-400 text-xs block mb-1">Pencere Başlığı</span>
                      <span className="text-white text-sm">Malware.exe - Çalışıyor</span>
                    </div>
                    <div className="bg-dark-medium/50 p-3 rounded-lg">
                      <span className="text-gray-400 text-xs block mb-1">İlişkili İşlem</span>
                      <span className="text-white">explorer.exe</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-dark rounded-xl p-8 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light/50 mx-auto mb-4">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="9" cy="9" r="2"></circle>
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                </svg>
                <p className="text-white text-lg mb-2">Ekran görüntüsü bulunamadı</p>
                <p className="text-gray-400 text-sm">Bu analiz için ekran görüntüsü kaydedilmemiş.</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white font-rajdhani">
      <HeaderDashboard />
      
      {/* Particles container */}
      <div id="particles-container" className="fixed inset-0 pointer-events-none"></div>

      <main className="container mx-auto px-4 py-8">
        {/* Report Header */}
        <div className="glass rounded-2xl p-6 mb-8 neon-border animate-float">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h1 className="text-white text-2xl md:text-3xl font-orbitron font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                Rapor #{scanDetails?.info?.id || id || "20230101"}
              </h1>
              <p className="text-gray-400 text-sm mt-1 font-rajdhani flex items-center">
                <span className="inline-block w-2 h-2 bg-primary-light rounded-full mr-2 animate-pulse"></span>
                {scanDetails?.createDate ? scanDetails.createDate : "2 saat önce"} gönderildi
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:gap-5">
              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="size-6 hexagon bg-primary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Makine</p>
                  <p className="text-sm text-white font-medium">
                    {scanDetails?.info?.machine?.name || "Win10-64"}
                  </p>
                </div>
              </div>

              <div className="glass-dark rounded-lg px-3 py-2 flex items-center gap-2">
                <div className="size-6 hexagon bg-secondary/30 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Kategori</p>
                  <p className="text-sm text-white font-medium">
                    {scanDetails?.info?.category || "Suspicious .exe"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="glass-dark rounded-lg px-4 py-2 text-sm font-medium text-white flex items-center gap-2 hover:bg-primary/20 transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                </svg>
                Tekrar Analiz
              </button>
              
              <button
                onClick={handleDownloadJson}
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-medium flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                JSON İndir
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="glass rounded-xl p-1 flex flex-wrap">
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'overview' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('overview')}
            >
              Genel Bakış
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'file' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('file')}
            >
              Dosya
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'pe' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('pe')}
            >
              PE Bilgisi
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'yara' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('yara')}
            >
              Yara &amp; Cape
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'network' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('network')}
            >
              Ağ
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'behavior' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('behavior')}
            >
              Davranış
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'extra' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('extra')}
            >
              Ekstra
            </button>
            <button 
              className={`tab-btn flex-grow py-3 px-4 rounded-lg ${activeTab === 'screenshots' ? 'text-white bg-primary/10' : 'text-gray-400'} hover:bg-primary/10 transition-all duration-300`} 
              onClick={() => setActiveTab('screenshots')}
            >
              Ekran Görüntüleri
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {renderTabContent()}
        </div>
      </main>

      <FooterDashboard />
    </div>
  );
};

export default ScannerDetails;