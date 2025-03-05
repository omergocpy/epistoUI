// src/pages/scanner/Scanner.tsx
import React, { useEffect, useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import { useNavigate } from 'react-router-dom';
import { SubmissionControllerApi, SubmitControllerApi, SubmitControllerApiAxiosParamCreator, VirtualMachineControllerApi } from '../../../api';
import axios from 'axios';
import '../../../styles/MetaverseStyles.css';

const Scanner: React.FC = () => {
  const navigate = useNavigate();

  const [selectedMachine, setSelectedMachine] = useState<string>('SB_cuckoo1');
  const [machines, setMachines] = useState<any[]>([]);
  const [scans, setScans] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScan, setSelectedScan] = useState<any | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [scanType, setScanType] = useState<string>('dynamic');
  const [uploadResponse, setUploadResponse] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Makine listesini çekiyoruz.
  useEffect(() => {
    const vmApi = new VirtualMachineControllerApi();
    vmApi.getMachines()
      .then((response: any) => {
        // API yanıtı { data: { data: [...] } } şeklinde ise:
        setMachines(((response.data as any).data.data) as any[]);
      })
      .catch((err: any) => {
        console.error("Machine API hatası:", err);
      });
  }, []);

  // Tarama geçmişini çekiyoruz ve "Failed" olanları filtreliyoruz.
  useEffect(() => {
    const submissionApi = new SubmissionControllerApi();
    submissionApi.getComplatedSubmissions()
      .then((response: any) => {
        const data = (response.data as any).data || [];
        const filteredScans = data.filter((scan: any) => scan.malstatus !== "Failed");
        setScans(filteredScans);
      })
      .catch((err: any) => {
        console.error("Submission API hatası:", err);
      });
  }, []);

  // Modal açma/kapama fonksiyonları
  const openModal = (scan: any) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedScan(null);
    setIsModalOpen(false);
  };

  // Tarama listesindeki satıra tıklandığında id'yi route parametresi olarak gönderiyoruz.
  const handleDetailsClick = (id: number) => {
    navigate(`/scanner-details/${id}`);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadResponse("Lütfen bir dosya seçin");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    // API URL'si ve endpoint belirleniyor.
    const baseUrl = 'http://45.80.174.126:18081';
    const endpoint =
      scanType === "dynamic"
        ? `${baseUrl}/api/submit?machine=${selectedMachine}`
        : `${baseUrl}/api/submit/staticAnalyze?machine=${selectedMachine}`;

    // Axios ile dosya yükleme isteği yapıyoruz.
    axios.post(endpoint, formData, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 OPR/116.0.0.0'
      }
    })
    .then(response => {
      console.log(
        scanType === "dynamic"
          ? "Dinamik tarama dosya yükleme başarılı"
          : "Statik tarama dosya yükleme başarılı",
        response.data
      );
      // API'den gelen mesajı state'e atıyoruz.
      setUploadResponse(response.data.message);
      setIsUploading(false);
    })
    .catch(err => {
      console.error(
        scanType === "dynamic"
          ? "Dinamik tarama dosya yükleme hatası"
          : "Statik tarama dosya yükleme hatası",
        err
      );
      setUploadResponse("Dosya yüklemede hata oluştu.");
      setIsUploading(false);
    });
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

  return (
    <div className="min-h-screen bg-dark text-white font-rajdhani">
      <HeaderDashboard />

      {/* Particles container */}
      <div id="particles-container" className="fixed inset-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-10 py-8">
        {/* Ana Eylem Kartı - Hepsi bir arada başlık ve istatistikler */}
        <div className="glass rounded-2xl p-6 shadow-xl neon-border mb-8 bg-gradient-to-br from-dark-medium/80 to-dark-light/80">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col">
              <h2 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-primary-light to-secondary bg-clip-text text-transparent">
                Metaverse <span className="text-white">Sandbox</span>
              </h2>
              <p className="text-gray-300 mt-2 max-w-xl">
                Gelişmiş zararlı yazılım analiz platformu ile dosyalarınızı güvenle tarayın ve 
                tehditleri hızlıca tespit edin.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="glass-dark p-4 rounded-xl flex flex-col items-center min-w-[120px]">
                <p className="text-xs text-gray-400 mb-1">Toplam Analiz</p>
                <p className="text-2xl font-bold text-primary-light">{scans.length}</p>
              </div>
              <div className="glass-dark p-4 rounded-xl flex flex-col items-center min-w-[120px]">
                <p className="text-xs text-gray-400 mb-1">Kötücül</p>
                <p className="text-2xl font-bold text-secondary">
                  {scans.filter(scan => scan.malstatus === 'Malicious').length}
                </p>
              </div>
              <div className="glass-dark p-4 rounded-xl flex flex-col items-center min-w-[120px]">
                <p className="text-xs text-gray-400 mb-1">Sistemler</p>
                <p className="text-2xl font-bold text-blue-400">
                  {machines.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* İçerik Düzeni - Ana içerik ve sidebar yan yana yerine, birbirine entegre bir 3 sütunlu yapı */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Soldaki Menü Bölümü - Daraltılmış Menü */}
          <div className="glass rounded-2xl shadow-xl neon-border h-auto">
            <div className="flex flex-col p-6">
              <h3 className="text-xl font-orbitron font-bold mb-4 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Tarama Türleri
              </h3>
              
              <div className="flex flex-col gap-2">
                {/* Yeniden tasarlanmış dikey menü */}
                <div className="flex flex-col gap-4 mb-6">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-200 bg-dark-medium/40">
                    <div className="text-primary-light size-10 flex items-center justify-center bg-primary/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
                      </svg>
                    </div>
                    <p className="text-white font-medium">Dashboard</p>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-primary/20 transition-colors duration-200">
                    <div className="text-primary-light size-10 flex items-center justify-center bg-primary/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z"></path>
                      </svg>
                    </div>
                    <p className="text-white font-medium">Dosyalar</p>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-200 bg-dark-medium/40">
                    <div className="text-primary-light size-10 flex items-center justify-center bg-primary/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"></path>
                      </svg>
                    </div>
                    <p className="text-white font-medium">PCAP Analizi</p>
                  </a>
                  
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl hover:bg-primary/20 transition-colors duration-200 bg-dark-medium/40">
                    <div className="text-primary-light size-10 flex items-center justify-center bg-primary/10 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z"></path>
                      </svg>
                    </div>
                    <p className="text-white font-medium">URL Tarama</p>
                  </a>
                </div>
                
                {/* Dosya Yükleme Bölümü */}
                <div className="mt-4">
                  <h3 className="text-lg font-orbitron font-bold mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light mr-2">
                      <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                      <polyline points="13 2 13 9 20 9"></polyline>
                    </svg>
                    Dosya Yükle
                  </h3>
                  
                  <div className="cyber-scan relative flex items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-primary/30 bg-dark-light bg-opacity-30 text-white group transition-all duration-300 hover:border-primary/60 mb-4">
                    <div className="flex flex-col items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-primary-light mb-2 group-hover:scale-110 transition-transform duration-300">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <p className="pointer-events-none text-sm font-medium">
                        {selectedFile ? selectedFile.name : "Dosyalarınızı buraya bırakın"}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      multiple
                      accept="*/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setSelectedFile(e.target.files[0]);
                        }
                      }}
                    />
                  </div>
                  
                  {/* Tarama Seçenekleri - Yatay Radyo Butonları */}
                  <div className="flex gap-3 mb-4">
                    <div 
                      className={`flex-1 glass-dark rounded-xl p-2 text-center transition-all duration-300 cursor-pointer ${scanType === 'dynamic' ? 'border-2 border-primary bg-primary/20' : 'border border-primary/30'}`}
                      onClick={() => setScanType('dynamic')}
                    >
                      <input type="radio" id="dynamicScan" name="scanType" checked={scanType === 'dynamic'} onChange={() => setScanType('dynamic')} className="hidden" />
                      <label htmlFor="dynamicScan" className="cursor-pointer text-white font-medium text-sm">Dinamik</label>
                    </div>
                    
                    <div 
                      className={`flex-1 glass-dark rounded-xl p-2 text-center transition-all duration-300 cursor-pointer ${scanType === 'static' ? 'border-2 border-primary bg-primary/20' : 'border border-primary/30'}`}
                      onClick={() => setScanType('static')}
                    >
                      <input type="radio" id="staticScan" name="scanType" checked={scanType === 'static'} onChange={() => setScanType('static')} className="hidden" />
                      <label htmlFor="staticScan" className="cursor-pointer text-white font-medium text-sm">Statik</label>
                    </div>
                  </div>
                  
                  {/* Başlat Butonu */}
                  <button
                    onClick={handleUpload}
                    disabled={isUploading || !selectedFile}
                    className={`w-full flex justify-center items-center py-3 px-6 rounded-xl text-white font-bold font-orbitron ${isUploading || !selectedFile ? 'bg-gray-500' : 'bg-gradient-to-r from-primary to-secondary'} text-sm shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed`}
                  >
                    {isUploading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        İşleniyor...
                      </>
                    ) : (
                      'Analizi Başlat'
                    )}
                  </button>
                </div>
                
                {/* Upload Response Alert */}
                {uploadResponse && (
                  <div className="mt-4 p-4 bg-primary/20 border border-primary rounded-xl">
                    <p className="text-white text-sm">{uploadResponse}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Ortadaki Alan - Makine Seçimi */}
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-xl font-orbitron font-bold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                <rect x="9" y="9" width="6" height="6"></rect>
                <line x1="9" y1="1" x2="9" y2="4"></line>
                <line x1="15" y1="1" x2="15" y2="4"></line>
                <line x1="9" y1="20" x2="9" y2="23"></line>
                <line x1="15" y1="20" x2="15" y2="23"></line>
                <line x1="20" y1="9" x2="23" y2="9"></line>
                <line x1="20" y1="14" x2="23" y2="14"></line>
                <line x1="1" y1="9" x2="4" y2="9"></line>
                <line x1="1" y1="14" x2="4" y2="14"></line>
              </svg>
              Sanal Makina Seçimi
            </h3>
            
            {/* Makina Grid */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-dark-medium/20">
              {machines.map((machine) => (
                <div
                  key={machine.id}
                  className={`glass-dark rounded-xl overflow-hidden transition-all duration-300 cursor-pointer border ${selectedMachine === machine.name ? 'border-2 border-primary ring-2 ring-primary/30 bg-primary/10' : 'border-primary/20'}`}
                  onClick={() => setSelectedMachine(machine.name)}
                >
                  <div className="flex items-center p-4">
                    {/* Status Indicator */}
                    <div className="mr-4 relative">
                      <div className="size-16 rounded-lg overflow-hidden border border-primary/30">
                        <img
                          src="https://i0.wp.com/saitorhan.com/wp-content/uploads/2021/07/Windows.jpg?fit=740%2C479&ssl=1"
                          alt={machine.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-dark-medium to-transparent"></div>
                      </div>
                      <div className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-dark-medium ${machine.status === 'free' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    </div>
                    
                    {/* Machine Info */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-base font-bold text-primary-light">{machine.platform}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${machine.status === 'free' ? 'bg-green-900/30 text-green-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                          {machine.status === 'free' ? 'Kullanılabilir' : 'Meşgul'}
                        </span>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">{machine.label}</div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-dark-medium px-2 py-0.5 rounded-full text-gray-300">
                          {machine.arch}
                        </span>
                        <span className="text-xs bg-dark-medium px-2 py-0.5 rounded-full text-gray-300">
                          {machine.name}
                        </span>
                      </div>
                    </div>
                    
                    {/* Selection Indicator */}
                    {selectedMachine === machine.name && (
                      <div className="ml-3 text-primary-light">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sağ Sütun - Tarama Geçmişi */}
          <div className="glass rounded-2xl p-6 shadow-xl neon-border">
            <h3 className="text-xl font-orbitron font-bold mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-light">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                <polyline points="13 2 13 9 20 9"></polyline>
              </svg>
              Tarama Geçmişi 
              <span className="ml-2 bg-primary/20 text-primary-light text-xs px-2 py-1 rounded-full font-semibold">
                {scans.length}
              </span>
            </h3>
            
            {/* Arama Kutusu */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-primary-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                </svg>
              </div>
              <input type="text" placeholder="Hash ile Ara" className="w-full h-10 pl-10 pr-4 rounded-xl text-sm bg-dark-light border border-primary/30 text-white focus:border-primary/60 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all duration-200" />
            </div>
            
            {/* Taramalar - Card View */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-dark-medium/20">
              {scans.map((scan) => (
                <div key={scan.id} className="glass-dark rounded-xl border border-primary/10 overflow-hidden hover:border-primary/30 transition-all duration-300">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`size-3 rounded-full ${
                          scan.malstatus === 'Malicious' ? 'bg-red-500' : 
                          scan.malstatus === 'Suspicious' ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}></div>
                        <span className="font-medium text-primary-light">ID: {scan.capeTaskId}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        scan.malstatus === 'Malicious' ? 'bg-red-900/30 text-red-400' : 
                        scan.malstatus === 'Suspicious' ? 'bg-yellow-900/30 text-yellow-400' :
                        'bg-green-900/30 text-green-400'
                      }`}>
                        {scan.malstatus || 'N/A'}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs mb-3">
                      <div>
                        <span className="text-gray-400">Kategori:</span>
                        <span className="text-white ml-1">{scan.category || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Platform:</span>
                        <span className="text-white ml-1">{scan.platform || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Durum:</span>
                        <span className="text-white ml-1">{scan.status || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-gray-400">Skor:</span>
                        <div className="flex items-center mt-1">
                          <div className="w-8 h-1.5 bg-dark rounded-full overflow-hidden mr-1">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-red-500"
                              style={{ width: `${(scan.malscore / 10) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-white">{scan.malscore}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-primary/10">
                      <button
                        onClick={() => openModal(scan)}
                        className="text-primary-light text-xs hover:text-primary transition-colors duration-200"
                      >
                        Detaylar
                      </button>
                      <button
                        onClick={() => handleDetailsClick(scan.capeTaskId)}
                        className="bg-gradient-to-r from-primary to-secondary text-white text-xs px-3 py-1 rounded-lg hover:shadow-lg transition-all duration-200"
                      >
                        Rapor
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for More Details */}
      {isModalOpen && selectedScan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 px-4">
          <div className="glass rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-float">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-white text-xl font-orbitron">Detaylı Tarama Bilgisi</h2>
                <button onClick={closeModal} className="text-white hover:text-gray-200 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[70vh] cyber-grid">
              <div className="space-y-6">
                {/* File Info */}
                <div>
                  <h3 className="text-white text-lg font-orbitron mb-3 flex items-center">
                    <span className="mr-2 text-primary-light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </span>
                    Dosya Bilgileri
                  </h3>
                  
                  <div className="glass-dark rounded-xl p-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">Dosya Yolu:</span>
                        <p className="text-white truncate">{selectedScan.filePath || 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm block mb-1">Dosya Hash:</span>
                        <p className="text-white font-mono truncate text-sm">{selectedScan.fileHash || 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Info in Grid */}
                <div>
                  <h3 className="text-white text-lg font-orbitron mb-3 flex items-center">
                    <span className="mr-2 text-primary-light">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </span>
                    Ek Bilgiler
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Dosya Uzantısı</span>
                      <p className="text-white">{selectedScan.fileExtension || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Oluşturma Tarihi</span>
                      <p className="text-white">{selectedScan.createDate || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Versiyon</span>
                      <p className="text-white">{selectedScan.version || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Başlangıç</span>
                      <p className="text-white">{selectedScan.started || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Bitiş</span>
                      <p className="text-white">{selectedScan.ended || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Süre</span>
                      <p className="text-white">{selectedScan.duration || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Paket Adı</span>
                      <p className="text-white">{selectedScan.packageName || 'N/A'}</p>
                    </div>
                    <div className="glass-dark rounded-xl p-4">
                      <span className="text-gray-400 text-xs block mb-1">Durum</span>
                      <div className="flex items-center mt-1">
                        <div className={`w-3 h-3 rounded-full ${selectedScan.error ? 'bg-red-500' : 'bg-green-500'} mr-2`}></div>
                        <p className="text-white">{selectedScan.error ? 'Hata' : 'Başarılı'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-primary/30 flex justify-end">
              <button 
                onClick={() => handleDetailsClick(selectedScan.capeTaskId)}
                className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Detaylı Raporu Görüntüle
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterDashboard />
    </div>
  );
};

export default Scanner;