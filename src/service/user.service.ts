import { Post, PrismaClient } from '../../generated/prisma';
import { User } from '../models/user';

const prisma = new PrismaClient();

// const [result] = await db.execute(
//     'INSERT INTO users (name, email, password) VALUES (?, ?,?)',
//     [user.name, user.email, user.password]
// );

export const createUser = async (user: User) => {

    const tables = await prisma.$queryRaw`SHOW TABLES;`
    console.log(tables,"tables");
    
    const result = await prisma.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
    console.log(result,"result")
    return result;
};

export const fetchUsers = async () => {
    await prisma.$executeRaw`INSERT INTO products (name, price) VALUES ('Sample Product', 99.99)`;

    const users = await prisma.user.findMany();
    return users;
};


export const createPost = async (post: { title: string; content: string; id: number }) => {
    console.log(post, "post")
    // return prisma.post.create({
    //     data: post,
    // });
};


export const fetchUsersWithPosts = async () => {
    const users = await prisma.user.findMany({
        include: {
            posts: true, // performs join
        },
    });

    console.log(users);
};

