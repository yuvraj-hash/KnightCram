import React, { useRef, useState } from "react";
import { uploadProof } from "@/lib/profileService";
import { Upload, CheckCircle, AlertCircle, File, Loader } from "lucide-react";

const VerificationUploader: React.FC<{ profile: any; onUpload: (data?: any) => void }> = ({ profile, onUpload }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setFiles(Array.from(list));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const submit = async () => {
    setLoading(true);
    try {
      for (const f of files) {
        await uploadProof(f.name, f.type);
      }

      const docName = files.length > 0 ? files[0].name : "Document";
      // We assume parent component handles merging this object into profile state
      // We pass verificationDetails so it can be saved to profile
      onUpload({
        verificationStatus: "submitted",
        verificationDetails: { documentName: docName }
      });

      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const getStatusIcon = () => {
    if (profile.verificationStatus === "verified") return <CheckCircle className="text-green-400" size={20} />;
    if (profile.verificationStatus === "submitted") return <AlertCircle className="text-yellow-400" size={20} />;
    return <Upload className="text-blue-400" size={20} />;
  };

  const getStatusText = () => {
    if (profile.verificationStatus === "verified") return "Verified";
    if (profile.verificationStatus === "submitted") return "Submitted for Review";
    return "Not Verified";
  };

  const getRequiredDocs = () => {
    if (!profile.roles || profile.roles.length === 0) return "ID Proof";
    const role = profile.roles[0];
    if (role === "Pre University Student") return "School ID Card, Admission Letter";
    if (role === "University Student") return "College ID Card, Admission Letter, Marksheet";
    if (role === "Alumni" || role === "Opportunity Seeker") return "Admission letter, College Id Card, Marksheet or Degree Certificate";
    if (role === "Working Professional") return "Current Offer Letter, ID Card, Payslips";
    if (role === "Business Owner / Indie Hacker" || role === "Founder / Start-up Owner") return "Client Payment Proof or Other Proof of work";
    return "ID Proof";
  };

  return (
    <section className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
      <div className="px-6 py-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-xl">Profile Verification</h3>
            <p className="text-sm text-white/50 mt-1">Upload documents to verify your profile</p>
          </div>
          <div className="flex items-center gap-2">{getStatusIcon()}</div>
        </div>
      </div>

      {/* Conditional Status Display - Below Header Border */}
      {profile.verificationStatus === "submitted" && (
        <div className="bg-blue-500/5 border-b border-white/5 px-6 py-3 flex items-center gap-2 animate-fade-in">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
          <span className="text-sm font-medium text-blue-200">
            Submitted - {profile.verificationDetails?.documentName || "Document for review"}
          </span>
        </div>
      )}

      <div className="p-6 space-y-6">
        {/* Upload Area */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition ${isDragOver ? "border-blue-400 bg-blue-500/10" : "border-white/20 hover:border-white/40 hover:bg-white/5"
            }`}
        >
          <input ref={inputRef} type="file" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
          <Upload size={40} className="mx-auto text-blue-400 mb-3" />
          <p className="text-base font-medium text-white mb-1">Drag documents here</p>
          <p className="text-sm text-white/60 mb-2">or</p>
          <button
            onClick={() => inputRef.current?.click()}
            className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Choose Files
          </button>

          <div className="mt-6 p-3 rounded bg-blue-500/10 border border-blue-500/20 text-left">
            <p className="text-xs text-blue-200 font-semibold mb-1">Required Documents:</p>
            <p className="text-sm text-white/80">{getRequiredDocs()}</p>
          </div>

          <p className="text-xs text-white/50 mt-3">Supported: PDF, JPG, PNG (Max 5MB)</p>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-white/70">Selected Files ({files.length})</h4>
            <div className="space-y-2">
              {files.map((f, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <File size={18} className="text-blue-400 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-white/50">{(f.size / 1024).toFixed(0)} KB</p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-white/50 hover:text-white/80 transition text-xs font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
            onClick={submit}
            disabled={files.length === 0 || loading || profile.verificationStatus === "verified"}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold transition duration-200"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload & Submit
              </>
            )}
          </button>
        </div>

        {/* Info Box */}
        {profile.verificationStatus !== "verified" && (
          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300">
              <strong>Note:</strong> Our team reviews submissions within 24-48 hours. You'll receive an email once your profile is verified.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default VerificationUploader;
