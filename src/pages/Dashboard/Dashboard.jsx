import React, { useEffect, useState } from 'react';
import { ReactLoading } from 'react-loading';
import { Link } from 'react-router-dom';
import { Nav, StatItem } from '../../components';
import './Dashboard.scss';

function Dashboard({ user }) {

  const [performanceData, setPerformanceData] = useState({
    bestNote: 'B3',
    challengeIntervalLow: 'A3',
    challengeIntervalHigh: 'Eb3',
    lowestNote: 'A2',
    highestNote: 'F#4',
    register: 'Tenor'
  });

  useEffect(() => {
    // Get user performance data and store in object
  }, [])

  if (!user) {
    return (
        <div className="loading__container">
            <ReactLoading type={'bubbles'} color={'#B65245'} height={'5rem'} width={'5rem'} />
        </div>
    )
} else {
  return (
    <main className="dashboard">
      <div className="dashboard__inner">
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
            <Link to={`/${user.urlName}/perform`}><div className="dashboard__activity">
              <span>Expand your belting range</span>
            </div></Link>
            <Link to={`/${user.urlName}/perform`}><div className="dashboard__activity">
              <span>Dances with Intervals</span>
            </div></Link>
            <Link to={`/${user.urlName}/perform`}><div className="dashboard__activity">
              <span>Crash Practice</span>
            </div></Link>
          </section>
        </div>
    </main>
  )
  }
}

export default Dashboard;
