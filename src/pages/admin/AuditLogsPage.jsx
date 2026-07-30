import { useEffect, useState } from "react";
import api from "../../api/axiosInstance.js";
import ErrorBanner from "../../components/ErrorBanner.jsx";
import { getErrorMessage } from "../../utils/getErrorMessage.js";

function AuditLogsPage() {
    const [logs, setLogs] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        api.get('/api/admin/audit-logs')
            .then(res => setLogs(res.data))
            .catch(err => setError(getErrorMessage(err)))
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">Audit Logs</h1>

            <ErrorBanner message={error} />

            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr className="border-b border-gray-300">
                            <th className="p-3">Action</th>
                            <th className="p-3">Performed By</th>
                            <th className="p-3">Entity Type</th>
                            <th className="p-3">Entity ID</th>
                            <th className="p-3">Details</th>
                            <th className="p-3">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => (
                            <tr key={log.id} className="border-b border-gray-200">
                                <td className="p-3">{log.action}</td>
                                <td className="p-3">{log.performedBy}</td>
                                <td className="p-3">{log.entityType}</td>
                                <td className="p-3 text-xs text-gray-500">{log.entityId}</td>
                                <td className="p-3 text-gray-600">{log.details}</td>
                                <td className="p-3 text-gray-600">{log.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AuditLogsPage
