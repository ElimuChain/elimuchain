import React, { useRef, useEffect, useState } from 'react';
import { Camera, X } from 'lucide-react';

interface QRScannerProps {
  onScan: (result: string) => void;
  onClose: () => void;
}

export default function QRScanner({ onScan, onClose }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        setError('Unable to access camera. Please ensure you have granted camera permissions.');
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative w-full max-w-lg mx-4">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20">
          <div className="relative aspect-square rounded-xl overflow-hidden">
            {error ? (
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <p className="text-red-400">{error}</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 border-2 border-blue-400/50 rounded-xl" />
          </div>

          <div className="mt-4 text-center text-gray-300">
            <div className="flex items-center justify-center space-x-2">
              <Camera className="w-5 h-5" />
              <p>Scan a QR code to verify credentials</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}