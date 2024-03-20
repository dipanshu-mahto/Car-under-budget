from flask import Flask,render_template,jsonify,request
from flask_cors import CORS
import numpy as np
import pickle

model = pickle.load(open('car_price_predictor.pk1', 'rb'))
app = Flask(__name__)
CORS(app)
@app.route('/', methods=['GET'])
def hello_world():
    
    return jsonify({"response":"This is Predictor Application"})


@app.route('/predict', methods=['POST'])
def home():
    data=request.get_json()
    
    data1 = data["disp"]
    data2 = data["mileage"]
    data3 = data["cylin"]
    data4 = data["area"]
    data5 = data["h"]
    data6 = data["wheelb"]
    data7 = data["seat"]
    data8 = data["weight"]
    data9 = data["fuelCap"]
    data10 = data["door"]
    data11 = data["cyConfig"]
    data12 = data["fuelSys"]
    data13= data["budget"]

    def fuelSys_to_fuelSysCon(argument):

        switcher = {
        "Injection":0,
        "PCM-Fi":1,

        }
 
    # get() method of dictionary data type returns
    # value of passed argument if it is present
    # in dictionary otherwise second argument will
    # be assigned as default value of passed argument
        return switcher.get(argument, -1)
    
    def cyConfig_to_cyConfigCon(argument):
        switcher1 = {
        "Flat":0,
        "In-line":1,
        "V":2,
        "VV":3

        }
 
    # get() method of dictionary data type returns
    # value of passed argument if it is present
    # in dictionary otherwise second argument will
    # be assigned as default value of passed argument
        return switcher1.get(argument, -1)
    data11=cyConfig_to_cyConfigCon(data11)
    data12=fuelSys_to_fuelSysCon(data12)
    arr = np.array([[data1, data2, data3, data4,data5, data6, data7, data8,data9, data10, data11, data12]])
    pred = model.predict(arr)

    pred=pred.astype(float)
    if pred < data13:
        # pred1=pred:.2f
        pred=np.round(pred,2)
        strPred=  np.format_float_positional(pred)
        #strPred=  "{:.2f}".format(pred)

        res =str( f"Hurray  🥳🥳🥳🥳🥳🥳🥳🥳🥳🥳 You can Buy Your DREAM Car at price INR ")+strPred
        url="./true.gif"
    else:
        
        res = f"OOPs!! You can't get car on this price.  Don't be Sad Try new Combination of features!!"
        url="./false.gif"
    return jsonify({"prediction":res,"imgurl":url,"for":data})
if __name__=="__main__":
    app.run(host="0.0.0.0", threaded=True, port=5000
    )
