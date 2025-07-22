'use client'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from '@/components/ui/breadcrumb';
import { NavActions } from '@/components/nav-actions';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SquareCheck, SquareX } from 'lucide-react';
import { useResult } from '@/context/ResultContext';

const Analyze = () => {
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const { setResultData } = useResult();
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    message: "",
    variant: "default" as "default" | "destructive",
  });

  useEffect(() => {
    if (alertInfo.show) {
      const timer = setTimeout(() => {
        setAlertInfo({ ...alertInfo, show: false });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertInfo]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAlertInfo({ ...alertInfo, show: false });
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);

    try {
      const res = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setAlertInfo({
        show: true,
        message: "File berhasil dianalisis!",
        variant: "default",
      });
      console.log(res.data);
      setResultData(res.data);
      alertInfo.variant === "destructive" ? router.push('/dashboard') : router.push('/result')
    } catch (err: any) {
      console.error('Gagal upload:', err);
      setAlertInfo({
        show: true,
        message: err.response?.data?.error || "Terjadi kesalahan pada server.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return(
      <div className="relative min-h-screen">
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
              <header className="flex h-14 shrink-0 items-center gap-2">
                <div className="flex flex-1 items-center gap-2 px-3">
                  <SidebarTrigger />
                  <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                  />
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbPage className="line-clamp-1">
                          Upload Your Reviews File and Get the Analysis
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>
                <div className="ml-auto px-3">
                  <NavActions />
                </div>
              </header>
              <div className="flex flex-1 flex-col gap-4 px-4 py-10">
                  <div className="py-20 mx-auto w-full max-w-3xl rounded-xl">
                      <div className="container mx-auto px-6 text-center">
                          <h2 className="text-3xl font-bold text-secondary-foreground">Upload Your CSV File</h2>
                          <p className="text-muted-foreground mt-2 mb-8">Get started by uploading your CSV file for instant analysis</p>
                          <label htmlFor="fileUpload" className="max-w-2xl mx-auto block border-2 border-dashed border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 hover:bg-card transition">
                              <input id="fileUpload" type="file" accept=".csv" onChange={handleFileChange} className="hidden"/>
                                  {uploading ? (
                                    <p className="text-lg font-semibold text-blue-600">Uploading...</p>
                                  ) : (
                                    <>
                                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
                                  <p className="mt-2 text-lg font-semibold text-muted-foreground">Drop your CSV file here</p>
                                  <p className="text-sm text-muted-foreground">or click to upload</p>
                                </>
                              )}
                          </label>
                      </div>
                  </div>
              </div>
            </SidebarInset>
          </SidebarProvider>
          
          {alertInfo.show && (
              <div className="fixed top-5 right-5 z-50 w-full max-w-sm">
                <Alert variant={alertInfo.variant}>
                  {alertInfo.variant === "destructive" ? <SquareX /> : <SquareCheck />}
                  <AlertTitle>
                    {alertInfo.variant === "destructive" ? "Upload Gagal" : "Berhasil"}
                  </AlertTitle>
                  <AlertDescription>
                    {alertInfo.message}
                  </AlertDescription>
                </Alert>
              </div>
          )}
      </div>
  );
}

export default Analyze;