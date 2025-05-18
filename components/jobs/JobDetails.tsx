import React, { useEffect } from 'react';
import { 
  XMarkIcon, 
  MapPinIcon, 
  CurrencyDollarIcon, 
  ClockIcon,
  ArrowTopRightOnSquareIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { Job } from '../../lib/jobsService';
import styles from './JobDetails.module.css';

interface JobDetailsProps {
  job: Job;
  onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    // Prevent scrolling on body
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleApply = () => {
    window.open(job.applicationLink, '_blank');
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className={styles.logo}
              loading="lazy"
            />
          </div>
          <div className={styles.headerInfo}>
            <h2 className={styles.title}>{job.title}</h2>
            <div className={styles.companyDetails}>
              <BuildingOfficeIcon width={16} height={16} />
              <span className={styles.company}>{job.company}</span>
            </div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <XMarkIcon width={24} height={24} />
          </button>
        </div>
        
        <div className={styles.content}>
          <div className={styles.infoBox}>
            <div className={styles.infoItem}>
              <MapPinIcon width={20} height={20} />
              <span>{job.location}</span>
            </div>
            <div className={styles.infoItem}>
              <CurrencyDollarIcon width={20} height={20} />
              <span className={styles.highlight}>{job.salary}</span><span> per annum</span>
            </div>
            <div className={styles.infoItem}>
              <ClockIcon width={20} height={20} />
              <span>Posted {job.postedAt}</span>
            </div>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Job Description</h3>
            <p className={styles.description}>{job.description}</p>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Key Responsibilities</h3>
            <ul className={styles.list}>
              {job.responsibilities.map((responsibility, index) => (
                <li key={`resp-${index}`}>{responsibility}</li>
              ))}
            </ul>
          </div>
          
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Requirements</h3>
            <ul className={styles.list}>
              {job.requirements.map((requirement, index) => (
                <li key={`req-${index}`}>{requirement}</li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className={styles.footer}>
          <button className={styles.closeTextButton} onClick={onClose}>
            Close
          </button>
          <button className={styles.applyButton} onClick={handleApply}>
            Apply on LinkedIn
            <ArrowTopRightOnSquareIcon width={16} height={16} style={{ marginLeft: '0.5rem' }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails; 