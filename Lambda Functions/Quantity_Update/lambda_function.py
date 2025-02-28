import json
import boto3
from botocore.exceptions import ClientError

# Initialize DynamoDB client
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('CafeteriaMenu')

def lambda_handler(event, context):
    # Log the incoming event for debugging
    print("Received event: ", json.dumps(event, indent=2))

    # Handle OPTIONS request (CORS Preflight)
    if event.get("httpMethod") == "OPTIONS":
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps("CORS preflight successful")
        }

    # Extract updates from the event body
    try:
        body = json.loads(event.get('body', '{}'))
        updates = body.get('updates', [])
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('Invalid JSON format in request body')
        }

    if not updates:
        return {
            'statusCode': 400,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
            },
            'body': json.dumps('No updates provided')
        }

    # Process each update in the request
    for update in updates:
        menu_id = update.get('menuId')
        quantity = update.get('quantity')

        if not menu_id or quantity is None:
            return {
                'statusCode': 400,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(f"Missing menuId or quantity for update: {update}")
            }

        try:
            # Update the item in the DynamoDB table
            table.update_item(
                Key={'menuId': menu_id},
                UpdateExpression='SET quantity = :quantity',
                ExpressionAttributeValues={':quantity': quantity},
                ReturnValues='UPDATED_NEW'
            )
            print(f"Updated menuId: {menu_id} with quantity: {quantity}")

        except ClientError as e:
            print(f"Error updating menuId {menu_id}: {e.response['Error']['Message']}")
            return {
                'statusCode': 500,
                'headers': {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Content-Type',
                    'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
                },
                'body': json.dumps(f"Error updating item: {e.response['Error']['Message']}")
            }

    # Return success response
    return {
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
        },
        'body': json.dumps('Menu updated successfully')
    }
