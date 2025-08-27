from typing import List
from datetime import datetime
from pydantic import BaseModel

# # FastAPI Charts Backend Application
def get_full_name(first_name: str, last_name: str):
    full_name = first_name.title() + " " + last_name.title()
    return first_name + " " + last_name
def get_name_with_age(name: str, age: int):
    return name.title() + 'is ' + str(age) + ' years old'

# print(get_name_with_age('Gary', 20))

def process_list(arr: List[str]):
    for i in arr:
      print(i.title())

# process_list(['1','2','3'])

# x= "Hello\nworld"
# print(x[-3:])

# 集合
# s1={1,2,3}
# s2={2,3,4,5}

# s3 = s1 & s2 & 交集
# s3 = s1 | s2 # 聯集
# s3 = s1 - s2 # 差集
# s3 = s2 - s1
# s3 = s1^s2 # 反交集
# s3=set('hello')
# s3 = s1&s2
# print(3 in s3)
# print(set('hello'))

# 字典(物件)
# dlc = {x:x*2 for x in [1,2,3]}
# print(dlc)

# def input_num(num):
#   if (num > 10):
#     print(f"{num}大於10")
#   elif (num>0):
#     print(f"{num}是正數")
#   else:
#     print(f"{num}是負數")

# input_num(11)
# input_num(4)
# input_num(-6)

# if elif else


# class Person:
#     def __init__(self, name: str):
#         self.name = name.title()

# def person_name(person: Person):
#     print(person.name)
#     return

# person_name(Person('gg'))

# class User(BaseModel):
#     id: int
#     name: str = 'Keon'
#     signup_ts: datetime | None = None
#     friends: list[int] = []

# external_data = {
#     'id': '1',
#     'signup_ts': '2024-08-21 10:27',
#     'friends': [1 ,"2", b"3"],
# }
# user = User(**external_data)
# print(user)
# print(user.id)

for i, v in {'apple': "蘋果", 'banana': '香蕉'}:
    print(i,v)
  
