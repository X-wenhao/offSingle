from flask import Flask,request,abort,jsonify,render_template,request
from flask_mail import Mail,Message
from threading import Thread
import random
from datetime import date
import sqlite3

#from PIL import Image,ImageDraw,ImageFont


app=Flask(__name__)

app.config['SECRET_KEY']= 'easy to guess'
app.config['MAIL_SERVER'] = 'smtp.163.com'
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_PORT'] = '465'
#app.config['MAIL_USERNAME'] = os.environ.get('MAIL_USERNAME')
#app.config['MAIL_PASSWORD'] = os.environ.get('MAIL_PASSWORD')
app.config['MAIL_USERNAME'] = 'as_stranger@163.com'
app.config['MAIL_PASSWORD'] = 'test163'

mail=Mail(app)
app.config['start_num']=251

@app.route('/api/V1.1/predict/get_num',methods=['GET'])
def get_num():
    app.config['start_num']+=1
    print(app.config['start_num'])
    return jsonify({"number":app.config['start_num']})

@app.route('/api/V1.1/predict/pre_result',methods=['GET'])
def pre_result():
    print('result')
    args_dict={}
    args_dict['name']=request.args.get('name')
    try:
        args_dict['age']=int(request.args.get('age'))
    except:
        return 'input is wrong'
    args_dict['gender']=request.args.get('gender')
    if args_dict['gender']=='男':
        args_dict['gender']='man'
    if args_dict['gender']=='女':
        args_dict['gender']='woman'
    #if args_dict['gender'] not in ['man','woman']:
    #    return 'input is wrong'
    print(args_dict)

    db=sqlite3.connect('data.db')
    cu=db.cursor()
    re={}
    re['name']=args_dict['name']
    if args_dict['gender'] not in ['man','woman']:
        abort(404)
    time=int(str(date.today())[:4])
    if args_dict['age']<=14:
        time+=18-args_dict['age']+random.randint(1,6)
    elif args_dict['age']<=18:
        time+=random.randint(4,7)
    elif args_dict['age']<=20:
        time+=random.randint(4,6)
    elif args_dict['age']<=24:
        time+=random.randint(2,4)
    elif args_dict['age']<=26:
        time+=random.randint(1,2)
    else:
        time+=random.randint(0,1)
    re['time']=time

    id_max=cu.execute('select max(id) from {}'.format\
            (args_dict['gender'])).fetchone()[0]
    while True:
        row=cu.execute('select * from {} where id={}'.format(args_dict['gender'],random.randint(491,id_max))).fetchone()
        print("select * from {} where id={}".format(args_dict['gender'],random.randint(491,id_max)))
        if row is not None:
            re['location']=row[1].strip('\n')
            re['adj']=row[2].strip('\n')
            re['person']=row[3].strip('\n')
            break
        else:
            continue
    db.close()

    re_data={}
    re_data['time']=re['time']
    re_data['location']=re['location']
    re_data['person']=re['adj']+re['person']
    print(re)

    """
    try:
        im=Image.open('static/image/pingtiao_m1.png')
        print('open im')
        print(args_dict)
        y=159+24
        x1=240
        x2=320
        dx=90
        color=(210,83,97)
        dict={'man':'男','woman':'女'}
        font = ImageFont.truetype("static/font/pingtiao.ttf",size=40,encoding="utf-8")

        draw=ImageDraw.Draw(im)
        draw.text((575, 104), num, color, font=font)

        draw.text((x1, y), re['name'], color, font=font)
        draw.text((x1, y +dx), dict[args_dict['gender']], color, font=font)

        draw.text((x1, y +dx *2), str(args_dict['age']), color, font=font)

        draw.text((x2, y +dx * 3), "2345", color, font=font)
        draw.text((x2, y +dx * 4), str(re['time']), color, font=font)
        draw.text((x2, y +dx * 5), re['location'], color, font=font)
        content=re['adj'] + "的" + re['person']
        i=0
        dx1=50
        while(len(content)):
            print(content+"     ")
            if(len(content)>8):
                draw.text((x2, y + dx * 6+dx1*i), content[:8], color, font=font)
                content=content[8:]
                print(content+"     ")
                i+=1
            else:
                draw.text((x2, y + dx*6+dx1 * i), content, color, font=font)
                break


        draw = ImageDraw.Draw(im)

        print('draw finish')

        im.show()

    except:

        abort(500)
    """
    return jsonify(re_data)

@app.route('/api/V1.1/mail',methods=['POST'])
def send_mail():
    print('mail...')
    args_dict={}
    #args_dict['address']=request.args.get('address')
    #args_dict['content']=request.args.get('content')
    args_dict=request.get_json()
    print(args_dict)
    msg = Message("表白",sender=app.config['MAIL_USERNAME'],recipients=[args_dict.get('address')])
    #print(args_dict['address'])
    #print(args_dict['content'])
    msg.body = str(args_dict.get('content'))
    try:
        mail.send(msg)
    except:
        return jsonify({'result':0})
    return jsonify({"result":1})

@app.route('/offSingle')
def index():
    print('index')
    return render_template('index.html')

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

if __name__=='__main__':
    app.run(host='0.0.0.0',port=80,threaded=True)
