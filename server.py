from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import telebot

API_TOKEN = '7197117285:AAHADby_SJiWWorEL-cO_enKsNVwa9FjPEE'
bot = telebot.TeleBot(API_TOKEN)

app = Flask(__name__)
CORS(app)

chat_ids = []

@app.route('/api/submit/', methods=["POST"])
def api_submit():
    print(request)
    for chat_id in chat_ids:
        bot.send_message(chat_id, request.data)
    return jsonify({"status": "success"})

@bot.message_handler(commands=['start'])
def start_message(message):
    chat_id = message.chat.id
    if chat_id not in chat_ids:
        chat_ids.append(chat_id)
    bot.send_message(chat_id, 'Hello! I will send you all the messages from the form')

if __name__ == '__main__':
    bot.polling(none_stop=True)
    app.run(debug=True, host='localhost', port=8080)
