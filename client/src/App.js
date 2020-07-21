import React, { useEffect, useState } from 'react'
import './App.css'
import Jobs from './Jobs'

const JOB_API_URL = 'http://localhost:3001/jobs'

async function fetchJobs(updateCb) {
	const jobs = await fetch(JOB_API_URL)
	const json = await jobs.json()
	updateCb(json)
}

function App() {
	const [jobList, updateJobs] = useState([])

	useEffect(() => {
		fetchJobs(updateJobs)
	}, [])

	return (
		<div className='App'>
			<Jobs jobs={jobList} />
		</div>
	)
}

export default App
