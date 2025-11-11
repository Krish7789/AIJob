import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

interface ResumeUploadProps {
  onUpload: (file: File) => void;
  onSkip: () => void;
}

export const ResumeUpload = ({ onUpload, onSkip }: ResumeUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    handleFileSelection(droppedFile);
  };

  const handleFileSelection = (selectedFile: File) => {
    const validTypes = [
      "application/pdf", 
      "application/msword", 
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload a PDF or Word document");
      return;
    }
    
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast.error("File size should be less than 5MB");
      return;
    }
    
    setFile(selectedFile);
    toast.success("Resume uploaded successfully!");
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelection(selectedFile);
    }
  };

  const handleSubmit = () => {
    if (file) {
      onUpload(file);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-8 shadow-medium bg-gradient-card border-0">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Upload Your Resume
        </h2>
        <p className="text-muted-foreground">
          Optional, but helps us give better recommendations
        </p>
      </div>

      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300
          ${isDragging 
            ? "border-primary bg-primary/5 scale-[1.02]" 
            : "border-border hover:border-primary/50 hover:bg-muted/30"
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {!file ? (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-primary/10 rounded-full">
                <Upload className="w-12 h-12 text-primary" />
              </div>
            </div>
            
            <div>
              <p className="text-lg font-semibold text-foreground mb-2">
                Drag and drop your resume here
              </p>
              <p className="text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button 
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Choose File
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Supported: PDF, DOC, DOCX (Max 5MB)
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-accent/10 rounded-full">
                <CheckCircle className="w-12 h-12 text-accent" />
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 bg-card p-4 rounded-lg shadow-soft">
              <FileText className="w-6 h-6 text-primary" />
              <span className="font-medium text-foreground">{file.name}</span>
              <button
                onClick={removeFile}
                className="ml-2 p-1 hover:bg-destructive/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-destructive" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4 mt-8">
        <Button 
          variant="ghost" 
          size="lg"
          onClick={onSkip}
          className="flex-1"
        >
          Skip for Now
        </Button>
        
        <Button 
          size="lg"
          onClick={handleSubmit}
          disabled={!file}
          className="flex-1"
        >
          Get Recommendations
        </Button>
      </div>
    </Card>
  );
};
