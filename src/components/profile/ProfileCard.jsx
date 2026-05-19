import React from 'react'; // Ensure React is imported if not globally available
import toast from 'react-hot-toast';

// Assuming api and defaultSiteConfig are imported or available in scope
// import api from '../api/axios'; 
// import defaultSiteConfig from './defaultSiteConfig'; // Assuming a default config object might exist

// Placeholder for defaultSiteConfig if not imported
const placeholderDefaultSiteConfig = {
    _id: '',
    logo: '',
    footerLogo: '',
    siteName: 'STONA',
    siteTagline: 'CERAMICS',
    footerDescription: '',
    contactEmail: 'info@stonaceramics.com',
    contactPhones: [],
    address: '42 Design District, Milan, Italy',
    mapEmbedUrl: '', // Map embed URL field
    socialLinks: {
        instagram: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: ''
    },
    ctaSectionImage: '',
    navbarPromoImage: '',
    promoModalImage: '',
    homeBrandImages: { primary: '', detail: '' },
    contactMapCard: { image: '', title: '', subtitle: '' },
    collectionPhilosophyImages: [],
    aboutImages: { hero: '', ceoAvatar: '', manufacturingGallery: [] }
};

export default function ProfileCard({
    siteConfigData,
    logoFile, // Not directly used here, but might be if we were to display the selected file name
    footerLogoFile, // Not directly used here
    logoFilePreview,
    footerLogoFilePreview,
    onChange,
    onPhoneChange,
    addPhoneField,
    removePhoneField,
    onLogoUpload,
    onFooterLogoUpload,
    onSubmit,
    saving,
}) {
    // Use placeholder if siteConfigData is not fully populated or if the default structure is expected
    const config = siteConfigData || placeholderDefaultSiteConfig;

    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-6 py-8 text-white">
                <p className="text-xs uppercase tracking-[0.25em] text-slate-300">Website Settings</p>
                <h1 className="mt-2 text-2xl font-bold">Manage Website Configuration</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-300">
                    Update the site's branding, contact information, and social media links.
                </p>
            </div>

            <form onSubmit={onSubmit} className="space-y-5 p-6">

                {/* Logo Upload Section */}
                <div className="grid gap-5 md:grid-cols-2">
                    <div>
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Main Logo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onLogoUpload}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            />
                        </label>
                        {logoFilePreview && (
                            <div className="mt-3">
                                <p className="text-xs text-slate-500 mb-1">Preview:</p>
                                <img src={logoFilePreview} alt="Logo Preview" className="max-w-full h-20 object-contain rounded" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block">
                            <span className="mb-2 block text-sm font-medium text-slate-700">Footer Logo</span>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={onFooterLogoUpload}
                                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            />
                        </label>
                        {footerLogoFilePreview && (
                            <div className="mt-3">
                                <p className="text-xs text-slate-500 mb-1">Preview:</p>
                                <img src={footerLogoFilePreview} alt="Footer Logo Preview" className="max-w-full h-20 object-contain rounded" />
                            </div>
                        )}
                    </div>
                </div>

                {/* Site Identity Section */}
                <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Site Name</span>
                        <input
                            type="text"
                            value={config.siteName}
                            onChange={(e) => onChange('siteName', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="e.g., Stona Ceramics"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Site Tagline</span>
                        <input
                            type="text"
                            value={config.siteTagline}
                            onChange={(e) => onChange('siteTagline', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="e.g., Timeless Elegance"
                        />
                    </label>
                </div>

                <label className="block">
                    <span className="mb-2 block text-sm font-medium text-slate-700">Footer Description</span>
                    <textarea
                        rows="3"
                        value={config.footerDescription}
                        onChange={(e) => onChange('footerDescription', e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white resize-none"
                        placeholder="Description for the footer"
                    />
                </label>

                {/* Contact Information Section */}
                <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Contact Email</span>
                        <input
                            type="email"
                            value={config.contactEmail}
                            onChange={(e) => onChange('contactEmail', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="e.g., info@stonaceramics.com"
                        />
                    </label>

                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Address</span>
                        <input
                            type="text"
                            value={config.address}
                            onChange={(e) => onChange('address', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="e.g., 42 Design District, Milan, Italy"
                        />
                    </label>
                    
                    {/* Map Embed URL Field */}
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Map Embed URL</span>
                        <input
                            type="url"
                            value={config.mapEmbedUrl}
                            onChange={(e) => onChange('mapEmbedUrl', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="e.g., https://maps.google.com/..."
                        />
                    </label>
                </div>

                {/* Phone Numbers Section */}
                <div>
                    <p className="mb-3 block text-sm font-medium text-slate-700">Contact Phone Numbers</p>
                    {config.contactPhones.map((phone, index) => (
                        <div key={index} className="flex items-center gap-3 mb-2">
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => onPhoneChange(index, e.target.value)}
                                className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                                placeholder={`Phone number ${index + 1}`}
                            />
                            <button
                                type="button"
                                onClick={() => removePhoneField(index)}
                                className="text-red-500 hover:text-red-700 font-medium text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addPhoneField}
                        className="mt-2 rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-primary-700 transition hover:border-primary-300"
                    >
                        Add Phone Number
                    </button>
                </div>

                {/* Social Media Links Section */}
                <div className="grid gap-5 md:grid-cols-2">
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Instagram</span>
                        <input
                            type="url"
                            value={config.socialLinks?.instagram || ''}
                            onChange={(e) => onChange('socialLinks.instagram', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="https://instagram.com/username"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Facebook</span>
                        <input
                            type="url"
                            value={config.socialLinks?.facebook || ''}
                            onChange={(e) => onChange('socialLinks.facebook', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="https://facebook.com/username"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">Twitter</span>
                        <input
                            type="url"
                            value={config.socialLinks?.twitter || ''}
                            onChange={(e) => onChange('socialLinks.twitter', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="https://twitter.com/username"
                        />
                    </label>
                    <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">LinkedIn</span>
                        <input
                            type="url"
                            value={config.socialLinks?.linkedin || ''}
                            onChange={(e) => onChange('socialLinks.linkedin', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="https://linkedin.com/in/username"
                        />
                    </label>
                     <label className="block">
                        <span className="mb-2 block text-sm font-medium text-slate-700">YouTube</span>
                        <input
                            type="url"
                            value={config.socialLinks?.youtube || ''}
                            onChange={(e) => onChange('socialLinks.youtube', e.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-primary-500 focus:bg-white"
                            placeholder="https://youtube.com/channel/..."
                        />
                    </label>
                </div>

                {/* Save Button */}
                <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                    <span>Website configuration changes are saved below.</span>
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-xl bg-primary-600 px-4 py-2 text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {saving ? 'Saving...' : 'Save Configuration'}
                    </button>
                </div>
            </form>
        </div>
    );
}