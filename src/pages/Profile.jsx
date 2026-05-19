import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import ProfileCard from '../components/profile/ProfileCard';
import SecurityCard from '../components/profile/SecurityCard';

const defaultSiteConfig = {
    _id: '', // To store the ID for PUT request
    logo: '',
    footerLogo: '',
    siteName: 'STONA',
    siteTagline: 'CERAMICS',
    footerDescription: '',
    contactEmail: 'info@stonaceramics.com',
    contactPhones: [],
    address: '42 Design District, Milan, Italy',
    mapEmbedUrl: '', // Added field for map embed URL
    socialLinks: {
        instagram: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        youtube: ''
    },
    // Add other fields from SiteConfig model if they need to be editable
    ctaSectionImage: '',
    navbarPromoImage: '',
    promoModalImage: '',
    homeBrandImages: { primary: '', detail: '' },
    contactMapCard: { image: '', title: '', subtitle: '' },
    collectionPhilosophyImages: [],
    aboutImages: { hero: '', ceoAvatar: '', manufacturingGallery: [] }
};

const defaultChangeForm = { currentPassword: '', newPassword: '', confirmPassword: '' };

export default function Profile() {
    const [siteConfigData, setSiteConfigData] = useState(defaultSiteConfig);
    const [logoFile, setLogoFile] = useState(null);
    const [footerLogoFile, setFooterLogoFile] = useState(null);
    const [logoFilePreview, setLogoFilePreview] = useState('');
    const [footerLogoFilePreview, setFooterLogoFilePreview] = useState('');

    const [changeForm, setChangeForm] = useState(defaultChangeForm);
    const [saving, setSaving] = useState(false);
    const [passwordBusy, setPasswordBusy] = useState(false);

    useEffect(() => {
        const loadSiteConfig = async () => {
            try {
                const response = await api.get('/site-configs');
                if (response.data && response.data.length > 0) {
                    const config = response.data[0]; // Assuming we are managing a single site config
                    setSiteConfigData({
                        _id: config._id,
                        logo: config.logo || defaultSiteConfig.logo,
                        footerLogo: config.footerLogo || defaultSiteConfig.footerLogo,
                        siteName: config.siteName || defaultSiteConfig.siteName,
                        siteTagline: config.siteTagline || defaultSiteConfig.siteTagline,
                        footerDescription: config.footerDescription || defaultSiteConfig.footerDescription,
                        contactEmail: config.contactEmail || defaultSiteConfig.contactEmail,
                        contactPhones: config.contactPhones || defaultSiteConfig.contactPhones,
                        address: config.address || defaultSiteConfig.address,
                        mapEmbedUrl: config.mapEmbedUrl || defaultSiteConfig.mapEmbedUrl, // Fetch mapEmbedUrl
                        socialLinks: {
                            instagram: config.socialLinks?.instagram || defaultSiteConfig.socialLinks.instagram,
                            facebook: config.socialLinks?.facebook || defaultSiteConfig.socialLinks.facebook,
                            twitter: config.socialLinks?.twitter || defaultSiteConfig.socialLinks.twitter,
                            linkedin: config.socialLinks?.linkedin || defaultSiteConfig.socialLinks.linkedin,
                            youtube: config.socialLinks?.youtube || defaultSiteConfig.socialLinks.youtube,
                        },
                        // Populate other fields if they are to be editable
                        ctaSectionImage: config.ctaSectionImage || defaultSiteConfig.ctaSectionImage,
                        navbarPromoImage: config.navbarPromoImage || defaultSiteConfig.navbarPromoImage,
                        promoModalImage: config.promoModalImage || defaultSiteConfig.promoModalImage,
                        homeBrandImages: {
                            primary: config.homeBrandImages?.primary || defaultSiteConfig.homeBrandImages.primary,
                            detail: config.homeBrandImages?.detail || defaultSiteConfig.homeBrandImages.detail,
                        },
                        contactMapCard: {
                            image: config.contactMapCard?.image || defaultSiteConfig.contactMapCard.image,
                            title: config.contactMapCard?.title || defaultSiteConfig.contactMapCard.title,
                            subtitle: config.contactMapCard?.subtitle || defaultSiteConfig.contactMapCard.subtitle,
                        },
                        collectionPhilosophyImages: config.collectionPhilosophyImages || defaultSiteConfig.collectionPhilosophyImages,
                        aboutImages: {
                            hero: config.aboutImages?.hero || defaultSiteConfig.aboutImages.hero,
                            ceoAvatar: config.aboutImages?.ceoAvatar || defaultSiteConfig.aboutImages.ceoAvatar,
                            manufacturingGallery: config.aboutImages?.manufacturingGallery || defaultSiteConfig.aboutImages.manufacturingGallery,
                        }
                    });
                    // Set initial previews for existing logos
                    if (config.logo) setLogoFilePreview(config.logo);
                    if (config.footerLogo) setFooterLogoFilePreview(config.footerLogo);
                } else {
                    // If no config found, use defaults
                    setSiteConfigData(defaultSiteConfig);
                }
            } catch (error) {
                toast.error(error.response?.data?.message || 'Failed to load site configuration');
            }
        };

        loadSiteConfig();
    }, []);

    const handleSiteConfigChange = (field, value) => {
        setSiteConfigData((current) => {
            // Handle nested objects like socialLinks
            if (field.includes('.')) {
                const [parentKey, childKey] = field.split('.');
                return {
                    ...current,
                    [parentKey]: {
                        ...(current[parentKey] || {}),
                        [childKey]: value
                    }
                };
            }
            return { ...current, [field]: value };
        });
    };

    const handlePhoneChange = (index, value) => {
        setSiteConfigData((current) => {
            const newPhones = [...current.contactPhones];
            newPhones[index] = value;
            return { ...current, contactPhones: newPhones };
        });
    };

    const addPhoneField = () => {
        setSiteConfigData((current) => ({
            ...current,
            contactPhones: [...current.contactPhones, '']
        }));
    };

    const removePhoneField = (index) => {
        setSiteConfigData((current) => ({
            ...current,
            contactPhones: current.contactPhones.filter((_, i) => i !== index)
        }));
    };

    const handleLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setLogoFile(file);
            setLogoFilePreview(URL.createObjectURL(file));
        }
    };

    const handleFooterLogoUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFooterLogoFile(file);
            setFooterLogoFilePreview(URL.createObjectURL(file));
        }
    };

    const handleSiteConfigSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);

        const formData = new FormData();

        // Append text fields
        for (const key in siteConfigData) {
            if (key !== '_id' && key !== 'logo' && key !== 'footerLogo' && key !== 'contactPhones' && key !== 'socialLinks' && key !== 'homeBrandImages' && key !== 'contactMapCard' && key !== 'aboutImages' && key !== 'collectionPhilosophyImages') {
                formData.append(key, siteConfigData[key]);
            }
        }

        // Append social links (handle nested object)
        for (const socialKey in siteConfigData.socialLinks) {
            formData.append(`socialLinks.${socialKey}`, siteConfigData.socialLinks[socialKey]);
        }

        // Append phone numbers
        siteConfigData.contactPhones.forEach((phone, index) => {
            formData.append(`contactPhones[${index}]`, phone);
        });

        // Append logo files
        if (logoFile) {
            formData.append('logo', logoFile);
        }
        if (footerLogoFile) {
            formData.append('footerLogo', footerLogoFile);
        }
        
        // Append mapEmbedUrl
        if (siteConfigData.mapEmbedUrl) {
            formData.append('mapEmbedUrl', siteConfigData.mapEmbedUrl);
        }

        // Append other image fields if they are being edited and are files
        // Example for homeBrandImages:
        // Note: This part assumes that homeBrandImages.primary/detail are managed as file uploads and the state might hold File objects.
        // If they are just URLs, this logic needs adjustment based on how those specific fields are handled in ProfileCard.
        // For simplicity, let's assume only logo and footerLogo are the primary file uploads for now, as per request.
        // If other images are to be uploaded here, similar logic to logo/footerLogo upload handling would be needed.
        // For instance, if siteConfigData.homeBrandImages.primary is a File object:
        // if (siteConfigData.homeBrandImages.primary instanceof File) {
        //     formData.append('homeBrandImages.primary', siteConfigData.homeBrandImages.primary);
        // }
        // Add similar logic for other image fields if they are intended to be editable via file upload from this form.


        try {
            // Use the site-configs/:id PUT endpoint
            const response = await api.put(`/site-configs/${siteConfigData._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            // Update state with the response data to reflect actual saved values (especially file paths)
            if (response.data) {
                const updatedConfig = response.data;
                setSiteConfigData({
                    _id: updatedConfig._id,
                    logo: updatedConfig.logo || defaultSiteConfig.logo,
                    footerLogo: updatedConfig.footerLogo || defaultSiteConfig.footerLogo,
                    siteName: updatedConfig.siteName || defaultSiteConfig.siteName,
                    siteTagline: updatedConfig.siteTagline || defaultSiteConfig.siteTagline,
                    footerDescription: updatedConfig.footerDescription || defaultSiteConfig.footerDescription,
                    contactEmail: updatedConfig.contactEmail || defaultSiteConfig.contactEmail,
                    contactPhones: updatedConfig.contactPhones || defaultSiteConfig.contactPhones,
                    address: updatedConfig.address || defaultSiteConfig.address,
                    mapEmbedUrl: updatedConfig.mapEmbedUrl || defaultSiteConfig.mapEmbedUrl, // Update mapEmbedUrl from response
                    socialLinks: {
                        instagram: updatedConfig.socialLinks?.instagram || defaultSiteConfig.socialLinks.instagram,
                        facebook: updatedConfig.socialLinks?.facebook || defaultSiteConfig.socialLinks.facebook,
                        twitter: updatedConfig.socialLinks?.twitter || defaultSiteConfig.socialLinks.twitter,
                        linkedin: updatedConfig.socialLinks?.linkedin || defaultSiteConfig.socialLinks.linkedin,
                        youtube: updatedConfig.socialLinks?.youtube || defaultSiteConfig.socialLinks.youtube,
                    },
                     ctaSectionImage: updatedConfig.ctaSectionImage || defaultSiteConfig.ctaSectionImage,
                     navbarPromoImage: updatedConfig.navbarPromoImage || defaultSiteConfig.navbarPromoImage,
                     promoModalImage: updatedConfig.promoModalImage || defaultSiteConfig.promoModalImage,
                     homeBrandImages: {
                        primary: updatedConfig.homeBrandImages?.primary || defaultSiteConfig.homeBrandImages.primary,
                        detail: updatedConfig.homeBrandImages?.detail || defaultSiteConfig.homeBrandImages.detail,
                     },
                     contactMapCard: {
                        image: updatedConfig.contactMapCard?.image || defaultSiteConfig.contactMapCard.image,
                        title: updatedConfig.contactMapCard?.title || defaultSiteConfig.contactMapCard.title,
                        subtitle: updatedConfig.contactMapCard?.subtitle || defaultSiteConfig.contactMapCard.subtitle,
                     },
                    collectionPhilosophyImages: updatedConfig.collectionPhilosophyImages || defaultSiteConfig.collectionPhilosophyImages,
                    aboutImages: {
                        hero: updatedConfig.aboutImages?.hero || defaultSiteConfig.aboutImages.hero,
                        ceoAvatar: updatedConfig.aboutImages?.ceoAvatar || defaultSiteConfig.aboutImages.ceoAvatar,
                        manufacturingGallery: updatedConfig.aboutImages?.manufacturingGallery || defaultSiteConfig.aboutImages.manufacturingGallery,
                    }
                });
                // Reset file inputs and previews after successful upload
                setLogoFile(null);
                setFooterLogoFile(null);
                setLogoFilePreview('');
                setFooterLogoFilePreview('');
                toast.success('Site configuration updated successfully');
            } else {
                // This case might happen if the server returns 200 OK but no data.
                // We should still try to refresh the data or inform the user.
                toast.error('Site configuration updated, but no data returned from server. Please refresh.');
                // Optionally, call loadSiteConfig() here to refetch data
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to update site configuration');
            console.error("Error submitting site config:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleChangePassword = async (event) => {
        event.preventDefault();

        if (!changeForm.currentPassword || !changeForm.newPassword) {
            toast.error('Please fill current and new password');
            return;
        }

        if (changeForm.newPassword !== changeForm.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setPasswordBusy(true);

        try {
            await api.put('/auth/change-password', {
                currentPassword: changeForm.currentPassword,
                newPassword: changeForm.newPassword,
            });
            setChangeForm(defaultChangeForm);
            toast.success('Password updated');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to change password');
        } finally {
            setPasswordBusy(false);
        }
    };

    const handleForgotPassword = async () => {
        // This function uses the profile.email which is now siteConfigData.contactEmail
        try {
            const response = await api.post('/auth/forgot-password', { email: siteConfigData.contactEmail });
            const { resetUrl, token } = response?.data || {};
            if (resetUrl) {
                toast.success(`Reset link ready: ${resetUrl}`);
            } else if (token) {
                toast.success(`Reset token generated: ${token}`);
            } else {
                toast.success(response?.data?.message || 'Reset link generated');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Unable to generate reset link');
        }
    };

    return (
        <div className="space-y-6">
            <ProfileCard
                siteConfigData={siteConfigData}
                logoFile={logoFile}
                footerLogoFile={footerLogoFile}
                logoFilePreview={logoFilePreview}
                footerLogoFilePreview={footerLogoFilePreview}
                onChange={handleSiteConfigChange}
                onPhoneChange={handlePhoneChange}
                addPhoneField={addPhoneField}
                removePhoneField={removePhoneField}
                onLogoUpload={handleLogoUpload}
                onFooterLogoUpload={handleFooterLogoUpload}
                onSubmit={handleSiteConfigSubmit}
                saving={saving}
            />

            <SecurityCard
                changeForm={changeForm}
                onChange={setChangeForm} // Use setChangeForm directly for security form
                onChangePassword={handleChangePassword}
                onForgotPassword={handleForgotPassword}
                busy={passwordBusy}
            />
        </div>
    );
}