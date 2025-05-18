import React, { useState, useEffect, useMemo } from 'react';
import { getJobs, Job } from '../../lib/jobsService';
import JobCard from './JobCard';
import JobDetails from './JobDetails';
import { 
  AdjustmentsHorizontalIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  FunnelIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import styles from './JobList.module.css';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

type LocationFilter = 'all' | 'remote' | 'on-site' | 'hybrid';
type SalaryFilter = 'all' | 'high' | 'medium' | 'low';

const JobList: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [locationFilter, setLocationFilter] = useState<LocationFilter>('all');
  const [salaryFilter, setSalaryFilter] = useState<SalaryFilter>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Get unique companies for filter
  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(jobs.map(job => job.company))];
    return uniqueCompanies.sort();
  }, [jobs]);

  // Filter jobs based on selection
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      // Company filter
      if (companyFilter !== 'all' && job.company !== companyFilter) {
        return false;
      }
      
      // Location filter
      if (locationFilter !== 'all') {
        const location = job.location.toLowerCase();
        if (locationFilter === 'remote' && !location.includes('remote')) {
          return false;
        }
        if (locationFilter === 'on-site' && location.includes('remote')) {
          return false;
        }
        if (locationFilter === 'hybrid' && !location.includes('hybrid')) {
          return false;
        }
      }

      // Salary filter
      if (salaryFilter !== 'all') {
        // Extract the numeric part from the salary (assuming format like "₹12,00,000 - ₹18,00,000")
        const salaryMatch = job.salary.match(/₹(\d+),(\d+),(\d+)/);
        if (salaryMatch) {
          const minSalary = parseInt(salaryMatch[1] + salaryMatch[2] + salaryMatch[3], 10);
          
          if (salaryFilter === 'high' && minSalary < 2000000) {
            return false;
          }
          if (salaryFilter === 'medium' && (minSalary < 1400000 || minSalary >= 2000000)) {
            return false;
          }
          if (salaryFilter === 'low' && minSalary >= 1400000) {
            return false;
          }
        }
      }

      return true;
    });
  }, [jobs, locationFilter, salaryFilter, companyFilter]);

  const handleViewDetails = (job: Job) => {
    setSelectedJob(job);
  };

  const handleCloseDetails = () => {
    setSelectedJob(null);
  };

  const resetFilters = () => {
    setLocationFilter('all');
    setSalaryFilter('all');
    setCompanyFilter('all');
  };

  // Count active filters
  const activeFilterCount = [
    locationFilter !== 'all',
    salaryFilter !== 'all',
    companyFilter !== 'all'
  ].filter(Boolean).length;

  // For very large datasets, use virtualization
  const renderJobList = () => {
    if (filteredJobs.length <= 20) {
      return (
        <div className={styles.grid}>
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      );
    }

    // For larger datasets, use virtualization
    return (
      <div style={{ height: 800, width: '100%' }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              itemCount={filteredJobs.length}
              itemSize={220}
              width={width}
            >
              {({ index, style }) => (
                <div style={style}>
                  <JobCard
                    job={filteredJobs[index]}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              )}
            </List>
          )}
        </AutoSizer>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Find Your Next Opportunity</h2>
          <p className={styles.subtitle}>Browse through available positions that match your skills and interests</p>
        </div>
        
        <button 
          className={styles.filterToggle}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FunnelIcon className={styles.filterIcon} />
          Filters
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className={styles.filterPanel}>
          <div className={styles.filterHeader}>
            <h3>Refine Results</h3>
            <div className={styles.filterActions}>
              <button className={styles.resetButton} onClick={resetFilters}>
                Reset Filters
              </button>
              <button className={styles.closeFiltersButton} onClick={() => setShowFilters(false)}>
                <XMarkIcon width={20} height={20} />
              </button>
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h4 className={styles.filterSectionTitle}>
              <MapPinIcon width={18} height={18} />
              Location
            </h4>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterOption} ${locationFilter === 'all' ? styles.active : ''}`}
                onClick={() => setLocationFilter('all')}
              >
                All Locations
              </button>
              <button 
                className={`${styles.filterOption} ${locationFilter === 'remote' ? styles.active : ''}`}
                onClick={() => setLocationFilter('remote')}
              >
                Remote
              </button>
              <button 
                className={`${styles.filterOption} ${locationFilter === 'on-site' ? styles.active : ''}`}
                onClick={() => setLocationFilter('on-site')}
              >
                On-site
              </button>
              <button 
                className={`${styles.filterOption} ${locationFilter === 'hybrid' ? styles.active : ''}`}
                onClick={() => setLocationFilter('hybrid')}
              >
                Hybrid
              </button>
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h4 className={styles.filterSectionTitle}>
              <CurrencyDollarIcon width={18} height={18} />
              Salary Range
            </h4>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterOption} ${salaryFilter === 'all' ? styles.active : ''}`}
                onClick={() => setSalaryFilter('all')}
              >
                All Salaries
              </button>
              <button 
                className={`${styles.filterOption} ${salaryFilter === 'high' ? styles.active : ''}`}
                onClick={() => setSalaryFilter('high')}
              >
                ₹20L+
              </button>
              <button 
                className={`${styles.filterOption} ${salaryFilter === 'medium' ? styles.active : ''}`}
                onClick={() => setSalaryFilter('medium')}
              >
                ₹14L-₹20L
              </button>
              <button 
                className={`${styles.filterOption} ${salaryFilter === 'low' ? styles.active : ''}`}
                onClick={() => setSalaryFilter('low')}
              >
                Under ₹14L
              </button>
            </div>
          </div>
          
          <div className={styles.filterSection}>
            <h4 className={styles.filterSectionTitle}>
              <BuildingOfficeIcon width={18} height={18} />
              Company
            </h4>
            <div className={styles.filterOptions}>
              <button 
                className={`${styles.filterOption} ${companyFilter === 'all' ? styles.active : ''}`}
                onClick={() => setCompanyFilter('all')}
              >
                All Companies
              </button>
              {companies.map(company => (
                <button 
                  key={company}
                  className={`${styles.filterOption} ${companyFilter === company ? styles.active : ''}`}
                  onClick={() => setCompanyFilter(company)}
                >
                  {company}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className={styles.resultsInfo}>
        <span className={styles.resultCount}>
          Showing {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''}
        </span>
        {activeFilterCount > 0 && (
          <button className={styles.clearFilters} onClick={resetFilters}>
            Clear all filters
          </button>
        )}
      </div>

      {loading ? (
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>
            <ArrowPathIcon width={20} height={20} />
            <span>Loading jobs...</span>
          </div>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className={styles.empty}>
          <p>No jobs match your current filters. Try adjusting your search criteria.</p>
          <button className={styles.resetButton} onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      ) : (
        renderJobList()
      )}

      {selectedJob && (
        <JobDetails job={selectedJob} onClose={handleCloseDetails} />
      )}
    </div>
  );
};

export default JobList; 