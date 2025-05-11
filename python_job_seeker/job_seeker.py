import requests
from bs4 import BeautifulSoup
import schedule
import time
from datetime import datetime, timedelta
from crewai import Agent, Task, Process, Crew, LLM
import os 
from dotenv import load_dotenv


# Load CV from file
with open('cv_text.txt', 'r') as file:
    cv_text = file.read()

load_dotenv()
#for openai
#openAiApi = os.environ.get('DEEPSEEK_API_KEY')

limit="200"
web3Jobstoken="KWK9A42R5jgteRpxZo7EbdrZAFrNPj2R"
# tag_list = ['blockchain', "web3","backend","crypto","dao","defi",
#             "entry level","evm","erc 20","front end","full stack",
#             "game dev","ganache","golang","hardhat","java","javascript"
#             ,"layer 2","mobile","nft","node","open source","openzeppelin",
#             "pay in crypto","react","refi","research","rust","smart contract",
#             "solidity","truffle","web3 py","web3js","zero knowledge"]

tag_list = ['blockchain','javascript','backend', 'full stack']

job_results_list=[]


def process_description(job_description):
        print("\nJob desc: "+str(job_description))
        # process description
        raw_description = job_description["description"]
        soup_description = BeautifulSoup(raw_description,"html.parser")
        return soup_description.get_text()

def print_job(job_results_list):
    for job in job_results_list:
        # print("First of all job: "+str(job))
        print("title: "+job["title"])
        print("job id: "+str(job["id"]))
        print("date: "+ job["date"])
        # print(job["date_epoch"])
        print("country: "+job["country"])
        # print(job["city"])
        print("company: "+job["company"])
        print("location: "+job["location"])
        print("url apply: "+job["apply_url"])
        print()
        # print(job["tags"])  # Array

       
        # print("job description: "+description_text)

    print("Total number of jobs: "+str(len(job_results_list)))

def analyse_job_with_ai(job_results_list):
        # Initialize DeepSeek LLM
        deepseek_llm = LLM(model="ollama/deepseek-r1:1.5b", base_url = "http://localhost:11434")
        # deepseek_llm = DeepSeek(api_key=os.environ.get('DEEPSEEK_API_KEY'))

        agent1=Agent(
            role = "Talent Matching Specialist",
            goal = "Match candidates to job descriptions with 90%+ accuracy by analyzing skills, experience, and cultural fit",
            backstory = """A seasoned recruiter with 8 years of experience in tech hiring. 
                Expert in parsing CVs and job descriptions to identify strong matches.
                Uses structured frameworks like ATS (Applicant Tracking Systems) for fairness.""",
            verbose = True,
            llm=deepseek_llm,
        )   
        for job in job_results_list:

            print('Analysing the current job: '+str(job['title']+' at '+str(job['company'])))
            job_description  =process_description(job)

            task1 = Task(
                description = f"""Analyze this job description against the candidate's CV:
                   
                   **Job Description**:\n{job_description}
                   
                   **CV**: THis is a test<< THIS IS THE PROBLEM
                   
                   Evaluate:
                   1. Skills match (highlight exact matches)
                   2. Experience alignment
                   3. Missing requirements""",
                agent = agent1,
                # context=[cv_text],
                expected_output="Detailed match report with strengths/gaps"
            )

            crew =Crew(
                agents= [agent1],
                tasks = [task1],
                process=Process.sequential,
                verbose=True
            )

            result = crew.kickoff()
            print(result)



def get_web3_jobs():

    for tag in tag_list:
        url = "https://web3.career/api/v1?tag="+tag+"&limit="+limit+"&token="+web3Jobstoken
        try:
            response = requests.get(url)
            response.raise_for_status()  # Check if the request was successful
            data = response.json()  # Parse the JSON response
            jobs = data[2]  # Assuming the jobs array starts at index 2
            tag_counter = 0

            for job in jobs:
                parsed_date = datetime.strptime(job['date'], "%a, %d %b %Y %H:%M:%S %z")
                now=datetime.now(parsed_date.tzinfo)

                days_ago = now - timedelta(days=4)

                if days_ago<=parsed_date<=now:
                    if job['country'] == "remote" \
                        or job['country']=="Remote" \
                            or job['location']=="remote"\
                                or job['location']=='Remote':
                        
                        
                        if not any(str(job_item['id'])==str(job['id']) for job_item in job_results_list):
                            tag_counter+=1
                            job_results_list.append(job)

                        # print('job id: '+str(job['id']))

            print('Jobs today with tag: '+tag +" "+str(tag_counter))
  
        except requests.exceptions.RequestException as e:
            print(f"Error fetching jobs: {e}")

    # print_job(job_results_list)
    analyse_job_with_ai(job_results_list)

            # TODO: Add your code to save the job to your db
            # Make sure the job is not duplicated before saving

# def run_script():
#     # place your function call here
#     # Call the function
#     get_web3_jobs()

# schedule.every(1).minutes.do(run_script)

# while True:
#     schedule.run_pending()
#     time.sleep(1)

get_web3_jobs()


#TODO: processing crew ai with job description