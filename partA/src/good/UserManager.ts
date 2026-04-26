
    // Хэрэглэгчийн мэдээллийн бүтэц

export interface User {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
}

// Хэрэглэгч олдоогүй үед шидэх тусгай алдаа

export class UserNotFoundException extends Error {
    constructor(identifier: string) {
        super(`User with identifier '${identifier}' was not found.`);
        this.name = "UserNotFoundException";
    }
}


//   UserManager класс - Хэрэглэгчийн мэдээллийг удирдах үндсэн API.
//   Дизайны шийдэл: Мэдээллийн далдлалт, тодорхой нэршил, Type-safety.

export class UserManager {
    // Далдлалт: Дотоод өгөгдлийг private болгож гадны нөлөөллөөс хамгаалсан
    private databaseConnection: any;
    private users: User[] = [];

     //   Шинэ хэрэглэгч бүртгэх
     //  @param user Бүртгэх хэрэглэгчийн объект
     //   @returns Амжилттай бүртгэгдсэн хэрэглэгч

    public createUser(user: User): User {
        this.users.push(user);
        return user;
    }

     //   ID эсвэл Email-ээр хэрэглэгчийг хайж олох
     //  @param identifier Хэрэглэгчийн ID эсвэл Email хаяг
     //   @returns Олдсон хэрэглэгчийн мэдээлэл
     //   @throws UserNotFoundException Хэрэглэгч олдохгүй бол алдаа шиднэ
    
    public getUser(identifier: string): User {
        const user = this.users.find(u => u.id === identifier || u.email === identifier);
        
        if (!user) {
            throw new UserNotFoundException(identifier);
        }
        
        return user;
    }

     //   Хайлтын утгаар хэрэглэгчдийг шүүх
     //  @param query Хайх түлхүүр үг
    
    public findUsers(query: string): User[] {
        try {
            return this.users.filter(u => u.username.includes(query));
        } catch (error) {
            // SQL алдааг library-ийн өөрийн алдаа болгож хувиргах (Exception Translation)
            throw new Error("Internal data access error occurred.");
        }
    }

     //   Хэрэглэгчийг устгах
    
    public deleteUser(id: string): void {
        this.users = this.users.filter(u => u.id !== id);
    }
}