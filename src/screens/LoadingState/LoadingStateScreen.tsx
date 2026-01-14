import { useState, useEffect } from "react";
import styles from "./LoadingStateScreen.module.css";
import { Header } from "../../components/Header/Header";
import { RequestPreview } from "../RequestCreationEdit/RequestCreationEditScreen";
import { DevButtons } from "../../components/DevButtons/DevButtons";
import loadingGif from "../../assets/loading-animation.gif";

type GoalOption = {
  id: string;
  title: string;
  description: string;
  badge?: string;
};

const goalOptions: GoalOption[] = [
  {
    id: "pool",
    title: "See Mellow pool",
    description: "Review AI-matched contractors from our pool"
  },
  {
    id: "matches",
    title: "Get 3 matches in 48h",
    description: "We source and reach out for you",
    badge: "Ultra"
  },
  {
    id: "share",
    title: "Create a page to share",
    description: "Get a shareable page to post in your network"
  },
  {
    id: "exploring",
    title: "Just exploring",
    description: "Looking for a new opportunity"
  }
];

export function LoadingStateScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [shouldNavigateAfterLoad, setShouldNavigateAfterLoad] = useState(false);

  // Default data for preview (same as in RequestCreationEditScreen)
  const defaultData = {
    requestTitle: "Graphic Designer for Social Media Optimisation",
    roleTitle: "Graphic Designer",
    experienceLevel: "Middle",
    skills: ["Figma", "Canva", "Adobe Photoshop"],
    languages: ["English"],
    negotiable: false,
    paymentType: "hourly" as const,
    fromRate: "20",
    toRate: "30",
    currency: "USD",
    timelineFlexible: false,
    startDate: "asap" as const,
    workload: "Less than 20 hours per week",
    companyName: "",
    website: "",
    projectSummaryText: "We are seeking a talented Graphic Designer to lead the visual redesign of our social media presence and marketing materials. This project aims to enhance brand identity, improve visual appeal, and optimize graphics for engagement and clarity. The ideal candidate will collaborate closely with marketing managers and content creators to create intuitive, engaging, and modern visual designs that align with brand guidelines and audience preferences.",
    keyResponsibilitiesList: [
      "Design and deliver high-quality visual content for social media platforms",
      "Create engaging graphics, illustrations, and layouts that align with brand guidelines",
      "Collaborate with marketing team to develop creative concepts and visual strategies",
      "Ensure consistency across all marketing materials and social media channels"
    ],
    requirementsList: [
      "Proficiency in design software such as Figma, Adobe Creative Suite, and Canva",
      "Strong portfolio demonstrating creative design skills",
      "Ability to work independently and meet deadlines",
      "Excellent communication skills and attention to detail"
    ],
    preferredSkillsList: [
      "Experience with social media design and marketing materials",
      "Knowledge of current design trends and best practices",
      "Understanding of brand identity and visual communication",
      "Ability to adapt designs for different platforms and formats"
    ],
    experienceLevelText: "We are looking for a mid-level to senior graphic designer with 3-5 years of experience in social media and marketing design. The ideal candidate should have a proven track record of creating engaging visual content and working collaboratively with marketing teams."
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Если загрузка завершилась и была выбрана цель во время загрузки - перейти через 4 секунды
  useEffect(() => {
    if (!isLoading && shouldNavigateAfterLoad && selectedGoal) {
      const navigateTimer = setTimeout(() => {
        window.location.href = '/edit';
      }, 4000);
      return () => clearTimeout(navigateTimer);
    }
  }, [isLoading, shouldNavigateAfterLoad, selectedGoal]);

  const handleGoalSelect = (goalId: string) => {
    setSelectedGoal(goalId);
    
    if (isLoading) {
      // Если загрузка еще идет - установить флаг для перехода после завершения
      setShouldNavigateAfterLoad(true);
    } else {
      // Если загрузка завершена - сразу перейти
      setTimeout(() => {
        window.location.href = '/edit';
      }, 300);
    }
  };

  return (
    <div className={styles.screen}>
      <Header />
      <DevButtons />
      <div className={styles.pageSpacer}>
        <div className={styles.container}>
          <div className={styles.leftColumn}>
            {isLoading ? (
              <div className={styles.loadingSection}>
                <div className={styles.loadingAnimation}>
                  <img 
                    src={loadingGif} 
                    alt="Loading animation" 
                    className={styles.loadingGif}
                  />
                </div>
                <div className={styles.loadingTextWrapper}>
                  <h2 className={styles.loadingTitle}>Almost Ready</h2>
                  <p className={styles.loadingText}>
                    Generating your request...<br />
                    Keep this tab open
                  </p>
                </div>
              </div>
            ) : (
              <div className={styles.previewWrapper}>
                <RequestPreview {...defaultData} />
              </div>
            )}
          </div>
          
          <div className={styles.rightColumn}>
            <div className={styles.goalHeader}>
              <h1 className={styles.goalTitle}>Choose Your Goal To Move Forward:</h1>
              <p className={styles.goalSubtitle}>
                There's no wrong choice - this just helps us tailor next steps:
              </p>
            </div>
            
            <div className={styles.goalOptions}>
              {goalOptions.map((option) => (
                <div 
                  key={option.id} 
                  className={styles.goalCard}
                  onClick={() => handleGoalSelect(option.id)}
                  style={{ 
                    cursor: 'pointer',
                    borderColor: selectedGoal === option.id ? 'var(--ds-color-button-brand)' : undefined
                  }}
                >
                  {option.badge && (
                    <span className={styles.accentBadge}>{option.badge}</span>
                  )}
                  <div className={styles.goalCardContent}>
                    <div 
                      className={styles.radioButton}
                      style={{
                        borderColor: selectedGoal === option.id ? 'var(--ds-color-button-brand)' : undefined,
                        background: selectedGoal === option.id ? 'var(--ds-color-button-brand)' : undefined
                      }}
                    >
                      {selectedGoal === option.id && (
                        <div style={{
                          width: '10px',
                          height: '10px',
                          borderRadius: '50%',
                          background: 'white',
                          margin: '3px'
                        }}></div>
                      )}
                    </div>
                    <div className={styles.goalCardText}>
                      <div className={styles.goalCardHeader}>
                        <h3 className={styles.goalCardTitle}>{option.title}</h3>
                      </div>
                      <p className={styles.goalCardDescription}>{option.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
