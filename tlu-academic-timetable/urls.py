from datetime import datetime, timedelta

# Base URL with placeholder for 'av' parameter
base_url = ("https://www.tlu.ee/asio/kalenterit2/index.php?av_v=1&av={av_param}"
            "&cluokka=DTLGM-1&kt=lk&laji=&guest=intranet%2Ftu&lang=eng&ui=&yks="
            "&apvm={apvm_param}&tiedot=kaikki&ss_ttkal=&ccv=&yhopt=&__cm=&b=1725175512&av_y=0")

# Function to generate the 'av' parameter based on a date
def generate_av_param(date):
    formatted_date = date.strftime('%y%m%d')
    return formatted_date * 3  # Repeat the formatted date 3 times

# Start date (first Monday on or after Sep 1, 2024)
start_date = datetime(2024, 9, 1)
while start_date.weekday() != 0:  # Find the first Monday
    start_date += timedelta(days=1)

# End date
end_date = datetime(2025, 2, 1)

# Generate URLs
current_date = start_date
while current_date <= end_date:
    av_param = generate_av_param(current_date)
    apvm_param = current_date.strftime('%y%m%d')
    full_url = base_url.format(av_param=av_param, apvm_param=apvm_param)
    print(full_url)
    
    # Move to the next Monday
    current_date += timedelta(days=7)
