import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Loader } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validateName = (name) => {
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!nameRegex.test(name) && name !== '') {
            return 'Name should contain only letters';
        }
        return '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        // Validate name field
        if (name === 'name') {
            setFormErrors((prev) => ({
                ...prev,
                name: validateName(value)
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate all required fields
        const errors = {
            name: validateName(formData.name) || (formData.name ? '' : 'Name is required'),
            email: formData.email ? '' : 'Email is required',
            message: formData.message ? '' : 'Message is required'
        };

        setFormErrors(errors);

        // Check if there are any errors
        const hasErrors = Object.values(errors).some(error => error !== '');
        if (hasErrors) {
            return;
        }

        setLoading(true);

        // Simulate form submission
        setTimeout(() => {
            setLoading(false);
            setSubmitted(true);
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setFormErrors({
                name: '',
                email: '',
                message: ''
            });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitted(false), 3000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
                        Have a question or feedback? We'd love to hear from you. Our team is here to help!
                    </p>
                </div>
            </div>

            {/* Contact Info & Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {/* Contact Info Cards */}
                    <ContactInfoCard
                        icon={<Mail className="w-8 h-8" />}
                        title="Email"
                        content="support@tourease.com"
                        color="bg-blue-100 text-blue-600"
                    />
                    <ContactInfoCard
                        icon={<Phone className="w-8 h-8" />}
                        title="Phone"
                        content="+1 (555) 123-4567"
                        color="bg-green-100 text-green-600"
                    />
                    <ContactInfoCard
                        icon={<MapPin className="w-8 h-8" />}
                        title="Address"
                        content="San Francisco, CA, USA"
                        color="bg-orange-100 text-orange-600"
                    />
                </div>

                {/* Contact Form */}
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold mb-8 text-center">Send us a Message</h2>
                    <p className="text-gray-600 mb-8 text-center">
                        Fields marked with <span className="text-red-500">*</span> are required
                    </p>

                    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-xl">
                        {submitted && (
                            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
                                Thank you for your message! We'll get back to you soon.
                            </div>
                        )}

                        {/* Name Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                                    formErrors.name 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                }`}
                                placeholder="Your name"
                                onKeyPress={(e) => {
                                    // Prevent typing numbers
                                    if (/\d/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                            />
                            {formErrors.name && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                                    formErrors.email 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                }`}
                                placeholder="your.email@example.com"
                            />
                            {formErrors.email && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                            )}
                        </div>

                        {/* Subject Field (Optional) */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold mb-2">
                                Subject <span className="text-gray-400 text-xs">(Optional)</span>
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500"
                                placeholder="How can we help?"
                            />
                        </div>

                        {/* Message Field */}
                        <div className="mb-8">
                            <label className="block text-sm font-semibold mb-2">
                                Message <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="6"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-1 ${
                                    formErrors.message 
                                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                    : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                }`}
                                placeholder="Tell us more about your inquiry..."
                            />
                            {formErrors.message && (
                                <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-semibold py-3 rounded-lg transition flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>

                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <FAQItem
                            question="How quickly will you respond?"
                            answer="We aim to respond to all inquiries within 24 hours during business days."
                        />
                        <FAQItem
                            question="What are your support hours?"
                            answer="Our 24/7 support team is available at all times to assist you."
                        />
                        <FAQItem
                            question="Can I schedule a demo?"
                            answer="Yes! Contact our team and we'll be happy to set up a personalized demo for you."
                        />
                        <FAQItem
                            question="Do you offer enterprise solutions?"
                            answer="Absolutely! We have customized enterprise packages available. Contact our sales team."
                        />
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Still have questions?
                    </h2>
                    <p className="text-xl mb-10 opacity-90">
                        Check out our help center or reach out to our support team
                    </p>
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg">
                        Visit Help Center
                    </button>
                </div>
            </div>
        </div>
    );
}

function ContactInfoCard({ icon, title, content, color }) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all text-center">
            <div className={`${color} w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                {icon}
            </div>
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{content}</p>
        </div>
    );
}

function FAQItem({ question, answer }) {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div className="bg-white p-6 rounded-lg">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left font-semibold text-lg hover:text-teal-600 transition flex items-center justify-between"
            >
                {question}
                <span className={`transition transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {isOpen && <p className="text-gray-600 mt-4">{answer}</p>}
        </div>
    );
}