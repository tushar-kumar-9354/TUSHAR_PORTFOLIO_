    import { skillsData } from "../../assets/asserts";
    import { useEffect } from "react";
    import { useLanguage } from "../../contexts/LanguageContext";
    import Footer from "../Footer"

    const Education=({link,course,institute,duration,percent})=>{
    return(
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow ed_hid">
        <div className="flex items-start gap-6">
            <img src={link} alt="edu_Image" className="w-20 h-20 rounded-lg object-cover shadow-md"/>
            <div className="flex-1">
            <h3 className="font-bold text-lg text-gray-800 dark:text-gray-200 mb-1">{course}</h3>
            <h4 className="text-gray-700 dark:text-gray-300 font-medium mb-2">{institute}</h4>
            <div className="flex justify-between items-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">{duration}</p>
                <p className="font-semibold text-blue-600 dark:text-blue-400">{percent}</p>
            </div>
            </div>
        </div>
        </div>
    );
    }

    const About =()=>{
        const { t } = useLanguage();
        
        useEffect(() => {
            const observe = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add("sho");
                } else {
                entry.target.classList.remove("sho");
                }
            });
            });
            const observeED = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                entry.target.classList.add("ed_sho");
                } else {
                entry.target.classList.remove("ed_sho");
                }
            });
            });
        
            const hidden = document.querySelectorAll(".hid");
            hidden.forEach((e) => {
            observe.observe(e);
            });
            const edu_hidden = document.querySelectorAll(".ed_hid");
            edu_hidden.forEach((e) => {
            observeED.observe(e);
            });
        
        
            return () => {
            observe.disconnect();
            };
        }, []);
        
        return(
            <section className="max-container">

                <div className="lg:mb-20 mb-6 ">
                <div className="flex mb-8 relative">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">{t('aboutGreeting')}</h1>
                </div>
                <h3 className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
                    {t('aboutIntro')}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg">
                    <h4 className="font-bold text-2xl text-blue-600 mb-2">30+</h4>
                    <p className="text-gray-700 dark:text-gray-800">{t('transactionsProcessed', 'Projects Completed')}</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg">
                    <h4 className="font-bold text-2xl text-green-600 mb-2">25+</h4>
                    <p className="text-gray-700 dark:text-gray-800">{t('activeUsers', 'GitHub Repositories')}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg">
                    <h4 className="font-bold text-2xl text-purple-600 mb-2">300+</h4>
                    <p className="text-gray-700 dark:text-gray-800">{t('deliverySpeed', 'DSA Problems Solved')}</p>
                    </div>
                </div>
                </div>

                {/* Technical Skills Section - Replacing Professional Experience */}

    {/* Core Competencies - Refined for Tushar */}
    {/* Core Competencies */}
    <div className="lg:mt-20 mt-16 lg:mb-20 mb-10">
        <h1 className="lg:text-3xl text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200">
            {t('coreCompetencies')}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-blue-700 dark:text-blue-400 mb-3">
                    {t('backendExpertise')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('backendDesc')}
                </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-purple-700 dark:text-purple-400 mb-3">
                    {t('aiIntegration')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('aiIntegrationDesc')}
                </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">
                    {t('fullStack')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('fullStackDesc')}
                </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-orange-700 dark:text-orange-400 mb-3">
                    {t('automation')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('automationDesc')}
                </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-pink-700 dark:text-pink-400 mb-3">
                    {t('problemSolving')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('problemSolvingDesc')}
                </p>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-6 rounded-xl shadow-lg hid">
                <h3 className="font-bold text-lg text-indigo-700 dark:text-indigo-400 mb-3">
                    {t('projectDelivery')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                    {t('projectDeliveryDesc')}
                </p>
            </div>

        </div>
    </div>



                <div className="lg:mt-20 mt-16 lg:mb-20 mb-6">
                    <h1 className="lg:text-3xl text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200">{t('technicalSkills')}</h1>
                    
    {/* Frontend Skills */}




    {/* Backend Skills */}
    <div className="mb-16">
        <h2 className="lg:text-2xl text-xl font-semibold mb-8 text-gray-700 dark:text-gray-300 flex items-center">
            <span className="w-1 h-6 bg-green-500 mr-3 rounded"></span>
            {t('backendDevelopment', 'Backend Development')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skillsData?.backend?.map((skill, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hid border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3 sm:mb-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 p-2">
                                <img 
                                    src={skill.icon} 
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                                    alt={skill.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            const fallbackIcon = document.createElement('div');
                                            fallbackIcon.className = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center";
                                            fallbackIcon.innerHTML = `
                                                <svg class="w-full h-full text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                            `;
                                            parent.appendChild(fallbackIcon);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">{skill.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Expert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                            {skill.level}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>

    {/* CS Fundamentals */}


    {/* AI Tools & Prompt Engineering */}
            {/* AI & Agentic Systems Skills */}
<div className="mb-16">
    <h2 className="lg:text-2xl text-xl font-semibold mb-8 text-gray-700 dark:text-gray-300 flex items-center">
        <span className="w-1 h-6 bg-purple-500 mr-3 rounded"></span>
        {t('aiSkills', 'AI & Agentic Systems')}
    </h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {skillsData?.aiSkills?.map((skill, index) => (
            <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hid border border-gray-100 dark:border-gray-700">
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3 sm:mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-2">
                            <img 
                                src={skill.icon} 
                                className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                                alt={skill.name}
                                loading="lazy"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.style.display = 'none';
                                    const parent = e.target.parentElement;
                                    if (parent) {
                                        const fallbackIcon = document.createElement('div');
                                        fallbackIcon.className = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center";
                                        fallbackIcon.innerHTML = `
                                            <svg class="w-full h-full text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M21 11c0 5.55-3.84 10.74-9 12-5.16-1.26-9-6.45-9-12V5l9-4 9 4v6zm-9 10c3.75-1 7-5.46 7-9.78V6.3l-7-3.12L5 6.3v4.92C5 15.54 8.25 20 12 21z"/>
                                            </svg>
                                        `;
                                        parent.appendChild(fallbackIcon);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">{skill.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        skill.level === 'Expert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                        skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                        {skill.level}
                    </span>
                </div>
            </div>
        ))}
    </div>
</div>
    <div className="mb-16">
        <h2 className="lg:text-2xl text-xl font-semibold mb-8 text-gray-700 dark:text-gray-300 flex items-center">
            <span className="w-1 h-6 bg-blue-500 mr-3 rounded"></span>
            {t('frontendDevelopment', 'Frontend Development')}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skillsData?.frontend?.map((skill, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hid border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3 sm:mb-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-2">
                                <img 
                                    src={skill.icon} 
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                                    alt={skill.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            const fallbackIcon = document.createElement('div');
                                            fallbackIcon.className = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center";
                                            fallbackIcon.innerHTML = `
                                                <svg class="w-full h-full text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2zm16 0v14H5V5h14z"/>
                                                </svg>
                                            `;
                                            parent.appendChild(fallbackIcon);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">{skill.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Expert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                            {skill.level}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>

    <div className="mb-16">
        <h2 className="lg:text-2xl text-xl font-semibold mb-8 text-gray-700 dark:text-gray-300 flex items-center">
            <span className="w-1 h-6 bg-orange-500 mr-3 rounded"></span>
            {t('csFundamentals', 'Computer Science Fundamentals')}
        </h2>
        <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-2xl p-6 sm:p-8 mb-8">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                        {t('csFundamentalsTitle', 'Computer Science Fundamentals')}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                        {t('csFundamentalsDesc', 'Strong foundation in core computer science concepts including data structures, algorithms, system design, and software engineering principles.')}
                    </p>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {skillsData?.csFundamentals?.map((skill, index) => (
                <div key={index} className="group bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hid border border-gray-100 dark:border-gray-700">
                    <div className="flex flex-col items-center text-center">
                        <div className="relative mb-3 sm:mb-4">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-lg bg-gradient-to-br from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 p-2">
                                <img 
                                    src={skill.icon} 
                                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain group-hover:scale-110 transition-transform duration-300" 
                                    alt={skill.name}
                                    loading="lazy"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.style.display = 'none';
                                        const parent = e.target.parentElement;
                                        if (parent) {
                                            const fallbackIcon = document.createElement('div');
                                            fallbackIcon.className = "w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center";
                                            fallbackIcon.innerHTML = `
                                                <svg class="w-full h-full text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                                </svg>
                                            `;
                                            parent.appendChild(fallbackIcon);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm mb-2">{skill.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            skill.level === 'Expert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                            skill.level === 'Advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                            {skill.level}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
                    {/* Skills Summary */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 mt-12">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">{t('technologyProficiency', 'Technology Proficiency')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg text-green-800 dark:text-green-400 mb-1">{t('expertLevel', 'Expert Level')}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('Production-ready expertise')}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg text-blue-800 dark:text-blue-400 mb-1">{t('advanced', 'Advanced')}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('Solid understanding & application')}</p>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-lg text-yellow-800 dark:text-yellow-400 mb-1">{t('intermediate', 'Intermediate')}</h4>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{t('Growing expertise & learning')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="lg:mb-20 mb-6">
                    <h1 className="lg:text-3xl text-2xl font-bold mb-10 text-gray-800 dark:text-gray-200">{t('education')}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">  
                            <Education 
    link="https://images.shiksha.com/mediadata/images/1674199807phpl6t19N.jpeg" 
    course={t('btech', 'B.Tech in Computer Science')} 
    institute={t('university', 'Dr. Akhilesh Das Gupta Institute of Technology & Management, Delhi')}
    duration="2021 - 2025" 
    percent={`${t('cgpa', 'CGPA')}: 9.00/10`}
/>

<Education 
    link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyxmprLVBTNCUj5b5ZA2j4jtVAxDy5mMh57Q&s" 
    course={t('class12th', '12th Class')}  // Note: changed from 'class 12th' to 'class12th'
    institute={t('school', 'Deep Public School, Vasant Kunj')}  // Fixed: added translation function
    duration="2009 - 2021" 
    percent="73.00%"
/>
                    </div>
                </div>
                <Footer></Footer>
            </section>
        );
        
    }
    export default About;