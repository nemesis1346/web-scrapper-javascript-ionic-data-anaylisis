import requests
from bs4 import BeautifulSoup

tags="blockchain"
limit="200"
token="KWK9A42R5jgteRpxZo7EbdrZAFrNPj2R"

def get_web3_jobs():
    url = "https://web3.career/api/v1?tag="+tags+"&limit="+limit+"&token="+token
    
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        data = response.json()  # Parse the JSON response
        jobs = data[2]  # Assuming the jobs array starts at index 2

        print('Jobs today: ', len(jobs))

        for job in jobs:

            if job['country'] == "remote" \
                or job['country']=="Remote" \
                    or job['location']=="remote"\
                        or job['location']=='Remote':
                print("title: "+job["title"])
                # print(job["id"])
                print("date: "+ job["date"])
                # print(job["date_epoch"])
                print("country: "+job["country"])
                # print(job["city"])
                print("company: "+job["company"])
                print("location: "+job["location"])
                print("url apply: "+job["apply_url"])
                print()
                # print(job["tags"])  # Array

                # process description
                raw_description = job["description"]
                soup_description = BeautifulSoup(raw_description,"html.parser")
                description_text = soup_description.get_text()
                # print("job description: "+description_text)

                # TODO: Add your code to save the job to your db
                # Make sure the job is not duplicated before saving

    except requests.exceptions.RequestException as e:
        print(f"Error fetching jobs: {e}")

# Call the function
get_web3_jobs()