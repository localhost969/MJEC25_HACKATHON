import React, { memo } from 'react';
import { MapPinIcon, CurrencyDollarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { Job } from '../../lib/jobsService';
import styles from './JobCard.module.css';

interface JobCardProps {
  job: Job;
  onViewDetails: (job: Job) => void;
}

const JobCard: React.FC<JobCardProps> = ({ job, onViewDetails }) => {
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(job.applicationLink, '_blank');
  };

  return (
    <div className={styles.card} onClick={() => onViewDetails(job)}>
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className={styles.logo}
            loading="lazy"
          />
        </div>
        <div className={styles.companyInfo}>
          <h3 className={styles.title}>{job.title}</h3>
          <p className={styles.company}>{job.company}</p>
        </div>
      </div>
      
      <div className={styles.details}>
        <div className={styles.location}>
          <MapPinIcon width={16} height={16} />
          <span>{job.location}</span>
        </div>
        <div className={styles.salary}>
          <CurrencyDollarIcon width={16} height={16} />
          <span><span className={styles.highlight}>{job.salary}</span> per annum</span>
        </div>
        <div className={styles.posted}>
          <ClockIcon width={16} height={16} />
          <span>Posted {job.postedAt}</span>
        </div>
      </div>
      
      <div className={styles.footer}>
        <button 
          className={styles.applyButton}
          onClick={handleApply}
        >
          Apply Now
        </button>
        <button 
          className={styles.moreButton}
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(job);
          }}
        >
          More Info
        </button>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(JobCard); 