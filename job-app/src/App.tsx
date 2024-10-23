import { useState } from 'react'
import './App.css'

interface JobObject {
  company: string;
  domain: string;
  application_url: string;
  position: string;
  department: string;
  about_the_company: string;
  salary: string;
  about_the_role: string;
  position_responsibilities: string[];
  requirements: string[];
  preferred_skills: string[];
  children?: React.ReactNode | undefined;
  childrenElement: React.JSX.Element
}

const jobData = import.meta.glob('../../job.json', { eager: true })
const parsedJobData: JobObject = JSON.parse(JSON.stringify(jobData['../../job.json']))

function App() {
  const [job, setJob] = useState<JobObject>(parsedJobData)

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    setJob({
      ...job,
      [e.target.id]: e.target.value
    })
  }


  return (
    <>
      <h1>Job Things</h1>
      <div className="app-wrapper">
        <div className="form-wrapper">
          <div className="company-items">
            <div className="read-the-docs">
              <input id="company" type="text" value={job.company} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <input id="domain" type="text" value={job.domain} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <input id="application_url" type="text" value={job.application_url} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <textarea id="about_the_company" value={job.about_the_company} onChange={handleJobChange} />
            </div>
          </div>
          <div className="position-overview">
            <div className="read-the-docs">
              <input id="position" type="text" value={job.position} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <input id="department" type="text" value={job.department} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <input id="salary" type="text" value={job.salary} onChange={handleJobChange} />
            </div>
          </div>
          <div className="position-specifics">

            <div className="read-the-docs">
              <textarea id="about_the_role" value={job.about_the_role} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <textarea id="position_responsibilities" value={job.position_responsibilities} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <textarea id="requirements" value={job.requirements} onChange={handleJobChange} />
            </div>
            <div className="read-the-docs">
              <textarea id="preferred_skills" value={job.preferred_skills} onChange={handleJobChange} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App

