"use client";

import { useEffect, useRef } from "react";
import { Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import useFetch from "@/hooks/use-fetch";
import { scanReceipt } from "@/actions/transaction";

export function ReceiptScanner({ onScanComplete }) {
  const fileInputRef = useRef(null);

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
    error: scanReceiptError,
  } = useFetch(scanReceipt);

  // ==========================================
  // Handle Receipt File
  // ==========================================

  const handleReceiptScan = async (file) => {
    if (!file) return;

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    // Check file size
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Receipt image should be less than 5MB");
      return;
    }

    try {
      await scanReceiptFn(file);
    } catch (error) {
      console.error("Receipt scanning error:", error);
      toast.error("Failed to scan receipt");
    }
  };

  // ==========================================
  // Successful Scan
  // ==========================================

  useEffect(() => {
    if (!scanReceiptLoading && scannedData) {
      console.log("Scanned receipt data:", scannedData);

      onScanComplete(scannedData);

      // Reset file input so the same image
      // can be selected again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [scannedData, scanReceiptLoading, onScanComplete]);

  // ==========================================
  // Scan Error
  // ==========================================

  useEffect(() => {
    if (!scanReceiptError) return;

    console.error("Receipt scanner error:", scanReceiptError);

    toast.error(
      scanReceiptError?.message || "Failed to scan receipt. Please try again."
    );

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [scanReceiptError]);

  // ==========================================
  // UI
  // ==========================================

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        capture="environment"
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            handleReceiptScan(file);
          }
        }}
      />

      <Button
        type="button"
        variant="outline"
        className="
          w-full
          h-10
          gap-2

          bg-gradient-to-r
          from-orange-500
          via-pink-500
          to-purple-500

          text-white
          border-none

          hover:opacity-90
          hover:text-white

          transition-all
          duration-300

          disabled:opacity-60
          disabled:cursor-not-allowed
        "
        onClick={() => fileInputRef.current?.click()}
        disabled={scanReceiptLoading}
      >
        {scanReceiptLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Scanning Receipt...
          </>
        ) : (
          <>
            <Camera className="h-4 w-4" />
            Scan Receipt with AI
          </>
        )}
      </Button>
    </>
  );
}