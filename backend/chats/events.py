# from channels.layers import get_channel_layer
# from asgiref.sync import async_to_sync
#
# channel_layer = get_channel_layer()
#
#
# async def send_message_event(sender, recipient, chat_id):
#     event = {
#         'type': 'chat.message',
#         'sender': sender,
#         'recipient': recipient,
#         'chat_id': chat_id,
#         'message': 'You have a new message!'
#     }
#     await channel_layer.send(f'user_{recipient}', event)
