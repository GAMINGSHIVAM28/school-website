import re
from flask import Flask, request, jsonify, render_template_string

app = Flask(__name__)

FAQS = [
    {
        "q": re.compile(r"admission|enroll|apply", re.I),
        "a": "Thank you for your interest in our school. For admission details, please visit our Contact page or call our office at +91-XXXXXXXXXX. You may also email us at info@colonelacademy.edu. We look forward to welcoming you!"
    },
    {
        "q": re.compile(r"fee|fees|structure|cost", re.I),
        "a": "We appreciate your inquiry. The fee structure is available at the school office. Please contact us for the most up-to-date information. We are happy to assist you."
    },
    {
        "q": re.compile(r"location|where|address|map", re.I),
        "a": "Our school is located in Mangal, Bilaspur (C.G). <a href='https://goo.gl/maps/...' target='_blank'>View us on Google Maps</a>. We would be delighted to have you visit."
    },
    {
        "q": re.compile(r"timing|hours|open|close|schedule", re.I),
        "a": "Our school operates from 8:00 AM to 2:00 PM, Monday to Saturday. Please feel free to reach out if you need more details."
    },
    {
        "q": re.compile(r"principal|head|director", re.I),
        "a": "Our respected Principal is Mrs. XYZ. For appointments or meetings, kindly contact the school office. We value your communication."
    },
    {
        "q": re.compile(r"facilities|labs|library|sports", re.I),
        "a": "We offer modern science labs, a well-stocked library, computer labs, and excellent sports facilities to ensure holistic development for our students."
    },
    {
        "q": re.compile(r"transport|bus|conveyance", re.I),
        "a": "School transport is available on selected routes. Please contact our office for detailed information. We are here to help."
    },
    {
        "q": re.compile(r"holiday|vacation|break", re.I),
        "a": "Our holiday list is regularly updated on the notice board and website. Please check for the latest updates or contact us for more information."
    },
    {
        "q": re.compile(r"uniform|dress code|clothes", re.I),
        "a": "The school uniform consists of a white shirt and navy blue trousers/skirt. For more details, please refer to the student handbook or contact the office."
    },
    {
        "q": re.compile(r"curriculum|syllabus|board", re.I),
        "a": "We follow the CBSE curriculum, focusing on holistic education and academic excellence. If you have specific questions, please let us know."
    },
    {
        "q": re.compile(r"result|exam|marks|grades", re.I),
        "a": "Exam results are announced on the notice board and communicated to parents. For further details, please contact the class teacher or school office."
    },
    {
        "q": re.compile(r"events|annual day|function|competition", re.I),
        "a": "We organize annual functions, sports day, and various competitions. Please check our website or notice board for upcoming events. We encourage student participation."
    },
    {
        "q": re.compile(r"teacher|staff|faculty", re.I),
        "a": "Our faculty consists of experienced and dedicated teachers. For specific queries, please contact the school office. We value your engagement."
    },
    {
        "q": re.compile(r"contact|phone|email", re.I),
        "a": "You can contact us at +91-XXXXXXXXXX or email info@colonelacademy.edu. We are always happy to assist you."
    },
    {
        "q": re.compile(r"hostel|boarding", re.I),
        "a": "Currently, we do not offer hostel or boarding facilities. Please let us know if you need any other assistance."
    },
    {
        "q": re.compile(r"scholarship|discount|concession", re.I),
        "a": "Scholarships and fee concessions are available for meritorious students. Please contact the office for eligibility and application details. We support academic excellence."
    },
    {
        "q": re.compile(r"online|digital|e-learning|portal", re.I),
        "a": "We provide digital learning resources and an online portal for students. Please log in with your credentials or contact the IT department for help."
    }
]

