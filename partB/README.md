# Part B: Library Management API

## Бизнес дүрэм (Business Rules)
 Хэрэглэгч нэг дор хамгийн ихдээ '5 ном зээлэх' боломжтой.
Хэрэв 5 ном зээлсэн бол нэмж зээлэх хүсэлтийг `400 Bad Request` алдаагаар буцаана.

## API Endpoint-үүд
`POST /rent`: Ном зээлэх (userId, bookId)
`POST /return`: Ном буцаах (userId, bookId)

## Ашигласан технологи
Node.js & Express.js: Сервер талын кодчлол.
REST Principles: Нөөцөд суурилсан API дизайн.