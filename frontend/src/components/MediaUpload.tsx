import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useToast } from "../components/ui/use-toast";

interface MediaUploadProps {
  onMediaChange: (files: File[]) => void;
  maxFiles?: number;
  acceptedTypes?: string;
  label?: string;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  onMediaChange,
  maxFiles = 3,
  acceptedTypes = "image/*,video/*,audio/*",
  label = "Upload Media",
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length + selectedFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can upload a maximum of ${maxFiles} files.`,
        variant: "destructive",
      });
      return;
    }

    const newPreviews: string[] = [];
    const newFiles: File[] = [];

    files.forEach(file => {
      const preview = URL.createObjectURL(file);
      newPreviews.push(preview);
      newFiles.push(file);
    });

    setSelectedFiles(prev => [...prev, ...newFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
    onMediaChange([...selectedFiles, ...newFiles]);
  };

  const removeFile = (index: number) => {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(newPreviews[index]);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    onMediaChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium">{label}</label>
        <Input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500">
          You can upload up to {maxFiles} files (images, audio, or video)
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {previews.map((preview, index) => (
            <div key={index} className="relative border rounded overflow-hidden">
              {selectedFiles[index].type.startsWith("image/") ? (
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  className="w-full h-24 object-cover"
                />
              ) : selectedFiles[index].type.startsWith("video/") ? (
                <div className="flex items-center justify-center h-24 bg-gray-100">
                  <span className="text-sm text-gray-600">Video File</span>
                </div>
              ) : (
                <div className="flex items-center justify-center h-24 bg-gray-100">
                  <span className="text-sm text-gray-600">Audio File</span>
                </div>
              )}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 w-6 h-6 rounded-full"
                onClick={() => removeFile(index)}
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;