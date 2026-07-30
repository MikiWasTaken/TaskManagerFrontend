function ErrorBanner({ message }) {
    if (!message) return null

    return (
        <div className="bg-red-50 border-l-4 border-red-400 text-red-700 text-sm rounded px-4 py-2 mb-4">
            {message}
        </div>
    )
}

export default ErrorBanner
