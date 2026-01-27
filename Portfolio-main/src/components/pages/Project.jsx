import { projects } from '../../assets/asserts';
import { useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import Footer from '../Footer';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';

// Update your projectTranslationMap in Project.jsx to match these titles:
const projectTranslationMap = {
  'KPRGTech': {
    title: 'projectKPRGTechTitle',
    description: 'projectKPRGTechDesc'
  },
  'SolarTech Gen': {
    title: 'projectSolarTechTitle', 
    description: 'projectSolarTechDesc'
  },
  'Resume Optimizer AI': {
    title: 'projectResumeAITitle',
    description: 'projectResumeAIDesc'
  },
  'AstroGPT': {
    title: 'projectAstroGPTTitle',
    description: 'projectAstroGPTDesc'
  },
  'Python Mastery': {
    title: 'projectPythonMasteryTitle',
    description: 'projectPythonMasteryDesc'
  },
  'Civic Complaint Registration Portal': {
    title: 'projectCivicComplaintTitle',
    description: 'projectCivicComplaintDesc'
  },
  'GenAI Hub': {
    title: 'projectGenAIHubTitle',
    description: 'projectGenAIHubDesc'
  },
  'Portfolio (Old)': {
    title: 'projectPortfolioTitle',
    description: 'projectPortfolioDesc'
  }
};

// Also update projectImages to match:
const projectImages = {
  'KPRGTech': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80',
  'SolarTech Gen': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80',
  'Resume Optimizer AI': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop&auto=format&q=80',
  'AstroGPT': 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?w=800&h=400&fit=crop&auto=format&q=80',
  'Python Mastery': 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop&auto=format&q=80',
  'Civic Complaint Registration Portal': 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=400&fit=crop&auto=format&q=80',
  'GenAI Hub': 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop&auto=format&q=80',
  'Portfolio (Old)': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80'
};


const ProjectCard = ({ project, index }) => {
    const { t } = useLanguage();
    
    const techStack = project.techStack || [];
    const features = project.features || [];
    const metrics = project.metrics || {};
    const type = project.type || "Personal Project";
    const liveLink = project.liveLink || project.link;
    const githubLink = project.githubLink || null;
    
    // Get translation for project title and description
    const translationKeys = projectTranslationMap[project.title];
    const title = translationKeys?.title ? t(translationKeys.title) : project.title;
    const description = translationKeys?.description ? t(translationKeys.description) : (project.description || project.text);
    
    // Get project image
    const getProjectImage = () => {
        if (project.image) {
            return project.image;
        }
        if (projectImages[project.title]) {
            return projectImages[project.title];
        }
        return 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop&auto=format&q=80';
    };

    // Get translated feature
    const getTranslatedFeature = (feature) => {
        const featureMap = {
            "AI assistants in every lesson": 'aiAssistants',
            "Automated AI-generated quizzes": 'automatedQuizzes',
            "Progress tracking and skill evaluation": 'progressTracking',
            "Personalized learning paths": 'personalizedLearning',
            "AI-powered resume parsing": 'resumeParsing',
            "Skill gap identification": 'skillGapAnalysis',
            "Personalized project recommendations": 'projectRecommendations',
            "Performance history tracking": 'performanceTracking',
            "AI-powered summaries and insights": 'aiSummaries',
            "Automated data visualization": 'dataVisualization',
            "Anomaly detection with AI": 'anomalyDetection',
            "PDF/CSV report generation": 'automatedReporting',
            "Role-based access control": 'roleBasedAccess',
            "Real-time status updates": 'realtimeUpdates',
            "Complaint tracking system": 'complaintTracking'
        };
        
        if (featureMap[feature]) {
            return t(featureMap[feature]);
        }
        return feature;
    };

    // Translate metrics keys
    const getTranslatedMetric = (key) => {
        const metricMap = {
            'Users': 'metricUsers',
            'Engagement': 'metricEngagement',
            'Accuracy': 'metricAccuracy',
            'Efficiency': 'metricEfficiency',
            'Revenue': 'metricRevenue',
            'Growth': 'metricGrowth'
        };
        
        if (metricMap[key]) {
            return t(metricMap[key]);
        }
        return key.replace(/([A-Z])/g, ' $1').trim();
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 animate-fadeIn`}
             style={{ animationDelay: `${index * 0.1}s` }}>
            
            {/* Project Image Banner */}
            <div className="relative h-48 sm:h-56 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
                <img 
                    src={getProjectImage()} 
                    alt={title} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                
                {project.logo && (
                    <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/90 dark:bg-gray-800/90 rounded-xl p-2 shadow-lg backdrop-blur-sm">
                        <img 
                            src={project.logo} 
                            alt={`${title} logo`}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}
                
                {/* Project Type Badge */}
                <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm border ${
                        type === 'Client Work' ? 'bg-green-500/20 text-green-100 border-green-500/30' :
                        'bg-blue-500/20 text-blue-100 border-blue-500/30'
                    }`}>
                        {type === 'Client Work' ? t('clientWork') : t('personalProject')}
                    </span>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                {/* Title and Role */}
                <div className="mb-4">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">{title}</h3>
                    {project.subTitle && (
                        <p className="text-lg text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {project.subTitle}
                        </p>
                    )}
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        {project.duration && (
                            <span className="flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z" clipRule="evenodd" />
                                </svg>
                                {project.duration}
                            </span>
                        )}
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {t('fullStackDev')}
                        </span>
                    </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed line-clamp-3">
                    {description}
                </p>

                {/* Tech Stack */}
                {techStack.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('techStack')}</h4>
                        <div className="flex flex-wrap gap-2">
                            {techStack.map((tech, idx) => (
                                <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Key Features */}
                {features.length > 0 && (
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('keyFeatures')}</h4>
                        <ul className="grid grid-cols-1 gap-1">
                            {features.slice(0, 3).map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <svg className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    {getTranslatedFeature(feature)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Metrics */}
                {Object.keys(metrics).length > 0 && (
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">{t('keyMetrics')}</h4>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(metrics).slice(0, 4).map(([key, value], idx) => (
                                <div key={idx} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">{value}</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">
                                        {getTranslatedMetric(key)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
                    {liveLink && (
                        <a href={liveLink} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                            <LaunchIcon className="w-4 h-4" />
                            {liveLink.includes('github') ? t('viewProject') : t('liveDemo')}
                        </a>
                    )}
                    {githubLink && (
                        <a href={githubLink} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                            <GitHubIcon className="w-4 h-4" />
                            {t('viewCode')}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

const Project = () => {
    const { t } = useLanguage();
    
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; opacity: 0; }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    return (
        <section className='max-container'>
            {/* Header Section */}
            <div className='text-center mb-12 sm:mb-16'>
                <h1 className='font-bold text-2xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent'>
                    {t('projectsTitle')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-lg max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
                    {t('projectsIntro')}
                </p>
            </div>

            {/* Projects Grid */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-16 sm:mb-20 px-4 sm:px-0'>
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                ))}
            </div>

            {/* Call to Action */}
            <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl mb-20">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                    {t('interestedWorking')}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                    {t('interestedWorkingDesc')}
                </p>
                <div className="flex gap-4 justify-center">
                    <a href="/contact" 
                       className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                        {t('getInTouch')}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                    <a href="https://github.com/tushar-kumar-9354?tab=repositories" 
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-900 hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                        <GitHubIcon className="w-5 h-5" />
                        {t('moreOnGitHub')}
                    </a>
                </div>
            </div>

            <Footer />
        </section>
    );
}

export default Project;