import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Nav, StatItem } from '../../components';
import './Dashboard.scss';

function Dashboard({ user, userData }) {

  const history = useHistory();
  const [performanceData, setperformanceData] = useState({
    bestNote: 'F#4',
    challengeIntervalLow: 'G3',
    challengeIntervalHigh: 'D4',
    lowestNote: 'A2',
    highestNote: 'D#4',
    register: 'Tenor'
  });

  useEffect(() => {
    // Get user performance data and store in object
  }, [])

  if (!user) {
    return "Loading"
  } else {
  return (
    <main className="dashboard">
      <Nav user={user} currentPage="dash" />
      <section className="dashboard__progress-container">
        {/* place data visuals here */}
      </section>
      <section className="dashboard__stats-container">
        <div className="dashboard__stats-container-left">
          <StatItem type='range'
            title='Belting Range'
            value={performanceData.lowestNote}
            value2={performanceData.highestNote}
          />
          <StatItem
            title='Natural Register'
            value={performanceData.register}
          />
        </div>
        <div className="dashboard__stats-container-right">
          <StatItem
            title='Power Note'
            value={performanceData.bestNote}
          />
          <StatItem
            type='range'
            title='Weakest Interval'
            value={performanceData.challengeIntervalLow}
            value2={performanceData.challengeIntervalHigh}
          />
        </div>
        </section>
        <section className="dashboard__activity-container">
          <Link to="/perform/:uid"><div className="dashboard__activity">
            <span>Expand your belting range</span>
          </div></Link>
          <Link to="/perform/:uid"><div className="dashboard__activity">
            <span>Dances with Intervals</span>
          </div></Link>
          <Link to="/perform/:uid"><div className="dashboard__activity">
            <span>Crash Practice</span>
          </div></Link>
        </section>
      
    </main>
  )
  }
}

export default Dashboard;
