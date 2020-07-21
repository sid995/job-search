import React, { useState } from 'react'
import { Typography, MobileStepper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import { makeStyles, withStyles } from '@material-ui/core/styles'

import Job from './Job'
import JobModal from './JobModal'

const useStyles = makeStyles({
	root: {
		flexGrow: 1
	}
})

const StepperCss = withStyles({
	'@global': {
		'.MuiMobileStepper-progress': {
			width: '75%'
		}
	}
})(() => null)

export default function Jobs({ jobs }) {
	// modal open/close
	const [open, setOpen] = useState(false)
	const [selectedJob, setSelectedJob] = useState({})

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	//Pagination
	const [activeStep, setActiveStep] = useState(0)
	const numJobs = jobs.length
	const numPages = Math.ceil(numJobs / 50)
	const jobsOnPage = jobs.slice(activeStep * 50, activeStep * 50 + 50)

	function handleNext() {
		setActiveStep(prevActiveStep => prevActiveStep + 1)
	}

	function handleBack() {
		setActiveStep(prevActiveStep => prevActiveStep - 1)
	}

	// custom classes
	const classes = useStyles()

	return (
		<div className='jobs'>
			<JobModal open={open} job={selectedJob} handleClose={handleClose} />
			<StepperCss />
			<Typography variant='h4' component='h1' style={{ textAlign: 'center', marginBottom: 10 }}>
				Entry Level Software Jobs
			</Typography>
			<Typography variant='h6' component='h2' style={{ textAlign: 'center', marginBottom: 10 }}>
				Found {numJobs} Jobs
			</Typography>
			{jobsOnPage.map((job, i) => (
				<Job
					job={job}
					key={i}
					onClick={() => {
						handleClickOpen()
						setSelectedJob(job)
					}}
				/>
			))}

			<div style={{ width: '70%', margin: '0 auto' }}>
				<div>
					Page {activeStep + 1} of {numPages}
				</div>

				<MobileStepper
					variant='progress'
					steps={numPages}
					position='static'
					activeStep={activeStep}
					className={classes.root}
					nextButton={
						<Button size='small' onClick={handleNext} disabled={activeStep === numPages - 1}>
							Next
							{<KeyboardArrowRight />}
						</Button>
					}
					backButton={
						<Button size='small' onClick={handleBack} disabled={activeStep === 0}>
							{<KeyboardArrowLeft />}
							Back
						</Button>
					}
				/>
			</div>
		</div>
	)
}
