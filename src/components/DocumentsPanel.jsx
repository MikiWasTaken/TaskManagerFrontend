import { useEffect, useState } from "react";
import api from "../api/axiosInstance.js";
import ErrorBanner from "./ErrorBanner.jsx";
import { getErrorMessage } from "../utils/getErrorMessage.js";

function formatSize(bytes) {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function DocumentsPanel({ projectId }) {
    const [documents, setDocuments] = useState([])
    const [error, setError] = useState(null)

    function loadDocuments() {
        api.get(`/api/projects/${projectId}/documents`)
            .then(res => setDocuments(res.data))
            .catch(err => setError(getErrorMessage(err)))
    }

    useEffect(() => {
        loadDocuments()
    }, [projectId])

    async function handleUpload(e) {
        const file = e.target.files[0]
        e.target.value = ''
        if (!file) return

        setError(null)
        const formData = new FormData()
        formData.append('file', file)

        try {
            const response = await api.post(`/api/projects/${projectId}/documents`, formData)
            setDocuments(prev => [...prev, response.data])
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleDownload(doc) {
        setError(null)
        try {
            const response = await api.get(`/api/projects/${projectId}/documents/${doc.id}/download`, { responseType: 'blob' })
            const blobUrl = URL.createObjectURL(response.data)
            const link = document.createElement('a')
            link.href = blobUrl
            link.download = doc.name
            link.click()
            URL.revokeObjectURL(blobUrl)
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    async function handleDelete(docId) {
        const confirmed = window.confirm("Delete this document?")
        if (!confirmed) return
        setError(null)
        try {
            await api.delete(`/api/projects/${projectId}/documents/${docId}`)
            setDocuments(prev => prev.filter(d => d.id !== docId))
        } catch (err) {
            setError(getErrorMessage(err))
        }
    }

    return (
        <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">Documents</h3>

            <ErrorBanner message={error} />

            <ul className="flex flex-col gap-2 mb-4">
                {documents.map(doc => (
                    <li key={doc.id} className="flex items-center justify-between text-sm text-gray-700">
                        <span>
                            {doc.name} <span className="text-gray-500">({formatSize(doc.size)}, {doc.ownerUsername})</span>
                        </span>
                        <span className="flex gap-2">
                            <button
                                onClick={() => handleDownload(doc)}
                                className="px-2 py-1 rounded text-xs text-blue-700 hover:bg-blue-100"
                            >
                                Download
                            </button>
                            <button
                                onClick={() => handleDelete(doc.id)}
                                className="px-2 py-1 rounded text-xs text-red-700 hover:bg-red-100"
                            >
                                Delete
                            </button>
                        </span>
                    </li>
                ))}
            </ul>

            <label className="inline-block bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 cursor-pointer">
                Upload Document
                <input type="file" className="hidden" onChange={handleUpload} />
            </label>
        </div>
    )
}

export default DocumentsPanel
