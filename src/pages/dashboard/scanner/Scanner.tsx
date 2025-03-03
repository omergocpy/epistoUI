// src/pages/scanner/Scanner.tsx
import React, { useEffect, useState } from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';
import { useNavigate } from 'react-router-dom';
import { SubmissionControllerApi, SubmitControllerApi, SubmitControllerApiAxiosParamCreator, VirtualMachineControllerApi } from '../../../api';
import axios from 'axios';

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
    alert("Lütfen bir dosya seçin");
    return;
  }

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
      // Content-Type belirtmeyin, tarayıcı otomatik olarak multipart/form-data ayarlar.
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
  })
  .catch(err => {
    console.error(
      scanType === "dynamic"
        ? "Dinamik tarama dosya yükleme hatası"
        : "Statik tarama dosya yükleme hatası",
      err
    );
    setUploadResponse("Dosya yüklemede hata oluştu.");
  });
};

  return (
    <div
      className="min-h-screen bg-[#231010] text-white"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <HeaderDashboard />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          {/* Dosya Yükle Bölümü */}
          <div className="flex flex-col gap-6 md:flex-row">
            
  <div className="md:w-1/2 p-4">
    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
      Dosya Yükle
    </h3>
    <p className="text-white text-base font-normal leading-normal pb-3">
      Bir dosyayı sürükleyip bırakın veya yüklemek için tıklayın.
    </p>
    <div className="relative flex items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-[#683131] bg-[#492222] text-white">
      <p className="pointer-events-none text-sm font-medium">
        Dosyalarınızı buraya bırakın
      </p>
             {/* API yanıtını kullanıcıya gösteriyoruz */}

      <input
        type="file"
        className="absolute inset-0 opacity-0 cursor-pointer"
        multiple
        accept="*/*"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            // Sadece ilk dosyayı alıyoruz. (Gerekirse çoklu dosya desteğini ekleyebilirsiniz.)
            setSelectedFile(e.target.files[0]);
          }
        }}
      />
    </div>
  </div>
  <div className="md:w-1/2 p-4">
    <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
      Tarama Seçenekleri
    </h3>
    <p className="text-white text-base font-normal leading-normal pb-3">
      Tarama Türünü Seçiniz.
    </p>
    <div className="flex flex-col gap-4">
      <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-6 bg-gradient-to-r from-[#2d2d2d] to-[#492222] shadow-lg transition-transform transform hover:scale-105">
        <input
          type="radio"
          name="taramaSecenekleri"
          className="hidden peer"
        />
        <div className="w-5 h-5 rounded-full border-2 border-[#683131] flex items-center justify-center peer-checked:border-[#f20d0d]">
          <div className="w-3 h-3 rounded-full bg-[#f20d0d] hidden peer-checked:block"></div>
        </div>
        <div className="flex flex-col">
          <p className="text-white text-sm font-medium">Dinamik Tarama</p>
          <p className="text-gray-300 text-xs">Gerçek zamanlı analiz</p>
        </div>
      </label>

      <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-6 bg-gradient-to-r from-[#2d2d2d] to-[#492222] shadow-lg transition-transform transform hover:scale-105">
        <input
          type="radio"
          name="taramaSecenekleri"
          className="hidden peer"
        />
        <div className="w-5 h-5 rounded-full border-2 border-[#683131] flex items-center justify-center peer-checked:border-[#f20d0d]">
          <div className="w-3 h-3 rounded-full bg-[#f20d0d] hidden peer-checked:block"></div>
        </div>
        <div className="flex flex-col">
          <p className="text-white text-sm font-medium">Statik Tarama</p>
          <p className="text-gray-300 text-xs">Gerçek zamanlı analiz</p>
        </div>
      </label>
    </div>
  </div>
</div>

{uploadResponse && (
          <div className="mt-4 p-3 bg-green-800 rounded">
            <p className="text-white">{uploadResponse}</p>
          </div>
        )}
          {/* Tarama Geçmişi Bölümü */}
          <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Makina Seçimi
          </h3>
          <div className="flex flex-wrap gap-6 mt-6">
            {machines.map((machine) => (
              <div
                key={machine.id}
                className={`flex w-full h-32 p-4 rounded-xl border-2 border-[#683131] transition-all duration-300 ease-in-out ${selectedMachine === machine.name ? 'bg-[#f20d0d]' : 'bg-[#492222]'
                  } hover:scale-105 hover:bg-[#6f2e2e]`}
                onClick={() => setSelectedMachine(machine.name)}
              >
                {/* Görsel Bölümü (Solda) */}
                <div className="w-full md:w-1/4 h-full">
                  <img
                    src="https://i0.wp.com/saitorhan.com/wp-content/uploads/2021/07/Windows.jpg?fit=740%2C479&ssl=1"
                    alt={`${machine.label} image`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                {/* Bilgiler Bölümü (Sağda) */}
                <div className="flex flex-col justify-between w-full md:w-3/4 pl-4">
                  <p className="text-white text-lg font-bold">{machine.platform}</p>
                  <p className="text-white text-sm">Durum: {machine.status}</p>
                  <p className="text-white text-sm">Mimari: {machine.arch}</p>
                  <p className="text-white text-sm">Ağ Arayüzü: {machine.label}</p>
                </div>
              </div>
            ))}
          </div>



          {/* Analizi Başlat Butonu */}
          <div className="w-full mt-5 mb-5">
          <button
              onClick={handleUpload}
              className="flex w-full h-10 px-4 bg-[#f20d0d] text-white text-sm font-bold leading-normal tracking-[0.015em] items-center justify-center overflow-hidden rounded-xl"
            >
              <span className="truncate">Analizi Başlat</span>
            </button>
          </div>
          <hr />
          {/* Tarama Geçmişi Bölümü */}
          <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
            Tarama Geçmişi
          </h3>
          <div className="px-4 py-3">
            <label className="flex flex-col min-w-40 h-12 w-full">
              <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
                <div className="text-[#cb9090] flex border-none bg-[#492222] items-center justify-center pl-4 rounded-l-xl">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                </div>
                <input
                  placeholder="Hash ile Ara"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#492222] focus:border-none h-full placeholder:text-[#cb9090] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                />
              </div>
            </label>
          </div>
          <div className="px-4 py-3">
            <div className="px-4 py-3">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-[#231010] text-white">
                  <thead className="bg-[#341818]">
                    <tr>
                      <th className="px-4 py-2">Task ID</th>
                      <th className="px-4 py-2">Category</th>
                      <th className="px-4 py-2">Platform</th>
                      <th className="px-4 py-2">MalScore</th>
                      <th className="px-4 py-2">MalStatus</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scans.map((item) => (
                      <tr key={item.id} className="border-t border-[#683131]">
                        <td className="px-4 py-2">{item.capeTaskId}</td>
                        <td className="px-4 py-2">{item.category || 'N/A'}</td>
                        <td className="px-4 py-2">{item.platform || 'N/A'}</td>
                        <td className="px-4 py-2">{item.malscore}</td>
                        <td className="px-4 py-2">{item.malstatus || 'N/A'}</td>
                        <td className="px-4 py-2">{item.status || 'N/A'}</td>
                        <td className="px-4 py-2 space-x-2">
                          <button
                            onClick={() => openModal(item)}
                            className="bg-[#492222] text-white px-3 py-1 rounded hover:bg-[#333] transition"
                          >
                            More Details
                          </button>
                          <button
                            onClick={() => handleDetailsClick(item.capeTaskId)}
                            className="bg-[#f20d0d] text-white px-3 py-1 rounded hover:bg-[#d10c0c] transition"
                          >
                            Scan Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {isModalOpen && selectedScan && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                  <div className="bg-red-900 rounded-lg shadow-2xl w-11/12 md:w-3/4 lg:w-1/2 overflow-y-auto max-h-[90vh]">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between bg-red-700 p-4 rounded-t-lg">
                      <h2 className="text-white text-xl font-bold">Additional Scan Details</h2>
                      <button onClick={closeModal} className="text-white text-2xl focus:outline-none">&times;</button>
                    </div>
                    {/* Modal Content */}
                    <div className="p-6 text-white space-y-4">
                      <div>
                        <strong>File Path:</strong>
                        <p className="truncate">{selectedScan.filePath || 'N/A'}</p>
                      </div>
                      <div>
                        <strong>File Hash:</strong>
                        <p className="truncate">{selectedScan.fileHash || 'N/A'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <strong>File Extension:</strong>
                          <p>{selectedScan.fileExtension || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Create Date:</strong>
                          <p>{selectedScan.createDate || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Version:</strong>
                          <p>{selectedScan.version || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Started:</strong>
                          <p>{selectedScan.started || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Ended:</strong>
                          <p>{selectedScan.ended || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Duration:</strong>
                          <p>{selectedScan.duration || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Package Name:</strong>
                          <p>{selectedScan.packageName || 'N/A'}</p>
                        </div>
                        <div>
                          <strong>Error:</strong>
                          <p>{selectedScan.error ? 'Yes' : 'No'}</p>
                        </div>
                        <div>
                          <strong>Downloaded Screenshots:</strong>
                          <p>{selectedScan.dowloadedScreenShots ? 'Yes' : 'No'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}


            </div>

          </div>
        </div>

        <div className="layout-content-container flex flex-col">
          <div className="flex h-full min-h-[700px] flex-col justify-between bg-[#231010] p-4">
            <div className="flex flex-col gap-4">
              <h1 className="text-white text-base font-medium leading-normal">Tarama Türleri</h1>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-white" data-icon="House" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Dashboard</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#492222]">
                  <div className="text-white" data-icon="File" data-size="24px" data-weight="fill">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,88V44l44,44Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Files</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-white" data-icon="Compass" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Pcap</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-white" data-icon="Globe" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM101.63,168h52.74C149,186.34,140,202.87,128,215.89,116,202.87,107,186.34,101.63,168ZM98,152a145.72,145.72,0,0,1,0-48h60a145.72,145.72,0,0,1,0,48ZM40,128a87.61,87.61,0,0,1,3.33-24H81.79a161.79,161.79,0,0,0,0,48H43.33A87.61,87.61,0,0,1,40,128ZM154.37,88H101.63C107,69.66,116,53.13,128,40.11,140,53.13,149,69.66,154.37,88Zm19.84,16h38.46a88.15,88.15,0,0,1,0,48H174.21a161.79,161.79,0,0,0,0-48Zm32.16-16H170.94a142.39,142.39,0,0,0-20.26-45A88.37,88.37,0,0,1,206.37,88ZM105.32,43A142.39,142.39,0,0,0,85.06,88H49.63A88.37,88.37,0,0,1,105.32,43ZM49.63,168H85.06a142.39,142.39,0,0,0,20.26,45A88.37,88.37,0,0,1,49.63,168Zm101.05,45a142.39,142.39,0,0,0,20.26-45h35.43A88.37,88.37,0,0,1,150.68,213Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">URLs</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-white" data-icon="Hash" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M224,88H175.4l8.47-46.57a8,8,0,0,0-15.74-2.86l-9,49.43H111.4l8.47-46.57a8,8,0,0,0-15.74-2.86L95.14,88H48a8,8,0,0,0,0,16H92.23L83.5,152H32a8,8,0,0,0,0,16H80.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,80,224a8,8,0,0,0,7.86-6.57l9-49.43H144.6l-8.47,46.57a8,8,0,0,0,6.44,9.3A7.79,7.79,0,0,0,144,224a8,8,0,0,0,7.86-6.57l9-49.43H208a8,8,0,0,0,0-16H163.77l8.73-48H224a8,8,0,0,0,0-16Zm-76.5,64H99.77l8.73-48h47.73Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Hashes</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-white" data-icon="Pi" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px"
                      fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M232,172a36,36,0,0,1-72,0V72H96V200a8,8,0,0,1-16,0V72H72a40,40,0,0,0-40,40,8,8,0,0,1-16,0A56.06,56.06,0,0,1,72,56H224a8,8,0,0,1,0,16H176V172a20,20,0,0,0,40,0,8,8,0,0,1,16,0Z">
                      </path>
                    </svg>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">IPs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterDashboard />
    </div>
  );
};

export default Scanner;
