import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import api from '../api/axiosInstance'
import ErrorBanner from '../components/ErrorBanner'
import { getErrorMessage } from '../utils/getErrorMessage'

const inputClasses = "border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"

function ProfilePage() {
    const { user, updateUser } = useAuth()

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [profileError, setProfileError] = useState(null)
    const [profileSuccess, setProfileSuccess] = useState(false)

    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [passwordError, setPasswordError] = useState(null)
    const [passwordSuccess, setPasswordSuccess] = useState(false)

    async function handleProfileSubmit(e) {
        e.preventDefault()
        setProfileError(null)
        setProfileSuccess(false)
        try {
            const response = await api.patch('/api/users/me', { firstName, lastName })
            updateUser(response.data)
            setProfileSuccess(true)
        } catch (err) {
            setProfileError(getErrorMessage(err))
        }
    }

    async function handlePasswordSubmit(e) {
        e.preventDefault()
        setPasswordError(null)
        setPasswordSuccess(false)
        try {
            const response = await api.patch('/api/users/me', { currentPassword, newPassword })
            updateUser(response.data)
            setCurrentPassword('')
            setNewPassword('')
            setPasswordSuccess(true)
        } catch (err) {
            setPasswordError(getErrorMessage(err))
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-semibold text-blue-800 mb-4">Profile</h1>

            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4 mb-6">
                <p className="text-sm text-gray-600 mb-3">Email: {user.email}</p>
                <p className="text-sm text-gray-600 mb-3">Role: {user.role}</p>

                <ErrorBanner message={profileError} />
                {profileSuccess && <p className="text-sm text-green-700 mb-3">Profile updated.</p>}

                <form onSubmit={handleProfileSubmit} className="flex flex-col gap-3">
                    <input
                        className={inputClasses}
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        className={inputClasses}
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 self-start">
                        Save
                    </button>
                </form>
            </div>

            <div className="bg-gray-100 border-l-4 border-blue-300 rounded shadow-sm max-w-md p-4">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Change Password</h3>

                <ErrorBanner message={passwordError} />
                {passwordSuccess && <p className="text-sm text-green-700 mb-3">Password changed.</p>}

                <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-3">
                    <input
                        type="password"
                        className={inputClasses}
                        placeholder="Current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <input
                        type="password"
                        className={inputClasses}
                        placeholder="New password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-800 text-white px-4 py-2 rounded text-sm hover:bg-blue-900 self-start">
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ProfilePage
