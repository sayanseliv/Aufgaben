# Homeworks
 Tasks
1) homework_server
Создать веб сервер.

API:
GET `/person` - возвращает данные о человеке

GET `/person/name` - возвращает только имя человека

GET `/person?name&age&surname` - возвращает данные полей, которые переданные в строке. Может быть name, age, surname, height, weight, degree, city, street, postCode

GET `/person/address` - возвращает только те поля, который относятся к адресу.

GET `/person/post/recipient` - возвращает только те поля, который необходимы для сформирования почтового отправления - имя, фамилия, город, улица, почтовый индекс

PUT `/person/update`, с телом {...anything} - запрос который перезаписывает в файле `/api/person.json` всем что было передано в теле.
