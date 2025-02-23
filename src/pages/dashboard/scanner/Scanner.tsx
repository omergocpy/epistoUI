// src/pages/scanner/Scanner.tsx
import React from 'react';
import HeaderDashboard from '../../../components/HeaderDashboard';
import FooterDashboard from '../../../components/FooterDashboard';

const Scanner: React.FC = () => {
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
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  multiple
                  accept="*/*"
                />
              </div>
            </div>
            {/* Tarama Seçenekleri Bölümü */}
            <div className="md:w-1/2 p-4">
              <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                Tarama Seçenekleri
              </h3>
              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-4">
                  <input
                    type="radio"
                    className="h-5 w-5 border-2 border-[#683131] bg-transparent checked:border-[#f20d0d] checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox=%270%200%2016%2016%27%20fill=%27rgb(242,13,13)%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle%20cx=%278%27%20cy=%278%27%20r=%273%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0"
                    name="taramaSecenekleri"
                    defaultChecked
                  />
                  <div className="flex grow flex-col">
                    <p className="text-white text-sm font-medium leading-normal">
                      Zorunlu Tarama
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-4">
                  <input
                    type="radio"
                    className="h-5 w-5 border-2 border-[#683131] bg-transparent checked:border-[#f20d0d] checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox=%270%200%2016%2016%27%20fill=%27rgb(242,13,13)%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle%20cx=%278%27%20cy=%278%27%20r=%273%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0"
                    name="taramaSecenekleri"
                  />
                  <div className="flex grow flex-col">
                    <p className="text-white text-sm font-medium leading-normal">
                      Öncelikli Tarama
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-4">
                  <input
                    type="radio"
                    className="h-5 w-5 border-2 border-[#683131] bg-transparent checked:border-[#f20d0d] checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox=%270%200%2016%2016%27%20fill=%27rgb(242,13,13)%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle%20cx=%278%27%20cy=%278%27%20r=%273%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0"
                    name="taramaSecenekleri"
                  />
                  <div className="flex grow flex-col">
                    <p className="text-white text-sm font-medium leading-normal">
                      Derinlemesine Tarama
                    </p>
                  </div>
                </label>
                <label className="flex items-center gap-4 rounded-xl border border-solid border-[#683131] p-4">
                  <input
                    type="radio"
                    className="h-5 w-5 border-2 border-[#683131] bg-transparent checked:border-[#f20d0d] checked:bg-[url('data:image/svg+xml,%3csvg%20viewBox=%270%200%2016%2016%27%20fill=%27rgb(242,13,13)%27%20xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle%20cx=%278%27%20cy=%278%27%20r=%273%27/%3e%3c/svg%3e')] focus:outline-none focus:ring-0 focus:ring-offset-0"
                    name="taramaSecenekleri"
                  />
                  <div className="flex grow flex-col">
                    <p className="text-white text-sm font-medium leading-normal">
                      Hızlı Tarama
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {/* Analizi Başlat Butonu */}
          <div className="flex px-4 py-3">
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#f20d0d] text-white text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="truncate">Analizi Başlat</span>
            </button>
          </div>
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
            <div className="flex overflow-hidden rounded-xl border border-[#683131] bg-[#231010]">
              <table className="flex-1">
                <thead>
                  <tr className="bg-[#341818]">
                    <th className="table-col-120 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                      Dosya
                    </th>
                    <th className="table-col-240 px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                      Tür
                    </th>
                    <th className="table-col-360 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                      Durum
                    </th>
                    <th className="table-col-480 px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                      Analiz Süresi
                    </th>
                    <th className="table-col-600 px-4 py-3 text-left text-white w-60 text-[#cb9090] text-sm font-medium leading-normal">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-t-[#683131]">
                    <td className="table-col-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                      eicar.com
                    </td>
                    <td className="table-col-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#492222] text-white text-sm font-medium w-full">
                        <span className="truncate">PE32</span>
                      </button>
                    </td>
                    <td className="table-col-360 h-[72px] px-4 py-2 w-[400px] text-[#cb9090] text-sm font-normal leading-normal">
                      Tamamlandı
                    </td>
                    <td className="table-col-480 h-[72px] px-4 py-2 w-[400px] text-[#cb9090] text-sm font-normal leading-normal">
                      3 minutes
                    </td>
                    <td className="table-col-600 h-[72px] px-4 py-2 w-60 text-[#cb9090] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer">
                      Görüntüle
                    </td>
                  </tr>
                  <tr className="border-t border-t-[#683131]">
                    <td className="table-col-120 h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                      example.exe
                    </td>
                    <td className="table-col-240 h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button className="flex cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#492222] text-white text-sm font-medium w-full">
                        <span className="truncate">PE64</span>
                      </button>
                    </td>
                    <td className="table-col-360 h-[72px] px-4 py-2 w-[400px] text-[#cb9090] text-sm font-normal leading-normal">
                      Tamamlandı
                    </td>
                    <td className="table-col-480 h-[72px] px-4 py-2 w-[400px] text-[#cb9090] text-sm font-normal leading-normal">
                      2 minutes
                    </td>
                    <td className="table-col-600 h-[72px] px-4 py-2 w-60 text-[#cb9090] text-sm font-bold leading-normal tracking-[0.015em] cursor-pointer">
                      Görüntüle
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <style>
              {`
                @container(max-width:120px) {
                  .table-col-120 {
                    display: none;
                  }
                }
                @container(max-width:240px) {
                  .table-col-240 {
                    display: none;
                  }
                }
                @container(max-width:360px) {
                  .table-col-360 {
                    display: none;
                  }
                }
                @container(max-width:480px) {
                  .table-col-480 {
                    display: none;
                  }
                }
                @container(max-width:600px) {
                  .table-col-600 {
                    display: none;
                  }
                }
              `}
            </style>
          </div>
        </div>
      </div>
      <FooterDashboard />
    </div>
  );
};

export default Scanner;
