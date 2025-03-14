import hubspot from "@hubspot/api-client";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jobJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'job.json'), { encoding: 'utf8' }));

const hubspotClient = new hubspot.Client({ accessToken: process.env.HUBSPOT_ACCESS_TOKEN })

const companyName = jobJson.company
const companyDomain = jobJson.domain
const aboutJob = jobJson.about_the_role
const responsibilities = jobJson.position_responsibilities.join('\n \n')
const requirements = jobJson.requirements.join('\n \n')
const preferred = jobJson.preferred_skills.join('\n \n')
const salary = jobJson.salary
const application_url = jobJson.application_url

const properties = {
  "dealname": `${jobJson.company} - ${jobJson.position}`,
  "description": aboutJob,
  "pipeline": process.env.HUBSPOT_PIPELINE_ID,
  "dealstage": process.env.HUBSPOT_DEAL_STAGE_ID,
  "responsibilities": responsibilities,
  "requirements": requirements,
  "preferred": preferred,
  "salary": salary,
  "application_url": application_url
};

const createDealAndCompany = async () => {
  const company = await createCompany()

  if (company && company.id) {
    createDeal(company.id, company)
  }

}

const createDeal = async (id, _company) => {
  const SimplePublicObjectInputForCreate = { associations: [{ "types": [{ "associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 5 }], "to": { "id": id } }], properties };


  try {
    const apiResponse = await hubspotClient.crm.deals.basicApi.create(SimplePublicObjectInputForCreate);

    console.log(JSON.stringify(apiResponse, null, 2));
    return apiResponse
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

const createCompany = async () => {
  const properties = {
    "domain": companyDomain,
    "unique_domain": companyDomain,
    "name": companyName,
    "hubspot_owner_id": process.env.HUBSPOT_OWNER_ID
  };
  // const SimplePublicObjectInputForCreate = { associations: [], objectWriteTraceId: "", properties };

  const BatchInputSimplePublicObjectBatchInputUpsert = { inputs: [{ "idProperty": "unique_domain", "id": companyDomain, "properties": properties }] };


  try {
    const apiResponse = await hubspotClient.crm.companies.batchApi.upsert(BatchInputSimplePublicObjectBatchInputUpsert);
    if (apiResponse.status === 'COMPLETE' && apiResponse.results.length > 0) {
      return apiResponse.results[0]
    }
  } catch (e) {
    e.message === 'HTTP request failed'
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

createDealAndCompany()