Алдаа 1 · Нэршлийн зарчим зөрчсөн
usr_mgr, get_u, db_conn зэрэг нэрнүүд нь TypeScript-ийн PascalCase/camelCase стандартаас гажуудсан, утга агуулаагүй товчлолууд.
Засвар: UserManager, getUser, databaseConnection болгосон.
Алдаа 2 · Боолийн флагийн антипаттерн
do_user_op(obj, flag, timeout) — flag: 0=create, 1=update, 2=delete, 3=restore гэж нэг методод 4 өөр үйлдлийг шилжүүлж байсан. Дуудагч flag=2 гэж бичихэд юу болохыг тайлбараас уншихаас өөр аргагүй байсан.
Засвар: createUser, deleteUser гэх мэт тусдаа методуудад хуваасан.
Алдаа 3 · Мэдээллийн далдлалт зөрчсөн
public db_conn, public users_arr — гадны кодоос шууд өөрчлөх боломжтой байсан.
Засвар: private databaseConnection, private users болгосон.
Алдаа 4 · Стрингтэй алдааны тэмдэглэгээ
get_u нь хэрэглэгч олдоогүй үед 'ERR_404' гэсэн magic string буцааж байсан. Хөрвүүлэгч алдааг барьж чадахгүй байсан.
Засвар: UserNotFoundException тусгай алдаа шидэх болгосон.
Алдаа 5 · any төрлийн хэт ашиглалт
obj: any, db_conn: any, Array<any> — TypeScript-ийн статик шалгалтыг бүхэлд нь унагааж байсан.
Засвар: User interface, User[] тодорхой төрлүүд ашигласан.
Алдаа 6 · find методын тодорхойгүй нэр ба ойлголтын жин
find(q) — нэр нь хэтэрхий ерөнхий, q параметр нь ямар утгатайг мэдэгдэхгүй. Exception translation хийгдээгүй байсан.
Засвар: findUsers(query) болгож, try/catch-ээр дотоод алдааг library-ийн алдаа болгон хувиргасан.