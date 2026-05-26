import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const DocumentUpload = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    documentType: "other",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const API = import.meta.env.VITE_API_URL;

  const getHeaders = () => ({
    Authorization: `Bearer ${user?.token}`,
  });

  const fetchDocuments = async () => {
    try {
      const { data } = await axios.get(`${API}/api/documents`, {
        headers: getHeaders(),
      });
      setDocuments(data);
    } catch {}
    setLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleFileChange = (e) => setSelectedFile(e.target.files[0]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setMessage("❌ Please select a file first");
      return;
    }
    setUploading(true);
    setMessage("");
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("documentType", form.documentType);
      formData.append("description", form.description);

      await axios.post(`${API}/api/documents`, formData, {
        headers: {
          ...getHeaders(),
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("✅ Document uploaded successfully!");
      setSelectedFile(null);
      setForm({ documentType: "other", description: "" });
      fetchDocuments();
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Upload failed"));
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this document?")) return;
    try {
      await axios.delete(`${API}/api/documents/${id}`, {
        headers: getHeaders(),
      });
      setDocuments((prev) => prev.filter((d) => d._id !== id));
      setMessage("✅ Document deleted!");
    } catch {
      setMessage("❌ Failed to delete");
    }
  };

  const docTypeLabel = {
    will: "📜 Will",
    insurance: "🛡️ Insurance",
    instructions: "📋 Instructions",
    photo: "🖼️ Photo",
    other: "📁 Other",
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-700 mb-1">
            📁 Upload Documents
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Securely store your will, insurance, and important instructions
          </p>

          {message && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm text-slate-700">
              {message}
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Document Type
              </label>
              <select
                name="documentType"
                value={form.documentType}
                onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                <option value="will">📜 Will</option>
                <option value="insurance">🛡️ Insurance</option>
                <option value="instructions">📋 Instructions</option>
                <option value="photo">🖼️ Photo</option>
                <option value="other">📁 Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Description (Optional)
              </label>
              <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brief description of this document"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Select File
              </label>
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-amber-400 transition">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="fileInput"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="fileInput" className="cursor-pointer">
                  <div className="text-4xl mb-2">📂</div>
                  <p className="text-slate-500 text-sm">
                    {selectedFile
                      ? selectedFile.name
                      : "Click to select file (PDF, DOC, JPG, PNG)"}
                  </p>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
            >
              {uploading ? "Uploading..." : "Upload Document"}
            </button>
          </form>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-700 mb-4">
            📋 My Documents ({documents.length})
          </h2>

          {documents.length === 0 ? (
            <div className="text-center text-slate-400 py-10">
              <div className="text-4xl mb-2">📭</div>
              <p>No documents uploaded yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc._id}
                  className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {docTypeLabel[doc.documentType]?.split(" ")[0]}
                    </span>
                    <div>
                      <p className="font-medium text-slate-700 text-sm">
                        {doc.fileName}
                      </p>
                      <p className="text-xs text-slate-400">
                        {docTypeLabel[doc.documentType]} •{" "}
                        {doc.description || "No description"}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`${import.meta.env.VITE_API_URL}/${doc.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-amber-500 hover:bg-amber-600 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      View
                    </a>
                    <button
                      onClick={() => handleDelete(doc._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