def get_reply(user_msg):
    for faq in FAQS:
        if faq["q"].search(user_msg):
            return faq["a"]
    # Contextual follow-up
    if re.search(r"thank", user_msg, re.I):
        return "You're most welcome! If you have any more questions, please feel free to ask. I am always here to assist you with respect."
    if re.search(r"hi|hello|hey|namaste|good (morning|afternoon|evening)", user_msg, re.I):
        return "Hello! I am CARE AI, your respectful school assistant. How may I help you today?"
    if re.search(r"photo|gallery|building", user_msg, re.I):
        return "You can view our building photos <a href='./photos.html'>here</a>. Please let me know if you need more information."
    if re.search(r"website|site|webpage", user_msg, re.I):
        return "You are currently on our official website. For more information, kindly explore the menu or ask me any question."
    if re.search(r"sports|games|athletics", user_msg, re.I):
        return "We offer a variety of sports and athletics programs. Please contact the sports department for more details. We encourage active participation."
    if re.search(r"library|books|reading", user_msg, re.I):
        return "Our library is open to all students during school hours. We have a wide range of books and resources to support your learning."
    if re.search(r"mission|vision|values", user_msg, re.I):
        return "Our mission is to empower students for a brighter future through quality education, discipline, and holistic development. We value respect, integrity, and excellence."
    if re.search(r"about|history|established", user_msg, re.I):
        return "Colonel Academy of Radiant Education was established to provide quality education in Bilaspur. We are committed to nurturing responsible and successful individuals."
    if re.search(r"respect|polite|courteous", user_msg, re.I):
        return "Respect and courtesy are core values at our school. We believe in treating everyone with kindness and dignity."
    # Fallback
    return "Thank you for your question. I am sorry, I do not have information on that specific topic. Please visit our <a href='Contact.html'>Contact page</a> or ask another question. I am here to help you with respect and courtesy."

@app.route("/")
def index():
    # Minimal HTML UI for testing
    return render_template_string("""
    <!DOCTYPE html>
    <html>
    <head>
        <title>CARE AI Chatbot</title>
        <style>
            body { font-family: Arial, sans-serif; background: #f9f9f9; }
            #chat { width: 340px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.2); padding: 16px; }
            #messages { height: 260px; overflow-y: auto; border: 1px solid #eee; padding: 8px; margin-bottom: 8px; background: #f9f9f9; }
            #input { width: 80%; padding: 8px; }
            #send { padding: 8px 16px; background: #0056b3; color: #fff; border: none; border-radius: 4px; cursor: pointer; }
            .ai { color: #0056b3; }
            .user { color: #333; }
        </style>
    </head>
    <body>
        <div id="chat">
            <div id="messages"></div>
            <form id="form">
                <input id="input" autocomplete="off" placeholder="Ask a question..." />
                <button id="send" type="submit">Send</button>
            </form>
        </div>
        <script>
            const form = document.getElementById('form');
            const input = document.getElementById('input');
            const messages = document.getElementById('messages');
            function addMessage(sender, text, isHtml) {
                const div = document.createElement('div');
                div.className = sender === 'CARE AI' ? 'ai' : 'user';
                div.innerHTML = '<b>' + sender + ':</b> ' + (isHtml ? text : escapeHtml(text));
                messages.appendChild(div);
                messages.scrollTop = messages.scrollHeight;
            }
            function escapeHtml(str) {
                return str.replace(/[&<>"']/g, function(m) {
                    return ({
                        '&': '&amp;',
                        '<': '&lt;',
                        '>': '&gt;',
                        '"': '&quot;',
                        "'": '&#39;'
                    })[m];
                });
            }
            function suggestFAQ() {
                addMessage('CARE AI', "Here are some things you can ask me:<ul style='margin:4px 0 0 16px;padding:0;'><li>What are the admission requirements?</li><li>What is the fee structure?</li><li>Where is the school located?</li><li>What are the school timings?</li><li>What facilities are available?</li><li>Do you offer scholarships?</li><li>Is there a school uniform?</li><li>How can I contact a teacher?</li></ul>", true);
            }
            form.onsubmit = function(e) {
                e.preventDefault();
                const userMsg = input.value.trim();
                if (!userMsg) {
                    suggestFAQ();
                    return;
                }
                addMessage('You', userMsg, false);
                input.value = '';
                addMessage('CARE AI', "<span style='font-style:italic;'>typing...</span>", true);
                fetch('/chat', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({message: userMsg})
                })
                .then(r => r.json())
                .then(data => {
                    messages.lastChild.remove();
                    addMessage('CARE AI', data.reply, true);
                });
            };
            // Welcome
            addMessage('CARE AI', "Namaste! I am CARE AI, your respectful virtual assistant. How may I help you today?", false);
            suggestFAQ();
        </script>
    </body>
    </html>
    """)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_msg = data.get("message", "")
    reply = get_reply(user_msg)
    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)