import logging
import random
import azure.functions as func
from azure.cosmosdb.table.tableservice import TableService


def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    action = req.params.get('action')
    email = req.params.get('email')
    
    table_service = TableService(account_name='storageaccountfuncab8ff', account_key='E8BmaXqBZaMLxe61VcO1QdoTd4bdpx1j/NphPZvfqwMyV2nW2DMmEFrcfNJ6kdUCjYC3d6yd4b3k9UxP5tcxBQ==')
    
    if action == "subscribe":
        count = 0
        tasks = table_service.query_entities('mailinglist', filter="email eq '"+email+"'")
        for task in tasks:
            if task:
                count+=1
        if count == 1:
            message = "You have already subscribed to the mailing list"
        else:

            rk = random.randint(5,10000000)
            task = {'PartitionKey': '1', 'RowKey': str(rk),'email': email}
            table_service.insert_entity('mailinglist', task)
            message = "Your email has been successfully added to the Mailing List. You will start receiving updates every day at 6:00pm IST"
        
    
    if action == "unsubscribe":
        count = 0
        tasks = table_service.query_entities('mailinglist', filter="email eq '"+email+"'")
        for task in tasks:
            if task:
                count+=1
        if count ==1:
            table_service.delete_entity('mailinglist', task['PartitionKey'], task['RowKey'])
            message = "You have unsubscribed from COVID-19 Daily stats."
        else:
            message = "Email Address not found. Kindly check your email address"
    return func.HttpResponse(
             message,
             status_code=200
        )
