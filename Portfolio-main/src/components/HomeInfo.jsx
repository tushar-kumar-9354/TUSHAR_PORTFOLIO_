import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useLanguage } from "../contexts/LanguageContext";

const InfoBox=({text,btnText,link})=>{
    return(
        <div className="info-box">
            <p className="font-medium sm:text-xl text-center">{text}</p>
            <Link to={link} className="neo-btn neo-brutalism-white">
                {btnText}
                <ArrowForwardIcon/>
            </Link>
        </div>
    );

    
}

const HomeInfo=({currentStage})=>{
    const { t } = useLanguage();
    
    const renderContent={
        1:
        (
            <h1 
                className="text-lg sm:text-xl sm:leading-snug text-center neo-brutalism-blue text-white py-3 sm:py-4 px-4 sm:px-8 mx-2 sm:mx-5"
            >
                {t('homeInfoGreeting')} <span className="font-bold">{t('homeInfoName')}</span> 
                <br/>
                <span className="text-xs sm:text-sm">{t('homeInfoTitle')}</span>
            </h1>
        ),
        2:(
            <InfoBox 
            text={t('homeInfoStage2')}
            btnText={t('homeInfoStage2Btn')}
            link="/about"
            />
            
        ),
        3:(
            <InfoBox 
            text={t('homeInfoStage3')}
            btnText={t('homeInfoStage3Btn')}
            link="/project"
            />
        ),
        
        4:(
            <InfoBox 
            text={t('homeInfoStage4')}
            btnText={t('homeInfoStage4Btn')}
            link="/contact"
            />
        ),
    }
    return renderContent[currentStage] || null;
}
export default HomeInfo;