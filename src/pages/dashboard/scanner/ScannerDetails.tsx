import React, { useEffect, useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import Accordion from '../../../components/Accordion';
import { useParams } from 'react-router-dom';
import { SubmissionControllerApi } from '../../../api';
const BASE_API_URL = "http://45.80.174.126:18081";

const ScannerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [scanDetails, setScanDetails] = useState<any>(null);
  const [scanScreenshotDetails, setscanScreenshotDetails] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!id) {
      console.error("No id provided in URL");
      return;
    }
    const submissionId = Number(id);
    const submissionApi = new SubmissionControllerApi();
    submissionApi.screenshots(submissionId)
      .then((response: any) => {
        const data = (response.data as any).data;
        setscanScreenshotDetails(data);
      })
      .catch((err: any) => {
        console.error("Submission API hatası:", err);
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      console.error("No id provided in URL");
      return;
    }
    const submissionId = Number(id);
    const submissionApi = new SubmissionControllerApi();
    submissionApi.detail(submissionId)
      .then((response: any) => {
        const data = (response.data as any).data;
        setScanDetails(data);
      })
      .catch((err: any) => {
        console.error("Submission API hatası:", err);
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
  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div data-tab-panel="overview">
            <h3 className="text-white text-lg font-bold mb-3">Risk ve Özeti</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#341818] border border-[#683131] rounded-xl p-4 flex flex-col gap-2">
                <p className="text-white text-base font-bold">Malscore</p>
                <p className="text-[#cb9090] text-sm">
                  {scanDetails?.malscore !== undefined ? scanDetails.malscore : "N/A"} 
                </p>
              </div>
              <div className="bg-[#341818] border border-[#683131] rounded-xl p-4 flex flex-col gap-2">
                <p className="text-white text-base font-bold">Malstatus</p>
                <p className="text-[#cb9090] text-sm">
                  {scanDetails?.malstatus || "N/A"}
                </p>
              </div>
              <div className="bg-[#341818] border border-[#683131] rounded-xl p-4 flex flex-col gap-2">
                <p className="text-white text-base font-bold">Suricata (#59)</p>
                <p className="text-[#cb9090] text-sm">
                  {scanDetails?.detections ? "Kural eşleşmesi (Network Exploit)" : "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      case 'file':
        return (
          <div data-tab-panel="file">
            <h3 className="text-white text-lg font-bold mb-3">Dosya Bilgisi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-sm text-[#cb9090] font-medium">Name</p>
                <p className="text-white text-base font-bold">
                  {scanDetails?.target?.file?.name || "N/A"}
                </p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-sm text-[#cb9090] font-medium">Size</p>
                <p className="text-white text-base font-bold">
                  {scanDetails?.target?.file?.size ? `${scanDetails.target.file.size} bytes` : "N/A"}
                </p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-sm text-[#cb9090] font-medium">CRC32</p>
                <p className="text-white text-base font-bold">
                  {scanDetails?.target?.file?.crc32 || "N/A"}
                </p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-sm text-[#cb9090] font-medium">MD5</p>
                <p className="text-white text-base font-bold">
                  {scanDetails?.target?.file?.md5 || "N/A"}
                </p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-sm text-[#cb9090] font-medium">SHA256</p>
                <p className="text-white text-base font-bold">
                  {scanDetails?.target?.file?.sha256 || "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      case 'pe':
        return (
          <div data-tab-panel="pe">
            <h3 className="text-white text-lg font-bold mb-3">PE Bilgisi</h3>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#341818] p-4 rounded-xl border border-[#683131]">
                  <p className="text-sm text-[#cb9090] font-medium">EntryPoint</p>
                  <p className="text-white text-base font-bold">
                    {scanDetails?.target?.file?.entryPoint || "N/A"}
                  </p>
                </div>
                <div className="bg-[#341818] p-4 rounded-xl border border-[#683131]">
                  <p className="text-sm text-[#cb9090] font-medium">ep_bytes</p>
                  <p className="text-white text-base font-bold">E9 4E 00 ...</p>
                </div>
                <div className="bg-[#341818] p-4 rounded-xl border border-[#683131]">
                  <p className="text-sm text-[#cb9090] font-medium">OS Version</p>
                  <p className="text-white text-base font-bold">6.3 (Win8.1+)</p>
                </div>
              </div>
              <Accordion title="Imports">
                <ul className="list-disc list-inside text-white text-sm">
                  <li>mscoree.dll</li>
                  <li>advapi32.dll</li>
                  <li>ws2_32.dll</li>
                </ul>
              </Accordion>
              <Accordion title="Exports">
                <ul className="list-decimal list-inside text-white text-sm">
                  <li>DllEntryPoint</li>
                  <li>PluginMain</li>
                </ul>
              </Accordion>
              <Accordion title="Sections">
                <div className="flex flex-col gap-2">
                  <div className="bg-[#492222] p-2 rounded-md text-white text-sm">
                    <p>Name: <span className="text-[#cb9090]">.text</span></p>
                    <p>Entropy: <span className="text-[#cb9090]">6.32</span></p>
                    <p>Characteristics: <span className="text-[#cb9090]">0x60000020</span></p>
                  </div>
                  <div className="bg-[#492222] p-2 rounded-md text-white text-sm">
                    <p>Name: <span className="text-[#cb9090]">.data</span></p>
                    <p>Entropy: <span className="text-[#cb9090]">5.12</span></p>
                    <p>Characteristics: <span className="text-[#cb9090]">0xC0000040</span></p>
                  </div>
                </div>
              </Accordion>
              <Accordion title="Resources">
                <div className="bg-[#492222] p-2 rounded-md text-white text-sm">
                  <p>Name: <span className="text-[#cb9090]">ICON</span></p>
                  <p>Language: <span className="text-[#cb9090]">1033</span></p>
                  <p>Entropy: <span className="text-[#cb9090]">4.22</span></p>
                </div>
              </Accordion>
              <Accordion title="VersionInfo">
                <div className="bg-[#492222] p-2 rounded-md text-white text-sm">
                  <p>Name: <span className="text-[#cb9090]">FileVersion</span></p>
                  <p>Value: <span className="text-[#cb9090]">2.0.0.1</span></p>
                </div>
                <div className="bg-[#492222] p-2 rounded-md text-white text-sm">
                  <p>Name: <span className="text-[#cb9090]">CompanyName</span></p>
                  <p>Value: <span className="text-[#cb9090]">Malicious Inc.</span></p>
                </div>
              </Accordion>
            </div>
          </div>
        );
      case 'yara':
        return (
          <div data-tab-panel="yara">
            <h3 className="text-white text-lg font-bold mb-3">Yara / Cape Yara Örnekleri</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">
                  Yara Kural: <span className="text-[#cb9090]">TrojanDownloader</span>
                </p>
                <p className="text-white text-sm">
                  Strings: <span className="text-[#cb9090]">["$a = 'http://malicious.com/dl'", "$b = 'PE'"]</span>
                </p>
                <p className="text-white text-sm">
                  Adresler: <span className="text-[#cb9090]">["0x405000", "0x405050"]</span>
                </p>
                <p className="text-white text-sm">
                  Meta.desc: <span className="text-[#cb9090]">İçerik indirerek sistemde çalıştıran trojan.</span>
                </p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">
                  Cape Yara: <span className="text-[#cb9090]">RansomCape</span>
                </p>
                <p className="text-white text-sm">
                  Cape Type: <span className="text-[#cb9090]">Ransom/Check</span>
                </p>
                <p className="text-white text-sm">
                  Strings: <span className="text-[#cb9090]">["cape_str_rand", "enc_key= 'AES256'"]</span>
                </p>
                <p className="text-white text-sm">
                  Addresses: <span className="text-[#cb9090]">["0x501000"]</span>
                </p>
              </div>
            </div>
          </div>
        );
      case 'network':
        return (
          <div data-tab-panel="network">
            <h3 className="text-white text-lg font-bold mb-3">Ağ Aktiviteleri</h3>
            <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
              <p className="text-white text-sm font-bold mb-2"></p>
              <p className="text-white text-sm">
                Hosts IP: <span className="text-[#cb9090]">8.8.8.8, 34.34.34.10 (ülke: US, tahmini)</span>
              </p>
              <p className="text-white text-sm">
                Dead Hosts: <span className="text-[#cb9090]">192.168.56.101 (LAN tarama başarısız)</span>
              </p>
              <p className="text-white text-sm">
                Domains: <span className="text-[#cb9090]">["malicious.com","example.org"]</span>
              </p>
            </div>
          </div>
        );
      case 'behavior':
        return (
          <div data-tab-panel="behavior">
            <h3 className="text-white text-lg font-bold mb-3">Davranış Kayıtları </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4 bg-[#231010] px-4 py-2 justify-between">
                <div className="flex flex-col">
                  <p className="text-white text-sm font-medium">
                    CreateProcess - powershell.exe
                  </p>
                  <p className="text-[#cb9090] text-xs">~1 saat önce</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-[#231010] px-4 py-2 justify-between">
                <div className="flex flex-col">
                  <p className="text-white text-sm font-medium">
                    CopyFile - C:\Users\Public\mal.dll
                  </p>
                  <p className="text-[#cb9090] text-xs">~45 dk önce</p>
                </div>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl mt-4">
                <p className="text-white text-sm font-bold">debug.log</p>
                <p className="text-[#cb9090] text-sm">
                  “RDP oturumu kapatıldı - normal sonlanma. 0x00.” 
                </p>
              </div>
            </div>
          </div>
        );
      case 'extra':
        return (
          <div data-tab-panel="extra">
            <h3 className="text-white text-lg font-bold mb-3">Ekstra Bilgiler</h3>
            <div className="flex flex-col gap-4">
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">Detection Family</p>
                <p className="text-[#cb9090] text-sm">Trojan.Win32.CryptoRansom</p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">.dotnet</p>
                <p className="text-[#cb9090] text-sm">No .NET metadata found</p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">die</p>
                <p className="text-[#cb9090] text-sm">PE32+ console - MS Visual C++ 2015</p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">selfextract.de4dot.extracted_files</p>
                <ul className="list-disc list-inside text-white text-sm">
                  <li>payload.dll</li>
                  <li>key.dat</li>
                </ul>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">procdump</p>
                <p className="text-[#cb9090] text-sm">“2 adet dump oluşturuldu.”</p>
              </div>
              <div className="bg-[#341818] p-4 border border-[#683131] rounded-xl">
                <p className="text-white text-base font-bold">CAPE[*].? ek verisi</p>
                <p className="text-[#cb9090] text-sm">Suspicious injection algılaması (CAPE - Example)</p>
              </div>
            </div>
          </div>
        );
      case 'screenshots':
        return (
          <div data-tab-panel="screenshots" className="py-6">
            <h3 className="text-white text-lg font-bold mb-3">Tarama Ekran Görüntüleri</h3>
            <p className="text-[#cb9090] text-sm mb-5">
              Burada tarama sırasında alınan ekran görüntüleri slayt gösterimi şeklinde sunulacaktır.
            </p>
            {scanScreenshotDetails && scanScreenshotDetails.length > 0 ? (
              <div className="relative w-full max-w-4xl mx-auto">
                <div className="overflow-hidden rounded-lg shadow-xl">
                  <img
                    src={`${BASE_API_URL}${scanScreenshotDetails[currentIndex].path}`}
                    alt={`Screenshot ${currentIndex + 1}`}
                    className="w-full h-auto object-cover transition-all duration-500 ease-in-out"
                  />
                </div>
                {/* Önceki butonu */}
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-red-700 hover:bg-red-800 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  &lt;
                </button>
                {/* Sonraki butonu */}
                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-red-700 hover:bg-red-800 text-white p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  &gt;
                </button>
                {/* İndikatör dotları */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {scanScreenshotDetails.map((_: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full focus:outline-none ${index === currentIndex ? 'bg-red-700' : 'bg-gray-400'
                        }`}
                    ></button>
                  ))}

                </div>
              </div>
            ) : (
              <p className="text-white">Ekran görüntüsü bulunamadı.</p>
            )}
          </div>
        );

        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#231010] text-white" style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}>
      <HeaderDashboard />
      <main className="px-10 py-5 flex-1 flex flex-col max-w-[1200px] mx-auto w-full">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div className="flex flex-col">
            <p className="text-white text-2xl font-bold">Rapor #{scanDetails?.info?.id || "20230101"}</p>
            <p className="text-[#cb9090] text-sm">(Örnek veri) - 2 saat önce gönderildi</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-white text-sm">
              Makine: <span className="text-[#cb9090]">{scanDetails?.info?.machine?.name || "Win10-64 "}</span>
            </p>
            <p className="text-white text-sm">
              Kategori: <span className="text-[#cb9090]">{scanDetails?.info?.category || "Suspicious .exe"}</span>
            </p>
            <button className="flex items-center justify-center h-8 px-4 rounded-xl bg-[#492222] text-white text-sm font-medium">
              Tekrar Analiz
            </button>
            <button
              onClick={handleDownloadJson}
              className="flex items-center justify-center h-8 px-4 rounded-xl bg-[#f20d0d] text-white text-sm font-medium"
            >
              JSON İndir
            </button>
          </div>
        </div>
        <div className="mt-4 border-b border-[#683131]">
          <div className="flex gap-6 text-[#cb9090]">
            <button
              className={`pb-2 border-b-2 ${activeTab === 'overview' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('overview')}
            >
              Genel Bakış
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'file' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('file')}
            >
              Dosya
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'pe' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('pe')}
            >
              PE Bilgisi
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'yara' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('yara')}
            >
              Yara &amp; Cape
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'network' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('network')}
            >
              Ağ
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'behavior' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('behavior')}
            >
              Davranış
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'extra' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('extra')}
            >
              Ekstra
            </button>
            <button
              className={`pb-2 border-b-2 ${activeTab === 'screenshots' ? 'border-b-[#f20d0d] text-white' : 'border-b-transparent text-[#cb9090]'}`}
              onClick={() => setActiveTab('screenshots')}
            >
              Ekran Görüntüleri
            </button>
          </div>
        </div>
        <div className="mt-4 flex-1">{renderTabContent()}</div>
      </main>
      <FooterDashboard />
    </div>
  );
};

export default ScannerDetails;
