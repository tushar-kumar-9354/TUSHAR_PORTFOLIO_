import { Suspense, useRef, useState } from "react";
import emailjs from '@emailjs/browser';
import Loader from "../Loader";
import { Canvas } from "@react-three/fiber";
import Dragon from "../../models/Dragon";
import useAlert from "../../hooks/useAlert";
import Alert from "../Alert";
import { useLanguage } from "../../contexts/LanguageContext";

const Contact = () => {
    const { t } = useLanguage();
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState('idle');
    const { alert, showAlert, hideAlert } = useAlert();
    
    // CRITICAL FIX: Match exactly with your EmailJS template variables
    // Based on your screenshot, your template uses:
    // ((name)) - for the sender's name
    // ((message)) - for the message
    // ((email)) - for the sender's email
    const templateParams = {
        // These must match EXACTLY with your EmailJS template variables
        name: form.name,        // Maps to ((name)) in template
        email: form.email,      // Maps to ((email)) in template  
        message: form.message,  // Maps to ((message)) in template
        
        // Optional: Add these for better organization
        to_name: "Tushar Kumar",
        to_email: "jangratushar348@gmail.com",
        from_name: form.name,
        from_email: form.email,
        
        // Add subject if your template has it
        subject: "Contact Us Form Submission"
    };

    const formRef = useRef(null);

    const handleForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleFocus = () => setCurrentAnimation('walk');
    const handleBlur = () => setCurrentAnimation('idle');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
            showAlert({ text: t('fillAllFields') || 'Please fill all fields', type: "error" });
            return;
        }
        
        setIsLoading(true);
        setCurrentAnimation('hit');
        
        console.log("Sending email with params:", templateParams);
        
        // EmailJS API Configuration
        emailjs.send(
            "service_fgfqwb9", // Your EmailJS Service ID
            "template_8re6fbs", // Your EmailJS Template ID
            templateParams,
            "vsfhJeraYzKm8OIiy" // Your EmailJS Public Key
        ).then((response) => {
            console.log("✅ Email sent successfully! Status: ", response.status, response.text);
            showAlert({ 
                text: t('messageSent') || 'Message sent successfully!', 
                type: "success" 
            });
            
            // Reset form
            setForm({ name: '', email: "", message: "" });
            setCurrentAnimation('idle');
            setIsLoading(false);
            
            setTimeout(() => {
                hideAlert();
            }, 3000);
            
        }).catch((error) => {
            console.error("❌ Error sending email: ", error);
            console.error("Error details:", error.text || error.message);
            
            showAlert({ 
                text: t('messageFailed') || 'Failed to send message. Please try again.', 
                type: "error" 
            });
            setCurrentAnimation('idle');
            setIsLoading(false);
            
            setTimeout(() => {
                hideAlert();
            }, 5000);
        });
    };

    return (
        <section className="relative flex flex-col lg:flex-row max-container">
            {alert.show && <Alert {...alert} />}
            
            <div className="flex-1 min-w-[50%] flex flex-col px-4 sm:px-0">
                <h1 className="text-2xl sm:text-4xl font-semibold sm:leading-snug font-poppins bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
                    {t('contactTitle')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-3 mb-6 sm:mb-8 text-sm sm:text-base">
                    {t('contactIntro')}
                </p>
                
                <form
                    className="w-full flex gap-7 flex-col"
                    onSubmit={handleSubmit}
                    ref={formRef}
                >
                    <div className="space-y-2">
                        <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider">
                            {t('yourName')}
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition duration-200 dark:text-gray-200"
                            type="text"
                            name="name"
                            placeholder={t('yourName') || 'Your Name'}
                            required
                            value={form.name}
                            onChange={handleForm}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider">
                            {t('yourEmail')}
                        </label>
                        <input
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition duration-200 dark:text-gray-200"
                            name="email"
                            value={form.email}
                            placeholder={t('yourEmail') || 'Your Email'}
                            onChange={handleForm}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            type="email"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-gray-700 dark:text-gray-300 font-semibold text-sm uppercase tracking-wider">
                            {t('yourMessage')}
                        </label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition duration-200 resize-none dark:text-gray-200"
                            name="message"
                            value={form.message}
                            placeholder={t('yourMessage') || 'Your Message'}
                            onChange={handleForm}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                            rows={5}
                        />
                    </div>
                    
                    <button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                        type="submit"
                        disabled={isLoading}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {t('sending') || 'Sending...'}
                            </span>
                        ) : t('send') || 'Send Message'}
                    </button>
                </form>
            </div>
            
            <div className="lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[330px]">
                <Canvas
                    camera={{
                        position: [0, 0, 5],
                        fov: 75,
                        near: 0.1,
                        far: 1000
                    }}
                >
                    <Suspense fallback={<Loader />}>
                        <directionalLight position={[1, 1, 1]} intensity={3} />
                        <ambientLight intensity={1} />
                        <Dragon
                            currentAnimation={currentAnimation}
                            position={[0.5, -0.35, 0.6]}
                            rotation={[0, 5.8, 0]}
                            scale={[0.5, 0.5, 0.5]}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};

export default Contact;