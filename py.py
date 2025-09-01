import math

def calculate(check, num):
    if check == "ceil":
        print(math.ceil(num))
    elif check == "floor":
        print(math.floor(num)) 
    elif check == "cos":
        print(math.cos(num))
    else: 
        print(num)


calculate("ceil", 98.04)
calculate("floor", 8.90)
calculate("cos", -22)
calculate("none", 45)