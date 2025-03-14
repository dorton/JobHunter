# Job Hunter

## Description

Job Hunter is a Javascript application that allows users to build resumes and covers based off of JSON files that can be generated however you would like. 


## Features
- Build a resume and cover letter based off of JSON files
- Download the resume and cover letter as a PDF
- Print the resume and cover letter
- Optionally upload the information to Hubspot as a lead to be able to track and build a campaign around.
- Copy the resume and cover letter to the clipboard WIP

## Installation
1. Clone the repository
2. Install the dependencies
```bash
npm install
```
3. Rename .env-example to .env file in the root directory and add your Hubspot API key
```bash
HUBSPOT_ACCESS_TOKEN=your_hubspot_api_key
HUBSPOT_OWNER_ID=your_hubspot_owner_id
HUBSPOT_PIPELINE_ID=your_hubspot_pipeline_id
HUBSPOT_DEAL_STAGE_ID=your_hubspot_deal_stage_id
COVER_FILE_NAME=your_cover_file_name
RESUME_FILE_NAME=your_resume_file_name
SUBMITTED_COVERS=your_submitted_covers_folder
SUBMITTED_RESUMES=your_submitted_resumes_folder
SUBMITTED_JOBS=your_submitted_jobs_folder
CHROME_PATH=path_to_chrome_executable
```
## Usage
Build the resume and cover letter based off of the JSON files

```bash
npm run build
```

Start a nodemon server for the cover letter available at localhost:3000 and saves a psf version to submitted_covers folder

```bash
npm run buildcover
```

Export the resume and save as a pdf to the submitted_resumes folder

```bash
npm run buildresume
```

Send resume, coverletter and job info to hubspot
```bash
npm run hubspot
```

Open the resume as html
```bash
npm run openresume
```

