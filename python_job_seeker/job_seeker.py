import requests
from bs4 import BeautifulSoup
import schedule
import time
from datetime import datetime, timedelta
from crewai import Agent, Task, Process, Crew
import os 
from dotenv import load_dotenv

load_dotenv()
api = os.environ.get('OPENAI_API_KEY')

limit="200"
token="KWK9A42R5jgteRpxZo7EbdrZAFrNPj2R"
# tag_list = ['blockchain', "web3","backend","crypto","dao","defi",
#             "entry level","evm","erc 20","front end","full stack",
#             "game dev","ganache","golang","hardhat","java","javascript"
#             ,"layer 2","mobile","nft","node","open source","openzeppelin",
#             "pay in crypto","react","refi","research","rust","smart contract",
#             "solidity","truffle","web3 py","web3js","zero knowledge"]

tag_list = ['blockchain']

job_results_list=[]

agent1=Agent(
    role = "Software developer job recruiter",
    goal = "Give me a percentage of match of a given job description according with my resume given. When you do the analysis consider that I only want the remote jobs",
    backstory = """you are job recruiter so you are going to match my cv with the job description 
    I am going to give you. Please just match the skills that I actually do have and give me the percentage of match. 
    Also make your judgement accordingly""",
    verbose = True
)   

def process_description(job_description):
        print("\nJob desc: "+str(job_description))
        # process description
        raw_description = job_description["description"]
        soup_description = BeautifulSoup(raw_description,"html.parser")
        return soup_description.get_text()

def print_job(job_results_list):
    for job in job_results_list:
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
        for job in job_results_list:

            print('current job: '+str(job_results_list))

            task1 = Task(
                description = """
                Analyse the following job description:
                """+ process_description(job) +"""
                """,
                expected_output = """
                 Match my cv with the job description 
                I am going to give you. Please just match the skills that I actually do have and give me the percentage of match. 
                Also make your judgement accordingly
                """,
                agent = agent1
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
        url = "https://web3.career/api/v1?tag="+tag+"&limit="+limit+"&token="+token
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

    # print_job(job_results_list[0])
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