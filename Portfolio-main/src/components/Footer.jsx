import { Link } from "react-router-dom";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

import { useLanguage } from '../contexts/LanguageContext';

const Footer=()=>{
    const { t } = useLanguage();
    
    return(
        <section className="mt-20">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-12">
                <div className="flex lg:flex-row flex-col justify-between items-center">
                    <div className="lg:text-left text-center mb-8 lg:mb-0">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent mb-3">
                            {t('footerTitle')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                            {t('footerSubtitle')}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/contact" 
                              className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-8 py-3 rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2">
                            {t('getInTouch')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
                
                <div className="mt-16 border-t border-gray-200 dark:border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-gray-600 dark:text-gray-400">{t('allRightsReserved')}</p>
                        <div className="flex gap-6">
                            <a href="https://www.linkedin.com/in/tushar-kumar-a0a013326" 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                <LinkedInIcon className="w-6 h-6"/>
                            </a>
                            <a href="https://github.com/tushar-kumar-9354" 
                               target="_blank" 
                               rel="noreferrer"
                               className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                                <GitHubIcon className="w-6 h-6"/>
                            </a>
                           
                            <a href="mailto:jangratushar348@gmail.com"
                               className="text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Footer;